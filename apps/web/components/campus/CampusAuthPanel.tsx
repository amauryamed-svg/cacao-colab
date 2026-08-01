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
          Una sola identidad. Los permisos internos se asignan únicamente a emails mapeados en
          team_members.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 text-red-700 text-xs p-3">
          No fue posible completar ese acceso. Solicita un nuevo magic link.
        </p>
      )}

      <AuthConsentFields
        privacyAccepted={privacyAccepted}
        termsAccepted={termsAccepted}
        marketingOptIn={marketingOptIn}
        onPrivacyChange={setPrivacyAccepted}
        onTermsChange={setTermsAccepted}
        onMarketingChange={setMarketingOptIn}
      />

      {consentError && <p className="text-xs text-red-700">{consentError}</p>}

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
