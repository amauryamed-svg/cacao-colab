"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import DualitaCompanion from "@/components/aprende/DualitaCompanion"
import { benevoloMissions, benevoloTotalXp, BENEVOLO_COURSE_SLUG } from "@/lib/benevolo-brand"
import { saveBenevoloProgress } from "@/app/campus/actions"
import {
  bumpStreak,
  encodeDiploma,
  gradeFromRatio,
  gradeLabel,
  linkedInShareUrl,
  MAX_HEARTS,
  normalizeRigorState,
  refillHeartsIfNeeded,
  siteOrigin,
  type DiplomaPayload,
  type RigorState,
} from "@/lib/campus-rigor"

export default function BenevoloCoursePlayer({
  learnerName,
  initialState,
}: {
  learnerName: string
  initialState?: unknown
}) {
  const [progress, setProgress] = useState<RigorState>(() =>
    refillHeartsIfNeeded(normalizeRigorState(initialState)),
  )
  const [missionIndex, setMissionIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<"learn" | "quiz" | "mission-complete" | "course-complete" | "out-of-hearts">(
    "learn",
  )
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")

  const mission = benevoloMissions[missionIndex]
  const step = mission.steps[stepIndex]
  const firstTryCount = Object.values(progress.scores).filter((s) => s.passed && s.firstTry).length
  const grade = gradeFromRatio(firstTryCount, benevoloMissions.length)

  const diplomaUrl = useMemo(() => {
    if (!progress.diplomaCode) return null
    return `${siteOrigin()}/credencial/benevolo/${progress.diplomaCode}`
  }, [progress.diplomaCode])

  const dualitaMessage = useMemo(() => {
    if (phase === "out-of-hearts") return "Sin vidas. Repasa o vuelve mañana — Benevolo también se acelera con constancia."
    if (phase === "course-complete") return "Marca acelerada desbloqueada. Comparte y trae a alguien al Colab."
    if (phase === "mission-complete") return "Tendencia + territorio. Sigue."
    if (phase === "quiz") return "Primer intento limpio sube tu diploma de marca."
    return stepIndex === 0 ? mission.summary : step.fieldAction
  }, [phase, mission, stepIndex, step])

  function persist(next: RigorState, complete = false) {
    try {
      localStorage.setItem("benevolo_progress_v1", JSON.stringify(next))
    } catch {
      /* */
    }
    void saveBenevoloProgress(next, next.xp, complete)
  }

  function nextStep() {
    if (stepIndex < mission.steps.length - 1) setStepIndex((v) => v + 1)
    else {
      const refreshed = refillHeartsIfNeeded(progress)
      setProgress(refreshed)
      if (refreshed.hearts <= 0) setPhase("out-of-hearts")
      else setPhase("quiz")
    }
  }

  function answer(optionId: string) {
    if (selected) return
    const option = mission.quiz.options.find((o) => o.id === optionId)
    if (!option) return
    setSelected(optionId)
    setFeedback(option.explanation)
    const attempts = (progress.scores[mission.slug]?.attempts ?? 0) + 1
    if (option.correct) {
      window.setTimeout(() => completeMission(attempts === 1), 1000)
      return
    }
    let next = bumpStreak(refillHeartsIfNeeded(progress))
    next = {
      ...next,
      hearts: Math.max(0, next.hearts - 1),
      scores: { ...next.scores, [mission.slug]: { attempts, passed: false, firstTry: false } },
    }
    setProgress(next)
    persist(next)
    window.setTimeout(() => {
      setSelected(null)
      setFeedback("")
      if (next.hearts === 0) setPhase("out-of-hearts")
    }, 1300)
  }

  function completeMission(firstTry: boolean) {
    const already = progress.completed.includes(mission.slug)
    let next = bumpStreak(refillHeartsIfNeeded(progress))
    next = {
      ...next,
      completed: already ? next.completed : [...next.completed, mission.slug],
      xp: already ? next.xp : next.xp + mission.xp,
      scores: {
        ...next.scores,
        [mission.slug]: {
          attempts: (next.scores[mission.slug]?.attempts ?? 0) + (firstTry ? 1 : 1),
          passed: true,
          firstTry: firstTry || Boolean(next.scores[mission.slug]?.firstTry),
        },
      },
    }
    const allDone = next.completed.length === benevoloMissions.length
    if (allDone && !next.diplomaCode) {
      const ft = Object.values(next.scores).filter((s) => s.passed && s.firstTry).length
      const payload: DiplomaPayload = {
        v: 1,
        course: BENEVOLO_COURSE_SLUG,
        title: "Chocolate Benevolo · marca acelerada",
        name: learnerName,
        issuedAt: new Date().toISOString(),
        grade: gradeFromRatio(ft, benevoloMissions.length),
        firstTry: ft,
        total: benevoloMissions.length,
        xp: next.xp,
        streak: next.streak,
      }
      next = { ...next, diplomaCode: encodeDiploma(payload) }
    }
    setProgress(next)
    setPhase(allDone ? "course-complete" : "mission-complete")
    persist(next, allDone)
  }

  return (
    <div className="architect-player chocolatier-player benevolo-player">
      <header className="architect-topbar">
        <Link href="/rd/bars" className="architect-exit">
          ← Bars. Colab
        </Link>
        <div className="architect-progress">
          <i
            style={{
              width: `${Math.round((progress.completed.length / benevoloMissions.length) * 100)}%`,
            }}
          />
        </div>
        <div className="architect-resources">
          <span>
            ♥ {progress.hearts}/{MAX_HEARTS}
          </span>
          <span>🔥 {progress.streak}</span>
          <span>✦ {progress.xp}</span>
        </div>
      </header>

      <div className="architect-layout">
        <aside className="architect-map">
          <p className="eyebrow text-[#FF6A3D]">Marca acelerada · cacaotier</p>
          <h1>
            Chocolate
            <br />
            Benevolo
          </h1>
          <p className="architect-welcome">
            {learnerName} · {progress.completed.length}/3 · {benevoloTotalXp} XP · {gradeLabel(grade)}
          </p>
          <div className="architect-mission-rail">
            {benevoloMissions.map((item, index) => {
              const done = progress.completed.includes(item.slug)
              const unlocked =
                index === 0 || progress.completed.includes(benevoloMissions[index - 1].slug)
              return (
                <button
                  key={item.slug}
                  type="button"
                  disabled={!unlocked}
                  className={`${missionIndex === index ? "active" : ""} ${done ? "done" : ""}`}
                  onClick={() => {
                    if (!unlocked) return
                    setMissionIndex(index)
                    setStepIndex(0)
                    setPhase(done ? "mission-complete" : "learn")
                  }}
                >
                  <span>{done ? "✓" : item.number}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>
                      {item.trendLink} · {item.xp} XP
                    </small>
                  </span>
                </button>
              )
            })}
          </div>
          <Link href="/campus/maestro-chocolatier" className="chocolatier-sister-link">
            Hermano · Master 70 % →
          </Link>
        </aside>

        <main className="architect-stage">
          {phase === "out-of-hearts" ? (
            <div className="architect-complete">
              <span>♥</span>
              <h2>Sin vidas</h2>
              <p>Recarga mañana o repasa los pasos.</p>
              <button
                type="button"
                onClick={() => {
                  setStepIndex(0)
                  setPhase("learn")
                }}
              >
                Repasar →
              </button>
            </div>
          ) : phase === "learn" ? (
            <article className="architect-lesson-card">
              <p className="eyebrow text-[#E8C9A0]">
                {mission.number} · {step.kicker}
              </p>
              <h2>{step.title}</h2>
              <p className="architect-body">{step.body}</p>
              <div className="architect-field-action">
                <span>◎ Tendencia × oficio</span>
                <strong>{step.fieldAction}</strong>
              </div>
              <button type="button" onClick={nextStep} className="architect-next">
                {stepIndex === mission.steps.length - 1 ? "Reto →" : "Continuar →"}
              </button>
            </article>
          ) : phase === "quiz" ? (
            <article className="architect-lesson-card">
              <h2>{mission.quiz.question}</h2>
              <div className="architect-options">
                {mission.quiz.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={Boolean(selected)}
                    onClick={() => answer(option.id)}
                    className={
                      selected
                        ? option.correct
                          ? "correct"
                          : selected === option.id
                            ? "wrong"
                            : "muted"
                        : ""
                    }
                  >
                    <span>{option.id.toUpperCase()}</span>
                    {option.text}
                  </button>
                ))}
              </div>
              {feedback && <p className="architect-feedback">{feedback}</p>}
            </article>
          ) : phase === "mission-complete" ? (
            <div className="architect-complete">
              <span>✦</span>
              <h2>+{mission.xp} XP</h2>
              {missionIndex < benevoloMissions.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setMissionIndex((i) => i + 1)
                    setStepIndex(0)
                    setSelected(null)
                    setPhase("learn")
                  }}
                >
                  Siguiente →
                </button>
              )}
            </div>
          ) : (
            <div className="architect-complete">
              <span>◈</span>
              <h2>Benevolo acelerado</h2>
              <p className="chocolatier-grade-pill mx-auto">{gradeLabel(grade)}</p>
              <p>Duja · tendencia · preorden. Comparte y suma al colectivo.</p>
              <div className="flex flex-wrap justify-center gap-3">
                {diplomaUrl && (
                  <>
                    <a href={diplomaUrl}>Ver diploma →</a>
                    <a href={linkedInShareUrl(diplomaUrl)} target="_blank" rel="noopener noreferrer">
                      LinkedIn →
                    </a>
                  </>
                )}
                <Link href="/rd/bars">Preorden Bars. →</Link>
                <Link href="/unete">Colab</Link>
              </div>
            </div>
          )}
        </main>
      </div>
      <DualitaCompanion
        message={dualitaMessage}
        tips={[
          "Benevolo es marca acelerada, no el capstone 70 %.",
          "Tendencia sin origen es ruido; origen sin deseo no escala.",
          "Invita a tu generación al Colab.",
        ]}
      />
    </div>
  )
}
