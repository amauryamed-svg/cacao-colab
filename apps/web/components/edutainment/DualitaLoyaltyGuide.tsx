"use client"

import { useState } from "react"
import Link from "next/link"

const paths = {
  aprender: {
    label: "Quiero aprender",
    response:
      "Empieza por Dualita: micro CAÚA + MOOC Zurych. Esas MD históricas suben tu rango y abren Masters (Arquitecto = Brote; Chocolatier/Benevolo = Labrador). No canjees saldo por acceso.",
    href: "/aprende",
    cta: "Abrir Dualita",
  },
  cuidar: {
    label: "Quiero Sembrar mi labranza",
    response:
      "Sembrar da MD por cuidado y cosecha (con topes). Junto a Dualita construyes el rango que abre Masters. El scorecard premia productividad propia, no reclutamiento.",
    href: "/juega",
    cta: "Ir a la labranza",
  },
  canjear: {
    label: "Quiero canjear mentoría",
    response:
      "Los Masters no se compran. El catálogo activo es para sinks reales (p. ej. mentoría Dualita). Cultiva rango en Sembrar + Dualita; el saldo paga mentoría, no la llave del campus.",
    href: "/marketplace/beneficios",
    cta: "Ver catálogo MD",
  },
  marcas: {
    label: "Quiero ver mi rango",
    response:
      "Tu rango mira MD históricas (no packs). Abre wallet y cuenta: ahí ves qué Master ya puedes empezar.",
    href: "/cuenta/mazorcas",
    cta: "Abrir wallet MD",
  },
} as const

export default function DualitaLoyaltyGuide() {
  const [selected, setSelected] = useState<keyof typeof paths>("aprender")
  const path = paths[selected]

  return (
    <section className="dualita-agent-card">
      <div className="dualita-agent-avatar">D</div>
      <div className="dualita-agent-copy">
        <p className="eyebrow text-colab-green">Agente Dualita · guía beta</p>
        <h2>¿Qué quieres cultivar hoy?</h2>
        <div className="dualita-agent-actions">
          {(Object.keys(paths) as Array<keyof typeof paths>).map((key) => (
            <button key={key} type="button" onClick={() => setSelected(key)} className={selected === key ? "active" : ""}>
              {paths[key].label}
            </button>
          ))}
        </div>
        <p className="dualita-agent-response">{path.response}</p>
        <Link href={path.href}>{path.cta} →</Link>
      </div>
      <aside>
        <strong>Privacidad</strong>
        <p>Esta guía beta no solicita datos sensibles ni ejecuta compras. Las futuras recomendaciones usarán consentimiento y mínima información necesaria.</p>
      </aside>
    </section>
  )
}
