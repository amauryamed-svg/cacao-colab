"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import DualitaCompanion from "@/components/aprende/DualitaCompanion"
import {
  chocolatierCompanionTips,
  chocolatierMissions,
  chocolatierTotalXp,
  CHOCOLATIER_COURSE_SLUG,
} from "@/lib/chocolatier-course"
import { saveChocolatierProgress } from "@/app/campus/actions"
import {
  bumpStreak,
  encodeDiploma,
  gradeFromFirstTry,
  gradeLabel,
  linkedInShareUrl,
  MAX_HEARTS,
  normalizeRigorState,
  refillHeartsIfNeeded,
  siteOrigin,
  type DiplomaPayload,
  type RigorState,
} from "@/lib/campus-rigor"

export default function ChocolatierCoursePlayer({
  learnerName,
  initialState,
}: {
  learnerName: string
  initialState?: unknown
}) {
  const [progress, setProgress] = useState<RigorState>(() =>
    refillHeartsIfNeeded(normalizeRigorState(initialState)),
  )
  const [missionIndex, setMissionIndex] = useState(() => {
    const completed = normalizeRigorState(initialState).completed
    const firstOpen = chocolatierMissions.findIndex((mission) => !completed.includes(mission.slug))
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

  const mission = chocolatierMissions[missionIndex]
  const step = mission.steps[stepIndex]
  const completedCount = progress.completed.length
  const firstTryCount = Object.values(progress.scores).filter((s) => s.passed && s.firstTry).length
  const grade = gradeFromFirstTry(firstTryCount, chocolatierMissions.length)
  const overallProgress = Math.round(
    ((completedCount + (phase === "learn" ? stepIndex / mission.steps.length : phase === "quiz" ? 0.85 : 0)) /
      chocolatierMissions.length) *
      100,
  )
  const nextMissionUnlocked =
    missionIndex === 0 || progress.completed.includes(chocolatierMissions[missionIndex - 1]?.slug)

  const diplomaUrl = useMemo(() => {
    if (!progress.diplomaCode) return null
    return `${siteOrigin()}/credencial/maestro-chocolatier/${progress.diplomaCode}`
  }, [progress.diplomaCode])

  const dualitaMessage = useMemo(() => {
    if (phase === "out-of-hearts") {
      return "Sin vidas. Descansa o repasa la misión — mañana Dualita te recarga ♥. Así se entrena criterio de panel."
    }
    if (phase === "mission-complete") return mission.dualitaSuccess
    if (phase === "course-complete") {
      return `¡Diploma ${gradeLabel(grade)}! Comparte en LinkedIn con enlace al Colab. Edutainment con rigor — no medalla inventada.`
    }
    if (phase === "quiz") {
      if (progress.hearts <= 1) return "Última vida. Piensa como panel ciego: tipicidad y cero defectos."
      return "Primer intento limpio sube tu nota de diploma. Rachas premian constancia."
    }
    return stepIndex === 0 ? mission.dualitaIntro : step.fieldAction
  }, [phase, mission, progress.hearts, stepIndex, step, grade])

  function persist(next: RigorState, complete = false) {
    try {
      localStorage.setItem("chocolatier_progress_v2", JSON.stringify(next))
    } catch {
      // remoto
    }
    setSyncStatus("saving")
    void saveChocolatierProgress(next, next.xp, complete).then((result) => {
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

    const allDone = next.completed.length === chocolatierMissions.length
    if (allDone && !next.diplomaCode) {
      const ft = Object.values(next.scores).filter((s) => s.passed && s.firstTry).length
      const g = gradeFromFirstTry(ft, chocolatierMissions.length)
      const payload: DiplomaPayload = {
        v: 1,
        course: CHOCOLATIER_COURSE_SLUG,
        title: "Master Chocolatier · barra 70 %",
        name: learnerName,
        issuedAt: new Date().toISOString(),
        grade: g,
        firstTry: ft,
        total: chocolatierMissions.length,
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
    const nextIndex = Math.min(missionIndex + 1, chocolatierMissions.length - 1)
    setMissionIndex(nextIndex)
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setPhase("learn")
  }

  function selectMission(index: number) {
    const unlocked = index === 0 || progress.completed.includes(chocolatierMissions[index - 1].slug)
    if (!unlocked) return
    setMissionIndex(index)
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setPhase(progress.completed.includes(chocolatierMissions[index].slug) ? "mission-complete" : "learn")
  }

  return (
    <div className="architect-player chocolatier-player">
      <header className="architect-topbar">
        <Link href="/cuenta" className="architect-exit">
          ← Campus
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
          <p className="eyebrow text-[#FF6A3D]">Campaña 70 % · CoEx / Awards lens</p>
          <h1>
            Master
            <br />
            Chocolatier
          </h1>
          <p className="architect-welcome">
            {learnerName} · {completedCount}/6 · primer intento {firstTryCount}/6 · {chocolatierTotalXp} XP
          </p>
          <p className="chocolatier-grade-pill">{gradeLabel(grade)}</p>
          <div className="architect-mission-rail">
            {chocolatierMissions.map((item, index) => {
              const done = progress.completed.includes(item.slug)
              const unlocked =
                index === 0 || progress.completed.includes(chocolatierMissions[index - 1].slug)
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
                ? "✓ Progreso sincronizado"
                : syncStatus === "local"
                  ? "Guardado local · aplica migración Supabase"
                  : "Edutainment con rigor · vidas diarias"}
          </p>
          <Link href="/benevolo" className="chocolatier-sister-link">
            Marca hermana · Benevolo duja →
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
              <p className="eyebrow text-[#FF6A3D]">Sin vidas</p>
              <h2>El criterio también descansa</h2>
              <p>
                Mañana se recargan {MAX_HEARTS} vidas. Mientras, repasa los pasos de la misión — Dualita
                premia la constancia (racha {progress.streak}).
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
              <p className="eyebrow text-[#E8C9A0]">
                Misión {mission.number} · {step.kicker}
              </p>
              <h2>{step.title}</h2>
              <p className="architect-body">{step.body}</p>
              <div className="architect-field-action">
                <span>◎ Lente CoEx / Awards · práctica</span>
                <strong>{step.fieldAction}</strong>
              </div>
              <p className="chocolatier-coex-note">
                <strong>CoEx:</strong> {mission.coexLens}
              </p>
              <button type="button" onClick={nextStep} className="architect-next">
                {stepIndex === mission.steps.length - 1 ? "Resolver reto →" : "Continuar →"}
              </button>
            </article>
          ) : phase === "quiz" ? (
            <article className="architect-lesson-card">
              <p className="eyebrow text-[#FF6A3D]">
                Reto de criterio · ♥ {progress.hearts} · 🔥 {progress.streak}
              </p>
              <h2>{mission.quiz.question}</h2>
              <p className="text-xs text-white/40 mb-4">
                Primer intento correcto suma a tu nota de diploma (Excelencia / Especialidad).
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
                      className={
                        reveal ? (option.correct ? "correct" : chosen ? "wrong" : "muted") : ""
                      }
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
              <p className="eyebrow text-[#E8C9A0]">Misión completada</p>
              <h2>+{mission.xp} XP</h2>
              <p>{mission.dualitaSuccess}</p>
              {missionIndex < chocolatierMissions.length - 1 && (
                <button type="button" onClick={continueCampaign}>
                  Siguiente misión →
                </button>
              )}
            </div>
          ) : (
            <div className="architect-complete">
              <span>◈</span>
              <p className="eyebrow text-[#FF6A3D]">Diploma digital desbloqueado</p>
              <h2>Master Chocolatier</h2>
              <p className="chocolatier-grade-pill mx-auto">{gradeLabel(grade)}</p>
              <p>
                Barra 70 % · {chocolatierTotalXp} XP · racha {progress.streak} · primer intento{" "}
                {firstTryCount}/{chocolatierMissions.length}. Credencial Colab estilo Coursera con onda
                edutainment — no medalla CoEx inventada.
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
                <Link href="/aprende/chocolatier">Syllabus</Link>
                <Link href="/benevolo">Marca Benevolo</Link>
                <Link href="/unete">Colectivo Colab</Link>
              </div>
            </div>
          )}
        </main>
      </div>
      <DualitaCompanion message={dualitaMessage} tips={chocolatierCompanionTips} />
    </div>
  )
}
