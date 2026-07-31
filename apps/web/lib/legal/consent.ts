import "server-only"
import { cookies } from "next/headers"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import {
  CONSENT_COOKIE,
  LEGAL_POLICY_VERSION,
  TERMS_VERSION,
} from "@/lib/legal/versions"

export type AuthConsentPayload = {
  privacyAccepted: boolean
  termsAccepted: boolean
  marketingOptIn: boolean
  policyVersion: string
  termsVersion: string
  source: string
  at: string
}

export function parseConsentForm(formData: FormData): AuthConsentPayload | { error: string } {
  const privacy = formData.get("privacy_accepted") === "on" || formData.get("privacy_accepted") === "true"
  const terms = formData.get("terms_accepted") === "on" || formData.get("terms_accepted") === "true"
  const marketing =
    formData.get("marketing_opt_in") === "on" || formData.get("marketing_opt_in") === "true"
  if (!privacy || !terms) {
    return {
      error:
        "Debes aceptar la Política de Privacidad y los Términos de Uso para crear o acceder a tu cuenta.",
    }
  }
  return {
    privacyAccepted: true,
    termsAccepted: true,
    marketingOptIn: marketing,
    policyVersion: LEGAL_POLICY_VERSION,
    termsVersion: TERMS_VERSION,
    source: String(formData.get("consent_source") ?? "cuenta_entrar"),
    at: new Date().toISOString(),
  }
}

export function consentToUserMetadata(consent: AuthConsentPayload) {
  return {
    privacy_accepted: true,
    terms_accepted: true,
    marketing_opt_in: consent.marketingOptIn,
    privacy_policy_version: consent.policyVersion,
    terms_version: consent.termsVersion,
    consent_source: consent.source,
    consent_at: consent.at,
  }
}

export async function stashAuthConsentCookie(consent: AuthConsentPayload) {
  const jar = await cookies()
  jar.set(CONSENT_COOKIE, JSON.stringify(consent), {
    path: "/",
    maxAge: 60 * 60,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })
}

export async function readStashedAuthConsent(): Promise<AuthConsentPayload | null> {
  const jar = await cookies()
  const raw = jar.get(CONSENT_COOKIE)?.value
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as AuthConsentPayload
    if (!parsed.privacyAccepted || !parsed.termsAccepted) return null
    return parsed
  } catch {
    return null
  }
}

export async function clearStashedAuthConsent() {
  const jar = await cookies()
  jar.delete(CONSENT_COOKIE)
}

function consentFromUserMetadata(meta: Record<string, unknown> | undefined): AuthConsentPayload | null {
  if (!meta) return null
  const privacy = meta.privacy_accepted === true || meta.privacy_accepted === "true"
  const terms = meta.terms_accepted === true || meta.terms_accepted === "true"
  if (!privacy || !terms) return null
  return {
    privacyAccepted: true,
    termsAccepted: true,
    marketingOptIn: meta.marketing_opt_in === true || meta.marketing_opt_in === "true",
    policyVersion: typeof meta.privacy_policy_version === "string" ? meta.privacy_policy_version : LEGAL_POLICY_VERSION,
    termsVersion: typeof meta.terms_version === "string" ? meta.terms_version : TERMS_VERSION,
    source: typeof meta.consent_source === "string" ? meta.consent_source : "user_metadata",
    at: typeof meta.consent_at === "string" ? meta.consent_at : new Date().toISOString(),
  }
}

/**
 * Persiste consentimiento en profiles + privacy_consents tras auth.
 * Idempotente; no bloquea el login si falla.
 */
export async function persistUserConsent(userId: string, email: string, meta?: Record<string, unknown>) {
  try {
    const fromMeta = consentFromUserMetadata(meta)
    const fromCookie = await readStashedAuthConsent()
    const consent = fromMeta ?? fromCookie
    if (!consent) return { ok: false as const, reason: "no_consent" }

    const supabase = await createSupabaseServerClient()
    const now = consent.at || new Date().toISOString()

    await supabase
      .from("profiles")
      .update({
        privacy_accepted_at: now,
        terms_accepted_at: now,
        privacy_policy_version: consent.policyVersion,
        terms_version: consent.termsVersion,
        marketing_opt_in: consent.marketingOptIn,
        marketing_opt_in_at: consent.marketingOptIn ? now : null,
      })
      .eq("id", userId)

    await supabase.from("privacy_consents").insert([
      {
        profile_id: userId,
        email,
        event: "accepted_privacy_terms",
        policy_version: consent.policyVersion,
        source: consent.source,
        metadata: {
          terms_version: consent.termsVersion,
          marketing_opt_in: consent.marketingOptIn,
          at: now,
        },
      },
      ...(consent.marketingOptIn
        ? [
            {
              profile_id: userId,
              email,
              event: "marketing_opt_in",
              policy_version: consent.policyVersion,
              source: consent.source,
              metadata: { at: now },
            },
          ]
        : []),
    ])

    await clearStashedAuthConsent()
    return { ok: true as const }
  } catch {
    return { ok: false as const, reason: "persist_failed" }
  }
}
