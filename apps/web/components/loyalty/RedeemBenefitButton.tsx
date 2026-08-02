"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  catalogItemId: string | null
  redeemable: boolean
  cost: number
  title: string
  /** Si el usuario ya no cumple rango, mostramos aviso antes de intentar. */
  rankBlockedHint?: string | null
}

const errorCopy: Record<string, string> = {
  auth_required: "Entra a tu cuenta para canjear.",
  saldo_insuficiente: "Saldo insuficiente de Mazorcas Doradas.",
  rango_insuficiente: "Tu rango aún no alcanza este beneficio.",
  conector_inactivo: "El canje todavía no está activo.",
  beneficio_inactivo: "Este beneficio no está activo.",
  limite_por_usuario: "Ya alcanzaste el límite de canjes.",
  sin_stock: "Sin cupos disponibles.",
  canje_duplicado: "Este canje ya se registró.",
  catalogItemId_requerido: "Beneficio no disponible en base aún.",
}

function formatRankError(data: {
  rankName?: string
  requiredName?: string
  lifetime?: number
  requiredThreshold?: number | null
  balance?: number
}): string {
  const rankName = data.rankName ?? "tu rango actual"
  const requiredName = data.requiredName ?? "el rango pedido"
  const lifetime = typeof data.lifetime === "number" ? data.lifetime : null
  const threshold = typeof data.requiredThreshold === "number" ? data.requiredThreshold : null
  const balance = typeof data.balance === "number" ? data.balance : null

  const parts = [
    `El canje mira tu rango (MD históricas), no solo el saldo.`,
    `Tu rango: ${rankName}${lifetime !== null ? ` · ${lifetime.toLocaleString("es-CO")} MD históricas` : ""}.`,
    `Necesitas: ${requiredName}${threshold !== null ? ` (${threshold.toLocaleString("es-CO")} MD históricas)` : ""}.`,
  ]
  if (balance !== null) {
    parts.push(`Saldo actual: ${balance.toLocaleString("es-CO")} MD (sirve para pagar el costo, no para subir de rango).`)
  }
  return parts.join(" ")
}

export default function RedeemBenefitButton({
  catalogItemId,
  redeemable,
  cost,
  title,
  rankBlockedHint = null,
}: Props) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<string | null>(rankBlockedHint)
  const [isError, setIsError] = useState(Boolean(rankBlockedHint))

  async function onRedeem() {
    if (!catalogItemId || !redeemable || pending) return
    setPending(true)
    setMessage(null)
    setIsError(false)
    try {
      const res = await fetch("/api/loyalty/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catalogItemId }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setIsError(true)
        if (data.error === "rango_insuficiente") {
          setMessage(formatRankError(data))
        } else {
          setMessage(errorCopy[data.error] ?? data.error ?? "No se pudo canjear.")
        }
        return
      }
      setIsError(false)
      setMessage(`Canjeado: ${title} (−${cost} MD).`)
      router.refresh()
    } catch {
      setIsError(true)
      setMessage("Error de red al canjear.")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="benefit-redeem">
      <button type="button" disabled={!redeemable || !catalogItemId || pending} onClick={onRedeem}>
        {pending ? "Canjeando…" : redeemable && catalogItemId ? `Canjear · ${cost} MD` : "Canje aún no disponible"}
      </button>
      {message && (
        <p className={isError ? "benefit-redeem-msg is-error" : "benefit-redeem-msg"}>{message}</p>
      )}
    </div>
  )
}
