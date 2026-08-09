"use client"

import { useEffect, useState } from "react"
import SquirrelSVG, { type SquirrelExpression } from "@/components/brand/SquirrelSVG"
import { isSfxMuted, playDualitaSfx, toggleSfxMuted } from "@/lib/campus-gamify"

export type DualitaMood = "idle" | "cheer" | "oops" | "levelup"

const PLAYFUL_LINES = [
  "Estoy aquí contigo. Una mazorca a la vez.",
  "Si dudas, elige lo que podrías explicar a otro productor.",
  "Tipicidad > pose. Dualita lo celebra.",
  "Una pista más y me debes un cacao FEAR 5.",
  "Respira. El criterio limpio sabe mejor.",
  "¡Ey! Tócame otra vez — me gusta acompañarte.",
]

function stripDualitaPrefix(text: string) {
  return text.replace(/^\s*Dualita\s*:\s*/i, "").trim()
}

function moodToExpression(mood: DualitaMood, idle: SquirrelExpression): SquirrelExpression {
  if (mood === "cheer") return "happy"
  if (mood === "oops") return "oops"
  if (mood === "levelup") return "proud"
  return idle
}

function moodToAnim(mood: DualitaMood, bounce: boolean, idle: SquirrelExpression): string {
  const parts = ["dualita-squirrel", `mood-${mood}`]
  if (bounce) {
    if (mood === "oops") parts.push("is-shake")
    else if (mood === "levelup") parts.push("is-celebrate")
    else parts.push("is-bounce")
  } else if (idle === "wink") {
    parts.push("is-wink")
  } else if (idle === "curious") {
    parts.push("is-peek")
  }
  return parts.join(" ")
}

interface Props {
  message: string
  tips?: string[]
  mood?: DualitaMood
  pulseKey?: number
  /** Compact = solo ardilla hasta que toquen o haya reacción */
  compact?: boolean
}

export default function DualitaCompanion({
  message,
  tips = [],
  mood = "idle",
  pulseKey = 0,
  compact = false,
}: Props) {
  const cleanMessage = stripDualitaPrefix(message)
  const [tipIndex, setTipIndex] = useState<number | null>(null)
  const [bounce, setBounce] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [expanded, setExpanded] = useState(!compact)
  const [idleExpr, setIdleExpr] = useState<SquirrelExpression>("neutral")
  const [playful, setPlayful] = useState<string | null>(null)
  const [heartPop, setHeartPop] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    setMuted(isSfxMuted())
    const onMute = (event: Event) => {
      const detail = (event as CustomEvent<boolean>).detail
      setMuted(Boolean(detail))
    }
    window.addEventListener("dualita-sfx-mute", onMute)
    return () => window.removeEventListener("dualita-sfx-mute", onMute)
  }, [])

  useEffect(() => {
    if (!pulseKey) return
    setBounce(true)
    setTipIndex(null)
    setPlayful(null)
    setExpanded(true)
    const t = window.setTimeout(() => setBounce(false), mood === "levelup" ? 900 : 520)
    return () => window.clearTimeout(t)
  }, [pulseKey, mood])

  // Cuando el mensaje externo cambia (Sembrar / lección), Dualita “habla”
  useEffect(() => {
    setTipIndex(null)
    setPlayful(null)
    if (compact) setExpanded(true)
  }, [cleanMessage, compact])

  // Idle personality — microgestos entrañables
  useEffect(() => {
    if (mood !== "idle") {
      setIdleExpr("neutral")
      return
    }
    const tick = window.setInterval(() => {
      const roll = Math.random()
      if (roll < 0.35) setIdleExpr("wink")
      else if (roll < 0.55) setIdleExpr("curious")
      else if (roll < 0.7) setIdleExpr("happy")
      else setIdleExpr("neutral")
      window.setTimeout(() => setIdleExpr("neutral"), 1200)
    }, 7000)
    return () => window.clearInterval(tick)
  }, [mood])

  function handleClick() {
    playDualitaSfx("tap")
    window.setTimeout(() => playDualitaSfx("tip"), 90)
    setBounce(true)
    setExpanded(true)
    setHeartPop(true)
    setClicks((n) => n + 1)
    const pool = tips.length > 0 ? tips : PLAYFUL_LINES
    setTipIndex((i) => {
      const next = i === null ? 0 : (i + 1) % pool.length
      return next
    })
    if (tips.length === 0) {
      setPlayful(PLAYFUL_LINES[(clicks + 1) % PLAYFUL_LINES.length])
    } else {
      setPlayful(null)
    }
    if (mood === "idle") setIdleExpr(clicks % 2 === 0 ? "wink" : "happy")
    window.setTimeout(() => setBounce(false), 420)
    window.setTimeout(() => setHeartPop(false), 700)
  }

  function handleMute(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    const next = toggleSfxMuted()
    setMuted(next)
    if (!next) playDualitaSfx("select")
  }

  const pool = tips.length > 0 ? tips : PLAYFUL_LINES
  const displayed =
    tipIndex !== null
      ? (playful ?? pool[tipIndex] ?? cleanMessage)
      : cleanMessage

  const expression = moodToExpression(mood, idleExpr)
  const bubbleClass =
    mood === "cheer" || mood === "levelup"
      ? "dualita-bubble dualita-bubble--cheer"
      : mood === "oops"
        ? "dualita-bubble dualita-bubble--oops"
        : "dualita-bubble"

  const showBubble = expanded || mood !== "idle" || tipIndex !== null

  return (
    <div className={`dualita-companion${compact ? " is-compact" : ""}${showBubble ? " is-open" : ""}`}>
      {showBubble && (
        <div className={bubbleClass} key={`${pulseKey}-${mood}-${displayed.slice(0, 28)}`}>
          <span className="dualita-bubble-name">Dualita</span>
          {displayed}
          <span className="dualita-tip-hint">
            {tips.length > 0
              ? "Toca a Dualita para más tips →"
              : "Toca a Dualita — le encanta acompañarte →"}
          </span>
          <span className="dualita-bubble-tail" aria-hidden />
        </div>
      )}

      {(mood === "cheer" || mood === "levelup") && bounce && (
        <div className="dualita-sparkles" aria-hidden>
          <i />
          <i />
          <i />
        </div>
      )}

      {heartPop && <span className="dualita-heart-pop" aria-hidden />}

      <div className="dualita-squirrel-wrap">
        <button
          type="button"
          onClick={handleClick}
          aria-label="Hablar con Dualita"
          className={moodToAnim(mood, bounce, idleExpr)}
        >
          <SquirrelSVG size={compact && !showBubble ? 64 : 78} expression={expression} />
          <span className="dualita-nameplate">Dualita</span>
        </button>
        <button
          type="button"
          className={`dualita-sfx-toggle${muted ? " is-muted" : ""}`}
          onClick={handleMute}
          aria-label={muted ? "Activar sonidos de Dualita" : "Silenciar sonidos de Dualita"}
          title={muted ? "Sonido off" : "Sonido on"}
        >
          <span className="dualita-sfx-icon" aria-hidden />
        </button>
      </div>
    </div>
  )
}
