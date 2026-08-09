"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import DualitaCompanion, { type DualitaMood } from "@/components/aprende/DualitaCompanion"
import CampusCelebrate from "@/components/campus/CampusCelebrate"
import CampusSourcesPanel from "@/components/campus/CampusSourcesPanel"
import MasteryClose from "@/components/campus/MasteryClose"
import {
  chocolatierCompanionTips,
  chocolatierMissions,
  chocolatierTotalXp,
  CHOCOLATIER_COURSE_SLUG,
} from "@/lib/chocolatier-course"
import { saveChocolatierProgress } from "@/app/campus/actions"
import { orderQuizOptions, playCampusSfx, type CelebrateKind } from "@/lib/campus-gamify"
import { chocolatierCompanionTipsShared } from "@/lib/campus-sources"
import {
  bumpStreak,
  diplomaGradeExplainer,
  encodeDiploma,
  gradeBlurb,
  gradeFromFirstTry,
  gradeLabel,
  nextGradeHint,
  MAX_HEARTS,
  normalizeRigorState,
  refillHeartsIfNeeded,
  siteOrigin,
  type DiplomaPayload,
  type RigorState,
} from "@/lib/campus-rigor"

const LETTERS = ["A", "B", "C", "D", "E"]
const TIPS = [...chocolatierCompanionTips, ...chocolatierCompanionTipsShared]

function isCourseDone(state: RigorState) {
  return (
    Boolean(state.diplomaCode) ||
    chocolatierMissions.every((mission) => state.completed.includes(mission.slug))
  )
}

function ensureDiploma(state: RigorState, learnerName: string): RigorState {
  if (state.diplomaCode || !isCourseDone(state)) return state
  const ft = Object.values(state.scores).filter((s) => s.passed && s.firstTry).length
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
    xp: state.xp,
    streak: state.streak,
  }
  return { ...state, diplomaCode: encodeDiploma(payload) }
}

export default function ChocolatierCoursePlayer({
  learnerName,
  initialState,
}: {
  learnerName: string
  initialState?: unknown
}) {
  const boot = useMemo(() => {
    const normalized = refillHeartsIfNeeded(normalizeRigorState(initialState))
    const withDiploma = ensureDiploma(normalized, learnerName)
    const done = isCourseDone(withDiploma)
    const firstOpen = chocolatierMissions.findIndex(
      (mission) => !withDiploma.completed.includes(mission.slug),
    )
    return {
      progress: withDiploma,
      missionIndex: done ? chocolatierMissions.length - 1 : firstOpen === -1 ? 0 : firstOpen,
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
  const [celebrateKind, setCelebrateKind] = useState<CelebrateKind | null>(null)
  const [celebrateToken, setCelebrateToken] = useState(0)
  const [dualitaMood, setDualitaMood] = useState<DualitaMood>("idle")
  const [dualitaPulse, setDualitaPulse] = useState(0)

  const mission = chocolatierMissions[missionIndex]
  const step = mission.steps[stepIndex]
  const quizOptions = useMemo(
    () => orderQuizOptions(mission.quiz.options, mission.slug),
    [mission.slug, mission.quiz.options],
  )
  const completedCount = progress.completed.length
  const firstTryCount = Object.values(progress.scores).filter((s) => s.passed && s.firstTry).length
  const grade = gradeFromFirstTry(firstTryCount, chocolatierMissions.length)
  const gradeHint = nextGradeHint(firstTryCount, chocolatierMissions.length)
  const overallProgress = Math.round(
    ((completedCount +
      (phase === "learn"
        ? stepIndex / mission.steps.length
        : phase === "quiz"
          ? 0.85
          : phase === "course-complete"
            ? 1
            : 0)) /
      chocolatierMissions.length) *
      100,
  )
  const nextMissionUnlocked =
    missionIndex === 0 || progress.completed.includes(chocolatierMissions[missionIndex - 1]?.slug)

  const diplomaUrl = useMemo(() => {
    if (!progress.diplomaCode) return null
    return `${siteOrigin()}/credencial/maestro-chocolatier/${progress.diplomaCode}`
  }, [progress.diplomaCode])

  const masteryMissions = chocolatierMissions.map((item) => {
    const score = progress.scores[item.slug]
    return {
      slug: item.slug,
      number: item.number,
      title: item.title,
      xp: item.xp,
      passed: progress.completed.includes(item.slug),
      firstTry: score?.firstTry,
    }
  })

  const dualitaMessage = useMemo(() => {
    if (phase === "out-of-hearts") {
      return "Sin vidas. Descansa o repasa la misión — mañana Dualita te recarga ♥. Así se entrena criterio de panel."
    }
    if (phase === "mission-complete") return mission.dualitaSuccess
    if (phase === "course-complete") {
      return `¡Diploma ${gradeLabel(grade)}! Mira tu nota, practica en Sembrar y comparte con 🍫 en el foro Colab.`
    }
    if (phase === "quiz") {
      if (quizPassed) return "¡Eso! Criterio limpio. Continúa — Dualita ya celebra contigo."
      if (progress.hearts <= 1) return "Última vida. Piensa como panel ciego — no elijas por posición."
      return "Primer intento limpio = nota de diploma. La racha 🔥 solo dice que volviste hoy."
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
      localStorage.setItem("chocolatier_progress_v2", JSON.stringify(next))
    } catch {
      // remoto
    }
    setSyncStatus("saving")
    void saveChocolatierProgress(next, next.xp, complete || isCourseDone(next)).then((result) => {
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

    const allDone = next.completed.length >= chocolatierMissions.length
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
      if (next.hearts === 0) setPhase("out-of-hearts")
    }, 1400)
  }

  function reviewMission() {
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setQuizPassed(false)
    setPendingScore(null)
    setPhase("learn")
  }

  function continueCampaign() {
    if (isCourseDone(progress)) {
      setPhase("course-complete")
      return
    }
    const nextIndex = Math.min(missionIndex + 1, chocolatierMissions.length - 1)
    setMissionIndex(nextIndex)
    setStepIndex(0)
    setSelected(null)
    setFeedback("")
    setQuizPassed(false)
    setPendingScore(null)
    setPhase("learn")
  }

  function selectMission(index: number) {
    const unlocked = index === 0 || progress.completed.includes(chocolatierMissions[index - 1].slug)
    if (!unlocked) return
    if (isCourseDone(progress) && index === chocolatierMissions.length - 1) {
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
    setPhase(progress.completed.includes(chocolatierMissions[index].slug) ? "mission-complete" : "learn")
  }

  return (
    <div className="architect-player chocolatier-player">
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
          <span title="Racha diaria">🔥 {progress.streak}</span>
          <span>✦ {progress.xp}</span>
        </div>
      </header>

      <div className="architect-layout">
        <aside className="architect-map">
          <p className="eyebrow text-[#FF6A3D]">Certificación · Master Chocolatier</p>
          <h1>
            Master
            <br />
            Chocolatier
          </h1>
          <p className="architect-welcome">
            {learnerName} · {completedCount}/6 · primer intento {firstTryCount}/6 · {chocolatierTotalXp} XP
          </p>
          <p className="chocolatier-grade-pill">{gradeLabel(grade)}</p>
          <p className="architect-cert-blurb">{gradeBlurb(grade)}</p>
          <p className="architect-cert-hint">{diplomaGradeExplainer()}</p>
          {gradeHint && <p className="architect-cert-hint">{gradeHint}</p>}
          {isCourseDone(progress) && (
            <button
              type="button"
              className="chocolatier-open-close"
              onClick={() => setPhase("course-complete")}
            >
              Ver calificación y diploma →
            </button>
          )}
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
          <CampusSourcesPanel compact title="CoEx · Awards · Fedecacao · papers" />
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
          <Link href="/rd/bars" className="chocolatier-sister-link">
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
                Primer intento correcto suma a la <strong className="text-white/60">nota del diploma</strong>.
                Opciones mezcladas — no hay «siempre la del medio». La racha 🔥 no califica.
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
                  {missionIndex >= chocolatierMissions.length - 1
                    ? "Ver calificación y diploma →"
                    : "Continuar →"}
                </button>
              )}
            </article>
          ) : phase === "mission-complete" ? (
            <div className="architect-complete">
              <span>✦</span>
              <p className="eyebrow text-[#E8C9A0]">Misión completada</p>
              <h2>+{mission.xp} XP</h2>
              <p>{mission.dualitaSuccess}</p>
              {isCourseDone(progress) ? (
                <button type="button" onClick={() => setPhase("course-complete")}>
                  Ver calificación y diploma →
                </button>
              ) : (
                missionIndex < chocolatierMissions.length - 1 && (
                  <button type="button" onClick={continueCampaign}>
                    Siguiente misión →
                  </button>
                )
              )}
            </div>
          ) : (
            <MasteryClose
              courseTitle="Master Chocolatier"
              learnerName={learnerName}
              grade={grade}
              xp={progress.xp}
              streak={progress.streak}
              hearts={progress.hearts}
              firstTry={firstTryCount}
              total={chocolatierMissions.length}
              missions={masteryMissions}
              diplomaUrl={diplomaUrl}
              practiceHref="/juega"
              practiceLabel="Practicar en Sembrar →"
              forumHref={`/colab?share=maestro-chocolatier&grade=${grade}`}
              sisterHref="/rd/bars"
              sisterLabel="Marca Benevolo →"
            />
          )}
        </main>
      </div>
      <DualitaCompanion
        message={dualitaMessage}
        tips={TIPS}
        mood={dualitaMood}
        pulseKey={dualitaPulse}
      />
    </div>
  )
}
