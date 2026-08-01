"use server"

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import {
  consentToUserMetadata,
  parseConsentForm,
  persistUserConsent,
  stashAuthConsentCookie,
} from "@/lib/legal/consent"
import { getSiteUrl } from "@/lib/site"

export type CampusAuthResult =
  | { ok: true; redirectedTo?: string }
  | { ok: false; error: string }

function safeNext(value: FormDataEntryValue | null) {
  const next = String(value ?? "/aprende")
  const allowed = [
    "/aprende",
    "/campus",
    "/juega",
    "/sembrar",
    "/cuenta",
    "/benevolo",
    "/rd",
    "/credencial",
    "/cuenta/consejo",
    "/equipo",
  ]
  return allowed.some((prefix) => next.startsWith(prefix)) ? next : "/aprende"
}

/**
 * Registro / login de learners y builders: solo magic link (email OTP).
 * Google y Apple no están habilitados — no requieren cuentas de desarrollador.
 */
export async function requestCampusMagicLink(formData: FormData): Promise<CampusAuthResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const next = safeNext(formData.get("next"))
  if (!email || !email.includes("@")) return { ok: false, error: "Ingresa un email válido." }

  const consent = parseConsentForm(formData)
  if ("error" in consent) return { ok: false, error: consent.error }

  try {
    await stashAuthConsentCookie(consent)
    const supabase = await createSupabaseServerClient()
    const siteUrl = getSiteUrl()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
        shouldCreateUser: true,
        data: consentToUserMetadata(consent),
      },
    })
    if (error) {
      if (/rate limit|over_email_send_rate_limit|frequency/i.test(error.message)) {
        return {
          ok: false,
          error: "Espera un minuto antes de pedir otro acceso. Revisa también spam.",
        }
      }
      return { ok: false, error: error.message }
    }
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "No fue posible iniciar el acceso." }
  }
}

/**
 * Fallback cuando el enlace del correo se abre en otro dispositivo (rompe PKCE):
 * el learner pega el código OTP del email en el mismo navegador donde pidió acceso.
 */
export async function verifyCampusEmailOtp(formData: FormData): Promise<CampusAuthResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const token = String(formData.get("token") ?? "").trim().replace(/\s+/g, "")
  const next = safeNext(formData.get("next"))
  if (!email || !email.includes("@")) return { ok: false, error: "Ingresa el mismo email del acceso." }
  if (!token || token.length < 6) return { ok: false, error: "Ingresa el código del correo." }

  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    })
    if (error) return { ok: false, error: error.message }
    if (!data.user) return { ok: false, error: "No se pudo validar el código." }

    await persistUserConsent(
      data.user.id,
      data.user.email ?? email,
      data.user.user_metadata as Record<string, unknown>,
    )
    await supabase.rpc("claim_team_membership")

    const { data: teamMember } = await supabase
      .from("team_members")
      .select("access_level")
      .eq("user_id", data.user.id)
      .maybeSingle()

    const redirectedTo = teamMember?.access_level === "superadmin" ? "/equipo" : next
    return { ok: true, redirectedTo }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "No fue posible validar el código.",
    }
  }
}
