"use client"

import { useState } from "react"
import {
  fineFlavorSpokes,
  fineFlavorWheelMeta,
  type WheelSpoke,
} from "@/lib/fine-flavor-wheel"

function spokeColor(spoke: WheelSpoke, active: boolean) {
  if (spoke.ring === "defect") return active ? "#c45c3e" : "rgba(196,92,62,.55)"
  if (spoke.ring === "bridge") return active ? "#86B66B" : "rgba(134,182,107,.55)"
  const a = active ? 0.92 : 0.55
  return `hsla(${spoke.hue}, 55%, 42%, ${a})`
}

export default function FineFlavorWheel() {
  const [activeId, setActiveId] = useState(fineFlavorSpokes[0]?.id ?? "cacao")
  const active = fineFlavorSpokes.find((s) => s.id === activeId) ?? fineFlavorSpokes[0]
  const n = fineFlavorSpokes.length
  const gradient = fineFlavorSpokes
    .map((spoke, i) => {
      const start = (i / n) * 360
      const end = ((i + 1) / n) * 360
      const color = spokeColor(spoke, spoke.id === activeId)
      return `${color} ${start}deg ${end}deg`
    })
    .join(", ")

  return (
    <div className="ff-wheel">
      <div className="ff-wheel-visual">
        <button
          type="button"
          className="ff-wheel-disc"
          style={{ background: `conic-gradient(${gradient})` }}
          aria-label="Rueda Fine-Flavor Colab"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            let deg = (Math.atan2(y, x) * 180) / Math.PI + 90
            if (deg < 0) deg += 360
            const idx = Math.min(n - 1, Math.floor((deg / 360) * n))
            setActiveId(fineFlavorSpokes[idx].id)
          }}
        />
        <div className="ff-wheel-hub">
          <span>Fine-Flavor</span>
          <strong>Colab</strong>
        </div>
      </div>
      <div className="ff-wheel-detail">
        <p className="eyebrow">{fineFlavorWheelMeta.eyebrow}</p>
        <h3>{active.label}</h3>
        <p className="ff-wheel-ring">{active.ring}</p>
        <ul>
          {active.descriptors.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <p>
          <strong>Eco CoEx:</strong> {active.coexEcho}
        </p>
        <p>
          <strong>Eco Callebaut:</strong> {active.callebautEcho}
        </p>
        <div className="ff-wheel-chips">
          {fineFlavorSpokes.map((spoke) => (
            <button
              key={spoke.id}
              type="button"
              className={spoke.id === activeId ? "is-active" : ""}
              onClick={() => setActiveId(spoke.id)}
            >
              {spoke.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
