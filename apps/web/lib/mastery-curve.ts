/**
 * Curva de maestría del funnel Colab — gravity del learner en bucle
 * crecimiento ↔ aprendizaje. Inspirada en la curva Dunning–Kruger invertida
 * hacia oficio: optimismo desinformado → pesimismo → vacío de sentido →
 * optimismo informado → maestría con microvictorias.
 *
 * No es clínica. Es pedagogía Dualita: «solo sé que nada sé» se resuelve
 * con evidencias pequeñas (bitácora, panel, Sembrar), no con un sprint.
 */

export type MasteryPhaseId =
  | "optimism-uninformed"
  | "pessimism"
  | "meaning-gap"
  | "optimism-informed"
  | "mastery"

export type MasteryPhase = {
  id: MasteryPhaseId
  order: number
  eyebrow: string
  title: string
  body: string
  microVictory: string
  gravityHref: string
  gravityCta: string
  /** Rango aproximado donde suele sentirse esta fase */
  rankHint: string
}

export const masteryCurvePrinciple =
  "La maestría no es un pico de confianza: es un bucle. Cada microvictoria (módulo, bitácora, panel limpio) convierte el «solo sé que nada sé» en criterio defendible."

export const masteryPhases: MasteryPhase[] = [
  {
    id: "optimism-uninformed",
    order: 1,
    eyebrow: "Fase 01 · Optimismo desinformado",
    title: "Todo parece alcanzable",
    body: "Llegas con hambre de cacao Fine-Flavor. Dualita y Sembrar se ven cercanos. Es bueno empezar — peligroso creer que ya sabes catar o fermentar.",
    microVictory: "Un módulo CAÚA o una nota en bitácora. Primera evidencia, cero pose.",
    gravityHref: "/aprende",
    gravityCta: "Empezar Dualita",
    rankHint: "Semilla",
  },
  {
    id: "pessimism",
    order: 2,
    eyebrow: "Fase 02 · Pesimismo",
    title: "El oficio duele",
    body: "Fallan vidas en el Master, la labranza decae, el panel te contradice. Aquí muchos abandonan. El Colab pide quedarse: el pesimismo es dato, no destino.",
    microVictory: "Repite una misión al primer intento limpio o estabiliza Agua/Vitalidad un día.",
    gravityHref: "/juega",
    gravityCta: "Cuidar labranza",
    rankHint: "Semilla → Brote",
  },
  {
    id: "meaning-gap",
    order: 3,
    eyebrow: "Fase 03 · Falta de sentido",
    title: "¿Para qué tanto rigor?",
    body: "Sin meaning el grind se siente vacío: MD sin tipicidad, XP sin criterio. La curva pide conectar estudio (Zurych/CAÚA) con práctica (Sembrar) y panel (Catador).",
    microVictory: "Una ficha de lote + un descriptor CoEx preciso. El sentido vuelve con evidencia.",
    gravityHref: "/aprende/catador",
    gravityCta: "Ver Catador",
    rankHint: "Brote",
  },
  {
    id: "optimism-informed",
    order: 4,
    eyebrow: "Fase 04 · Optimismo informado",
    title: "Ya sabes qué no sabes",
    body: "Arquitecto, Catador y Chocolatier dejan de ser mito: son protocolos. Confías porque mediste, no porque soñaste. «Solo sé que nada sé» se vuelve método.",
    microVictory: "Cierra un Master o un flight ciego justificado. Comparte diploma o ficha en el foro.",
    gravityHref: "/campus/catador-cacao",
    gravityCta: "Entrar a Catador",
    rankHint: "Labrador",
  },
  {
    id: "mastery",
    order: 5,
    eyebrow: "Fase 05 · Maestría",
    title: "Dominio que se hereda",
    body: "Maestría = repetición deliberada + tipicidad defendible + transferencia. Mentoría, plan a 10 años y set de catación para formar a otros — no para presumir medallas ajenas.",
    microVictory: "Publica un output en R&D o guía a un nodo hacia su página de producto.",
    gravityHref: "/collaboratorio",
    gravityCta: "Ver Collaboratorio",
    rankHint: "Guardián+",
  },
]

/** Mapea lifetime MD a la fase dominante del funnel (didáctico). */
export function masteryPhaseForLifetime(lifetimeMd: number): MasteryPhase {
  if (lifetimeMd >= 1000) return masteryPhases[4]
  if (lifetimeMd >= 400) return masteryPhases[3]
  if (lifetimeMd >= 120) return masteryPhases[2]
  if (lifetimeMd >= 40) return masteryPhases[1]
  return masteryPhases[0]
}

export const masteryFunnelPath = [
  { n: "01", title: "Dualita", href: "/aprende", note: "Micro CAÚA + MOOC Zurych" },
  { n: "02", title: "Sembrar", href: "/juega", note: "Cuidado · bitácora · MD" },
  { n: "03", title: "Arquitecto", href: "/campus/arquitecto-fermentacion", note: "Brote+" },
  { n: "04", title: "Catador", href: "/campus/catador-cacao", note: "Labrador+ · rueda Colab" },
  { n: "05", title: "Chocolatier", href: "/campus/maestro-chocolatier", note: "Labrador+ · 70 %" },
  { n: "06", title: "Collaboratorio", href: "/collaboratorio", note: "R&D · página de producto" },
] as const
