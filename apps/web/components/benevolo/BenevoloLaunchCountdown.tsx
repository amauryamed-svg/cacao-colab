"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  BENEVOLO_LAUNCH_AT,
  pad2,
  remainingUntil,
  type CountdownParts,
} from "@/lib/benevolo-launch"

type Variant = "hero" | "strip"

const UNITS: { key: keyof Omit<CountdownParts, "arrived">; label: string }[] = [
  { key: "days", label: "días" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "seg" },
]

export default function BenevoloLaunchCountdown({ variant = "hero" }: { variant?: Variant }) {
  const [parts, setParts] = useState<CountdownParts | null>(null)

  useEffect(() => {
    const tick = () => setParts(remainingUntil(BENEVOLO_LAUNCH_AT.getTime(), Date.now()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const arrived = parts?.arrived ?? false

  if (variant === "strip") {
    return (
      <Link href="/benevolo/noviembre" className="benevolo-count-strip">
        <span className="benevolo-count-strip-kicker">Prelanzamiento</span>
        <strong>{arrived ? "Noviembre está aquí." : "Cuenta atrás a noviembre."}</strong>
        <span className="benevolo-count-strip-digits" aria-live="polite">
          {parts
            ? arrived
              ? "Preventa abierta"
              : `${parts.days}d ${pad2(parts.hours)}:${pad2(parts.minutes)}:${pad2(parts.seconds)}`
            : "noviembre 2026"}
        </span>
        <em>Infonegocios · @chocolate.benevolo</em>
      </Link>
    )
  }

  return (
    <div className="benevolo-count" role="timer" aria-label="Cuenta atrás al lanzamiento de noviembre">
      <p className="eyebrow text-[#FF6A3D]">Ventana publicada · noviembre 2026</p>
      <div className="benevolo-count-grid">
        {UNITS.map((unit) => (
          <div key={unit.key} className="benevolo-count-cell">
            <strong className="benevolo-count-digit">
              {parts ? (unit.key === "days" ? String(parts[unit.key]) : pad2(parts[unit.key])) : "—"}
            </strong>
            <span>{unit.label}</span>
          </div>
        ))}
      </div>
      <p className="benevolo-count-note">
        {arrived
          ? "La ventana de noviembre ya empezó. Preventa honesta: WhatsApp confirma el lote."
          : "No es un día de fábrica cerrado. Infonegocios Colombia situó el lanzamiento en noviembre."}
      </p>
    </div>
  )
}
