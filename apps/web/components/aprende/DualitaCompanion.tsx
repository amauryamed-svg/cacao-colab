"use client"

import { useEffect, useState } from "react"
import SquirrelSVG from "@/components/brand/SquirrelSVG"

export type DualitaMood = "idle" | "cheer" | "oops" | "levelup"

interface Props {
  message: string
  tips?: string[]
  mood?: DualitaMood
  pulseKey?: number
}

export default function DualitaCompanion({
  message,
  tips = [],
  mood = "idle",
  pulseKey = 0,
}: Props) {
  const [tipIndex, setTipIndex] = useState<number | null>(null)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    if (!pulseKey) return
    setBounce(true)
    setTipIndex(null)
    const t = window.setTimeout(() => setBounce(false), 500)
    return () => window.clearTimeout(t)
  }, [pulseKey, mood])

  function handleClick() {
    if (tips.length === 0) return
    setBounce(true)
    setTipIndex((i) => {
      const next = i === null ? 0 : (i + 1) % tips.length
      return next
    })
    setTimeout(() => setBounce(false), 400)
  }

  const displayed = tipIndex !== null && tips.length > 0 ? tips[tipIndex] : message
  const bubbleClass =
    mood === "cheer" || mood === "levelup"
      ? "dualita-bubble dualita-bubble--cheer"
      : mood === "oops"
        ? "dualita-bubble dualita-bubble--oops"
        : "dualita-bubble"

  return (
    <div className="dualita-companion">
      <div className={bubbleClass} key={`${pulseKey}-${displayed.slice(0, 24)}`}>
        {displayed}
        {tips.length > 0 && (
          <span className="dualita-tip-hint">Toca a Dualita para más tips →</span>
        )}
      </div>

      <button
        type="button"
        onClick={handleClick}
        aria-label="Tip de Dualita"
        className={`dualita-squirrel ${bounce ? "is-bounce" : ""} mood-${mood}`}
      >
        <SquirrelSVG size={72} />
      </button>
    </div>
  )
}
