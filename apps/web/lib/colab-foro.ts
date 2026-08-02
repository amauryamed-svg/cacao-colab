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
  benevolo: "Benevolo · marca acelerada",
}

export function defaultProgressCopy(courseSlug: string, grade?: string | null) {
  const course = COURSE_SHARE_LABEL[courseSlug] ?? "Campus Colab"
  const gradeBit = grade ? ` · nota ${grade}` : ""
  return {
    title: `Cerré ${course}${gradeBit}`,
    body: `Comparto mi avance en el Colab: ${course}. Invito a practicar lo aprendido en Sembrar y a sumar criterio colectivo. ¿Quién se anima a la siguiente misión?`,
  }
}
