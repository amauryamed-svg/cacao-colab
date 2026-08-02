/**
 * Dónde aprovechar un canje MD tras benefit_redemptions.
 * course_unlock → campus; mentoría → cola Dualita (sin URL de curso).
 */

export type BenefitUseGuide = {
  href: string
  cta: string
  howTo: string
}

const COURSE_USE: Record<string, BenefitUseGuide> = {
  "arquitecto-fermentacion": {
    href: "/campus/arquitecto-fermentacion",
    cta: "Abrir aceleración Arquitecto",
    howTo:
      "Tu canje no es un cupón aparte: abre Master Cacaotier · Arquitecto de Fermentación. Entra al campus, completa las 6 misiones Dualita y gana el diploma (vidas + primer intento). También está en Mi cuenta → Tus Masters.",
  },
  "maestro-chocolatier": {
    href: "/campus/maestro-chocolatier",
    cta: "Abrir Master Chocolatier",
    howTo:
      "Entra al campus Chocolatier y avanza las misiones de barra 70 %. El canje marca tu entitlement digital — el diploma se gana con rigor.",
  },
  "chocolate-benevolo": {
    href: "/campus/benevolo",
    cta: "Abrir ruta Benevolo",
    howTo:
      "Tu canje abre el capstone Benevolo. Continúa las misiones de marca acelerada y conecta con Master Chocolatier.",
  },
}

export function resolveBenefitUse(input: {
  courseSlug?: string | null
  service?: string | null
  slug?: string | null
}): BenefitUseGuide | null {
  const course = input.courseSlug?.trim()
  if (course && COURSE_USE[course]) return COURSE_USE[course]

  const slug = input.slug?.trim() ?? ""
  if (slug.includes("arquitecto") || slug === "aceleracion-arquitecto") {
    return COURSE_USE["arquitecto-fermentacion"]
  }
  if (slug.includes("chocolatier")) return COURSE_USE["maestro-chocolatier"]
  if (slug.includes("benevolo")) return COURSE_USE["chocolate-benevolo"]

  if (
    input.service === "mentorship" ||
    slug.includes("mentoria") ||
    slug.includes("mentor")
  ) {
    return {
      href: "/cuenta/consejo",
      cta: "Ver consejo de avance",
      howTo:
        "Cupo de mentoría Dualita en cola: el equipo Colab te contacta por el canal de tu cuenta. Mientras, usa el consejo de avance y el campus.",
    }
  }

  return null
}

export function courseSlugFromPayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null
  const course = (payload as { course_slug?: unknown }).course_slug
  return typeof course === "string" ? course : null
}

export function serviceFromPayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null
  const service = (payload as { service?: unknown }).service
  return typeof service === "string" ? service : null
}

export function slugFromPayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null
  const slug = (payload as { slug?: unknown }).slug
  return typeof slug === "string" ? slug : null
}
