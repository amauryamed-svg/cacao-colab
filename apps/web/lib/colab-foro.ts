export const FORUM_EMOJIS = ["🍫", "☕", "🌱", "🔥", "💛"] as const
export type ForumEmoji = (typeof FORUM_EMOJIS)[number]

export type ForumPostKind = "announcement" | "progress" | "sync"

export const FORUM_KIND_LABEL: Record<ForumPostKind, string> = {
  announcement: "Anuncio",
  progress: "Avance de maestría",
  sync: "Sincronicidad",
}

export type MasterInviteMeta = {
  slug: string
  label: string
  shortLabel: string
  poster: string
  packLabel: string
  inviteHref: string
  campusHref: string
  blurb: string
  dualitaLine: string
  accent: string
}

/** Masters invitables desde el foro (thumbnail + CTA). */
export const MASTER_INVITES: Record<string, MasterInviteMeta> = {
  "maestro-chocolatier": {
    slug: "maestro-chocolatier",
    label: "Master Chocolatier",
    shortLabel: "Chocolatier 70 %",
    poster: "/benevolo/bars-fear5.png",
    packLabel: "Bars. · FEAR 5",
    inviteHref: "/aprende/chocolatier",
    campusHref: "/campus/maestro-chocolatier",
    blurb: "Barra 70 % con lente CoEx, tipicidad y diploma LinkedIn.",
    dualitaLine: "Dualita te abre la campaña bean-to-bar.",
    accent: "#FF6A3D",
  },
  "arquitecto-fermentacion": {
    slug: "arquitecto-fermentacion",
    label: "Master Cacaotier",
    shortLabel: "Arquitecto de fermentación",
    poster: "/atmosphere/ecoyuma-fear5.jpg",
    packLabel: "FEAR 5 · Ecoyuma",
    inviteHref: "/aprende/cacaotier",
    campusHref: "/campus/arquitecto-fermentacion",
    blurb: "Fermentación de precisión, bitácora y tipicidad de lote.",
    dualitaLine: "Dualita: diseña el sabor antes de tostarlo.",
    accent: "#F2C830",
  },
  "catador-cacao": {
    slug: "catador-cacao",
    label: "Master Catador",
    shortLabel: "Catación Fine-Flavor",
    poster: "/atmosphere/chocolate-broken.jpg",
    packLabel: "Rueda Colab",
    inviteHref: "/aprende/catador",
    campusHref: "/campus/catador-cacao",
    blurb: "Panel ciego, rueda Fine-Flavor y Set Catación 10.",
    dualitaLine: "Dualita: tipicidad se defiende en panel.",
    accent: "#86B66B",
  },
  benevolo: {
    slug: "benevolo",
    label: "Benevolo · marca acelerada",
    shortLabel: "Duja FEAR 5",
    poster: "/benevolo/bars-fear5.png",
    packLabel: "Chocolate Benevolo",
    inviteHref: "/benevolo",
    campusHref: "/campus/benevolo",
    blurb: "Marca acelerada hermana del Master Chocolatier.",
    dualitaLine: "Dualita acelera tendencia con origen.",
    accent: "#E8C9A0",
  },
  "benevolo-duja": {
    slug: "benevolo-duja",
    label: "Benevolo · marca acelerada",
    shortLabel: "Duja FEAR 5",
    poster: "/benevolo/bars-fear5.png",
    packLabel: "Chocolate Benevolo",
    inviteHref: "/benevolo",
    campusHref: "/campus/benevolo",
    blurb: "Marca acelerada hermana del Master Chocolatier.",
    dualitaLine: "Dualita acelera tendencia con origen.",
    accent: "#E8C9A0",
  },
}

export const COURSE_SHARE_LABEL: Record<string, string> = Object.fromEntries(
  Object.values(MASTER_INVITES)
    .filter((m, i, arr) => arr.findIndex((x) => x.slug === m.slug) === i)
    .map((m) => [m.slug, m.label]),
)

const GRADE_LABEL: Record<string, string> = {
  excelencia: "Excelencia Fine-Flavor",
  especialidad: "Especialidad aprobada",
  "en-practica": "En práctica · sigue subiendo",
}

export function forumGradeLabel(grade?: string | null) {
  if (!grade) return "Especialidad aprobada"
  return GRADE_LABEL[grade] ?? grade
}

export function masterInviteFor(courseSlug?: string | null): MasterInviteMeta | null {
  if (!courseSlug) return null
  return MASTER_INVITES[courseSlug] ?? null
}

/** Thumbnail dinámico estilo diploma (OG) para avances de maestría. */
export function forumMasterOgThumb(input: {
  authorName: string
  courseSlug: string
  grade?: string | null
}) {
  const invite = masterInviteFor(input.courseSlug)
  if (!invite) return null
  const params = new URLSearchParams({
    name: input.authorName.slice(0, 48),
    title: invite.label,
    grade: forumGradeLabel(input.grade),
    course: input.courseSlug,
  })
  return `/api/og/diploma?${params.toString()}`
}

export function defaultProgressCopy(courseSlug: string, grade?: string | null) {
  const invite = masterInviteFor(courseSlug)
  const course = invite?.label ?? COURSE_SHARE_LABEL[courseSlug] ?? "Campus Colab"
  const gradeBit = grade ? ` · ${forumGradeLabel(grade)}` : ""
  return {
    title: `Cerré ${course}${gradeBit}`,
    body: [
      `Comparto mi diploma digital de ${course} en el Colab.`,
      invite?.blurb ?? "Oficio Fine-Flavor con rigor de territorio.",
      "¿Te animas a certificar tu criterio? Empieza la campaña con Dualita — Sembrar + Masters.",
    ].join(" "),
  }
}
