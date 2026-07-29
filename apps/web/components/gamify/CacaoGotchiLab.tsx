"use client"

import { useEffect, useMemo, useState } from "react"
import { saveGotchiRun } from "@/app/campus/actions"
import { territories } from "@/lib/territories"

type GotchiState = {
  phase: "cultivation" | "fermentation" | "complete"
  plantedAt: string
  lastGrowthAt: string
  ageHours: number
  xp: number
  moisture: number
  nutrition: number
  soilPh: number
  shade: number
  health: number
  knowledge: number
  heightCm: number
  leaves: number
  flowers: number
  pods: number
  actions: number
  streak: number
  lastActionDate: string | null
  selectedNode: string
  genotype: "FEAR 5 · Trinitario comercial"
  treatment: "Fermentación controlada Cacaotier" | null
  fermentationHour: number
  labranzaName: string
  generation: "primera" | "heredada" | "comunitaria"
  plantingSystem: "agroforesteria" | "sombra-regulada" | "demostrativa"
  biodiversity: number
  waterReserve: number
  pollinators: number
  soilCover: number
}

const now = () => new Date().toISOString()

const initialState: GotchiState = {
  phase: "cultivation",
  plantedAt: now(),
  lastGrowthAt: now(),
  ageHours: 0,
  xp: 0,
  moisture: 62,
  nutrition: 72,
  soilPh: 6.2,
  shade: 58,
  health: 78,
  knowledge: 10,
  heightCm: 4,
  leaves: 2,
  flowers: 0,
  pods: 0,
  actions: 0,
  streak: 0,
  lastActionDate: null,
  selectedNode: "arauca",
  genotype: "FEAR 5 · Trinitario comercial",
  treatment: null,
  fermentationHour: 0,
  labranzaName: "Labranza #001",
  generation: "heredada",
  plantingSystem: "agroforesteria",
  biodiversity: 68,
  waterReserve: 58,
  pollinators: 52,
  soilCover: 72,
}

const stages = [
  { name: "Semilla", icon: "●", threshold: 0, mission: "Selecciona nodo, genotipo y registra la siembra." },
  { name: "Plántula", icon: "♧", threshold: 1, mission: "Equilibra agua, sombra y nutrición." },
  { name: "Árbol joven", icon: "♣", threshold: 12, mission: "Protege suelo y observa la respuesta por hora." },
  { name: "Floración", icon: "✣", threshold: 30, mission: "Cuida salud y sombra para sostener flores." },
  { name: "Mazorca", icon: "◉", threshold: 54, mission: "Lleva la mazorca a madurez sin forzar el árbol." },
  { name: "Cosecha", icon: "◆", threshold: 78, mission: "Abre un lote trazable y aplica el tratamiento Cacaotier." },
]

const actions = [
  { id: "water", label: "Regular agua", icon: "⌁", xp: 12, moisture: 16, nutrition: 0, shade: 0, health: 2, knowledge: 1, biodiversity: 0, pollinators: 0, soilCover: 0, waterReserve: -5 },
  { id: "shade", label: "Ajustar sombra", icon: "☼", xp: 15, moisture: -2, nutrition: 0, shade: 12, health: 6, knowledge: 2, biodiversity: 3, pollinators: 2, soilCover: 0, waterReserve: 1 },
  { id: "observe", label: "Medir y registrar", icon: "◎", xp: 20, moisture: -1, nutrition: 0, shade: 0, health: 1, knowledge: 12, biodiversity: 0, pollinators: 0, soilCover: 0, waterReserve: 0 },
  { id: "soil", label: "Nutrir y cubrir suelo", icon: "≋", xp: 18, moisture: 3, nutrition: 14, shade: 0, health: 7, knowledge: 4, biodiversity: 4, pollinators: 0, soilCover: 12, waterReserve: 4 },
  { id: "pollinate", label: "Cuidar polinizadores", icon: "✣", xp: 18, moisture: -2, nutrition: 0, shade: 2, health: 4, knowledge: 5, biodiversity: 5, pollinators: 14, soilCover: 2, waterReserve: 0 },
]

const fermentationCurve = [
  { hour: 0, temperature: 28, ph: 6.5, stage: "Recepción y línea base" },
  { hour: 24, temperature: 35, ph: 5.8, stage: "Transformación de pulpa" },
  { hour: 48, temperature: 43, ph: 4.8, stage: "Entrada gradual de acidez" },
  { hour: 72, temperature: 45, ph: 4.5, stage: "Ventana metabolómica candidata" },
  { hour: 96, temperature: 45, ph: 4.4, stage: "Comparación de corte" },
  { hour: 120, temperature: 45, ph: 4.3, stage: "Cierre sensorial comparable" },
]

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

function dateKey() {
  return new Date().toISOString().slice(0, 10)
}

function applyElapsedGrowth(state: GotchiState, forcedHours?: number): GotchiState {
  if (state.phase !== "cultivation") return state
  const elapsed = forcedHours ?? Math.floor((Date.now() - new Date(state.lastGrowthAt).getTime()) / 3_600_000)
  if (elapsed < 1) return state
  const ecological = (state.biodiversity + state.waterReserve + state.pollinators + state.soilCover) / 4
  const balance = (state.health + state.moisture + state.nutrition + (100 - Math.abs(60 - state.shade)) + ecological) / 500
  const nextAge = state.ageHours + elapsed
  return {
    ...state,
    ageHours: nextAge,
    lastGrowthAt: now(),
    moisture: clamp(state.moisture - elapsed * 1.2),
    nutrition: clamp(state.nutrition - elapsed * .45),
    health: clamp(state.health + (balance > .68 ? elapsed * .35 : -elapsed * .5)),
    heightCm: Math.round((state.heightCm + elapsed * .42 * Math.max(.25, balance)) * 10) / 10,
    leaves: state.leaves + Math.floor(elapsed * balance / 2.5),
    flowers: nextAge >= 30 ? state.flowers + Math.floor(elapsed * balance / 5) : state.flowers,
    pods: nextAge >= 54 ? state.pods + Math.floor(elapsed * balance / 10) : state.pods,
    waterReserve: clamp(state.waterReserve - elapsed * .3),
    pollinators: clamp(state.pollinators + (state.biodiversity > 65 ? elapsed * .18 : -elapsed * .2)),
  }
}

function isGotchiState(value: unknown): value is GotchiState {
  return Boolean(value && typeof value === "object" && "phase" in value && "ageHours" in value)
}

function normalizeState(value: GotchiState): GotchiState {
  return { ...initialState, ...value }
}

export default function CacaoGotchiLab({ initialRemoteState }: { initialRemoteState?: unknown }) {
  const [state, setState] = useState<GotchiState>(() => isGotchiState(initialRemoteState) ? normalizeState(initialRemoteState) : initialState)
  const [message, setMessage] = useState("Dualita: selecciona un nodo y observa antes de intervenir.")
  const [loaded, setLoaded] = useState(false)
  const [sync, setSync] = useState<"idle" | "saving" | "saved" | "local">("idle")

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem("cacao_gotchi_v2")
        if (!initialRemoteState && saved) {
          const parsed: unknown = JSON.parse(saved)
          if (isGotchiState(parsed)) setState(applyElapsedGrowth(normalizeState(parsed)))
        } else {
          setState((current) => applyElapsedGrowth(current))
        }
      } catch {
        // La sesión remota sigue disponible.
      }
      setLoaded(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [initialRemoteState])

  useEffect(() => {
    const interval = window.setInterval(() => setState((current) => applyElapsedGrowth(current)), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem("cacao_gotchi_v2", JSON.stringify(state))
    } catch {
      // No bloquea la simulación.
    }
  }, [loaded, state])

  const stageIndex = useMemo(() => {
    const found = [...stages].reverse().findIndex((stage) => state.ageHours >= stage.threshold)
    return found === -1 ? 0 : stages.length - 1 - found
  }, [state.ageHours])
  const stage = stages[stageIndex]
  const nextStage = stages[stageIndex + 1]
  const stageProgress = nextStage
    ? ((state.ageHours - stage.threshold) / (nextStage.threshold - stage.threshold)) * 100
    : 100
  const selectedTerritory = territories.find((territory) => territory.id === state.selectedNode)
  const fermentationPoint = fermentationCurve.find((point) => point.hour === state.fermentationHour) ?? fermentationCurve[0]

  function persist(next: GotchiState) {
    setSync("saving")
    void saveGotchiRun(next, next.xp, next.selectedNode, next.treatment).then((result) => setSync(result.ok ? "saved" : "local"))
  }

  function care(action: (typeof actions)[number]) {
    const currentDate = dateKey()
    const current = applyElapsedGrowth(state)
    const yesterday = new Date()
    yesterday.setUTCDate(yesterday.getUTCDate() - 1)
    const isNewDay = current.lastActionDate !== currentDate
    const next = applyElapsedGrowth({
      ...current,
      xp: current.xp + action.xp,
      moisture: clamp(current.moisture + action.moisture),
      nutrition: clamp(current.nutrition + action.nutrition),
      shade: clamp(current.shade + action.shade),
      health: clamp(current.health + action.health),
      knowledge: clamp(current.knowledge + action.knowledge),
      soilPh: clamp(current.soilPh + (action.id === "soil" ? .03 : 0), 4, 8),
      biodiversity: clamp(current.biodiversity + action.biodiversity),
      pollinators: clamp(current.pollinators + action.pollinators),
      soilCover: clamp(current.soilCover + action.soilCover),
      waterReserve: clamp(current.waterReserve + action.waterReserve),
      actions: current.actions + 1,
      streak: isNewDay
        ? (current.lastActionDate === yesterday.toISOString().slice(0, 10) ? current.streak + 1 : 1)
        : current.streak,
      lastActionDate: currentDate,
    })
    setState(next)
    persist(next)
    setMessage(`Dualita: ${action.label} suma +${action.xp} XP y puede acreditar 5 Mazorcas Doradas (tope diario).`)
  }

  function simulateHours(hours: number) {
    const next = applyElapsedGrowth(state, hours)
    setState(next)
    persist(next)
    setMessage(`Modo entrenamiento: avanzaste ${hours} h. El crecimiento real sigue el reloj del dispositivo.`)
  }

  function chooseNode(nodeId: string) {
    const next = { ...state, selectedNode: nodeId }
    setState(next)
    persist(next)
  }

  function startFermentation() {
    if (state.ageHours < 78) return
    const next: GotchiState = {
      ...state,
      phase: "fermentation",
      treatment: "Fermentación controlada Cacaotier",
      fermentationHour: 0,
      xp: state.xp + 60,
    }
    setState(next)
    persist(next)
    setMessage("Dualita: lote abierto. Aplicamos el escenario controlado Cacaotier sin dosificación automática de ácido.")
  }

  function advanceFermentation() {
    const hour = Math.min(120, state.fermentationHour + 24)
    const next: GotchiState = {
      ...state,
      phase: hour === 120 ? "complete" : "fermentation",
      fermentationHour: hour,
      xp: state.xp + 25,
    }
    setState(next)
    persist(next)
  }

  function reset() {
    const next = { ...initialState, plantedAt: now(), lastGrowthAt: now() }
    setState(next)
    persist(next)
    setMessage("Nueva labranza creada. Elige nodo y registra la línea base.")
  }

  return (
    <div className="gotchi-shell">
      <div className="labranza-planner">
        <div>
          <p className="eyebrow text-colab-yellow">Identidad de la labranza</p>
          <h2>Siembra para la siguiente generación.</h2>
          <p>Elige cómo quieres cuidar suelo, sombra, agua y memoria familiar antes de acelerar el tiempo.</p>
        </div>
        <div className="labranza-fields">
          <label><span>Nombre</span><input value={state.labranzaName} onChange={(event) => setState({ ...state, labranzaName: event.target.value.slice(0, 50) })} /></label>
          <label><span>Continuidad</span>
            <select value={state.generation} onChange={(event) => setState({ ...state, generation: event.target.value as GotchiState["generation"] })}>
              <option value="heredada">Labranza heredada</option><option value="primera">Primera generación</option><option value="comunitaria">Labranza comunitaria</option>
            </select>
          </label>
          <label><span>Sistema</span>
            <select value={state.plantingSystem} onChange={(event) => setState({ ...state, plantingSystem: event.target.value as GotchiState["plantingSystem"] })}>
              <option value="agroforesteria">Agroforestería diversa</option><option value="sombra-regulada">Sombra regulada</option><option value="demostrativa">Labranza demostrativa</option>
            </select>
          </label>
          <button type="button" onClick={() => persist(state)}>Guardar identidad</button>
        </div>
      </div>

      <div className="gotchi-node-picker">
        <div>
          <p className="eyebrow text-colab-yellow">Nodo de aprendizaje</p>
          <strong>{selectedTerritory?.nodeName} · {selectedTerritory?.city}</strong>
          <small>{state.genotype} · escenario didáctico; confirma disponibilidad real con el nodo.</small>
        </div>
        <div>
          {territories.filter((territory) => territory.id !== "bogota").map((territory) => (
            <button key={territory.id} type="button" onClick={() => chooseNode(territory.id)} className={territory.id === state.selectedNode ? "active" : ""}>
              {territory.nodeName}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-5 mt-4">
        <section className="gotchi-pet">
          <div className="flex justify-between items-start">
            <div>
          <p className="eyebrow text-colab-yellow">Cacao Gotchi · {state.labranzaName}</p>
              <h2 className="font-serif text-3xl font-bold text-colab-cream mt-2">
                {state.phase === "cultivation" ? stage.name : state.phase === "complete" ? "Lote fermentado" : "Fermentando"}
              </h2>
            </div>
            <span className="gotchi-day">{state.phase === "cultivation" ? `${state.ageHours} h` : `${state.fermentationHour} h`}</span>
          </div>
          <div className="gotchi-orb" aria-label={state.phase === "cultivation" ? stage.name : "Lote FEAR 5"}>
            <span>{state.phase === "cultivation" ? stage.icon : state.phase === "complete" ? "✦" : "◈"}</span>
            {[0, 1, 2].map((ring) => <i key={ring} style={{ animationDelay: `${ring * .45}s` }} />)}
          </div>
          <div className="gotchi-message">{message}</div>
          <div className="grid grid-cols-3 gap-2 mt-5">
            {(state.phase === "cultivation"
              ? [
                  { label: "Agua", value: `${Math.round(state.moisture)}%`, bar: state.moisture, color: "#58A6C7" },
                  { label: "Vitalidad", value: `${Math.round(state.health)}%`, bar: state.health, color: "#86B66B" },
                  { label: "Saber", value: `${Math.round(state.knowledge)}%`, bar: state.knowledge, color: "#F2C830" },
                ]
              : [
                  { label: "Temp.", value: `${fermentationPoint.temperature}°`, bar: fermentationPoint.temperature * 2, color: "#DC775F" },
                  { label: "pH", value: fermentationPoint.ph.toFixed(1), bar: fermentationPoint.ph * 14, color: "#F2C830" },
                  { label: "Avance", value: `${Math.round(state.fermentationHour / 1.2)}%`, bar: state.fermentationHour / 1.2, color: "#86B66B" },
                ]
            ).map((metric) => (
              <div key={metric.label} className="gotchi-stat">
                <span>{metric.label}</span><strong>{metric.value}</strong>
                <div><i style={{ width: `${clamp(metric.bar)}%`, background: metric.color }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="gotchi-console">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-colab-green">
                {state.phase === "cultivation" ? "Laboratorio de siembra + cosecha" : "Tratamiento Cacaotier · FEAR 5"}
              </p>
              <h2 className="font-serif text-3xl font-bold text-colab-ink mt-2">
                {state.phase === "cultivation" ? "El árbol responde por hora." : fermentationPoint.stage}
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="gotchi-score"><strong>{state.xp}</strong><span>XP</span></div>
              <div className="gotchi-score"><strong>{state.streak}</strong><span>racha</span></div>
            </div>
          </div>

          {state.phase === "cultivation" ? (
            <>
              <div className="gotchi-parameters mt-6">
                {[
                  ["Altura", `${state.heightCm} cm`], ["Hojas", state.leaves], ["Flores", state.flowers],
                  ["Mazorca", state.pods], ["Nutrición", `${Math.round(state.nutrition)}%`], ["Sombra", `${Math.round(state.shade)}%`],
                  ["Biodiversidad", `${Math.round(state.biodiversity)}%`], ["Polinizadores", `${Math.round(state.pollinators)}%`],
                  ["Cobertura", `${Math.round(state.soilCover)}%`], ["Reserva agua", `${Math.round(state.waterReserve)}%`],
                  ["pH suelo", state.soilPh.toFixed(2)], ["Edad", `${state.ageHours} h`],
                ].map(([label, value]) => <div key={String(label)}><span>{label}</span><strong>{value}</strong></div>)}
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-colab-ink/50">
                  <span>{stage.name}</span><span>{nextStage ? `Siguiente: ${nextStage.name}` : "Cosecha disponible"}</span>
                </div>
                <div className="gotchi-progress mt-2"><i style={{ width: `${clamp(stageProgress)}%` }} /></div>
                <p className="text-sm text-colab-ink/60 mt-4"><strong className="text-colab-ink">Misión:</strong> {stage.mission}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {actions.map((action) => (
                  <button key={action.id} type="button" onClick={() => care(action)} className="care-action">
                    <span>{action.icon}</span><span><strong>{action.label}</strong><small>+{action.xp} XP · hasta +5 MD</small></span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                <button type="button" onClick={() => simulateHours(12)} className="gotchi-simulate">Entrenamiento: avanzar 12 h</button>
                <button type="button" disabled={state.ageHours < 78} onClick={startFermentation} className="gotchi-ferment">
                  {state.ageHours < 78 ? `Cosecha en ${78 - state.ageHours} h` : "Cosechar + fermentar Cacaotier →"}
                </button>
              </div>
            </>
          ) : (
            <div className="fermentation-console">
              <div className="grid grid-cols-3 gap-3 mt-7">
                <div><span>Hora</span><strong>{state.fermentationHour} h</strong></div>
                <div><span>Temperatura guía</span><strong>{fermentationPoint.temperature} °C</strong></div>
                <div><span>pH guía</span><strong>{fermentationPoint.ph.toFixed(1)}</strong></div>
              </div>
              <div className="gotchi-progress mt-6"><i style={{ width: `${state.fermentationHour / 1.2}%` }} /></div>
              <p className="text-sm leading-relaxed text-colab-ink/60 mt-5">
                Escenario educativo basado en la ruta de precisión. El nodo seleccionado no implica que el artículo haya validado allí FEAR 5 ni esta escala.
              </p>
              {state.phase !== "complete" ? (
                <button type="button" onClick={advanceFermentation} className="gotchi-ferment mt-6">Registrar siguiente control +24 h →</button>
              ) : (
                <div className="mt-6 bg-colab-yellow/30 rounded-xl p-4 text-sm font-bold text-colab-forest">✦ Lote cerrado a 120 h. Desbloqueaste la comparación sensorial.</div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-5 border-t border-colab-ink/10">
            <p className="text-[11px] text-colab-ink/45">
              {sync === "saving" ? "Sincronizando…" : sync === "saved" ? "✓ Guardado en tu cuenta" : sync === "local" ? "Guardado local; aplica la migración de campus." : "Crecimiento comprimido para aprendizaje."}
            </p>
            <button type="button" onClick={reset} className="text-[10px] font-bold uppercase tracking-wider text-colab-ink/35 hover:text-colab-ink">Reiniciar lote</button>
          </div>
        </section>
      </div>

      <div className="stage-rail mt-5">
        {stages.map((item, index) => (
          <div key={item.name} className={index <= stageIndex ? "stage-done" : ""}>
            <span>{index < stageIndex ? "✓" : item.icon}</span><small>{item.name} · {item.threshold} h</small>
          </div>
        ))}
      </div>
    </div>
  )
}
