"use client"

import { useState } from "react"
import AuthConsentFields from "@/components/legal/AuthConsentFields"
import CampusLoginForm from "@/components/campus/CampusLoginForm"

export default function CampusAuthPanel({
  next,
  intent,
  error,
}: {
  next: string
  intent?: string
  error?: string
}) {
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [consentError, setConsentError] = useState("")

  return (
    <div className="space-y-5">
      <div>
        <p className="eyebrow text-colab-green">{intent === "team" ? "Acceso de builders" : "Crear cuenta o entrar"}</p>
        <h2 className="font-serif text-3xl font-bold text-colab-forest mt-2">
          {intent === "team" ? "Panel superadministrador" : "Continúa tu campaña"}
        </h2>
        <p className="text-xs text-colab-forest/50 mt-3">
          Acceso solo por correo (magic link / código). Sin Google ni Apple. Los permisos de{" "}
          <code>/equipo</code> se asignan únicamente a emails en <code>team_members</code>.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 text-red-700 text-xs p-3">
          No fue posible completar ese acceso. Pide un nuevo correo o usa el código OTP del mensaje
          en este navegador.
        </p>
      )}

      <AuthConsentFields
        privacyAccepted={privacyAccepted}
        termsAccepted={termsAccepted}
        marketingOptIn={marketingOptIn}
        onPrivacyChange={(value) => {
          setPrivacyAccepted(value)
          if (value) setConsentError("")
        }}
        onTermsChange={setTermsAccepted}
        onMarketingChange={setMarketingOptIn}
      />

      {consentError && (
        <p className="text-xs text-red-700" role="alert" data-testid="auth-consent-error">
          {consentError}
        </p>
      )}

      <CampusLoginForm
        next={next}
        privacyAccepted={privacyAccepted}
        termsAccepted={termsAccepted}
        marketingOptIn={marketingOptIn}
        onRequireConsent={() =>
          setConsentError("Marca la casilla de Privacidad y Términos para continuar.")
        }
      />
    </div>
  )
}
