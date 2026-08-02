import { NextRequest, NextResponse } from "next/server"
import { upsertContactByEmail } from "@cacao-colab/hubspot-client"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import type { Json } from "@cacao-colab/supabase-client/database.types"
import { consentToUserMetadata } from "@/lib/legal/consent"
import { LEGAL_POLICY_VERSION, TERMS_VERSION } from "@/lib/legal/versions"
import { getSiteUrl } from "@/lib/site"

const COOKIE_NAME = "colab_onboarded"
const TIPO_LABEL: Record<string, string> = {
  finca: "Finca / cacaocultor",
  transformacion: "Transformación bean-to-bar",
  restaurante: "Restaurante",
  hotel: "Hotel & experiencia",
  cafeteria: "Cafetería & Bar de cacao",
  pasteleria: "Pastelería & Chocolatería",
  marca: "Marca / comercio",
  "nueva-generacion": "Nueva generación",
  otra: "Otra vía",
}
const INTERES_LABEL: Record<string, string> = {
  excelencia: "Hablar cacao de excelencia",
  productos: "Productos con origen",
  aprendizaje: "Educarme con Dualita",
  competitividad: "Subir competitividad colaborativa",
  heritage: "Heritage generacional",
  marca: "Sumar marca al Colab",
  todo: "Todo el ecosistema",
}

function done(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "done", { path: "/", maxAge: 31_536_000, sameSite: "lax" })
  return response
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body?.email || !String(body.email).includes("@")) {
    return NextResponse.json({ ok: false, error: "email requerido" }, { status: 400 })
  }

  const privacyOk = body.privacy_accepted === true || body.privacy_accepted === "true"
  const termsOk = body.terms_accepted === true || body.terms_accepted === "true"
  if (!privacyOk || !termsOk) {
    return NextResponse.json(
      { ok: false, error: "opt-in de privacidad y términos requerido" },
      { status: 400 },
    )
  }

  const marketingOptIn = body.marketing_opt_in === true || body.marketing_opt_in === "true"
  const email = String(body.email).trim().toLowerCase()
  const properties: Record<string, string> = {
    firstname: String(body.nombre ?? ""),
    email,
    company: String(body.operacion ?? ""),
    city: String(body.ciudad ?? ""),
    mobilephone: String(body.whatsapp ?? ""),
    jobtitle: [TIPO_LABEL[body.tipo] || body.tipo, INTERES_LABEL[body.interes] || body.interes].filter(Boolean).join(" · "),
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
    ...(body.utm_source && { hs_analytics_source: "OTHER_CAMPAIGNS", hs_analytics_source_data_1: String(body.utm_source) }),
    ...(body.utm_campaign && { hs_analytics_source_data_2: String(body.utm_campaign) }),
    ...(body.utm_medium && { hs_analytics_last_referrer: String(body.utm_medium) }),
  }

  let hubspot: Awaited<ReturnType<typeof upsertContactByEmail>> | null = null
  let localStored = false
  try {
    hubspot = await upsertContactByEmail(properties)
  } catch (error) {
    hubspot = { ok: false, error: error instanceof Error ? error.message : "HubSpot no disponible" }
  }

  try {
    const admin = createSupabaseAdminClient()
    const { data: contact, error } = await admin
      .from("crm_contacts")
      .upsert({
        hubspot_contact_id: hubspot?.ok ? hubspot.contactId : null,
        full_name: String(body.nombre || email.split("@")[0]),
        email,
        phone: body.whatsapp ? String(body.whatsapp) : null,
        company: body.operacion ? String(body.operacion) : null,
        city: body.ciudad ? String(body.ciudad) : null,
        lifecycle_stage: "lead",
      }, { onConflict: "email" })
      .select("id")
      .single()
    if (error) throw error

    const metadata: Json = {
      tipo: String(body.tipo ?? ""),
      interes: String(body.interes ?? ""),
      utm_source: String(body.utm_source ?? ""),
      hubspot_ok: Boolean(hubspot?.ok),
      privacy_accepted: true,
      terms_accepted: true,
      marketing_opt_in: marketingOptIn,
    }
    await admin.from("crm_activities").insert({
      crm_contact_id: contact.id,
      type: "onboarding_submitted",
      metadata,
    })
    try {
      await admin.from("privacy_consents").insert({
        email,
        event: "lead_onboarding_opt_in",
        policy_version: "2026-07-31",
        source: "onboarding",
        metadata: {
          marketing_opt_in: marketingOptIn,
          hubspot_ok: Boolean(hubspot?.ok),
        },
      })
    } catch {
      // Migración privacy_consents puede no estar aplicada aún.
    }
    if (body.visitorId && body.sessionId) {
      await admin.from("analytics_events").insert({
        visitor_id: String(body.visitorId).slice(0, 80),
        session_id: String(body.sessionId).slice(0, 80),
        event_type: "onboarding_submitted",
        target: String(body.interes ?? ""),
        pathname: "/unete",
        utm_source: body.utm_source ? String(body.utm_source) : null,
        utm_medium: body.utm_medium ? String(body.utm_medium) : null,
        utm_campaign: body.utm_campaign ? String(body.utm_campaign) : null,
        metadata,
      })
    }
    localStored = true
  } catch {
    // HubSpot puede seguir capturando aunque el CRM local aún no esté migrado.
  }

  let magicLink = false
  try {
    const supabase = await createSupabaseServerClient()
    // getSiteUrl() cae a https://cacaocolab.org — nunca a localhost en prod.
    const siteUrl = getSiteUrl()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent("/aprende")}`,
        data: consentToUserMetadata({
          privacyAccepted: true,
          termsAccepted: true,
          marketingOptIn,
          policyVersion: LEGAL_POLICY_VERSION,
          termsVersion: TERMS_VERSION,
          source: "unete",
          at: new Date().toISOString(),
        }),
      },
    })
    magicLink = !error
  } catch {
    // El magic link es best-effort — no bloquea el registro del lead en HubSpot/CRM.
  }

  return done(NextResponse.json({
    ok: Boolean(hubspot?.ok || localStored),
    hubspot: hubspot?.ok ? hubspot.action : "unavailable",
    crm: localStored ? "stored" : "unavailable",
    magicLink,
  }))
}
