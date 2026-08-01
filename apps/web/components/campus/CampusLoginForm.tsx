"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  requestCampusMagicLink,
  verifyCampusEmailOtp,
} from "@/app/cuenta/entrar/actions"
import { consentIsReady } from "@/components/legal/AuthConsentFields"

export default function CampusLoginForm({
  next,
  privacyAccepted,
  termsAccepted,
  marketingOptIn,
  onRequireConsent,
}: {
  next: string
  privacyAccepted: boolean
  termsAccepted: boolean
  marketingOptIn: boolean
  onRequireConsent?: () => void
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle")
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()
  const ready = consentIsReady(privacyAccepted, termsAccepted)

  function buildConsentFields(formData: FormData) {
    formData.set("email", email)
    formData.set("next", next)
    formData.set("privacy_accepted", "true")
    formData.set("terms_accepted", "true")
    formData.set("marketing_opt_in", marketingOptIn ? "true" : "false")
    formData.set("consent_source", "cuenta_entrar")
  }

  function submitMagicLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) {
      onRequireConsent?.()
      setStatus("error")
      setError("Debes aceptar Privacidad y Términos para continuar.")
      return
    }
    const formData = new FormData()
    buildConsentFields(formData)
    startTransition(async () => {
      const result = await requestCampusMagicLink(formData)
      if (result.ok) {
        setStatus("sent")
        setError("")
      } else {
        setStatus("error")
        setError(result.error)
      }
    })
  }

  function submitOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData()
    formData.set("email", email)
    formData.set("token", otp)
    formData.set("next", next)
    startTransition(async () => {
      const result = await verifyCampusEmailOtp(formData)
      if (result.ok) {
        router.push(result.redirectedTo ?? next)
        router.refresh()
      } else {
        setError(result.error)
      }
    })
  }

  if (status === "sent") {
    return (
      <div className="space-y-4">
        <div className="campus-auth-message">
          <span>✦</span>
          <h2>Revisa tu correo</h2>
          <p>
            Enviamos un acceso sin contraseña a <strong>{email}</strong>. Abre el enlace en{" "}
            <em>este mismo navegador</em>, o escribe el código del mensaje aquí abajo.
          </p>
        </div>

        <form onSubmit={submitOtp} className="space-y-3">
          <label className="block">
            <span className="eyebrow text-colab-forest/45">Código del correo</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="12345678"
              className="campus-auth-input"
              required
            />
          </label>
          {error && <p className="text-xs text-red-700">{error}</p>}
          <button type="submit" disabled={pending || otp.trim().length < 6} className="campus-auth-primary">
            {pending ? "Validando…" : "Entrar con el código →"}
          </button>
        </form>

        <button
          type="button"
          className="campus-auth-secondary"
          disabled={pending}
          onClick={() => {
            setStatus("idle")
            setOtp("")
            setError("")
          }}
        >
          Usar otro email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submitMagicLink} className="space-y-3">
      <label className="block">
        <span className="eyebrow text-colab-forest/45">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          className="campus-auth-input"
        />
      </label>
      {status === "error" && <p className="text-xs text-red-700">{error}</p>}
      <button type="submit" disabled={pending || !ready} className="campus-auth-primary">
        {pending ? "Enviando…" : "Enviar acceso por correo →"}
      </button>
      <p className="campus-auth-footnote">
        Solo magic link por email. No usamos Google ni Apple para el registro.
      </p>
    </form>
  )
}
