import { getSiteUrl } from "@/lib/site"

export const FORUM_EMOJIS = ["🍫", "☕", "🌱", "🔥", "💛"] as const
export type ForumEmoji = (typeof FORUM_EMOJIS)[number]

export type ForumPostKind = "announcement" | "progress" | "sync"

export const FORUM_KIND_LABEL: Record<ForumPostKind, string> = {
  announcement: "Anuncio",
  progress: "Avance de maestría",
  sync: "Sincronicidad",
}

export const COURSE_SHARE_LABEL: Record<string, string> = {
  "maestro-chocolatier": "Master Chocolatier",
  "arquitecto-fermentacion": "Arquitecto de Fermentación",
  "catador-cacao": "Master Catador",
  benevolo: "Benevolo · marca acelerada",
  "benevolo-duja": "Benevolo · marca acelerada",
}

export function diplomaShareUrl(courseSlug: string, diplomaCode: string) {
  const slug =
    courseSlug === "benevolo" || courseSlug === "benevolo-duja"
      ? "benevolo"
      : courseSlug
  return `${getSiteUrl()}/credencial/${slug}/${diplomaCode}`
}

export function defaultProgressCopy(
  courseSlug: string,
  grade?: string | null,
  diplomaUrl?: string | null,
) {
  const course = COURSE_SHARE_LABEL[courseSlug] ?? "Campus Colab"
  const gradeBit = grade ? ` · ${grade}` : ""
  const diplomaBit = diplomaUrl
    ? `\n\n🎓 Ver mi diploma digital:\n${diplomaUrl}`
    : "\n\n(El enlace al diploma se añade al publicar desde el cierre de maestría.)"
  return {
    title: `Cerré ${course}${gradeBit}`,
    body: `Comparto mi avance en el muro del Colab: ${course}. Invito a practicar lo aprendido en Sembrar y a sumar criterio colectivo.${diplomaBit}\n\n¿Quién se anima a la siguiente misión?`,
  }
}

export function muroShareHref(input: {
  courseSlug: string
  gradeLabel: string
  diplomaCode?: string | null
}) {
  const params = new URLSearchParams()
  params.set("share", input.courseSlug)
  if (input.gradeLabel) params.set("grade", input.gradeLabel)
  if (input.diplomaCode) params.set("diploma", input.diplomaCode)
  return `/colab?${params.toString()}`
}

/** Absolute diploma URL for muro composer presets. */
export function muroDiplomaUrl(courseSlug: string, diplomaCode: string | null | undefined) {
  if (!diplomaCode) return null
  return diplomaShareUrl(courseSlug, diplomaCode)
}
