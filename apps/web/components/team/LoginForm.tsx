"use client"

import { useState, useTransition } from "react"
import { requestMagicLink } from "@/app/equipo/login/actions"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData()
    formData.set("email", email)

    startTransition(async () => {
      const result = await requestMagicLink(formData)
      if (result.ok) {
        setStatus("sent")
        setErrorMsg(null)
      } else {
        setStatus("error")
        setErrorMsg(result.error)
      }
    })
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-colab-forest/10 bg-colab-cream px-6 py-8 text-center">
        <p className="font-sans text-sm text-colab-forest">
          Listo — revisa <strong>{email}</strong>. Te mandamos un link de acceso, sin contraseña.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <label className="flex flex-col gap-2 text-left">
        <span className="text-xs uppercase tracking-widest text-colab-forest/60 font-sans">
          Email del equipo
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="rounded-xl border border-colab-forest/15 px-4 py-3 font-sans text-sm outline-none focus:border-colab-yellow"
        />
      </label>

      {status === "error" && errorMsg && (
        <p className="text-xs text-red-600 font-sans">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-block font-bold text-sm font-sans rounded-full px-6 py-3 transition-all bg-colab-yellow text-colab-forest hover:bg-colab-amber disabled:opacity-50"
      >
        {isPending ? "Enviando…" : "Enviar link de acceso"}
      </button>

      <p className="text-[11px] text-colab-forest/45 font-sans">
        Solo para el equipo de Cacao Colab (Oscar, Hellen, Amaury). Login vía
        Supabase Auth — magic link, sin contraseña que gestionar.
      </p>
    </form>
  )
}
