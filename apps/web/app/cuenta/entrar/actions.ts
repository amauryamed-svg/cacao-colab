"use server"

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import {
  consentToUserMetadata,
  parseConsentForm,
  stashAuthConsentCookie,
} from "@/lib/legal/consent"

export type CampusAuthResult = { ok: true } | { ok: false; error: string }

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

export async function requestCampusMagicLink(formData: FormData): Promise<CampusAuthResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const next = safeNext(formData.get("next"))
  if (!email || !email.includes("@")) return { ok: false, error: "Ingresa un email válido." }

  const consent = parseConsentForm(formData)
  if ("error" in consent) return { ok: false, error: consent.error }

  try {
    await stashAuthConsentCookie(consent)
    const supabase = await createSupabaseServerClient()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
        shouldCreateUser: true,
        data: consentToUserMetadata(consent),
      },
    })
    return error ? { ok: false, error: error.message } : { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "No fue posible iniciar el acceso." }
  }
}
