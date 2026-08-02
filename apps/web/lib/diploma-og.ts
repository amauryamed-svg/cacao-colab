import { getSiteUrl } from "@/lib/site"
import { gradeLabel, type DiplomaPayload } from "@/lib/campus-rigor"

export function diplomaOgImageUrl(diploma: DiplomaPayload) {
  const params = new URLSearchParams({
    name: diploma.name,
    title: diploma.title,
    grade: gradeLabel(diploma.grade),
  })
  return `${getSiteUrl()}/api/og/diploma?${params.toString()}`
}

export function diplomaAbsoluteUrl(path: string) {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`
}
