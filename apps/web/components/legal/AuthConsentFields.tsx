"use client"

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

/**
 * Links legales usan <a> nativo (no next/link) para evitar prefetch RSC
 * que ensucia el network panel durante pruebas de submit, y para que un
 * click en el texto del enlace no compita con el toggle del checkbox.
 */
function LegalAnchor({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </a>
  )
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
        <label className="flex gap-2.5 items-start cursor-pointer" htmlFor="colab-consent-privacy-terms">
          <input
            id="colab-consent-privacy-terms"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#3D6B1E]"
            checked={accepted}
            onChange={(event) => {
              const value = event.target.checked
              onPrivacyChange(value)
              onTermsChange(value)
            }}
            name="privacy_terms_accepted"
            data-testid="auth-consent-checkbox"
            aria-required="true"
          />
          <span className={tone === "light" ? "text-colab-forest/70" : undefined}>
            He leído y acepto la{" "}
            <LegalAnchor href="/legal/privacidad" className={linkClass}>
              Política de Privacidad
            </LegalAnchor>
            , la{" "}
            <LegalAnchor href="/legal/tratamiento-datos" className={linkClass}>
              Política de Tratamiento de Datos
            </LegalAnchor>{" "}
            y los{" "}
            <LegalAnchor href="/legal/terminos" className={linkClass}>
              Términos de Uso
            </LegalAnchor>
            . Sin este opt-in no se crea la cuenta.{" "}
            <span className="opacity-70">(UE GDPR · EE.UU. CCPA/CPRA · CO Ley 1581)</span>
          </span>
        </label>
        <label className="flex gap-2.5 items-start cursor-pointer" htmlFor="colab-consent-marketing">
          <input
            id="colab-consent-marketing"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#3D6B1E]"
            checked={marketingOptIn}
            onChange={(event) => onMarketingChange(event.target.checked)}
            name="marketing_opt_in"
            data-testid="auth-marketing-checkbox"
          />
          <span className={tone === "light" ? "text-colab-forest/55" : undefined}>
            Quiero recibir correos de seguimiento educativo y nurturing del Colab (opcional; puedo
            retirarlo cuando quiera).{" "}
            <LegalAnchor href="/legal/cookies" className={linkClass}>
              Cookies
            </LegalAnchor>
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
