"use client"

import { useEffect, useState } from "react"
import type { CelebrateKind } from "@/lib/campus-gamify"

const LABEL: Partial<Record<CelebrateKind, string>> = {
  correct: "¡Correcto!",
  mission: "¡Misión +XP!",
  levelup: "¡Subiste de nivel!",
  diploma: "¡Diploma desbloqueado!",
}

export default function CampusCelebrate({
  kind,
  token,
}: {
  kind: CelebrateKind | null
  token: number
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!kind || !token) return
    if (kind === "wrong" || kind === "heart") return
    setShow(true)
    const t = window.setTimeout(() => setShow(false), 1400)
    return () => window.clearTimeout(t)
  }, [kind, token])

  if (!show || !kind) return null
  const label = LABEL[kind] ?? "¡Bien!"

  return (
    <div className="campus-celebrate" aria-live="polite">
      <div className="campus-celebrate-burst" data-kind={kind}>
        {Array.from({ length: 18 }).map((_, i) => (
          <i key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>
      <strong className="campus-celebrate-label">{label}</strong>
    </div>
  )
}
