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

/** Preview visual del diploma (mismo diseño OG / exhibición). */
export function diplomaOgPreviewUrl(input: {
  name: string
  title: string
  grade: string
  course?: string
}) {
  const params = new URLSearchParams({
    name: input.name,
    title: input.title,
    grade: input.grade,
  })
  if (input.course) params.set("course", input.course)
  return `${getSiteUrl()}/api/og/diploma?${params.toString()}`
}

export function foroShareHref(input: {
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

export function defaultProgressCopy(
  courseSlug: string,
  grade?: string | null,
  diplomaUrl?: string | null,
) {
  const course = COURSE_SHARE_LABEL[courseSlug] ?? "Campus Colab"
  const gradeBit = grade ? ` · ${grade}` : ""
  const diplomaBit = diplomaUrl
    ? `\n\n🎓 Mi diploma digital:\n${diplomaUrl}`
    : ""
  return {
    title: `Cerré ${course}${gradeBit}`,
    body: `Comparto mi diploma en el foro del Colab: ${course}. Invito a practicar lo aprendido en Sembrar y a sumar criterio colectivo.${diplomaBit}\n\n¿Quién se anima a la siguiente misión?`,
  }
}

export function sanitizeDiplomaUrl(raw?: string | null): string | null {
  if (!raw) return null
  const trimmed = raw.trim().slice(0, 500)
  if (!trimmed.startsWith("https://")) return null
  try {
    const url = new URL(trimmed)
    const site = new URL(getSiteUrl())
    if (url.hostname !== site.hostname && url.hostname !== "cacaocolab.org") return null
    if (!url.pathname.startsWith("/credencial/")) return null
    return url.toString()
  } catch {
    return null
  }
}

/** Parse /credencial/{slug}/{code} → pieces for OG preview. */
export function parseDiplomaPath(diplomaUrl: string): {
  courseSlug: string
  code: string
} | null {
  try {
    const url = new URL(diplomaUrl)
    const parts = url.pathname.split("/").filter(Boolean)
    // credencial / slug / code
    if (parts.length < 3 || parts[0] !== "credencial") return null
    return { courseSlug: parts[1], code: parts.slice(2).join("/") }
  } catch {
    return null
  }
}
