"use client"

import Link from "next/link"
import {
  gradeBlurb,
  gradeLabel,
  linkedInShareUrl,
  type DiplomaGrade,
} from "@/lib/campus-rigor"

export type MasteryMissionRow = {
  slug: string
  number: string
  title: string
  xp: number
  firstTry?: boolean
  passed: boolean
}

export default function MasteryClose({
  courseTitle,
  learnerName,
  grade,
  xp,
  streak,
  hearts,
  firstTry,
  total,
  missions,
  diplomaUrl,
  practiceHref = "/juega",
  practiceLabel = "Practicar en Sembrar →",
  forumHref = "/colab",
  cuentaHref = "/cuenta",
  sisterHref,
  sisterLabel,
}: {
  courseTitle: string
  learnerName: string
  grade: DiplomaGrade
  xp: number
  streak: number
  hearts: number
  firstTry: number
  total: number
  missions: MasteryMissionRow[]
  diplomaUrl: string | null
  practiceHref?: string
  practiceLabel?: string
  forumHref?: string
  cuentaHref?: string
  sisterHref?: string
  sisterLabel?: string
}) {
  const doneCount = missions.filter((m) => m.passed).length

  return (
    <div className="architect-complete mastery-close">
      <span>◈</span>
      <p className="eyebrow text-[#FF6A3D]">Maestría cerrada · calificación</p>
      <h2>{courseTitle}</h2>
      <p className="chocolatier-grade-pill mx-auto">{gradeLabel(grade)}</p>
      <p className="mastery-close-blurb">{gradeBlurb(grade)}</p>

      <dl className="mastery-close-stats">
        <div>
          <dt>Aprendiz</dt>
          <dd>{learnerName}</dd>
        </div>
        <div>
          <dt>Misiones</dt>
          <dd>
            {doneCount}/{total}
          </dd>
        </div>
        <div>
          <dt>1er intento</dt>
          <dd>
            {firstTry}/{total}
          </dd>
        </div>
        <div>
          <dt>XP</dt>
          <dd>{xp}</dd>
        </div>
        <div>
          <dt>Racha</dt>
          <dd>🔥 {streak}</dd>
        </div>
        <div>
          <dt>Vidas</dt>
          <dd>♥ {hearts}</dd>
        </div>
      </dl>

      <ul className="mastery-close-missions" aria-label="Avance por misión">
        {missions.map((mission) => (
          <li key={mission.slug} className={mission.passed ? "done" : ""}>
            <span>{mission.passed ? (mission.firstTry ? "★" : "✓") : "◇"}</span>
            <span>
              <strong>
                {mission.number} · {mission.title}
              </strong>
              <small>
                {mission.xp} XP
                {mission.passed
                  ? mission.firstTry
                    ? " · primer intento"
                    : " · con práctica"
                  : " · pendiente"}
              </small>
            </span>
          </li>
        ))}
      </ul>

      <p className="mastery-close-invite">
        La nota certifica rigor de criterio. Ahora practica lo aprendido en Sembrar y comparte tu
        avance en el foro interno del Colab — con likes 🍫.
      </p>

      <div className="mastery-close-actions flex flex-wrap justify-center gap-3">
        {diplomaUrl && (
          <>
            <a href={diplomaUrl} target="_blank" rel="noopener noreferrer">
              Ver diploma →
            </a>
            <a
              href={linkedInShareUrl(diplomaUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="!bg-[#0A66C2] !text-white"
            >
              LinkedIn →
            </a>
          </>
        )}
        <Link href={practiceHref}>{practiceLabel}</Link>
        <Link href={forumHref}>Compartir en foro Colab →</Link>
        <Link href={cuentaHref}>Mi cuenta · progreso</Link>
        {sisterHref && sisterLabel && <Link href={sisterHref}>{sisterLabel}</Link>}
      </div>
    </div>
  )
}
