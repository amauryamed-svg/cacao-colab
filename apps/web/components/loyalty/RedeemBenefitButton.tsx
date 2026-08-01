"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  catalogItemId: string | null
  redeemable: boolean
  cost: number
  title: string
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

export default function RedeemBenefitButton({ catalogItemId, redeemable, cost, title }: Props) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onRedeem() {
    if (!catalogItemId || !redeemable || pending) return
    setPending(true)
    setMessage(null)
    try {
      const res = await fetch("/api/loyalty/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catalogItemId }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setMessage(errorCopy[data.error] ?? data.error ?? "No se pudo canjear.")
        return
      }
      setMessage(`Canjeado: ${title} (−${cost} MD).`)
      router.refresh()
    } catch {
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
      {message && <p className="benefit-redeem-msg">{message}</p>}
    </div>
  )
}
