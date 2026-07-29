"use client"

import { useEffect, useMemo, useState } from "react"

type GotchiState = {
  day: number
  xp: number
  moisture: number
  health: number
  knowledge: number
  actions: number
  streak: number
  lastActionDate: string | null
}

const initialState: GotchiState = {
  day: 1,
  xp: 0,
  moisture: 62,
  health: 78,
  knowledge: 10,
  actions: 0,
  streak: 0,
  lastActionDate: null,
}

const stages = [
  { name: "Semilla", icon: "●", threshold: 0, mission: "Registra origen, genotipo y fecha de siembra." },
  { name: "Plántula", icon: "♧", threshold: 2, mission: "Equilibra agua, sombra y observación." },
  { name: "Árbol joven", icon: "♣", threshold: 5, mission: "Lee el suelo y protege biodiversidad." },
  { name: "Floración", icon: "✣", threshold: 8, mission: "Cuida polinizadores y registra floración." },
  { name: "Mazorca", icon: "◉", threshold: 12, mission: "Evalúa madurez antes de cosechar." },
  { name: "Cosecha", icon: "◆", threshold: 16, mission: "Corta, clasifica y abre un lote trazable." },
]

const actions = [
  { id: "water", label: "Regar con criterio", icon: "⌁", xp: 12, moisture: 18, health: 2, knowledge: 1 },
  { id: "shade", label: "Regular sombra", icon: "☼", xp: 15, moisture: -3, health: 10, knowledge: 2 },
  { id: "observe", label: "Observar y registrar", icon: "◎", xp: 20, moisture: -5, health: 1, knowledge: 12 },
  { id: "soil", label: "Cuidar el suelo", icon: "≋", xp: 18, moisture: 4, health: 8, knowledge: 4 },
]

function clamp(value: number) {
  return Math.max(0, Math.min(100, value))
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function CacaoGotchiLab() {
  const [state, setState] = useState<GotchiState>(initialState)
  const [message, setMessage] = useState("Tu lote está esperando la primera decisión.")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cacao_gotchi_v1")
      if (saved) setState({ ...initialState, ...JSON.parse(saved) })
    } catch {
      // El laboratorio sigue disponible sin persistencia.
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem("cacao_gotchi_v1", JSON.stringify(state))
    } catch {
      // El estado en memoria sigue funcionando.
    }
  }, [loaded, state])

  const stageIndex = useMemo(() => {
    return [...stages].reverse().findIndex((stage) => state.actions >= stage.threshold) === -1
      ? 0
      : stages.length - 1 - [...stages].reverse().findIndex((stage) => state.actions >= stage.threshold)
  }, [state.actions])
  const stage = stages[stageIndex]
  const nextStage = stages[stageIndex + 1]
  const stageProgress = nextStage
    ? ((state.actions - stage.threshold) / (nextStage.threshold - stage.threshold)) * 100
    : 100

  function care(action: (typeof actions)[number]) {
    const currentDate = today()
    setState((current) => {
      const isNewDay = current.lastActionDate !== currentDate
      const yesterday = new Date()
      yesterday.setUTCDate(yesterday.getUTCDate() - 1)
      const continued = current.lastActionDate === yesterday.toISOString().slice(0, 10)
      return {
        ...current,
        day: current.day + 1,
        xp: current.xp + action.xp,
        moisture: clamp(current.moisture + action.moisture - 6),
        health: clamp(current.health + action.health - (current.moisture > 88 ? 5 : 0)),
        knowledge: clamp(current.knowledge + action.knowledge),
        actions: current.actions + 1,
        streak: isNewDay ? (continued ? current.streak + 1 : 1) : current.streak,
        lastActionDate: currentDate,
      }
    })
    setMessage(`${action.icon} ${action.label}: +${action.xp} XP. La observación vale más que repetir una receta.`)
  }

  function reset() {
    setState(initialState)
    setMessage("Nueva parcela creada. Empieza por observar antes de intervenir.")
  }

  return (
    <div className="gotchi-shell">
      <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-5">
        <section className="gotchi-pet">
          <div className="flex justify-between items-start">
            <div>
              <p className="eyebrow text-colab-yellow">Cacao Gotchi · lote #001</p>
              <h2 className="font-serif text-3xl font-bold text-colab-cream mt-2">{stage.name}</h2>
            </div>
            <span className="gotchi-day">Día {state.day}</span>
          </div>
          <div className="gotchi-orb" aria-label={`Estado actual: ${stage.name}`}>
            <span>{stage.icon}</span>
            {[0, 1, 2].map((ring) => <i key={ring} style={{ animationDelay: `${ring * .45}s` }} />)}
          </div>
          <div className="gotchi-message">{message}</div>
          <div className="grid grid-cols-3 gap-2 mt-5">
            {[
              ["Agua", state.moisture, "#58A6C7"],
              ["Vitalidad", state.health, "#86B66B"],
              ["Saber", state.knowledge, "#F2C830"],
            ].map(([label, value, color]) => (
              <div key={String(label)} className="gotchi-stat">
                <span>{label}</span>
                <strong>{value}%</strong>
                <div><i style={{ width: `${value}%`, background: String(color) }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="gotchi-console">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-colab-green">Laboratorio de siembra + cosecha</p>
              <h2 className="font-serif text-3xl font-bold text-colab-ink mt-2">Toma una decisión de campo.</h2>
            </div>
            <div className="flex gap-4">
              <div className="gotchi-score"><strong>{state.xp}</strong><span>XP</span></div>
              <div className="gotchi-score"><strong>{state.streak}</strong><span>racha</span></div>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex justify-between text-xs font-bold text-colab-ink/50">
              <span>{stage.name}</span><span>{nextStage ? `Siguiente: ${nextStage.name}` : "Ciclo completado"}</span>
            </div>
            <div className="gotchi-progress mt-2"><i style={{ width: `${stageProgress}%` }} /></div>
            <p className="text-sm text-colab-ink/60 mt-4"><strong className="text-colab-ink">Misión:</strong> {stage.mission}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-7">
            {actions.map((action) => (
              <button key={action.id} type="button" onClick={() => care(action)} className="care-action">
                <span>{action.icon}</span>
                <span><strong>{action.label}</strong><small>+{action.xp} XP · simular un día</small></span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-5 border-t border-colab-ink/10">
            <p className="text-[11px] text-colab-ink/45 max-w-md">
              Simulación pedagógica: no reemplaza asistencia agronómica ni datos reales de tu parcela.
            </p>
            <button type="button" onClick={reset} className="text-[10px] font-bold uppercase tracking-wider text-colab-ink/35 hover:text-colab-ink">
              Reiniciar lote
            </button>
          </div>
        </section>
      </div>

      <div className="stage-rail mt-5">
        {stages.map((item, index) => (
          <div key={item.name} className={index <= stageIndex ? "stage-done" : ""}>
            <span>{index < stageIndex ? "✓" : item.icon}</span>
            <small>{item.name}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
