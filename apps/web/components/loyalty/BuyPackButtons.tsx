"use client"

import { useState, useTransition } from "react"
import { formatCop } from "@/lib/loyalty"

type Pack = {
  slug: string
  name: string
  md: number
  priceCop: number
  blurb: string
}

export default function BuyPackButtons({ packs }: { packs: readonly Pack[] }) {
  const [pendingSlug, setPendingSlug] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function buy(slug: string) {
    setMessage(null)
    setPendingSlug(slug)
    startTransition(async () => {
      try {
        const res = await fetch("/api/loyalty/packs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packSlug: slug }),
        })
        const data = await res.json()
        if (!res.ok || !data.ok) {
          setMessage(
            data.message ??
              (data.error === "migracion_pendiente"
                ? "Oscar debe aplicar la migración de economía MD."
                : data.error ?? "No se pudo registrar el pack."),
          )
          return
        }
        setMessage(
          `Intención ${data.intent.pack_slug} creada (${data.intent.md_amount} MD). Checkout Stripe pendiente de activación.`,
        )
      } catch {
        setMessage("Error de red al registrar el pack.")
      } finally {
        setPendingSlug(null)
      }
    })
  }

  return (
    <section className="md-packs">
      <div className="md-packs-head">
        <p className="eyebrow text-colab-yellow">Comprar Mazorcas Doradas</p>
        <h2>Packs para acceder a servicios</h2>
        <p>
          Las MD compradas suman saldo para canjes, <strong>no suben tu rango</strong>. El rango solo
          reconoce productividad propia. El cobro real espera Stripe (docs/08 y 26).
        </p>
      </div>
      <div className="md-packs-grid">
        {packs.map((pack) => (
          <article key={pack.slug}>
            <span className="md-pack-name">{pack.name}</span>
            <strong>{pack.md} MD</strong>
            <small>{formatCop(pack.priceCop)}</small>
            <p>{pack.blurb}</p>
            <button
              type="button"
              disabled={isPending}
              onClick={() => buy(pack.slug)}
            >
              {pendingSlug === pack.slug ? "Registrando…" : "Solicitar pack"}
            </button>
          </article>
        ))}
      </div>
      {message && <p className="md-packs-msg">{message}</p>}
    </section>
  )
}
