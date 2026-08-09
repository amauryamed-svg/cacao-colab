"use client"

import { useEffect, useState } from "react"
import SquirrelSVG, { type SquirrelExpression } from "@/components/brand/SquirrelSVG"

const LINES = [
  "¡Hola! Soy Dualita. ¿Cocinamos tipicidad juntos?",
  "Restaurante, hotel o pastelería: el cacao habla si lo escuchas.",
  "En 3 minutos vemos si somos match. Yo ya estoy lista.",
  "Tipicidad > pose. Tócame otra vez.",
  "FEAR 5 en la cocina sabe a territorio, no a humo.",
  "Me encanta acompañarte. Una mazorca a la vez.",
]

type Props = {
  size?: number
  lines?: string[]
  className?: string
}

export default function DualitaMascot({
  size = 168,
  lines = LINES,
  className = "",
}: Props) {
  const [expr, setExpr] = useState<SquirrelExpression>("happy")
  const [lineIndex, setLineIndex] = useState(0)
  const [bounce, setBounce] = useState(false)
  const [heart, setHeart] = useState(false)
  const [spoken, setSpoken] = useState(false)

  useEffect(() => {
    const tick = window.setInterval(() => {
      if (bounce) return
      const roll = Math.random()
      const next: SquirrelExpression =
        roll < 0.3 ? "wink" : roll < 0.55 ? "curious" : roll < 0.8 ? "happy" : "proud"
      setExpr(next)
      window.setTimeout(() => setExpr("happy"), 1400)
    }, 4500)
    return () => window.clearInterval(tick)
  }, [bounce])

  function handleClick() {
    setBounce(true)
    setHeart(true)
    setSpoken(true)
    setLineIndex((i) => (i + 1) % lines.length)
    setExpr(lineIndex % 2 === 0 ? "wink" : "proud")
    window.setTimeout(() => setBounce(false), 480)
    window.setTimeout(() => {
      setHeart(false)
      setExpr("happy")
    }, 900)
  }

  const anim = [
    "dualita-mascot-squirrel",
    bounce ? "is-bounce" : "",
    expr === "wink" ? "is-wink" : "",
    expr === "curious" ? "is-peek" : "",
    expr === "proud" ? "is-celebrate" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={`dualita-mascot ${className}`.trim()}>
      <div
        className={`dualita-mascot-bubble${spoken ? " is-spoken" : ""}`}
        key={spoken ? lines[lineIndex] : "hello"}
      >
        <span className="dualita-mascot-bubble-name">Dualita</span>
        {spoken ? lines[lineIndex] : "Tócame — tengo algo que contarte"}
        <span className="dualita-mascot-bubble-tail" aria-hidden />
      </div>

      {heart && <span className="dualita-mascot-heart" aria-hidden />}

      <button type="button" className={anim} onClick={handleClick} aria-label="Hablar con Dualita">
        <SquirrelSVG size={size} expression={expr} />
        <span className="dualita-mascot-name">Dualita</span>
      </button>
    </div>
  )
}
