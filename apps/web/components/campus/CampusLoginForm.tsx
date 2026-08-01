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
    // Importante: el botón NO se deshabilita por falta de consentimiento.
    // Si está disabled, un click (humano o automatizado) no dispara submit
    // ni POST — parece “roto”. En su lugar mostramos el error aquí.
    if (!ready) {
      onRequireConsent?.()
      setStatus("error")
      setError("Marca la casilla de Privacidad y Términos para continuar.")
      return
    }
    if (!email.includes("@")) {
      setStatus("error")
      setError("Ingresa un email válido.")
      return
    }
    const formData = new FormData()
    buildConsentFields(formData)
    startTransition(async () => {
      try {
        const result = await requestCampusMagicLink(formData)
        if (result.ok) {
          setStatus("sent")
          setError("")
        } else {
          setStatus("error")
          setError(result.error)
        }
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : "No fue posible enviar el acceso.")
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
      try {
        const result = await verifyCampusEmailOtp(formData)
        if (result.ok) {
          router.push(result.redirectedTo ?? next)
          router.refresh()
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "No fue posible validar el código.")
      }
    })
  }

  if (status === "sent") {
    return (
      <div className="space-y-4" data-testid="auth-magic-link-sent">
        <div className="campus-auth-message">
          <span>✦</span>
          <h2>Revisa tu correo</h2>
          <p>
            Enviamos un acceso sin contraseña a <strong>{email}</strong>. Abre el enlace en{" "}
            <em>este mismo navegador</em>, o escribe el código del mensaje aquí abajo.
          </p>
        </div>

        <form onSubmit={submitOtp} className="space-y-3" data-testid="auth-otp-form">
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
              data-testid="auth-otp-input"
            />
          </label>
          {error && <p className="text-xs text-red-700" data-testid="auth-error">{error}</p>}
          <button
            type="submit"
            disabled={pending || otp.trim().length < 6}
            className="campus-auth-primary"
            data-testid="auth-otp-submit"
          >
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
    <form onSubmit={submitMagicLink} className="space-y-3" data-testid="auth-magic-link-form">
      <label className="block">
        <span className="eyebrow text-colab-forest/45">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          className="campus-auth-input"
          data-testid="auth-email-input"
        />
      </label>
      {status === "error" && (
        <p className="text-xs text-red-700" data-testid="auth-error" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="campus-auth-primary"
        data-testid="auth-submit"
        aria-disabled={!ready || pending}
      >
        {pending ? "Enviando…" : ready ? "Enviar acceso por correo →" : "Acepta privacidad y envía →"}
      </button>
      {!ready && (
        <p className="campus-auth-footnote" data-testid="auth-consent-hint">
          Marca la casilla de Privacidad y Términos arriba para poder crear la cuenta.
        </p>
      )}
      <p className="campus-auth-footnote">
        Solo magic link por email. No usamos Google ni Apple para el registro.
      </p>
    </form>
  )
}
