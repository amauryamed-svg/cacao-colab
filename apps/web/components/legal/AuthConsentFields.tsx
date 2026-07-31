"use client"

import Link from "next/link"

type Props = {
  privacyAccepted: boolean
  termsAccepted: boolean
  marketingOptIn: boolean
  onPrivacyChange: (value: boolean) => void
  onTermsChange: (value: boolean) => void
  onMarketingChange: (value: boolean) => void
  /** Una sola casilla combina privacidad+términos (recomendado UX). */
  combined?: boolean
  tone?: "light" | "dark"
}

export default function AuthConsentFields({
  privacyAccepted,
  termsAccepted,
  marketingOptIn,
  onPrivacyChange,
  onTermsChange,
  onMarketingChange,
  combined = true,
  tone = "light",
}: Props) {
  const text = tone === "dark" ? "rgba(247,241,238,.55)" : undefined
  const linkClass = tone === "dark" ? "text-colab-yellow underline" : "text-colab-green underline"

  if (combined) {
    const accepted = privacyAccepted && termsAccepted
    return (
      <div className="space-y-3 text-[11px] leading-relaxed" style={text ? { color: text } : undefined}>
        <label className="flex gap-2.5 items-start cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 accent-[#3D6B1E]"
            checked={accepted}
            onChange={(event) => {
              const value = event.target.checked
              onPrivacyChange(value)
              onTermsChange(value)
            }}
            required
            name="privacy_terms_accepted"
          />
          <span className={tone === "light" ? "text-colab-forest/70" : undefined}>
            He leído y acepto la{" "}
            <Link href="/legal/privacidad" target="_blank" className={linkClass}>
              Política de Privacidad
            </Link>
            , la{" "}
            <Link href="/legal/tratamiento-datos" target="_blank" className={linkClass}>
              Política de Tratamiento de Datos
            </Link>{" "}
            y los{" "}
            <Link href="/legal/terminos" target="_blank" className={linkClass}>
              Términos de Uso
            </Link>
            . Sin este opt-in no se crea la cuenta.{" "}
            <span className="opacity-70">(UE GDPR · EE.UU. CCPA/CPRA · CO Ley 1581)</span>
          </span>
        </label>
        <label className="flex gap-2.5 items-start cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 accent-[#3D6B1E]"
            checked={marketingOptIn}
            onChange={(event) => onMarketingChange(event.target.checked)}
            name="marketing_opt_in"
          />
          <span className={tone === "light" ? "text-colab-forest/55" : undefined}>
            Quiero recibir correos de seguimiento educativo y nurturing del Colab (opcional; puedo
            retirarlo cuando quiera).{" "}
            <Link href="/legal/cookies" target="_blank" className={linkClass}>
              Cookies
            </Link>
          </span>
        </label>
      </div>
    )
  }

  return null
}

export function consentIsReady(privacyAccepted: boolean, termsAccepted: boolean) {
  return privacyAccepted && termsAccepted
}
