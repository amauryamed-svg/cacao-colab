/**
 * Acceso a Masters: Colab abierto / freemium.
 * El rango (MD históricas) sigue midiendo oficio comunitario;
 * no es un muro para probar las certificaciones.
 */
import { communityRanks, resolveRank } from "@/lib/loyalty"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { CHOCOLATIER_COURSE_SLUG } from "@/lib/chocolatier-course"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { BENEVOLO_COURSE_SLUG } from "@/lib/benevolo-brand"

export type MasterCourseSlug =
  | typeof ARCHITECT_COURSE_SLUG
  | typeof CATADOR_COURSE_SLUG
  | typeof CHOCOLATIER_COURSE_SLUG
  | typeof BENEVOLO_COURSE_SLUG

type RankSlug = (typeof communityRanks)[number]["slug"]

/** Umbral mínimo. Semilla = freemium: cualquier cuenta entra a probar. */
export const masterRankGate: Record<MasterCourseSlug, RankSlug> = {
  [ARCHITECT_COURSE_SLUG]: "semilla",
  [CATADOR_COURSE_SLUG]: "semilla",
  [CHOCOLATIER_COURSE_SLUG]: "semilla",
  [BENEVOLO_COURSE_SLUG]: "semilla",
}

export const masterAccessCopy = {
  principle:
    "El Colab está abierto. Las certificaciones se prueban en freemium (rango Semilla). El rango sigue midiendo oficio en Sembrar y Dualita; no cierra la puerta. Shopify es otra vía, no la única.",
  earnCtas: [
    { label: "Prueba freemium", href: "/prueba" },
    { label: "Landing Cacaotier", href: "/aprende/cacaotier" },
    { label: "Campus Dualita", href: "/aprende" },
    { label: "Cotizador FOB", href: "/export" },
  ],
} as const

const RANK_ORDER = communityRanks.map((r) => r.slug)

function rankIndex(slug: RankSlug) {
  return RANK_ORDER.indexOf(slug)
}

export function isMasterCourseSlug(slug: string): slug is MasterCourseSlug {
  return slug in masterRankGate
}

export function resolveMasterAccess(
  lifetimeMd: number,
  courseSlug: MasterCourseSlug,
  options: { bypass?: boolean } = {},
) {
  const requiredSlug = masterRankGate[courseSlug]
  const required = communityRanks.find((r) => r.slug === requiredSlug)!
  const current = resolveRank(lifetimeMd)
  const byRank = rankIndex(current.slug) >= rankIndex(requiredSlug)
  const unlocked = Boolean(options.bypass) || byRank
  const mdToUnlock = unlocked ? 0 : Math.max(0, required.threshold - lifetimeMd)
  return {
    unlocked,
    bypassed: Boolean(options.bypass),
    requiredRankSlug: required.slug,
    requiredRankName: required.name,
    requiredThreshold: required.threshold,
    currentRankSlug: current.slug,
    currentRankName: current.name,
    lifetimeMd,
    mdToUnlock,
    message: options.bypass
      ? "Acceso superadmin · todas las certificaciones están abiertas."
      : unlocked
        ? `Disponible en freemium · tu rango hoy es ${current.name}.`
        : `Necesitas rango ${required.name} (${required.threshold.toLocaleString("es-CO")} MD históricas). Te faltan ${mdToUnlock.toLocaleString("es-CO")} MD — o entra por la prueba freemium / Shopify.`,
  }
}

export type MasterAccess = ReturnType<typeof resolveMasterAccess>

/** Igual que el gate de /campus: rango O sesión ya empezada (Coursera-style). */
export function canContinueMaster(
  access: Pick<MasterAccess, "unlocked">,
  status: "not_started" | "in_progress" | "certified",
) {
  return access.unlocked || status !== "not_started"
}

export function masterPrimaryCtaLabel(input: {
  status: "not_started" | "in_progress" | "certified"
  completedCount: number
  missionCount: number
}) {
  if (input.status === "certified") return "Repasar ruta →"
  if (input.status === "in_progress") {
    const left = Math.max(0, input.missionCount - input.completedCount)
    return left <= 1 ? "Terminar sesión →" : "Continuar sesión →"
  }
  return "Empezar prueba freemium →"
}
