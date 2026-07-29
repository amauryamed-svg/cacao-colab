"use client"

import { useState, useTransition } from "react"
import { requestCampusMagicLink } from "@/app/cuenta/entrar/actions"

export default function CampusLoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle")
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData()
    formData.set("email", email)
    formData.set("next", next)
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

  if (status === "sent") {
    return (
      <div className="campus-auth-message">
        <span>✦</span>
        <h2>Revisa tu correo</h2>
        <p>Enviamos un acceso sin contraseña a <strong>{email}</strong>.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-3">
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
      <button type="submit" disabled={pending} className="campus-auth-primary">
        {pending ? "Enviando…" : "Continuar con magic link →"}
      </button>
    </form>
  )
}
