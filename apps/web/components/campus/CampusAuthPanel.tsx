"use client"

import { useState, useTransition } from "react"
import AuthConsentFields, { consentIsReady } from "@/components/legal/AuthConsentFields"
import CampusLoginForm from "@/components/campus/CampusLoginForm"
import { signInWithApple, signInWithGoogle } from "@/app/cuenta/entrar/actions"

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
  const [pending, startTransition] = useTransition()
  const ready = consentIsReady(privacyAccepted, termsAccepted)

  function appendConsent(formData: FormData) {
    formData.set("privacy_accepted", privacyAccepted ? "true" : "false")
    formData.set("terms_accepted", termsAccepted ? "true" : "false")
    formData.set("marketing_opt_in", marketingOptIn ? "true" : "false")
    formData.set("consent_source", "cuenta_entrar")
  }

  function oauth(provider: "google" | "apple") {
    if (!ready) {
      setConsentError("Marca la casilla de Privacidad y Términos para continuar.")
      return
    }
    setConsentError("")
    const formData = new FormData()
    formData.set("next", next)
    appendConsent(formData)
    startTransition(async () => {
      if (provider === "google") await signInWithGoogle(formData)
      else await signInWithApple(formData)
    })
  }

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
          No fue posible completar ese acceso. Verifica que el proveedor esté habilitado en Supabase.
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

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="campus-oauth-button"
          disabled={!ready || pending}
          onClick={() => oauth("google")}
        >
          <strong>G</strong> Google
        </button>
        <button
          type="button"
          className="campus-oauth-button"
          disabled={!ready || pending}
          onClick={() => oauth("apple")}
        >
          <strong>●</strong> Apple
        </button>
      </div>

      <div className="auth-divider">
        <span>o usa tu email</span>
      </div>

      <CampusLoginForm
        next={next}
        privacyAccepted={privacyAccepted}
        termsAccepted={termsAccepted}
        marketingOptIn={marketingOptIn}
        onRequireConsent={() =>
          setConsentError("Marca la casilla de Privacidad y Términos para continuar.")
        }
      />

      <p className="text-[10px] leading-relaxed text-colab-forest/40">
        Google y Apple requieren habilitación del proveedor en Supabase. El portal privado de los
        tres builders conserva su magic link con el mismo opt-in legal.
      </p>
    </div>
  )
}
