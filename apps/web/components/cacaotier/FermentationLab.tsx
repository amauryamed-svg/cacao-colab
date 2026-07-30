"use client"

import { useMemo, useState } from "react"
import {
  fermentationHours,
  fermentationMethods,
  inferiorBiomarkers,
  resolvePrecursorStage,
  superiorBiomarkers,
  type FermentationMethod,
} from "@/lib/cacaotier-course"

const chartWidth = 720
const chartHeight = 250
const pad = { x: 42, y: 24 }

function points(values: number[], min: number, max: number) {
  const usableWidth = chartWidth - pad.x * 2
  const usableHeight = chartHeight - pad.y * 2
  return values
    .map((value, index) => {
      const x = pad.x + (index / (fermentationHours.length - 1)) * usableWidth
      const y = pad.y + ((max - value) / (max - min)) * usableHeight
      return `${x},${y}`
    })
    .join(" ")
}

function CurveChart({
  metric,
  selected,
}: {
  metric: "temperature" | "ph"
  selected: FermentationMethod["id"]
}) {
  const isTemperature = metric === "temperature"
  const min = isTemperature ? 20 : 4
  const max = isTemperature ? 50 : 7
  const ticks = isTemperature ? [20, 30, 40, 50] : [4, 5, 6, 7]

  return (
    <div className="overflow-x-auto" aria-label={`Curvas comparativas de ${isTemperature ? "temperatura" : "pH"}`}>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="min-w-[620px] w-full" role="img">
        {ticks.map((tick) => {
          const y = pad.y + ((max - tick) / (max - min)) * (chartHeight - pad.y * 2)
          return (
            <g key={tick}>
              <line x1={pad.x} x2={chartWidth - pad.x} y1={y} y2={y} stroke="rgba(247,241,238,.12)" />
              <text x={pad.x - 10} y={y + 4} textAnchor="end" fill="rgba(247,241,238,.45)" fontSize="11">
                {tick}{isTemperature ? "°" : ""}
              </text>
            </g>
          )
        })}
        {fermentationHours.map((hour, index) => {
          const x = pad.x + (index / (fermentationHours.length - 1)) * (chartWidth - pad.x * 2)
          return (
            <text key={hour} x={x} y={chartHeight - 4} textAnchor="middle" fill="rgba(247,241,238,.4)" fontSize="10">
              {hour}h
            </text>
          )
        })}
        {fermentationMethods.map((method) => {
          const values = isTemperature ? method.temperatures : method.ph
          return (
            <polyline
              key={method.id}
              points={points(values, min, max)}
              fill="none"
              stroke={method.color}
              strokeWidth={selected === method.id ? 5 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={selected === method.id ? 1 : 0.45}
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>
    </div>
  )
}

export default function FermentationLab() {
  const [selected, setSelected] = useState<FermentationMethod["id"]>("precision")
  const [hour, setHour] = useState(72)
  const method = fermentationMethods.find((item) => item.id === selected) ?? fermentationMethods[0]
  const stage = useMemo(() => resolvePrecursorStage(hour), [hour])
  const dataIndex = Math.min(
    method.temperatures.length - 1,
    Math.max(0, fermentationHours.findIndex((value) => value >= hour)),
  )
  const windowTone =
    hour <= 72 && selected === "precision" ? "metabolomic"
    : hour === 120 && selected !== "wood" ? "sensory"
    : hour >= 144 ? "risk"
    : "neutral"

  return (
    <section className="lab-shell" aria-labelledby="lab-title">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Simulador de lote · FEAR 5</p>
          <h2 id="lab-title" className="display-title text-colab-cream mt-3">
            Tres caminos.<br /><em>Tres relojes distintos.</em>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-colab-cream/55">
          72 h (Tc-pH) es un óptimo metabolómico propuesto. 120 h es el ancla sensorial del chocolate
          de biorreactor publicado. 96–120 h es la ventana propuesta del cajón. No son el mismo tipo de evidencia.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-10">
        {fermentationMethods.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            className={`method-tab ${selected === item.id ? "method-tab-active" : ""}`}
            aria-pressed={selected === item.id}
          >
            <span className="method-dot" style={{ backgroundColor: item.color }} />
            <span>
              <strong>{item.shortName}</strong>
              <small>{item.evidence === "published" ? "Evidencia publicada" : "Piloto propuesto"}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="window-strip mt-5">
        <div>
          <span>Óptimo propuesto</span>
          <strong>{method.windows.proposedOptimum}</strong>
        </div>
        <div>
          <span>Pico metabolómico</span>
          <strong>{method.windows.metabolomicPeak}</strong>
        </div>
        <div>
          <span>Ancla sensorial</span>
          <strong>{method.windows.sensoryComparable}</strong>
        </div>
        <div>
          <span>Riesgo inferior</span>
          <strong>{method.windows.inferiorRisk}</strong>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.45fr_.75fr] gap-5 mt-5">
        <div className="lab-panel">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="eyebrow text-colab-cream/40">Curva térmica</p>
              <h3 className="text-lg font-bold text-colab-cream mt-1">Ascenso y control por hora</h3>
            </div>
            <span className="data-pill">°C</span>
          </div>
          <CurveChart metric="temperature" selected={selected} />
        </div>
        <div className="lab-panel">
          <p className="eyebrow text-colab-cream/40">Ficha de reactor</p>
          <h3 className="text-2xl font-serif font-bold text-colab-cream mt-3">{method.name}</h3>
          <dl className="method-specs">
            <div><dt>Recipiente</dt><dd>{method.vessel}</dd></div>
            <div><dt>Ventana</dt><dd>{method.duration}</dd></div>
            <div><dt>Movimiento</dt><dd>{method.mixing}</dd></div>
          </dl>
          <p className="mt-5 pt-5 border-t border-white/10 text-sm leading-relaxed text-colab-cream/65">
            {method.outcome}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 mt-5">
        <div className="lab-panel">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="eyebrow text-colab-cream/40">Acidificación interna</p>
              <h3 className="text-lg font-bold text-colab-cream mt-1">Velocidad del pH, no solo el valor</h3>
            </div>
            <span className="data-pill">pH</span>
          </div>
          <CurveChart metric="ph" selected={selected} />
          <p className="text-xs leading-relaxed text-colab-cream/40 mt-4">
            En todos los biorreactores el pH interno bajó de ~6,3 a ~4,3. Lo que cambió el sabor fue la
            velocidad: caída rápida (~4,6 en 48–72 h) → amargor/astringencia; descenso más gradual hacia 72–96 h →
            atributos superiores.
          </p>
        </div>

        <div className="lab-panel flex flex-col">
          <div className="flex justify-between items-start gap-5">
            <div>
              <p className="eyebrow text-colab-cream/40">Viaje del precursor</p>
              <h3 className="text-2xl font-serif font-bold text-colab-cream mt-2">{stage.title}</h3>
            </div>
            <span className="hour-display">{hour}<small>h</small></span>
          </div>
          <input
            className="time-slider mt-7"
            type="range"
            min="0"
            max="192"
            step="24"
            value={hour}
            onChange={(event) => setHour(Number(event.target.value))}
            aria-label="Hora de fermentación"
          />
          <div className="flex justify-between text-[10px] text-colab-cream/35 mt-2">
            <span>0</span><span>48</span><span>72</span><span>96</span><span>120</span><span>144</span><span>192 h</span>
          </div>
          <div className={`precursor-card mt-6 window-tone-${windowTone}`}>
            <p className="text-xs uppercase tracking-[.18em] text-colab-yellow">Se acumula / transforma</p>
            <p className="text-sm leading-relaxed text-colab-cream mt-2">{stage.compounds}</p>
          </div>
          <p className="text-sm leading-relaxed text-colab-cream/60 mt-4">
            <strong className="text-colab-cream">Misión:</strong> {stage.action}
          </p>
          <p className="text-sm leading-relaxed text-colab-cream/50 mt-3">
            <strong className="text-colab-yellow">{method.shortName}:</strong> {stage.byMethod[selected]}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
            <div className="mini-metric"><span>Temperatura guía</span><strong>{method.temperatures[dataIndex]} °C</strong></div>
            <div className="mini-metric"><span>pH guía</span><strong>{method.ph[dataIndex]?.toFixed(2)}</strong></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <div className="lab-panel">
          <p className="eyebrow text-colab-yellow">Biomarcadores · calidad superior</p>
          <h3 className="text-lg font-bold text-colab-cream mt-2">Más abundantes en Tc-pH (45 °C, pH espontáneo)</h3>
          <ul className="biomarker-list mt-4">
            {superiorBiomarkers.map((marker) => (
              <li key={marker.id}>
                <strong>{marker.id}</strong>
                <span>{marker.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lab-panel">
          <p className="eyebrow text-colab-cream/45">Biomarcadores · calidad inferior</p>
          <h3 className="text-lg font-bold text-colab-cream mt-2">Amargor, astringencia y sabores extraños</h3>
          <ul className="biomarker-list mt-4">
            {inferiorBiomarkers.map((marker) => (
              <li key={marker.id}>
                <strong>{marker.id}</strong>
                <span>{marker.note}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed text-colab-cream/40 mt-4">
            Intensidad alta en cajón a 144–168 h y en tratamientos con acidificación inicial (Tc/Tg-pH_C).
          </p>
        </div>
      </div>

      <div className="mt-5 p-5 rounded-2xl bg-[#101d0b] border border-white/10">
        <p className="eyebrow text-colab-yellow">Puntos de control · {method.shortName}</p>
        <ol className="grid md:grid-cols-4 gap-4 mt-4">
          {method.checkpoints.map((checkpoint, index) => (
            <li key={checkpoint} className="text-xs leading-relaxed text-colab-cream/60">
              <span className="block text-colab-yellow font-bold mb-2">0{index + 1}</span>{checkpoint}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
