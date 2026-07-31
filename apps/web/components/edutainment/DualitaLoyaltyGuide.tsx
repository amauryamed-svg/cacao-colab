"use client"

import { useState } from "react"
import Link from "next/link"

const paths = {
  aprender: {
    label: "Quiero aprender",
    response: "Empieza con Microlearning CAÚA o una misión Master Cacaotier. El XP mide competencia; cada misión verificada puede acreditar Mazorcas Doradas.",
    href: "/aprende",
    cta: "Abrir campus",
  },
  cuidar: {
    label: "Quiero Sembrar mi labranza",
    response: "Sembrar reconoce cuidado y bitácora con tope diario. Plántulas Ecoyuma, sombra, suelo, agua y cartografía pesan más que hacer clic sin criterio.",
    href: "/juega",
    cta: "Ir a la labranza",
  },
  marcas: {
    label: "Quiero explorar marcas",
    response: "Puedo comparar beneficios por marca, pero hoy ningún conector ecommerce está activo. Te mostraré estado y términos antes de cualquier redención.",
    href: "/marketplace",
    cta: "Ver nodos y marcas",
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
