"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import DualitaCompanion from "@/components/aprende/DualitaCompanion"
import {
  ARCHITECT_COURSE_SLUG,
  architectMissions,
  architectTotalXp,
} from "@/lib/architect-course"
import { saveArchitectProgress } from "@/app/campus/actions"
import {
  bumpStreak,
  encodeDiploma,
  gradeBlurb,
  gradeFromFirstTry,
  gradeLabel,
  linkedInShareUrl,
  MAX_HEARTS,
  nextGradeHint,
  normalizeRigorState,
  refillHeartsIfNeeded,
  siteOrigin,
  type DiplomaPayload,
  type RigorState,
} from "@/lib/campus-rigor"

function readLegacyLocal(): unknown {
  try {
    const v2 = localStorage.getItem("architect_progress_v2")
    if (v2) return JSON.parse(v2)
    const v1 = localStorage.getItem("architect_progress_v1")
    if (v1) return JSON.parse(v1)
  } catch {
    // ignore
  }
  return null
}

export default function ArchitectCoursePlayer({
  learnerName,
  initialState,
}: {
  learnerName: string
  initialState?: unknown
}) {
  const [progress, setProgress] = useState<RigorState>(() => {
    const seed = initialState ?? (typeof window !== "undefined" ? readLegacyLocal() : null)
    return refillHeartsIfNeeded(normalizeRigorState(seed))
  })
  const [missionIndex, setMissionIndex] = useState(() => {
    const completed = normalizeRigorState(initialState).completed
    const firstOpen = architectMissions.findIndex((mission) => !completed.includes(mission.slug))
    return firstOpen === -1 ? 0 : firstOpen
  })
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<"learn" | "quiz" | "mission-complete" | "course-complete" | "out-of-hearts">(
    "learn",
  )
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [syncStatus, setSyncStatus] = useState<"idle" | "saving" | "saved" | "local">("idle")
  const [attempting, setAttempting] = useState(false)

  const mission = architectMissions[missionIndex]
  const step = mission.steps[stepIndex]
  const completedCount = progress.completed.length
  const firstTryCount = Object.values(progress.scores).filter((s) => s.passed && s.firstTry).length
  const grade = gradeFromFirstTry(firstTryCount, architectMissions.length)
  const gradeHint = nextGradeHint(firstTryCount, architectMissions.length)
  const overallProgress = Math.round(
    ((completedCount + (phase === "learn" ? stepIndex / mission.steps.length : phase === "quiz" ? 0.85 : 0)) /
      architectMissions.length) *
      100,
  )
  const nextMissionUnlocked =
    missionIndex === 0 || progress.completed.includes(architectMissions[missionIndex - 1]?.slug)

  const diplomaUrl = useMemo(() => {
    if (!progress.diplomaCode) return null
    return `${siteOrigin()}/credencial/arquitecto-fermentacion/${progress.diplomaCode}`
  }, [progress.diplomaCode])

  const dualitaMessage = useMemo(() => {
    if (phase === "out-of-hearts") {
      return "Sin vidas. Un arquitecto también descansa: mañana Dualita recarga ♥. El rigor se entrena con constancia."
    }
    if (phase === "mission-complete") return mission.dualitaSuccess
    if (phase === "course-complete") {
      return `¡Diploma ${gradeLabel(grade)}! Exigente y divertido: documentaste criterio, no solo XP. Compártelo con orgullo.`
    }
    if (phase === "quiz") {
      if (progress.hearts <= 1) return "Última vida. Elige lo que podrías defender ante otro productor."
      return "Primer intento limpio sube tu nota de diploma. Divertido, sí — pero con evidencia."
    }
    return stepIndex === 0 ? mission.dualitaIntro : step.fieldAction
  }, [phase, mission, progress.hearts, stepIndex, step, grade])

  function persist(next: RigorState, complete = false) {
    try {
      localStorage.setItem("architect_progress_v2", JSON.stringify(next))
    } catch {
      // remoto
    }
    setSyncStatus("saving")
    void saveArchitectProgress(next, next.xp, complete).then((result) => {
      setSyncStatus(result.ok ? "saved" : "local")
    })
  }

  function nextStep() {
    if (stepIndex < mission.steps.length - 1) {
      setStepIndex((value) => value + 1)
    } else {
      const refreshed = refillHeartsIfNeeded(progress)
      setProgress(refreshed)
      if (refreshed.hearts <= 0) {
        setPhase("out-of-hearts")
        return
      }
      setPhase("quiz")
    }
  }

  function answer(optionId: string) {
    if (selected || attempting) return
    const option = mission.quiz.options.find((item) => item.id === optionId)
    if (!option) return
    setSelected(optionId)
    setFeedback(option.explanation)
    setAttempting(true)

    const prevScore = progress.scores[mission.slug]
    const attempts = (prevScore?.attempts ?? 0) + 1
    const firstTry = attempts === 1 && option.correct

    if (option.correct) {
      window.setTimeout(() => {
        completeMission({ attempts, firstTry })
        setAttempting(false)
      }, 1100)
      return
    }

    let next = bumpStreak(refillHeartsIfNeeded(progress))
    next = {
      ...next,
      hearts: Math.max(0, next.hearts - 1),
      scores: {
        ...next.scores,
        [mission.slug]: { attempts, passed: false, firstTry: false },
      },
    }
    setProgress(next)
    persist(next)
    window.setTimeout(() => {
      setSelected(null)
      setFeedback("")
      setAttempting(false)
      if (next.hearts === 0) setPhase("out-of-hearts")
    }, 1400)
  }

  function completeMission(score: { attempts: number; firstTry: boolean }) {
    const alreadyComplete = progress.completed.includes(mission.slug)
    let next = bumpStreak(refillHeartsIfNeeded(progress))
    next = {
      ...next,
      completed: alreadyComplete ? next.completed : [...next.completed, mission.slug],
      xp: alreadyComplete ? next.xp : next.xp + mission.xp,
      scores: {
        ...next.scores,
        [mission.slug]: {
          attempts: score.attempts,
          passed: true,
          firstTry: score.firstTry || Boolean(next.scores[mission.slug]?.firstTry),
        },
      },
    }

    const allDone = next.completed.length === architectMissions.length
    if (allDone && !next.diplomaCode) {
      const ft = Object.values(next.scores).filter((s) => s.passed && s.firstTry).length
      const g = gradeFromFirstTry(ft, architectMissions.length)
      const payload: DiplomaPayload = {
        v: 1,
        course: ARCHITECT_COURSE_SLUG,
        title: "Master Cacaotier · Arquitecto de Fermentación",
        name: learnerName,
        issuedAt: new Date().toISOString(),
        grade: g,
        firstTry: ft,
        total: architectMissions.length,
        xp: next.xp,
        streak: next.streak,
      }
      next = { ...next, diplomaCode: encodeDiploma(payload) }
    }

    setProgress(next)
    setPhase(allDone ? "course-complete" : "mission-complete")
    persist(next, allDone)
  }

  function reviewMission() {
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setPhase("learn")
  }

  function continueCampaign() {
    const nextIndex = Math.min(missionIndex + 1, architectMissions.length - 1)
    setMissionIndex(nextIndex)
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setPhase("learn")
  }

  function selectMission(index: number) {
    const unlocked = index === 0 || progress.completed.includes(architectMissions[index - 1].slug)
    if (!unlocked) return
    setMissionIndex(index)
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setPhase(progress.completed.includes(architectMissions[index].slug) ? "mission-complete" : "learn")
  }

  return (
    <div className="architect-player">
      <header className="architect-topbar">
        <Link href="/cuenta" className="architect-exit">
          ← Mi cuenta
        </Link>
        <div className="architect-progress">
          <i style={{ width: `${overallProgress}%` }} />
        </div>
        <div className="architect-resources">
          <span title="Vidas · se recargan cada día">
            ♥ {progress.hearts}/{MAX_HEARTS}
          </span>
          <span title="Racha diaria">🔥 {progress.streak}</span>
          <span>✦ {progress.xp}</span>
        </div>
      </header>

      <div className="architect-layout">
        <aside className="architect-map">
          <p className="eyebrow text-colab-yellow">Certificación · Master Cacaotier</p>
          <h1>
            Arquitecto de
            <br />
            Fermentación
          </h1>
          <p className="architect-welcome">
            {learnerName} · {completedCount}/6 · 1er intento {firstTryCount}/6 · {architectTotalXp} XP
          </p>
          <p className="chocolatier-grade-pill">{gradeLabel(grade)}</p>
          <p className="architect-cert-blurb">{gradeBlurb(grade)}</p>
          {gradeHint && <p className="architect-cert-hint">{gradeHint}</p>}
          <div className="architect-mission-rail">
            {architectMissions.map((item, index) => {
              const done = progress.completed.includes(item.slug)
              const unlocked =
                index === 0 || progress.completed.includes(architectMissions[index - 1].slug)
              const score = progress.scores[item.slug]
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => selectMission(index)}
                  disabled={!unlocked}
                  className={`${missionIndex === index ? "active" : ""} ${done ? "done" : ""}`}
                >
                  <span>{done ? (score?.firstTry ? "★" : "✓") : unlocked ? item.number : "◇"}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>
                      {item.skill} · {item.xp} XP
                      {score?.passed ? (score.firstTry ? " · 1er intento" : " · con práctica") : ""}
                    </small>
                  </span>
                </button>
              )
            })}
          </div>
          <p className="architect-sync">
            {syncStatus === "saving"
              ? "Sincronizando…"
              : syncStatus === "saved"
                ? "✓ Progreso guardado en Mi cuenta"
                : syncStatus === "local"
                  ? "Guardado local · aplica migración Supabase"
                  : "Exigente + divertido · vidas diarias"}
          </p>
          <Link href="/cuenta" className="chocolatier-sister-link">
            Ver progreso en Mi cuenta →
          </Link>
        </aside>

        <main className="architect-stage">
          {!nextMissionUnlocked ? (
            <div className="architect-complete">
              <span>◇</span>
              <h2>Completa la misión anterior</h2>
            </div>
          ) : phase === "out-of-hearts" ? (
            <div className="architect-complete">
              <span>♥</span>
              <p className="eyebrow text-colab-yellow">Sin vidas</p>
              <h2>El rigor también descansa</h2>
              <p>
                Mañana se recargan {MAX_HEARTS} vidas. Repasa los pasos — Dualita premia la racha (
                {progress.streak}).
              </p>
              <button type="button" onClick={reviewMission}>
                Repasar misión →
              </button>
            </div>
          ) : phase === "learn" ? (
            <article className="architect-lesson-card" key={`${mission.slug}-${stepIndex}`}>
              <div className="architect-step-dots">
                {mission.steps.map((_, index) => (
                  <i key={index} className={index <= stepIndex ? "active" : ""} />
                ))}
              </div>
              <p className="eyebrow text-colab-green">
                Misión {mission.number} · {step.kicker}
              </p>
              <h2>{step.title}</h2>
              <p className="architect-body">{step.body}</p>
              <div className="architect-field-action">
                <span>◎ Acción de campo</span>
                <strong>{step.fieldAction}</strong>
              </div>
              <button type="button" onClick={nextStep} className="architect-next">
                {stepIndex === mission.steps.length - 1 ? "Resolver reto →" : "Continuar →"}
              </button>
            </article>
          ) : phase === "quiz" ? (
            <article className="architect-lesson-card">
              <p className="eyebrow text-colab-yellow">
                Reto de criterio · ♥ {progress.hearts} · 🔥 {progress.streak}
              </p>
              <h2>{mission.quiz.question}</h2>
              <p className="text-xs text-white/40 mb-4">
                Primer intento correcto suma a tu nota de diploma (Excelencia / Especialidad). Divertido —
                y exigente.
              </p>
              <div className="architect-options">
                {mission.quiz.options.map((option) => {
                  const chosen = selected === option.id
                  const reveal = Boolean(selected)
                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={Boolean(selected)}
                      onClick={() => answer(option.id)}
                      className={reveal ? (option.correct ? "correct" : chosen ? "wrong" : "muted") : ""}
                    >
                      <span>{option.id.toUpperCase()}</span>
                      {option.text}
                    </button>
                  )
                })}
              </div>
              {feedback && <p className="architect-feedback">{feedback}</p>}
            </article>
          ) : phase === "mission-complete" ? (
            <div className="architect-complete">
              <span>✦</span>
              <p className="eyebrow text-colab-green">Misión completada</p>
              <h2>+{mission.xp} XP</h2>
              <p>{mission.dualitaSuccess}</p>
              {missionIndex < architectMissions.length - 1 && (
                <button type="button" onClick={continueCampaign}>
                  Siguiente misión →
                </button>
              )}
            </div>
          ) : (
            <div className="architect-complete">
              <span>◉</span>
              <p className="eyebrow text-colab-yellow">Diploma digital desbloqueado</p>
              <h2>Arquitecto de Fermentación</h2>
              <p className="chocolatier-grade-pill mx-auto">{gradeLabel(grade)}</p>
              <p>
                {architectTotalXp} XP · racha {progress.streak} · primer intento {firstTryCount}/
                {architectMissions.length}. Credencial Colab de oficio: trazable, exigente y para mostrar.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
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
                      Compartir en LinkedIn →
                    </a>
                  </>
                )}
                <Link href="/cuenta">Mi cuenta</Link>
                <Link href="/juega">Aplicar en Sembrar →</Link>
              </div>
            </div>
          )}
        </main>
      </div>
      <DualitaCompanion
        message={dualitaMessage}
        tips={[
          "Distingue dato publicado, observado, calculado y propuesto.",
          "El diploma premia primer intento limpio — práctica antes de arriesgar vidas.",
          "El XP mide avance; la bitácora de lote demuestra competencia real.",
        ]}
      />
    </div>
  )
}
