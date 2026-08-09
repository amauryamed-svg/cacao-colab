"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import DualitaCompanion, { type DualitaMood } from "@/components/aprende/DualitaCompanion"
import { saveGotchiRun } from "@/app/campus/actions"
import { territories } from "@/lib/territories"
import {
  agroforestryModels,
  bitacoraPrompts,
  cartografiaLayers,
  coexReferencePlantulas,
  ecoyumaCatalogPlantulas,
  isSembrarGenotype,
  modeloAraucanoPlantulas,
  planningMilestones,
  plantulaFor,
  sembrarCatalogHref,
  sembrarDoDispute,
  sembrarGenerationCopy,
  type SembrarGenotype,
} from "@/lib/sembrar"
import { geneticsForTerritory } from "@/lib/learning-nodes"
import { mazorcaRewards } from "@/lib/loyalty"
import {
  PERFECT_CARE_HOUR,
  cadmiumPedagogy,
  cadmiumRiskIndex,
  cadmiumRiskLabel,
  decadePlanCopy,
  isPerfectCareReady,
  perfectCareGaps,
} from "@/lib/sembrar-care"

type BitacoraEntry = {
  id: string
  at: string
  promptId: string
  note: string
}

type FarmMap = {
  parcelas: string
  agua: string
  sombra: string
  social: string
}

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
  genotype: string
  genotypeCode: SembrarGenotype
  treatment: "Fermentación controlada Cacaotier" | null
  fermentationHour: number
  labranzaName: string
  generation: "primera" | "heredada" | "comunitaria"
  plantingSystem: "agroforesteria" | "sombra-regulada" | "demostrativa" | "comunitaria-estratos"
  biodiversity: number
  waterReserve: number
  pollinators: number
  soilCover: number
  bitacora: BitacoraEntry[]
  farmMap: FarmMap
  planNotes: string
  activePromptId: string
  /** Plan comparativo a 10 años */
  decadeGenotypeA: string
  decadeGenotypeB: string
  decadePlanNotes: string
  decadePlanComplete: boolean
}

const now = () => new Date().toISOString()

const emptyMap: FarmMap = { parcelas: "", agua: "", sombra: "", social: "" }

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
  genotype: "FEAR 5 · Fedecacao Arauquita 5",
  genotypeCode: "FEAR 5",
  treatment: null,
  fermentationHour: 0,
  labranzaName: "Labranza #001",
  generation: "primera",
  plantingSystem: "agroforesteria",
  biodiversity: 68,
  waterReserve: 58,
  pollinators: 52,
  soilCover: 72,
  bitacora: [],
  farmMap: emptyMap,
  planNotes: "",
  activePromptId: "b0",
  decadeGenotypeA: "FEAR 5",
  decadeGenotypeB: "FSV 41",
  decadePlanNotes: "",
  decadePlanComplete: false,
}

const stages = [
  { name: "Semilla", icon: "●", threshold: 0, mission: "Elige el modelo araucano (FEAR 5 · FTA 2 · FSA 13), nodo y cartografía." },
  { name: "Plántula", icon: "♧", threshold: 1, mission: "Equilibra agua, sombra y registra la bitácora de trasplante." },
  { name: "Árbol joven", icon: "♣", threshold: 12, mission: "Cubre suelo, observa sanidad y ajusta el modelo agroforestal." },
  { name: "Floración", icon: "✣", threshold: 30, mission: "Cuida polinizadores y sombra para sostener flores." },
  { name: "Mazorca", icon: "◉", threshold: 54, mission: "Lleva la mazorca a madurez sin forzar el árbol." },
  {
    name: "Cosecha",
    icon: "◆",
    threshold: 78,
    mission: `Puedes cosechar desde 78 h. Hito cuidado perfecto a ${PERFECT_CARE_HOUR} h con Agua/Vitalidad/Saber/Nutrición/Cobertura/Biodiversidad al 100 % (+${mazorcaRewards.gotchiPerfectCare} MD).`,
  },
]

const actions = [
  { id: "water", label: "Regular agua", icon: "⌁", xp: 12, moisture: 16, nutrition: 0, shade: 0, health: 2, knowledge: 1, biodiversity: 0, pollinators: 0, soilCover: 0, waterReserve: -5 },
  { id: "shade", label: "Ajustar sombra", icon: "☼", xp: 15, moisture: -2, nutrition: 0, shade: 12, health: 6, knowledge: 2, biodiversity: 3, pollinators: 2, soilCover: 0, waterReserve: 1 },
  { id: "observe", label: "Medir y bitácora", icon: "◎", xp: 20, moisture: -1, nutrition: 0, shade: 0, health: 1, knowledge: 12, biodiversity: 0, pollinators: 0, soilCover: 0, waterReserve: 0 },
  { id: "soil", label: "Nutrir y cubrir suelo", icon: "≋", xp: 18, moisture: 3, nutrition: 14, shade: 0, health: 7, knowledge: 4, biodiversity: 4, pollinators: 0, soilCover: 12, waterReserve: 4 },
  { id: "pollinate", label: "Cuidar polinizadores", icon: "✣", xp: 18, moisture: -2, nutrition: 0, shade: 2, health: 4, knowledge: 5, biodiversity: 5, pollinators: 14, soilCover: 2, waterReserve: 0 },
  {
    id: "stabilize",
    label: "Estabilizar cosecha",
    icon: "◆",
    xp: 24,
    moisture: 22,
    nutrition: 16,
    shade: 6,
    health: 16,
    knowledge: 10,
    biodiversity: 14,
    pollinators: 6,
    soilCover: 16,
    waterReserve: 10,
  },
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
  // Buen cuidado frena el decaimiento: hace alcanzable el hito 100 h · 100 %.
  const careHold = (state.soilCover + state.biodiversity + state.health) / 300
  const moistureLoss = elapsed * (1.15 - careHold * 0.75)
  const nutritionLoss = elapsed * (0.42 - careHold * 0.22)
  const nextAge = state.ageHours + elapsed
  return {
    ...state,
    ageHours: nextAge,
    lastGrowthAt: now(),
    moisture: clamp(state.moisture - moistureLoss),
    nutrition: clamp(state.nutrition - nutritionLoss),
    health: clamp(state.health + (balance > 0.68 ? elapsed * 0.4 : -elapsed * 0.45)),
    heightCm: Math.round((state.heightCm + elapsed * 0.42 * Math.max(0.25, balance)) * 10) / 10,
    leaves: state.leaves + Math.floor((elapsed * balance) / 2.5),
    flowers: nextAge >= 30 ? state.flowers + Math.floor((elapsed * balance) / 5) : state.flowers,
    pods: nextAge >= 54 ? state.pods + Math.floor((elapsed * balance) / 10) : state.pods,
    waterReserve: clamp(state.waterReserve - elapsed * 0.28),
    pollinators: clamp(state.pollinators + (state.biodiversity > 65 ? elapsed * 0.18 : -elapsed * 0.2)),
    soilCover: clamp(state.soilCover - elapsed * (0.2 - careHold * 0.12)),
    biodiversity: clamp(state.biodiversity - elapsed * (0.15 - careHold * 0.1)),
    // Sin cobertura/nutrición el pH tiende a acidificar → más riesgo relativo de Cd (didáctico).
    soilPh: Math.max(
      4,
      Math.min(
        8,
        state.soilPh +
          (state.soilCover > 70 && state.nutrition > 60 ? elapsed * 0.004 : -elapsed * 0.012),
      ),
    ),
  }
}

function isGotchiState(value: unknown): value is GotchiState {
  return Boolean(value && typeof value === "object" && "phase" in value && "ageHours" in value)
}

function normalizeState(value: GotchiState): GotchiState {
  const code = isSembrarGenotype(value.genotypeCode) ? value.genotypeCode : "FEAR 5"
  const plant = plantulaFor(code)
  return {
    ...initialState,
    ...value,
    genotypeCode: code,
    genotype: value.genotype || plant.label,
    bitacora: Array.isArray(value.bitacora) ? value.bitacora : [],
    farmMap: { ...emptyMap, ...(value.farmMap ?? {}) },
    planNotes: value.planNotes ?? "",
    activePromptId: value.activePromptId || "b0",
    plantingSystem: value.plantingSystem || "agroforesteria",
    decadeGenotypeA: value.decadeGenotypeA || "FEAR 5",
    decadeGenotypeB: value.decadeGenotypeB || "FSV 41",
    decadePlanNotes: value.decadePlanNotes ?? "",
    decadePlanComplete: Boolean(value.decadePlanComplete),
  }
}

export default function CacaoGotchiLab({ initialRemoteState }: { initialRemoteState?: unknown }) {
  const [state, setState] = useState<GotchiState>(() =>
    isGotchiState(initialRemoteState) ? normalizeState(initialRemoteState) : initialState,
  )
  const [message, setMessage] = useState(
    "Dualita: elige el modelo araucano (FEAR 5 · Tame 2 · Saravena 13) y dibuja tu finca antes de acelerar el tiempo.",
  )
  const [loaded, setLoaded] = useState(false)
  const [sync, setSync] = useState<"idle" | "saving" | "saved" | "local">("idle")
  const [bitacoraDraft, setBitacoraDraft] = useState("")
  const [panel, setPanel] = useState<"cuidado" | "bitacora" | "mapa" | "plan">("cuidado")
  const [dualitaPulse, setDualitaPulse] = useState(0)

  useEffect(() => {
    setDualitaPulse((n) => n + 1)
  }, [message])

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
        // sesión remota
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
      // no bloquea
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
  const nodeGenetics = geneticsForTerritory(state.selectedNode)
  const fermentationPoint =
    fermentationCurve.find((point) => point.hour === state.fermentationHour) ?? fermentationCurve[0]
  const plantula = plantulaFor(state.genotypeCode)
  const agroModel =
    agroforestryModels.find((m) => m.id === state.plantingSystem) ?? agroforestryModels[0]
  const activePrompt =
    bitacoraPrompts.find((p) => p.id === state.activePromptId) ?? bitacoraPrompts[0]
  const careMetrics = {
    moisture: state.moisture,
    health: state.health,
    knowledge: state.knowledge,
    nutrition: state.nutrition,
    soilCover: state.soilCover,
    biodiversity: state.biodiversity,
    ageHours: state.ageHours,
  }
  const perfectReady = state.phase === "cultivation" && isPerfectCareReady(careMetrics)
  const careGaps = perfectCareGaps(careMetrics)
  const sembrarDualitaMood: DualitaMood =
    state.phase === "complete"
      ? "levelup"
      : perfectReady
        ? "cheer"
        : state.moisture < 28 || state.health < 35
          ? "oops"
          : "idle"
  const cdRisk = cadmiumRiskIndex({
    soilPh: state.soilPh,
    soilCover: state.soilCover,
    nutrition: state.nutrition,
    biodiversity: state.biodiversity,
  })
  const cdLabel = cadmiumRiskLabel(cdRisk)

  function persist(next: GotchiState) {
    setSync("saving")
    void saveGotchiRun(next, next.xp, next.selectedNode, next.treatment).then((result) =>
      setSync(result.ok ? "saved" : "local"),
    )
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
      soilPh: clamp(current.soilPh + (action.id === "soil" ? 0.03 : 0), 4, 8),
      biodiversity: clamp(current.biodiversity + action.biodiversity),
      pollinators: clamp(current.pollinators + action.pollinators),
      soilCover: clamp(current.soilCover + action.soilCover),
      waterReserve: clamp(current.waterReserve + action.waterReserve),
      actions: current.actions + 1,
      streak: isNewDay
        ? current.lastActionDate === yesterday.toISOString().slice(0, 10)
          ? current.streak + 1
          : 1
        : current.streak,
      lastActionDate: currentDate,
    })
    setState(next)
    persist(next)
    if (action.id === "observe") setPanel("bitacora")
    setMessage(
      `Dualita: ${action.label} suma +${action.xp} XP. Observar y registrar es el oficio del agricultor que quiere tipicidad.`,
    )
  }

  function simulateHours(hours: number) {
    const next = applyElapsedGrowth(state, hours)
    setState(next)
    persist(next)
    setMessage(`Modo entrenamiento: avanzaste ${hours} h. En campo real, la bitácora sigue el calendario.`)
  }

  function chooseNode(nodeId: string) {
    const genetics = geneticsForTerritory(nodeId)
    const suggested = genetics?.suggestGenotype
    const nextPlant =
      suggested && isSembrarGenotype(suggested) ? plantulaFor(suggested) : plantulaFor(state.genotypeCode)
    const next: GotchiState = {
      ...state,
      selectedNode: nodeId,
      ...(suggested && isSembrarGenotype(suggested)
        ? { genotypeCode: suggested, genotype: nextPlant.label }
        : {}),
    }
    setState(next)
    persist(next)
    setMessage(
      genetics
        ? `Dualita: nodo ${genetics.nodeName}. ${genetics.didacticFocus}. El laboratorio no inventa tipificación de marca.`
        : `Dualita: nodo actualizado. Confirma material real sin atribuir clones no tipificados.`,
    )
  }

  function chooseGenotype(code: SembrarGenotype) {
    const plant = plantulaFor(code)
    const next = { ...state, genotypeCode: code, genotype: plant.label }
    setState(next)
    persist(next)
    const buyHint = plant.ecoyumaHref
      ? "Verifica stock en Ecoyuma antes de comprar."
      : "Material Fedecacao del modelo araucano — consulta vivero regional; Colab no inventa stock."
    setMessage(`Dualita: ${plant.code} seleccionado. ${buyHint}`)
  }

  function saveBitacora() {
    const note = bitacoraDraft.trim()
    if (note.length < 3) return
    const entry: BitacoraEntry = {
      id: `${Date.now()}`,
      at: now(),
      promptId: activePrompt.id,
      note: note.slice(0, 400),
    }
    const next: GotchiState = {
      ...state,
      bitacora: [entry, ...state.bitacora].slice(0, 40),
      knowledge: clamp(state.knowledge + 8),
      xp: state.xp + 15,
    }
    setState(next)
    persist(next)
    setBitacoraDraft("")
    setMessage(`Bitácora guardada · ${activePrompt.title}. Así se construye cacao de finca idónea.`)
  }

  function startFermentation() {
    if (state.ageHours < 78) return
    const perfect = isPerfectCareReady({
      moisture: state.moisture,
      health: state.health,
      knowledge: state.knowledge,
      nutrition: state.nutrition,
      soilCover: state.soilCover,
      biodiversity: state.biodiversity,
      ageHours: state.ageHours,
    })
    const next: GotchiState = {
      ...state,
      phase: "fermentation",
      treatment: "Fermentación controlada Cacaotier",
      fermentationHour: 0,
      xp: state.xp + (perfect ? 100 : 60),
    }
    setState(next)
    persist(next)
    setMessage(
      perfect
        ? `Dualita: ¡cuidado perfecto a ${PERFECT_CARE_HOUR} h! +${mazorcaRewards.gotchiHarvestOpen} MD de cosecha y +${mazorcaRewards.gotchiPerfectCare} MD de hito. Ahora fermenta ~45 °C para mover Cd hacia la cascarilla.`
        : `Dualita: cosecha abierta · +${mazorcaRewards.gotchiHarvestOpen} MD. Para el hito perfecto: ${PERFECT_CARE_HOUR} h y todas las barras al 100 %.`,
    )
  }

  function saveDecadePlan() {
    const notes = state.decadePlanNotes.trim()
    if (notes.length < 120 || !state.decadeGenotypeA || !state.decadeGenotypeB) {
      setMessage(
        "Dualita: el plan a 10 años pide dos genotipos distintos y ≥120 caracteres de comparación (protocolo, sombra, Cd/suelo, herencia).",
      )
      return
    }
    if (state.decadeGenotypeA === state.decadeGenotypeB) {
      setMessage("Dualita: elige dos materiales distintos para comparar bajo el mismo protocolo.")
      return
    }
    const next: GotchiState = {
      ...state,
      decadePlanComplete: true,
      knowledge: clamp(state.knowledge + 12),
      xp: state.xp + 40,
    }
    setState(next)
    persist(next)
    setMessage(
      `Dualita: plan decenal guardado · +${mazorcaRewards.gotchiDecadePlan} MD. Comparar ${state.decadeGenotypeA} vs ${state.decadeGenotypeB} crea conciencia de tipicidad.`,
    )
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
    if (hour === 120) {
      setMessage(
        `Dualita: lote cerrado a 120 h · +${mazorcaRewards.gotchiHarvest} MD. Tipicidad araucana se defiende en red.`,
      )
    }
  }

  function reset() {
    const next = { ...initialState, plantedAt: now(), lastGrowthAt: now() }
    setState(next)
    persist(next)
    setMessage("Nueva labranza. Empieza por el modelo araucano y la cartografía.")
  }

  return (
    <div className="gotchi-shell">
      <div className="labranza-planner">
        <div>
          <p className="eyebrow text-colab-yellow">Sembrar · modelo araucano × Ecoyuma</p>
          <h2>{sembrarGenerationCopy.headline}</h2>
          <p>{sembrarGenerationCopy.body}</p>
        </div>
        <div className="labranza-fields">
          <label>
            <span>Nombre de labranza</span>
            <input
              value={state.labranzaName}
              onChange={(event) =>
                setState({ ...state, labranzaName: event.target.value.slice(0, 50) })
              }
            />
          </label>
          <label>
            <span>Continuidad</span>
            <select
              value={state.generation}
              onChange={(event) =>
                setState({
                  ...state,
                  generation: event.target.value as GotchiState["generation"],
                })
              }
            >
              <option value="primera">Primera generación · recién empieza</option>
              <option value="heredada">Labranza heredada</option>
              <option value="comunitaria">Labranza comunitaria</option>
            </select>
          </label>
          <label>
            <span>Modelo agroforestal</span>
            <select
              value={state.plantingSystem}
              onChange={(event) =>
                setState({
                  ...state,
                  plantingSystem: event.target.value as GotchiState["plantingSystem"],
                })
              }
            >
              {agroforestryModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              persist(state)
              setMessage("Identidad de finca guardada. Sigue con cartografía y bitácora.")
            }}
          >
            Guardar identidad
          </button>
        </div>
      </div>

      <aside className="sembrar-do-callout">
        <p className="eyebrow text-colab-yellow">{sembrarDoDispute.eyebrow}</p>
        <h3>{sembrarDoDispute.title}</h3>
        <p>{sembrarDoDispute.body}</p>
        <ul>
          {sembrarDoDispute.bullets.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
        <div className="sembrar-do-links">
          <Link href={sembrarDoDispute.knowledgeHref}>Leer DO en conocimiento →</Link>
          <a href={sembrarDoDispute.fedecacaoAraucaHref} target="_blank" rel="noopener noreferrer">
            Fedecacao · Arauquita
          </a>
          <a href={sembrarDoDispute.orinoquiaTraceHref} target="_blank" rel="noopener noreferrer">
            Trazabilidad Orinoquía (Fedecacao)
          </a>
        </div>
      </aside>

      <section className="sembrar-plantulas">
        <div className="sembrar-plantulas-head">
          <div>
            <p className="eyebrow text-colab-yellow">Modelo araucano</p>
            <h3>FEAR 5 · Tame 2 · Saravena 13</h3>
            <p>
              Trío Fedecacao (FEAR 5 / FTA 2 / FSA 13) del modelo integrado de Arauquita — el eje
              pedagógico de Sembrar, cercano al debate de denominación de origen. Cacao Colab no
              inventa stock ni DO registrada.
            </p>
          </div>
          <Link href="/conocimiento/denominacion-origen" className="sembrar-ext-link">
            Contexto DO →
          </Link>
        </div>
        <div className="sembrar-plantula-grid">
          {modeloAraucanoPlantulas.map((plant) => (
            <button
              key={plant.code}
              type="button"
              className={plant.code === state.genotypeCode ? "active" : ""}
              onClick={() => chooseGenotype(plant.code)}
            >
              <strong>{plant.code}</strong>
              <span>{plant.family}</span>
              <small>{plant.why}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="sembrar-plantulas">
        <div className="sembrar-plantulas-head">
          <div>
            <p className="eyebrow text-colab-yellow">Referencia CoEx · Meta</p>
            <h3>San Vicente 41 (FSV 41)</h3>
            <p>
              Oro Cacao of Excellence Ámsterdam (feb. 2024): muestra WORKAKAO / Agroguamal · Guamal
              Meta con FEAR 5 + FSV 41. FEAR 5 sigue siendo el eje comercial/paper; FSV 41 entra como
              referencia territorial — no como tipificación de Chocolover u otros nodos.
            </p>
          </div>
          <a
            href="https://www.cacaoofexcellence.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="sembrar-ext-link"
          >
            Cacao of Excellence →
          </a>
        </div>
        <div className="sembrar-plantula-grid sembrar-plantula-grid--single">
          {coexReferencePlantulas.map((plant) => (
            <button
              key={plant.code}
              type="button"
              className={plant.code === state.genotypeCode ? "active" : ""}
              onClick={() => chooseGenotype(plant.code)}
            >
              <strong>{plant.code}</strong>
              <span>{plant.family}</span>
              <small>{plant.why}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="sembrar-plantulas">
        <div className="sembrar-plantulas-head">
          <div>
            <p className="eyebrow text-colab-yellow">Catálogo externo · Ecoyuma</p>
            <h3>Plántulas para contrastar tipicidad</h3>
            <p>
              Catálogo externo — Cacao Colab no inventa stock. FEAR 5 es el eje; TCS 19 y TCS 06
              contrastan tipicidad bajo el mismo protocolo.
            </p>
          </div>
          <a href={sembrarCatalogHref} target="_blank" rel="noopener noreferrer" className="sembrar-ext-link">
            Ver vivero Ecoyuma →
          </a>
        </div>
        <div className="sembrar-plantula-grid">
          {ecoyumaCatalogPlantulas.map((plant) => (
            <button
              key={`eco-${plant.code}`}
              type="button"
              className={plant.code === state.genotypeCode ? "active" : ""}
              onClick={() => chooseGenotype(plant.code)}
            >
              <strong>{plant.code}</strong>
              <span>{plant.family}</span>
              <small>{plant.why}</small>
            </button>
          ))}
        </div>
        <p className="sembrar-plantula-note">
          Seleccionado: <strong>{plantula.label}</strong> · {plantula.ecoyumaSkuNote}
          {plantula.ecoyumaHref ? (
            <>
              {" · "}
              <a href={plantula.ecoyumaHref} target="_blank" rel="noopener noreferrer">
                abrir SKU
              </a>
            </>
          ) : null}
        </p>
      </section>

      <div className="gotchi-node-picker">
        <div>
          <p className="eyebrow text-colab-yellow">Nodo de aprendizaje</p>
          <strong>
            {selectedTerritory?.nodeName} · {selectedTerritory?.city}
          </strong>
          <small>{nodeGenetics?.blurb ?? selectedTerritory?.flavorProfile}</small>
          <small className="gotchi-node-disclaimer">
            Genotipo del laboratorio: <strong>{state.genotypeCode}</strong> — escenario didáctico.
            {nodeGenetics?.tipifiedByNode.length
              ? ` Tipificado por este nodo en el Colab: ${nodeGenetics.tipifiedByNode.join(", ")}.`
              : " Este nodo no tipifica clones aquí; no correlaciones genética inventada."}{" "}
            Confirma material real en finca / Ecoyuma / Fedecacao.
          </small>
        </div>
        <div>
          {territories
            .filter((territory) => territory.id !== "bogota")
            .map((territory) => (
              <button
                key={territory.id}
                type="button"
                onClick={() => chooseNode(territory.id)}
                className={territory.id === state.selectedNode ? "active" : ""}
                title={geneticsForTerritory(territory.id)?.didacticFocus}
              >
                {territory.nodeName}
              </button>
            ))}
        </div>
      </div>

      <aside className="sembrar-agro-strip">
        <div>
          <p className="eyebrow text-colab-yellow">Modelo activo</p>
          <h3>{agroModel.name}</h3>
          <p>{agroModel.intent}</p>
        </div>
        <ul>
          {agroModel.strata.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="sembrar-agro-for">{agroModel.forWhom}</p>
      </aside>

      <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-5 mt-4">
        <section className="gotchi-pet">
          <div className="flex justify-between items-start">
            <div>
              <p className="eyebrow text-colab-yellow">
                Sembrar · {state.labranzaName}
              </p>
              <h2 className="font-serif text-3xl font-bold text-colab-cream mt-2">
                {state.phase === "cultivation"
                  ? stage.name
                  : state.phase === "complete"
                    ? "Lote fermentado"
                    : "Fermentando"}
              </h2>
            </div>
            <span className="gotchi-day">
              {state.phase === "cultivation" ? `${state.ageHours} h` : `${state.fermentationHour} h`}
            </span>
          </div>
          <div
            className="gotchi-orb"
            aria-label={state.phase === "cultivation" ? stage.name : state.genotypeCode}
          >
            <span>
              {state.phase === "cultivation" ? stage.icon : state.phase === "complete" ? "✦" : "◈"}
            </span>
            {[0, 1, 2].map((ring) => (
              <i key={ring} style={{ animationDelay: `${ring * 0.45}s` }} />
            ))}
          </div>
          <div className="gotchi-message">
            <span className="gotchi-message-from">Dualita</span>
            {message.replace(/^\s*Dualita\s*:\s*/i, "")}
          </div>
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
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <div>
                  <i style={{ width: `${clamp(metric.bar)}%`, background: metric.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="gotchi-console">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-colab-green">
                {state.phase === "cultivation"
                  ? "Oficio de quien recién siembra"
                  : `Tratamiento Cacaotier · ${state.genotypeCode}`}
              </p>
              <h2 className="font-serif text-3xl font-bold text-colab-ink mt-2">
                {state.phase === "cultivation" ? "Bitácora, mapa y cuidado." : fermentationPoint.stage}
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="gotchi-score">
                <strong>{state.xp}</strong>
                <span>XP</span>
              </div>
              <div className="gotchi-score">
                <strong>{state.streak}</strong>
                <span>racha</span>
              </div>
            </div>
          </div>

          {state.phase === "cultivation" && (
            <div className="sembrar-tabs" role="tablist">
              {(
                [
                  ["cuidado", "Cuidado"],
                  ["bitacora", "Bitácora"],
                  ["mapa", "Cartografía"],
                  ["plan", "Planeación"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={panel === id}
                  className={panel === id ? "active" : ""}
                  onClick={() => setPanel(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {state.phase === "cultivation" && panel === "cuidado" && (
            <>
              <div className="gotchi-parameters mt-6">
                {[
                  ["Altura", `${state.heightCm} cm`],
                  ["Hojas", state.leaves],
                  ["Flores", state.flowers],
                  ["Mazorca", state.pods],
                  ["Nutrición", `${Math.round(state.nutrition)}%`],
                  ["Sombra", `${Math.round(state.shade)}%`],
                  ["Biodiversidad", `${Math.round(state.biodiversity)}%`],
                  ["Polinizadores", `${Math.round(state.pollinators)}%`],
                  ["Cobertura", `${Math.round(state.soilCover)}%`],
                  ["Reserva agua", `${Math.round(state.waterReserve)}%`],
                  ["pH suelo", state.soilPh.toFixed(2)],
                  ["Riesgo Cd*", `${cdRisk}`],
                  ["Edad", `${state.ageHours} h`],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <aside className={`sembrar-cd-card tone-${cdLabel.tone}`}>
                <p className="eyebrow">{cadmiumPedagogy.eyebrow}</p>
                <strong>
                  {cdLabel.label} · índice {cdRisk}
                </strong>
                <p>{cdLabel.tip}</p>
                <p className="sembrar-cd-note">{cadmiumPedagogy.farmBody}</p>
              </aside>
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-colab-ink/50">
                  <span>{stage.name}</span>
                  <span>
                    {perfectReady
                      ? "Hito cuidado perfecto listo"
                      : nextStage
                        ? `Siguiente: ${nextStage.name}`
                        : "Cosecha disponible"}
                  </span>
                </div>
                <div className="gotchi-progress mt-2">
                  <i style={{ width: `${clamp(stageProgress)}%` }} />
                </div>
                <p className="text-sm text-colab-ink/60 mt-4">
                  <strong className="text-colab-ink">Misión:</strong> {stage.mission}
                </p>
                {!perfectReady && state.ageHours >= 78 && (
                  <p className="text-sm text-colab-forest mt-2 font-medium">
                    Cuidado perfecto ({PERFECT_CARE_HOUR} h · 100%): falta {careGaps.slice(0, 4).join(" · ")}
                    {careGaps.length > 4 ? "…" : ""}
                  </p>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {actions.map((action) => (
                  <button key={action.id} type="button" onClick={() => care(action)} className="care-action">
                    <span>{action.icon}</span>
                    <span>
                      <strong>{action.label}</strong>
                      <small>
                        +{action.xp} XP · +{mazorcaRewards.gotchiCare} MD (tope{" "}
                        {mazorcaRewards.gotchiCareDailyCap}/día)
                      </small>
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                <button type="button" onClick={() => simulateHours(12)} className="gotchi-simulate">
                  Entrenamiento: avanzar 12 h
                </button>
                <button
                  type="button"
                  disabled={state.ageHours < 78}
                  onClick={startFermentation}
                  className={perfectReady ? "gotchi-ferment gotchi-ferment-perfect" : "gotchi-ferment"}
                >
                  {state.ageHours < 78
                    ? `Cosecha en ${78 - state.ageHours} h`
                    : perfectReady
                      ? `Recolectar cuidado perfecto · +${mazorcaRewards.gotchiHarvestOpen + mazorcaRewards.gotchiPerfectCare} MD →`
                      : `Cosechar · +${mazorcaRewards.gotchiHarvestOpen} MD → fermentar`}
                </button>
              </div>
            </>
          )}

          {state.phase === "cultivation" && panel === "bitacora" && (
            <div className="sembrar-panel mt-6">
              <p className="text-sm text-colab-ink/60 leading-relaxed">
                La bitácora es el músculo del agricultor que quiere el mejor cacao posible: observar,
                fechar, decidir. Usa las guías Ecoyuma × Colab.
              </p>
              <label className="sembrar-field mt-4">
                <span>Guía activa</span>
                <select
                  value={state.activePromptId}
                  onChange={(e) => setState({ ...state, activePromptId: e.target.value })}
                >
                  {bitacoraPrompts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.week} · {p.title}
                    </option>
                  ))}
                </select>
              </label>
              <p className="sembrar-prompt">
                <strong>{activePrompt.ask}</strong>
                <small>{activePrompt.tip}</small>
              </p>
              <textarea
                value={bitacoraDraft}
                onChange={(e) => setBitacoraDraft(e.target.value)}
                placeholder="Escribe lo que viste hoy en la labranza…"
                rows={4}
              />
              <button type="button" className="gotchi-ferment mt-3" onClick={saveBitacora}>
                Registrar en bitácora · +15 XP
              </button>
              <ul className="sembrar-log">
                {state.bitacora.length === 0 && (
                  <li className="empty">Aún no hay entradas. Empieza por la línea base (semana 0).</li>
                )}
                {state.bitacora.map((entry) => {
                  const prompt = bitacoraPrompts.find((p) => p.id === entry.promptId)
                  return (
                    <li key={entry.id}>
                      <strong>{prompt?.title ?? "Nota"}</strong>
                      <time>{entry.at.slice(0, 10)}</time>
                      <p>{entry.note}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {state.phase === "cultivation" && panel === "mapa" && (
            <div className="sembrar-panel mt-6">
              <p className="text-sm text-colab-ink/60 leading-relaxed">
                Cartografía social de la finca: no solo polígono GPS — también vecinos, agua y
                acuerdos. Así diseñas tipicidad con territorio.
              </p>
              {cartografiaLayers.map((layer) => {
                const key = layer.id as keyof FarmMap
                return (
                  <label key={layer.id} className="sembrar-field mt-4">
                    <span>{layer.name}</span>
                    <textarea
                      value={state.farmMap[key]}
                      onChange={(e) =>
                        setState({
                          ...state,
                          farmMap: { ...state.farmMap, [key]: e.target.value.slice(0, 500) },
                        })
                      }
                      placeholder={layer.prompt}
                      rows={2}
                    />
                  </label>
                )
              })}
              <button
                type="button"
                className="gotchi-ferment mt-4"
                onClick={() => {
                  const next = { ...state, knowledge: clamp(state.knowledge + 6), xp: state.xp + 12 }
                  setState(next)
                  persist(next)
                  setMessage("Cartografía guardada. El mapa social es parte de tu finca idónea.")
                }}
              >
                Guardar cartografía · +12 XP
              </button>
            </div>
          )}

          {state.phase === "cultivation" && panel === "plan" && (
            <div className="sembrar-panel mt-6">
              <ol className="sembrar-milestones">
                {planningMilestones.map((m) => (
                  <li key={m.id}>
                    <strong>{m.title}</strong>
                    <p>{m.body}</p>
                  </li>
                ))}
              </ol>
              <div className="sembrar-decade-card mt-5">
                <p className="eyebrow text-colab-green">{decadePlanCopy.eyebrow}</p>
                <h3>{decadePlanCopy.title}</h3>
                <p>{decadePlanCopy.body}</p>
                <p className="sembrar-decade-prize">{decadePlanCopy.prizeNote}</p>
                <div className="sembrar-decade-gens">
                  <label className="sembrar-field">
                    <span>Genotipo A</span>
                    <select
                      value={state.decadeGenotypeA}
                      onChange={(e) => setState({ ...state, decadeGenotypeA: e.target.value })}
                    >
                      {["FEAR 5", "FTA 2", "FSA 13", "FSV 41", "TCS 19", "TCS 06"].map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="sembrar-field">
                    <span>Genotipo B (contraste)</span>
                    <select
                      value={state.decadeGenotypeB}
                      onChange={(e) => setState({ ...state, decadeGenotypeB: e.target.value })}
                    >
                      {["FEAR 5", "FTA 2", "FSA 13", "FSV 41", "TCS 19", "TCS 06"].map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="sembrar-field mt-3">
                  <span>Comparación a 10 años (≥120 caracteres)</span>
                  <textarea
                    value={state.decadePlanNotes}
                    onChange={(e) =>
                      setState({ ...state, decadePlanNotes: e.target.value.slice(0, 1200) })
                    }
                    placeholder="Mismo protocolo de sombra/nutrición/fermentación; distinto material. Incluye pH/Cd, quién hereda el criterio y cómo lees tipicidad sin mezclar lotes…"
                    rows={5}
                  />
                </label>
                <button
                  type="button"
                  className="gotchi-ferment mt-3"
                  onClick={saveDecadePlan}
                  disabled={state.decadePlanComplete}
                >
                  {state.decadePlanComplete
                    ? "Plan decenal ya premiado"
                    : `Guardar plan 10 años · +${mazorcaRewards.gotchiDecadePlan} MD`}
                </button>
              </div>
              <label className="sembrar-field mt-4">
                <span>Notas libres de finca</span>
                <textarea
                  value={state.planNotes}
                  onChange={(e) => setState({ ...state, planNotes: e.target.value.slice(0, 800) })}
                  placeholder="Calendario de siembra, vivero, acuerdos comunitarios…"
                  rows={3}
                />
              </label>
              <button
                type="button"
                className="gotchi-simulate mt-3"
                onClick={() => {
                  persist(state)
                  setMessage("Notas guardadas. La siguiente generación necesita un mapa, no solo un deseo.")
                }}
              >
                Guardar notas
              </button>
              <div className="sembrar-collective mt-5">
                <p>{sembrarGenerationCopy.body}</p>
                <Link href="/unete">{sembrarGenerationCopy.ctaCollective} →</Link>
              </div>
            </div>
          )}

          {state.phase !== "cultivation" && (
            <div className="fermentation-console">
              <div className="grid grid-cols-3 gap-3 mt-7">
                <div>
                  <span>Hora</span>
                  <strong>{state.fermentationHour} h</strong>
                </div>
                <div>
                  <span>Temperatura guía</span>
                  <strong>{fermentationPoint.temperature} °C</strong>
                </div>
                <div>
                  <span>pH guía</span>
                  <strong>{fermentationPoint.ph.toFixed(1)}</strong>
                </div>
              </div>
              <div className="gotchi-progress mt-6">
                <i style={{ width: `${state.fermentationHour / 1.2}%` }} />
              </div>
              <aside className="sembrar-cd-card tone-mid mt-5">
                <p className="eyebrow">{cadmiumPedagogy.eyebrow}</p>
                <strong>{cadmiumPedagogy.title}</strong>
                <p>{cadmiumPedagogy.fermentBody}</p>
                <ul className="sembrar-cd-sources">
                  {cadmiumPedagogy.sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
              <p className="text-sm leading-relaxed text-colab-ink/60 mt-5">
                Escenario educativo con genotipo {state.genotypeCode}
                {nodeGenetics ? ` en nodo ${nodeGenetics.nodeName}` : ""}. Temperatura guía{" "}
                {fermentationPoint.temperature} °C · pH {fermentationPoint.ph.toFixed(1)}. No implica
                DO ni Cd cero — documenta tu lote real en Master Cacaotier.
              </p>
              {state.phase !== "complete" ? (
                <button type="button" onClick={advanceFermentation} className="gotchi-ferment mt-6">
                  Registrar siguiente control +24 h →
                </button>
              ) : (
                <div className="mt-6 bg-colab-yellow/30 rounded-xl p-4 text-sm font-bold text-colab-forest">
                  ✦ Lote cerrado a 120 h · +{mazorcaRewards.gotchiHarvest} MD. Cascarilla/testa se
                  descarta en tostión: ahí puede ir parte del Cd movido por fermentación controlada.
                  Siguiente: plan 10 años + /unete.
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-5 border-t border-colab-ink/10">
            <p className="text-[11px] text-colab-ink/45">
              {sync === "saving"
                ? "Sincronizando…"
                : sync === "saved"
                  ? "✓ Guardado en tu cuenta"
                  : sync === "local"
                    ? "Guardado local; aplica la migración de campus."
                    : "Sembrar · simulación comprimida para aprendizaje."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="text-[10px] font-bold uppercase tracking-wider text-colab-ink/35 hover:text-colab-ink"
            >
              Reiniciar labranza
            </button>
          </div>
        </section>
      </div>

      <div className="stage-rail mt-5">
        {stages.map((item, index) => (
          <div key={item.name} className={index <= stageIndex ? "stage-done" : ""}>
            <span>{index < stageIndex ? "✓" : item.icon}</span>
            <small>
              {item.name} · {item.threshold} h
            </small>
          </div>
        ))}
      </div>

      <DualitaCompanion
        message={message}
        mood={sembrarDualitaMood}
        pulseKey={dualitaPulse}
        compact
        tips={[
          "Riega con criterio: humedad estable > picos de agua.",
          "Observar y bitácora suman saber — Dualita celebra el oficio.",
          "Sombra y cobertura bajan riesgo de Cd en el lote.",
          "Tipicidad araucana se defiende con protocolo, no con hype.",
          "Cuando dudes, elige lo que podrías explicar a otro productor.",
        ]}
      />
    </div>
  )
}
