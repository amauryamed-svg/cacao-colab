import { getSiteUrl } from "@/lib/site"
import { gradeLabel, type DiplomaPayload } from "@/lib/campus-rigor"

export function diplomaAbsoluteUrl(path: string) {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`
}

/** Open Graph image — lo que LinkedIn / X muestran al compartir. */
export function diplomaOgImageUrl(diploma: DiplomaPayload) {
  const params = new URLSearchParams({
    name: diploma.name,
    title: diploma.title,
    grade: gradeLabel(diploma.grade),
    course: diploma.course,
  })
  return `${getSiteUrl()}/api/og/diploma?${params.toString()}`
}

export function diplomaShareMeta(diploma: DiplomaPayload, pagePath: string) {
  const absolute = diplomaAbsoluteUrl(pagePath)
  const og = diplomaOgImageUrl(diploma)
  const g = gradeLabel(diploma.grade)
  return {
    absolute,
    og,
    title: `${diploma.name} · ${g} · ${diploma.title}`,
    description: `Diploma digital Cacao Colab — ${diploma.title}. ${g}. Verificar en cacaocolab.org.`,
    openGraph: {
      title: `${diploma.name} · ${diploma.title}`,
      description: g,
      url: absolute,
      type: "website" as const,
      images: [{ url: og, width: 1200, height: 630, alt: `${diploma.name} · ${diploma.title}` }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${diploma.name} · ${diploma.title}`,
      description: g,
      images: [og],
    },
  }
}
