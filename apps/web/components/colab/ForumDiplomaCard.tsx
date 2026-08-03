"use client"

import { decodeDiploma, gradeLabel } from "@/lib/campus-rigor"
import {
  COURSE_SHARE_LABEL,
  diplomaOgPreviewUrl,
  parseDiplomaPath,
} from "@/lib/colab-foro"

/** Tarjeta visual del diploma en el foro — mismo diseño OG de exhibición. */
export default function ForumDiplomaCard({
  diplomaUrl,
  fallbackGrade,
  fallbackCourse,
}: {
  diplomaUrl: string
  fallbackGrade?: string | null
  fallbackCourse?: string | null
}) {
  const parsed = parseDiplomaPath(diplomaUrl)
  const diploma = parsed ? decodeDiploma(parsed.code) : null

  const name = diploma?.name ?? "Nodo Colab"
  const title =
    diploma?.title ??
    (fallbackCourse ? COURSE_SHARE_LABEL[fallbackCourse] : null) ??
    "Diploma Cacao Colab"
  const grade = diploma ? gradeLabel(diploma.grade) : (fallbackGrade ?? "Especialidad aprobada")
  const course = diploma?.course ?? fallbackCourse ?? parsed?.courseSlug ?? ""
  const preview = diplomaOgPreviewUrl({ name, title, grade, course })

  return (
    <a
      className="colab-forum-diploma-card"
      href={diplomaUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={preview} alt={`${name} · ${title} · ${grade}`} className="colab-forum-diploma-img" />
      <span className="colab-forum-diploma-meta">
        <strong>{name}</strong>
        <em>{grade}</em>
        <small>Ver diploma digital →</small>
      </span>
    </a>
  )
}
