/**
 * Rigor edutainment · rachas, vidas y diploma digital compartible.
 * Estilo Duolingo + Coursera, con onda Cacao Colab.
 */

export const MAX_HEARTS = 5
export const PASS_FIRST_TRY_RATIO = 4 / 6 // Especialidad
export const EXCELLENCE_FIRST_TRY_RATIO = 5 / 6 // Excelencia Fine-Flavor

export type DiplomaGrade = "excelencia" | "especialidad" | "en-practica"

export type MissionScore = {
  attempts: number
  passed: boolean
  firstTry: boolean
}

export type RigorState = {
  completed: string[]
  xp: number
  hearts: number
  heartsDay: string | null
  streak: number
  lastActiveDay: string | null
  scores: Record<string, MissionScore>
  diplomaCode?: string
}

export type DiplomaPayload = {
  v: 1
  course: string
  title: string
  name: string
  issuedAt: string
  grade: DiplomaGrade
  firstTry: number
  total: number
  xp: number
  streak: number
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function emptyRigorState(): RigorState {
  return {
    completed: [],
    xp: 0,
    hearts: MAX_HEARTS,
    heartsDay: todayKey(),
    streak: 0,
    lastActiveDay: null,
    scores: {},
  }
}

export function normalizeRigorState(raw: unknown): RigorState {
  const base = emptyRigorState()
  if (!raw || typeof raw !== "object") return base
  const value = raw as Partial<RigorState> & { completed?: unknown; xp?: unknown }
  const completed = Array.isArray(value.completed)
    ? value.completed.filter((item): item is string => typeof item === "string")
    : []
  return {
    ...base,
    ...value,
    completed,
    xp: typeof value.xp === "number" ? value.xp : 0,
    hearts: typeof value.hearts === "number" ? value.hearts : MAX_HEARTS,
    heartsDay: value.heartsDay ?? todayKey(),
    streak: typeof value.streak === "number" ? value.streak : 0,
    lastActiveDay: value.lastActiveDay ?? null,
    scores: value.scores && typeof value.scores === "object" ? value.scores : {},
    diplomaCode: typeof value.diplomaCode === "string" ? value.diplomaCode : undefined,
  }
}

/** Recarga diaria de vidas (Duolingo-style). */
export function refillHeartsIfNeeded(state: RigorState): RigorState {
  const day = todayKey()
  if (state.heartsDay === day) return state
  return { ...state, hearts: MAX_HEARTS, heartsDay: day }
}

export function bumpStreak(state: RigorState): RigorState {
  const day = todayKey()
  if (state.lastActiveDay === day) return state
  const yesterday = new Date()
  yesterday.setUTCDate(yesterday.getUTCDate() - 1)
  const yKey = yesterday.toISOString().slice(0, 10)
  const streak = state.lastActiveDay === yKey ? state.streak + 1 : 1
  return { ...state, streak, lastActiveDay: day }
}

export function firstTryStats(state: RigorState, missionCount: number) {
  const scores = Object.values(state.scores)
  const firstTry = scores.filter((item) => item.passed && item.firstTry).length
  const total = Math.max(missionCount, 1)
  return { firstTry, total, ratio: firstTry / total }
}

export function gradeFromFirstTry(firstTry: number, total: number): DiplomaGrade {
  const ratio = total === 0 ? 0 : firstTry / total
  if (ratio >= EXCELLENCE_FIRST_TRY_RATIO) return "excelencia"
  if (ratio >= PASS_FIRST_TRY_RATIO) return "especialidad"
  return "en-practica"
}

/** Misma escala por ratio, para cursos con distinto número de misiones. */
export function gradeFromRatio(firstTry: number, total: number): DiplomaGrade {
  return gradeFromFirstTry(firstTry, total)
}

export function gradeLabel(grade: DiplomaGrade) {
  if (grade === "excelencia") return "Excelencia Fine-Flavor"
  if (grade === "especialidad") return "Especialidad aprobada"
  return "En práctica · sigue subiendo"
}

/** Copy corto para UI de certificación (exigente + divertida). */
export function gradeBlurb(grade: DiplomaGrade) {
  if (grade === "excelencia") {
    return "Nota del diploma: casi todos los retos al primer intento. La racha 🔥 es solo constancia diaria — no califica el diploma."
  }
  if (grade === "especialidad") {
    return "Especialidad ganada con rigor. Excelencia pide más retos limpios a la primera. (La racha diaria no cambia esta nota.)"
  }
  return "Vas cultivando criterio. El diploma mira aciertos al primer intento; la racha 🔥 solo celebra que volviste hoy."
}

export function nextGradeHint(firstTry: number, total: number): string | null {
  const grade = gradeFromFirstTry(firstTry, total)
  if (grade === "excelencia") return null
  if (grade === "especialidad") {
    const need = Math.ceil(EXCELLENCE_FIRST_TRY_RATIO * total) - firstTry
    return need > 0
      ? `Para Excelencia Fine-Flavor: ${need} reto${need === 1 ? "" : "s"} más al primer intento (no tiene que ver con la racha 🔥).`
      : null
  }
  const need = Math.ceil(PASS_FIRST_TRY_RATIO * total) - firstTry
  return need > 0
    ? `Para Especialidad: ${need} acierto${need === 1 ? "" : "s"} al primer intento. Practica el paso antes de arriesgar vidas.`
    : null
}

/** Explica la diferencia racha vs nota — para HUD del player. */
export function diplomaGradeExplainer() {
  return "Nota del diploma = retos correctos a la primera. Racha 🔥 = días seguidos estudiando. Son contadores distintos."
}

/**
 * `typeof Buffer !== "undefined"` no distingue Node del navegador: los
 * bundlers de Next.js inyectan un polyfill de `Buffer` en el cliente que
 * NO soporta la codificación `base64url` (solo el `Buffer` nativo de Node
 * la soporta) — usarlo ahí revienta con "Unknown encoding: base64url" al
 * generar el diploma. `window` sí es una señal confiable de navegador.
 */
const isBrowser = typeof window !== "undefined"

export function encodeDiploma(payload: DiplomaPayload): string {
  const json = JSON.stringify(payload)
  if (!isBrowser && typeof Buffer !== "undefined") {
    return Buffer.from(json, "utf8").toString("base64url")
  }
  const bytes = new TextEncoder().encode(json)
  let binary = ""
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

export function decodeDiploma(code: string): DiplomaPayload | null {
  try {
    let json: string
    if (!isBrowser && typeof Buffer !== "undefined") {
      json = Buffer.from(code, "base64url").toString("utf8")
    } else {
      const b64 = code.replace(/-/g, "+").replace(/_/g, "/")
      const pad = b64 + "=".repeat((4 - (b64.length % 4)) % 4)
      json = atob(pad)
    }
    const data = JSON.parse(json) as DiplomaPayload
    if (data?.v !== 1 || !data.course || !data.name) return null
    return data
  } catch {
    return null
  }
}

export function linkedInShareUrl(diplomaPageUrl: string) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(diplomaPageUrl)}`
}

export function xShareUrl(diplomaPageUrl: string, text: string) {
  const params = new URLSearchParams({
    url: diplomaPageUrl,
    text,
  })
  return `https://twitter.com/intent/tweet?${params.toString()}`
}

export function siteOrigin() {
  if (typeof window !== "undefined") return window.location.origin
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://cacaocolab.org"
}
