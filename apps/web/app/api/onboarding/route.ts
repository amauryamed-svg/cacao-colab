import { NextRequest, NextResponse } from "next/server"
import { upsertContactByEmail } from "@cacao-colab/hubspot-client"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import type { Json } from "@cacao-colab/supabase-client/database.types"

const COOKIE_NAME = "colab_onboarded"
const TIPO_LABEL: Record<string, string> = {
  restaurante: "Restaurante", hotel: "Hotel & Glamping", cafeteria: "Cafetería & Bar de cacao",
  pasteleria: "Pastelería & Chocolatería", otra: "Otra operación",
}
const INTERES_LABEL: Record<string, string> = {
  productos: "Productos CAÚA", aprendizaje: "Aprendizaje Dualita",
  marca: "Marketplace — postular marca", todo: "Todo el ecosistema",
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
    }
    await Promise.all([
      admin.from("crm_activities").insert({ crm_contact_id: contact.id, type: "onboarding_submitted", metadata }),
      body.visitorId && body.sessionId
        ? admin.from("analytics_events").insert({
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
        : Promise.resolve(),
    ])
    localStored = true
  } catch {
    // HubSpot puede seguir capturando aunque el CRM local aún no esté migrado.
  }

  return done(NextResponse.json({
    ok: Boolean(hubspot?.ok || localStored),
    hubspot: hubspot?.ok ? hubspot.action : "unavailable",
    crm: localStored ? "stored" : "unavailable",
  }))
}
