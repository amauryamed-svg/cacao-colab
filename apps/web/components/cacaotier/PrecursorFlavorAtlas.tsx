"use client"

import { useEffect, useState, type CSSProperties } from "react"
import {
  inferiorBiomarkers,
  superiorBiomarkers,
  type SuperiorBiomarker,
} from "@/lib/cacaotier-course"

const CYCLE_MS = 4200

export default function PrecursorFlavorAtlas() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active: SuperiorBiomarker = superiorBiomarkers[index] ?? superiorBiomarkers[0]

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % superiorBiomarkers.length)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <section
      className="atlas-shell"
      aria-labelledby="atlas-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="atlas-header">
        <div>
          <p className="eyebrow text-colab-yellow">Atlas pedagógico · CoEx × Agrosavia Arauca × Master Cacaotier</p>
          <h2 id="atlas-title" className="display-title text-colab-cream mt-3">
            Del péptido<br /><em>al bouquet internacional.</em>
          </h2>
        </div>
        <p className="atlas-lede">
          Cada biomarcador precursor de Tc-pH (45 °C, pH espontáneo) abre una ventaja concreta de aroma y sabor.
          Así el cacao deja de ser commodity y entra en la mesa japonesa y europea de alta sibarita.
        </p>
      </div>

      <div className="atlas-stage" style={{ "--atlas-accent": active.accent } as CSSProperties}>
        <div className="atlas-orbit" aria-hidden>
          <span className="atlas-orbit-ring atlas-orbit-ring-a" />
          <span className="atlas-orbit-ring atlas-orbit-ring-b" />
          <span className="atlas-orbit-core">
            <strong>{active.id}</strong>
            <small>precursor</small>
          </span>
        </div>

        <div className="atlas-flow" key={active.id}>
          <div className="atlas-node atlas-node-peptide">
            <span className="atlas-node-label">01 · Péptido</span>
            <strong>{active.id}</strong>
            <small>{active.family}</small>
          </div>
          <div className="atlas-arrow" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="atlas-node atlas-node-volatile">
            <span className="atlas-node-label">02 · Volátiles</span>
            <ul>
              {active.volatiles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="atlas-arrow" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="atlas-node atlas-node-sensory">
            <span className="atlas-node-label">03 · Sabor & aroma</span>
            <ul className="atlas-sensory-tags">
              {active.sensory.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="atlas-market">
          <p className="eyebrow text-colab-yellow">Ventaja en taza · mercados de excelencia</p>
          <p className="atlas-market-copy">{active.marketEdge}</p>
          <p className="atlas-market-note">{active.note}</p>
          <div className="atlas-markets">
            <span>Japón · bean-to-bar</span>
            <span>Europa · alta gastronomía</span>
            <span>CoEx · fermentación controlada</span>
          </div>
        </aside>
      </div>

      <div className="atlas-peptide-rail" role="listbox" aria-label="Biomarcadores de calidad superior">
        {superiorBiomarkers.map((marker, i) => (
          <button
            key={marker.id}
            type="button"
            role="option"
            aria-selected={i === index}
            className={`atlas-peptide ${i === index ? "atlas-peptide-active" : ""}`}
            style={{ "--atlas-accent": marker.accent } as CSSProperties}
            onClick={() => {
              setIndex(i)
              setPaused(true)
            }}
          >
            <span className="atlas-peptide-id">{marker.id}</span>
            <span className="atlas-peptide-tag">{marker.sensory[0]}</span>
          </button>
        ))}
      </div>

      <div className="atlas-progress" aria-hidden>
        <div
          className={`atlas-progress-bar ${paused ? "is-paused" : ""}`}
          key={`${index}-${paused ? "p" : "r"}`}
          style={{ animationDuration: `${CYCLE_MS}ms` }}
        />
      </div>

      <div className="atlas-contrast">
        <div>
          <p className="eyebrow text-colab-cream/45">Si pierdes la ventana…</p>
          <h3 className="font-serif text-xl font-bold text-colab-cream mt-2">
            Biomarcadores de calidad inferior
          </h3>
          <p className="text-sm text-colab-cream/50 mt-2 leading-relaxed">
            Cajón 144–168 h o acidificación inicial forzada: amargor, astringencia y sabores extraños.
            El mercado premium los rechaza antes del primer bocado.
          </p>
        </div>
        <ul className="atlas-inferior">
          {inferiorBiomarkers.map((marker) => (
            <li key={marker.id}>
              <strong>{marker.id}</strong>
              <span>{marker.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
