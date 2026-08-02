/**
 * Acceso a Masters: por rango (MD históricas ganadas cultivando),
 * no por canjear saldo. Sembrar + Dualita (CAÚA / Zurych) suben lifetime.
 */
import { communityRanks, resolveRank } from "@/lib/loyalty"
import {
  ARCHITECT_COURSE_SLUG,
} from "@/lib/architect-course"
import { CHOCOLATIER_COURSE_SLUG } from "@/lib/chocolatier-course"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { BENEVOLO_COURSE_SLUG } from "@/lib/benevolo-brand"

export type MasterCourseSlug =
  | typeof ARCHITECT_COURSE_SLUG
  | typeof CATADOR_COURSE_SLUG
  | typeof CHOCOLATIER_COURSE_SLUG
  | typeof BENEVOLO_COURSE_SLUG

type RankSlug = (typeof communityRanks)[number]["slug"]

/** Umbral de rango para abrir cada Master. */
export const masterRankGate: Record<MasterCourseSlug, RankSlug> = {
  [ARCHITECT_COURSE_SLUG]: "brote",
  [CATADOR_COURSE_SLUG]: "labrador",
  [CHOCOLATIER_COURSE_SLUG]: "labrador",
  [BENEVOLO_COURSE_SLUG]: "labrador",
}

export const masterAccessCopy = {
  principle:
    "Los Masters se abren con tu rango (MD históricas). Gánalas en Sembrar y en Dualita (micro CAÚA + MOOC Zurych) — no canjeando saldo por «aceleración».",
  earnCtas: [
    { label: "Sembrar", href: "/juega" },
    { label: "Micro CAÚA", href: "/aprende" },
    { label: "MOOC Zurych", href: "/aprende" },
  ],
} as const

const RANK_ORDER = communityRanks.map((r) => r.slug)

function rankIndex(slug: RankSlug) {
  return RANK_ORDER.indexOf(slug)
}

export function isMasterCourseSlug(slug: string): slug is MasterCourseSlug {
  return slug in masterRankGate
}

export function resolveMasterAccess(lifetimeMd: number, courseSlug: MasterCourseSlug) {
  const requiredSlug = masterRankGate[courseSlug]
  const required = communityRanks.find((r) => r.slug === requiredSlug)!
  const current = resolveRank(lifetimeMd)
  const unlocked = rankIndex(current.slug) >= rankIndex(requiredSlug)
  const mdToUnlock = unlocked ? 0 : Math.max(0, required.threshold - lifetimeMd)
  return {
    unlocked,
    requiredRankSlug: required.slug,
    requiredRankName: required.name,
    requiredThreshold: required.threshold,
    currentRankSlug: current.slug,
    currentRankName: current.name,
    lifetimeMd,
    mdToUnlock,
    message: unlocked
      ? `Disponible con tu rango ${current.name}.`
      : `Necesitas rango ${required.name} (${required.threshold.toLocaleString("es-CO")} MD históricas). Te faltan ${mdToUnlock.toLocaleString("es-CO")} MD — gánalas en Sembrar y Dualita.`,
  }
}

export type MasterAccess = ReturnType<typeof resolveMasterAccess>
