"use client"

import { useState } from "react"
import Link from "next/link"

const paths = {
  aprender: {
    label: "Quiero aprender",
    response: "Empieza con Microlearning CAÚA o una misión Master Cacaotier. El XP mide competencia y apalanca tu bono scorecard; las MD se acreditan por montos declarados, no convirtiendo XP.",
    href: "/aprende",
    cta: "Abrir campus",
  },
  cuidar: {
    label: "Quiero Sembrar mi labranza",
    response: "Sembrar reconoce cuidado y bitácora con tope diario. Equilibra cuidado con aprendizaje: el scorecard semanal premia productividad propia, no reclutamiento.",
    href: "/juega",
    cta: "Ir a la labranza",
  },
  canjear: {
    label: "Quiero canjear cursos",
    response: "Con saldo MD puedes canjear aceleraciones y previews Colab activos. También puedes solicitar packs de compra; no suben el rango. Marcas externas siguen planeadas.",
    href: "/cuenta/mazorcas",
    cta: "Abrir wallet MD",
  },
  marcas: {
    label: "Quiero explorar marcas",
    response: "Puedo comparar beneficios por marca. Los sinks Colab digitales ya pueden canjearse; conectores ecommerce de marca siguen inactivos hasta acuerdo.",
    href: "/marketplace/beneficios",
    cta: "Ver catálogo MD",
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
