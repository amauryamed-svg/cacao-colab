"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition, type FormEvent } from "react"

export default function ClaimNodeBioForm({ sessionEmail }: { sessionEmail: string }) {
  const router = useRouter()
  const [slug, setSlug] = useState("")
  const [creationEmail, setCreationEmail] = useState("")
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (pending) return
    startTransition(async () => {
      setError("")
      try {
        const res = await fetch("/api/cuenta/claim-node-bio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, creationEmail }),
        })
        const json = (await res.json()) as { ok: boolean; error?: string; sharePath?: string }
        if (!json.ok) {
          setError(json.error ?? "No se pudo vincular")
          return
        }
        router.refresh()
        if (json.sharePath) router.push("/cuenta/bio")
      } catch {
        setError("Error de red. Intenta de nuevo.")
      }
    })
  }

  return (
    <form className="cuenta-claim-bio" onSubmit={onSubmit}>
      <p className="cuenta-claim-bio-title">¿Ya publicaste tu nodo con otro correo?</p>
      <p className="cuenta-claim-bio-hint">
        Pega el enlace o slug (ej. <code>cacaotier-bogota-0ecm</code>) y el email del formulario
        original. Lo vinculamos a <strong>{sessionEmail}</strong>.
      </p>
      <label>
        Enlace o slug del nodo
        <input
          type="text"
          name="slug"
          autoComplete="off"
          placeholder="https://cacaocolab.org/nodo/…"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </label>
      <label>
        Email con el que publicaste
        <input
          type="email"
          name="creationEmail"
          autoComplete="email"
          placeholder="el correo del wizard de bio"
          value={creationEmail}
          onChange={(e) => setCreationEmail(e.target.value)}
          required
        />
      </label>
      {error && <p className="cuenta-claim-bio-error">{error}</p>}
      <button type="submit" className="cuenta-btn-ghost" disabled={pending}>
        {pending ? "Vinculando…" : "Vincular bio a esta cuenta →"}
      </button>
    </form>
  )
}
