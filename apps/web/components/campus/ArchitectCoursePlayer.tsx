"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import DualitaCompanion, { type DualitaMood } from "@/components/aprende/DualitaCompanion"
import CourseIntroPlayer from "@/components/aprende/CourseIntroPlayer"
import CampusCelebrate from "@/components/campus/CampusCelebrate"
import CampusSourcesPanel from "@/components/campus/CampusSourcesPanel"
import MasteryClose from "@/components/campus/MasteryClose"
import {
  ARCHITECT_COURSE_SLUG,
  architectMissions,
  architectTotalXp,
} from "@/lib/architect-course"
import { muroShareHref } from "@/lib/colab-foro"
import { saveArchitectProgress } from "@/app/campus/actions"
import {
  orderQuizOptions,
  playCampusSfx,
  type CelebrateKind,
} from "@/lib/campus-gamify"
import { architectCompanionTips } from "@/lib/campus-sources"
import { getCourseVideo } from "@/lib/course-videos"
import {
  bumpStreak,
  diplomaGradeExplainer,
  encodeDiploma,
  gradeBlurb,
  gradeFromFirstTry,
  gradeLabel,
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

function isCourseDone(state: RigorState) {
  return (
    Boolean(state.diplomaCode) ||
    architectMissions.every((mission) => state.completed.includes(mission.slug))
  )
}

function ensureDiploma(state: RigorState, learnerName: string): RigorState {
  if (state.diplomaCode || !isCourseDone(state)) return state
  const ft = Object.values(state.scores).filter((s) => s.passed && s.firstTry).length
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
    xp: state.xp,
    streak: state.streak,
  }
  return { ...state, diplomaCode: encodeDiploma(payload) }
}

const LETTERS = ["A", "B", "C", "D", "E"]

export default function ArchitectCoursePlayer({
  learnerName,
  initialState,
}: {
  learnerName: string
  initialState?: unknown
}) {
  const intro = getCourseVideo("master-cacaotier")

  const boot = useMemo(() => {
    const seed = initialState ?? (typeof window !== "undefined" ? readLegacyLocal() : null)
    const normalized = refillHeartsIfNeeded(normalizeRigorState(seed))
    const withDiploma = ensureDiploma(normalized, learnerName)
    const done = isCourseDone(withDiploma)
    const firstOpen = architectMissions.findIndex((m) => !withDiploma.completed.includes(m.slug))
    return {
      progress: withDiploma,
      missionIndex: done ? architectMissions.length - 1 : firstOpen === -1 ? 0 : firstOpen,
      phase: (done ? "course-complete" : "learn") as
        | "learn"
        | "quiz"
        | "mission-complete"
        | "course-complete"
        | "out-of-hearts",
    }
  }, [initialState, learnerName])

  const [progress, setProgress] = useState<RigorState>(boot.progress)
  const [missionIndex, setMissionIndex] = useState(boot.missionIndex)
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState(boot.phase)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [syncStatus, setSyncStatus] = useState<"idle" | "saving" | "saved" | "local">("idle")
  const [attempting, setAttempting] = useState(false)
  const [quizPassed, setQuizPassed] = useState(false)
  const [pendingScore, setPendingScore] = useState<{ attempts: number; firstTry: boolean } | null>(
    null,
  )
  const [showIntro, setShowIntro] = useState(true)
  const [celebrateKind, setCelebrateKind] = useState<CelebrateKind | null>(null)
  const [celebrateToken, setCelebrateToken] = useState(0)
  const [dualitaMood, setDualitaMood] = useState<DualitaMood>("idle")
  const [dualitaPulse, setDualitaPulse] = useState(0)
  const bootSynced = useRef(false)

  useEffect(() => {
    if (bootSynced.current) return
    if (!boot.progress.diplomaCode || !isCourseDone(boot.progress)) return
    bootSynced.current = true
    persist(boot.progress, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-shot sync when boot mints diploma
  }, [])

  const mission = architectMissions[missionIndex]
  const step = mission.steps[stepIndex]
  const quizOptions = useMemo(
    () => orderQuizOptions(mission.quiz.options, mission.slug),
    [mission.slug, mission.quiz.options],
  )
  const completedCount = progress.completed.length
  const firstTryCount = Object.values(progress.scores).filter((s) => s.passed && s.firstTry).length
  const grade = gradeFromFirstTry(firstTryCount, architectMissions.length)
  const gradeHint = nextGradeHint(firstTryCount, architectMissions.length)
  const overallProgress = Math.round(
    ((completedCount +
      (phase === "learn"
        ? stepIndex / mission.steps.length
        : phase === "quiz"
          ? 0.85
          : phase === "course-complete"
            ? 1
            : 0)) /
      architectMissions.length) *
      100,
  )
  const nextMissionUnlocked =
    missionIndex === 0 || progress.completed.includes(architectMissions[missionIndex - 1]?.slug)

  const diplomaUrl = useMemo(() => {
    if (!progress.diplomaCode) return null
    return `${siteOrigin()}/credencial/arquitecto-fermentacion/${progress.diplomaCode}`
  }, [progress.diplomaCode])

  const masteryMissions = architectMissions.map((item) => {
    const score = progress.scores[item.slug]
    return {
      slug: item.slug,
      number: String(item.number).padStart(2, "0"),
      title: item.title,
      xp: item.xp,
      passed: progress.completed.includes(item.slug),
      firstTry: score?.firstTry,
    }
  })

  const dualitaMessage = useMemo(() => {
    if (phase === "out-of-hearts") {
      return "Sin vidas por hoy. Descansa: mañana Dualita te recarga ♥. Repasa el paper o una cartilla Agrosavia — eso sí suma criterio."
    }
    if (phase === "mission-complete") return mission.dualitaSuccess
    if (phase === "course-complete") {
      return `¡Diploma ${gradeLabel(grade)}! Publícalo en el muro de la comunidad, LinkedIn o X — Dualita ya celebró.`
    }
    if (phase === "quiz") {
      if (quizPassed) return "¡Eso! Criterio limpio. Toca Continuar — Dualita ya está celebrando contigo."
      if (progress.hearts <= 1) return "Última vida. Elige lo que podrías defender ante otro productor, no la opción «del medio»."
      return "Primer intento limpio sube la nota del diploma. La racha 🔥 es solo venir mañana."
    }
    return stepIndex === 0 ? mission.dualitaIntro : step.fieldAction
  }, [phase, mission, progress.hearts, stepIndex, step, grade, quizPassed])

  function celebrate(kind: CelebrateKind, mood: DualitaMood = "cheer") {
    setCelebrateKind(kind)
    setCelebrateToken((n) => n + 1)
    setDualitaMood(mood)
    setDualitaPulse((n) => n + 1)
    playCampusSfx(kind)
  }

  function persist(next: RigorState, complete = false) {
    try {
      localStorage.setItem("architect_progress_v2", JSON.stringify(next))
    } catch {
      // remoto
    }
    setSyncStatus("saving")
    void saveArchitectProgress(next, next.xp, complete || isCourseDone(next)).then((result) => {
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
      setQuizPassed(false)
      setPendingScore(null)
      setDualitaMood("idle")
      setPhase("quiz")
    }
  }

  function finishAfterCorrect(score: { attempts: number; firstTry: boolean }) {
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

    const allDone = next.completed.length >= architectMissions.length
    if (allDone) next = ensureDiploma(next, learnerName)

    setProgress(next)
    setQuizPassed(false)
    setPendingScore(null)
    setSelected(null)
    setFeedback("")
    if (allDone) {
      celebrate("diploma", "levelup")
      setPhase("course-complete")
    } else {
      celebrate("mission", "cheer")
      setPhase("mission-complete")
    }
    persist(next, allDone)
  }

  function answer(optionId: string) {
    if (selected || attempting) return
    const option = quizOptions.find((item) => item.id === optionId)
    if (!option) return
    setSelected(optionId)
    setFeedback(option.explanation)
    setAttempting(true)

    const prevScore = progress.scores[mission.slug]
    const attempts = (prevScore?.attempts ?? 0) + 1
    const firstTry = attempts === 1 && option.correct

    if (option.correct) {
      const score = { attempts, firstTry }
      setQuizPassed(true)
      setPendingScore(score)
      celebrate("correct", "cheer")
      window.setTimeout(() => {
        try {
          finishAfterCorrect(score)
        } catch {
          setFeedback((prev) => `${prev} · Toca Continuar para cerrar la misión.`)
        } finally {
          setAttempting(false)
        }
      }, 900)
      return
    }

    celebrate("heart", "oops")
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
      setDualitaMood("idle")
      if (next.hearts === 0) setPhase("out-of-hearts")
    }, 1400)
  }

  function reviewMission() {
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setQuizPassed(false)
    setPendingScore(null)
    setDualitaMood("idle")
    setPhase("learn")
  }

  function continueCampaign() {
    if (isCourseDone(progress)) {
      setPhase("course-complete")
      return
    }
    const nextIndex = Math.min(missionIndex + 1, architectMissions.length - 1)
    setMissionIndex(nextIndex)
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setQuizPassed(false)
    setPendingScore(null)
    setDualitaMood("idle")
    setShowIntro(nextIndex === 0)
    setPhase("learn")
  }

  function selectMission(index: number) {
    const unlocked = index === 0 || progress.completed.includes(architectMissions[index - 1].slug)
    if (!unlocked) return
    if (isCourseDone(progress) && index === architectMissions.length - 1) {
      setMissionIndex(index)
      setPhase("course-complete")
      return
    }
    setMissionIndex(index)
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setQuizPassed(false)
    setPendingScore(null)
    setDualitaMood("idle")
    setShowIntro(index === 0)
    setPhase(progress.completed.includes(architectMissions[index].slug) ? "mission-complete" : "learn")
  }

  return (
    <div className="architect-player">
      <CampusCelebrate kind={celebrateKind} token={celebrateToken} />
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
          <span title="Racha diaria · no califica el diploma">🔥 {progress.streak}</span>
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
          <p className="architect-cert-hint">{diplomaGradeExplainer()}</p>
          {gradeHint && <p className="architect-cert-hint">{gradeHint}</p>}
          {isCourseDone(progress) && (
            <button
              type="button"
              className="chocolatier-open-close"
              onClick={() => {
                celebrate("diploma", "levelup")
                setPhase("course-complete")
              }}
            >
              Ver calificación y diploma →
            </button>
          )}
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
          <CampusSourcesPanel compact title="Papers · CoEx · Agrosavia · Fedecacao" />
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
          <Link href="/colab" className="chocolatier-sister-link">
            Foro Colab · compartir 🍫 →
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
                Mañana se recargan {MAX_HEARTS} vidas. Mientras, abre una fuente del panel (paper o
                cartilla) — Dualita premia volver (racha {progress.streak}).
              </p>
              <button type="button" onClick={reviewMission}>
                Repasar misión →
              </button>
            </div>
          ) : phase === "learn" ? (
            <article className="architect-lesson-card" key={`${mission.slug}-${stepIndex}`}>
              {showIntro && missionIndex === 0 && stepIndex === 0 && intro && (
                <div className="campus-context-video">
                  <p className="eyebrow text-colab-yellow">Contexto en video · cálido y exigente</p>
                  <CourseIntroPlayer video={intro} source="architect-campus-context" />
                  <button type="button" className="campus-hide-intro" onClick={() => setShowIntro(false)}>
                    Seguir a la misión →
                  </button>
                </div>
              )}
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
              <p className="campus-encourage">
                Vas bien. Cada paso que documentas es evidencia que mañana puedes compartir con el
                Colab.
              </p>
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
                Primer intento correcto suma a la <strong className="text-white/60">nota del diploma</strong>.
                Las opciones están mezcladas — no hay «siempre la del medio». La racha 🔥 no califica.
              </p>
              <div className="architect-options">
                {quizOptions.map((option, index) => {
                  const chosen = selected === option.id
                  const reveal = Boolean(selected)
                  return (
                    <button
                      key={`${mission.slug}-${option.id}-${index}`}
                      type="button"
                      disabled={Boolean(selected)}
                      onClick={() => answer(option.id)}
                      className={
                        reveal ? (option.correct ? "correct" : chosen ? "wrong" : "muted") : ""
                      }
                    >
                      <span>{LETTERS[index] ?? "?"}</span>
                      {option.text}
                    </button>
                  )
                })}
              </div>
              {feedback && <p className="architect-feedback">{feedback}</p>}
              {quizPassed && pendingScore && (
                <button
                  type="button"
                  className="architect-next mt-6"
                  onClick={() => finishAfterCorrect(pendingScore)}
                >
                  {missionIndex >= architectMissions.length - 1
                    ? "Ver calificación y diploma →"
                    : "Continuar →"}
                </button>
              )}
            </article>
          ) : phase === "mission-complete" ? (
            <div className="architect-complete">
              <span>✦</span>
              <p className="eyebrow text-colab-green">Misión completada</p>
              <h2>+{mission.xp} XP</h2>
              <p>{mission.dualitaSuccess}</p>
              <p className="campus-encourage">
                ¿Lo sentiste? Ese click de criterio es el mismo que querrás contar cuando compartas
                tu diploma.
              </p>
              {isCourseDone(progress) ? (
                <button type="button" onClick={() => setPhase("course-complete")}>
                  Ver calificación y diploma →
                </button>
              ) : (
                missionIndex < architectMissions.length - 1 && (
                  <button type="button" onClick={continueCampaign}>
                    Siguiente misión →
                  </button>
                )
              )}
            </div>
          ) : (
            <MasteryClose
              courseTitle="Arquitecto de Fermentación"
              learnerName={learnerName}
              grade={grade}
              xp={progress.xp}
              streak={progress.streak}
              hearts={progress.hearts}
              firstTry={firstTryCount}
              total={architectMissions.length}
              missions={masteryMissions}
              diplomaUrl={diplomaUrl}
              practiceHref="/juega"
              practiceLabel="Aplicar en Sembrar →"
              forumHref={muroShareHref({
                courseSlug: ARCHITECT_COURSE_SLUG,
                gradeLabel: gradeLabel(grade),
                diplomaCode: progress.diplomaCode,
              })}
              sisterHref="/campus/maestro-chocolatier"
              sisterLabel="Master Chocolatier →"
            />
          )}
        </main>
      </div>
      <DualitaCompanion
        message={dualitaMessage}
        tips={architectCompanionTips}
        mood={dualitaMood}
        pulseKey={dualitaPulse}
      />
    </div>
  )
}
