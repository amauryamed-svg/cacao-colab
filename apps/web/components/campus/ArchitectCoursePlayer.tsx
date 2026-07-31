"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import DualitaCompanion from "@/components/aprende/DualitaCompanion"
import { architectMissions, architectTotalXp } from "@/lib/architect-course"
import { saveArchitectProgress } from "@/app/campus/actions"

type CourseState = {
  completed: string[]
  xp: number
}

const emptyState: CourseState = { completed: [], xp: 0 }

export default function ArchitectCoursePlayer({
  learnerName,
  initialState,
}: {
  learnerName: string
  initialState?: CourseState | null
}) {
  const [progress, setProgress] = useState<CourseState>(initialState ?? emptyState)
  const [missionIndex, setMissionIndex] = useState(() => {
    const firstOpen = architectMissions.findIndex((mission) => !(initialState?.completed ?? []).includes(mission.slug))
    return firstOpen === -1 ? 0 : firstOpen
  })
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<"learn" | "quiz" | "mission-complete" | "course-complete">("learn")
  const [hearts, setHearts] = useState(3)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [syncStatus, setSyncStatus] = useState<"idle" | "saving" | "saved" | "local">("idle")

  const mission = architectMissions[missionIndex]
  const step = mission.steps[stepIndex]
  const completedCount = progress.completed.length
  const overallProgress = Math.round(((completedCount + (phase === "learn" ? stepIndex / mission.steps.length : .8)) / architectMissions.length) * 100)
  const nextMissionUnlocked = missionIndex === 0 || progress.completed.includes(architectMissions[missionIndex - 1]?.slug)
  const dualitaMessage = useMemo(() => {
    if (phase === "mission-complete") return mission.dualitaSuccess
    if (phase === "course-complete") return "¡Lo lograste! Tu credencial reconoce criterio y trazabilidad; la evidencia real sigue viviendo en tus lotes."
    if (phase === "quiz") return hearts === 1 ? "Último corazón. Respira: busca la afirmación que no excede la evidencia." : "No adivines. Elige la respuesta que podrías defender frente a otro productor."
    return stepIndex === 0 ? mission.dualitaIntro : step.fieldAction
  }, [phase, mission, hearts, stepIndex, step])

  function persist(next: CourseState, complete = false) {
    try {
      localStorage.setItem("architect_progress_v1", JSON.stringify(next))
    } catch {
      // El guardado remoto sigue siendo la fuente principal.
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
      setPhase("quiz")
    }
  }

  function answer(optionId: string) {
    if (selected) return
    const option = mission.quiz.options.find((item) => item.id === optionId)
    if (!option) return
    setSelected(optionId)
    setFeedback(option.explanation)
    if (option.correct) {
      window.setTimeout(() => completeMission(), 1100)
      return
    }
    const nextHearts = hearts - 1
    setHearts(nextHearts)
    window.setTimeout(() => {
      setSelected(null)
      setFeedback(nextHearts === 0 ? "Dualita recargó tus corazones. Repasa la pista y vuelve a intentarlo." : "")
      if (nextHearts === 0) setHearts(3)
    }, 1400)
  }

  function completeMission() {
    const alreadyComplete = progress.completed.includes(mission.slug)
    const next = {
      completed: alreadyComplete ? progress.completed : [...progress.completed, mission.slug],
      xp: alreadyComplete ? progress.xp : progress.xp + mission.xp,
    }
    setProgress(next)
    setPhase(next.completed.length === architectMissions.length ? "course-complete" : "mission-complete")
    persist(next, next.completed.length === architectMissions.length)
  }

  function continueCampaign() {
    const nextIndex = Math.min(missionIndex + 1, architectMissions.length - 1)
    setMissionIndex(nextIndex)
    setStepIndex(0)
    setHearts(3)
    setSelected(null)
    setFeedback("")
    setPhase("learn")
  }

  function selectMission(index: number) {
    const unlocked = index === 0 || progress.completed.includes(architectMissions[index - 1].slug)
    if (!unlocked) return
    setMissionIndex(index)
    setStepIndex(0)
    setHearts(3)
    setSelected(null)
    setFeedback("")
    setPhase(progress.completed.includes(architectMissions[index].slug) ? "mission-complete" : "learn")
  }

  return (
    <div className="architect-player">
      <header className="architect-topbar">
        <Link href="/cuenta" className="architect-exit">← Campus</Link>
        <div className="architect-progress"><i style={{ width: `${overallProgress}%` }} /></div>
        <div className="architect-resources"><span>♥ {hearts}</span><span>✦ {progress.xp}</span></div>
      </header>

      <div className="architect-layout">
        <aside className="architect-map">
          <p className="eyebrow text-colab-yellow">Campaña profesional</p>
          <h1>Arquitecto de<br />Fermentación</h1>
          <p className="architect-welcome">{learnerName} · {completedCount}/6 misiones · {architectTotalXp} XP posibles</p>
          <div className="architect-mission-rail">
            {architectMissions.map((item, index) => {
              const done = progress.completed.includes(item.slug)
              const unlocked = index === 0 || progress.completed.includes(architectMissions[index - 1].slug)
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => selectMission(index)}
                  disabled={!unlocked}
                  className={`${missionIndex === index ? "active" : ""} ${done ? "done" : ""}`}
                >
                  <span>{done ? "✓" : unlocked ? item.number : "◇"}</span>
                  <span><strong>{item.title}</strong><small>{item.skill} · {item.xp} XP</small></span>
                </button>
              )
            })}
          </div>
          <p className="architect-sync">
            {syncStatus === "saving" ? "Sincronizando…" : syncStatus === "saved" ? "✓ Progreso sincronizado" : syncStatus === "local" ? "Guardado local · aplica migración Supabase" : "Campus registrado"}
          </p>
        </aside>

        <main className="architect-stage">
          {!nextMissionUnlocked ? (
            <div className="architect-complete"><span>◇</span><h2>Completa la misión anterior</h2></div>
          ) : phase === "learn" ? (
            <article className="architect-lesson-card" key={`${mission.slug}-${stepIndex}`}>
              <div className="architect-step-dots">
                {mission.steps.map((_, index) => <i key={index} className={index <= stepIndex ? "active" : ""} />)}
              </div>
              <p className="eyebrow text-colab-green">Misión {mission.number} · {step.kicker}</p>
              <h2>{step.title}</h2>
              <p className="architect-body">{step.body}</p>
              <div className="architect-field-action"><span>◎ Acción de campo</span><strong>{step.fieldAction}</strong></div>
              <button type="button" onClick={nextStep} className="architect-next">
                {stepIndex === mission.steps.length - 1 ? "Resolver reto →" : "Continuar →"}
              </button>
            </article>
          ) : phase === "quiz" ? (
            <article className="architect-lesson-card">
              <p className="eyebrow text-colab-yellow">Reto de criterio · ♥ {hearts}</p>
              <h2>{mission.quiz.question}</h2>
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
                      <span>{option.id.toUpperCase()}</span>{option.text}
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
              {missionIndex < architectMissions.length - 1 && <button type="button" onClick={continueCampaign}>Siguiente misión →</button>}
            </div>
          ) : (
            <div className="architect-complete">
              <span>◉</span>
              <p className="eyebrow text-colab-yellow">Credencial desbloqueada</p>
              <h2>Arquitecto de Fermentación</h2>
              <p>Completaste seis misiones y {architectTotalXp} XP. Ahora convierte el criterio en una bitácora real.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/juega">Aplicar en Sembrar →</Link>
                <Link href="/aprende/cacaotier">Abrir laboratorio de curvas</Link>
              </div>
            </div>
          )}
        </main>
      </div>
      <DualitaCompanion
        message={dualitaMessage}
        tips={[
          "Distingue siempre dato publicado, observado, calculado y propuesto.",
          "El XP mide avance educativo; no certifica por sí solo la calidad de un lote.",
          "FEAR 5 comercial en otro nodo necesita su propia línea base.",
        ]}
      />
    </div>
  )
}
