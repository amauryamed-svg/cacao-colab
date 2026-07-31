'use client'

import { type Module } from "@/lib/dualita"
import { useColabProgress } from "@/lib/hooks/useColabProgress"
import TrackedLink from "@/components/analytics/TrackedLink"

type Props = { module: Module; track: "mooc" | "micro" }

export default function ModuleCard({ module, track }: Props) {
  const { completed } = useColabProgress()
  const isMooc = track === "mooc"
  const isDone = track === "micro" && !!module.slug && !!completed[module.slug]
  const href = module.status === "available" ? module.url : undefined
  const tone = isMooc ? "mooc" : "micro"

  const inner = (
    <>
      <span className="dualita-step-index" aria-hidden>
        {isDone ? "✓" : String(module.number).padStart(2, "0")}
      </span>
      <div className="dualita-step-body">
        <div className="dualita-step-head">
          <h4>{module.title}</h4>
          <span className="dualita-step-meta">
            {isDone ? "Hecho" : module.status === "coming-soon" ? "Pronto" : module.duration}
          </span>
        </div>
        <p className="dualita-step-topics">{module.topics.join(" · ")}</p>
        {href && <span className="dualita-step-cta">{isDone ? "Repasar" : "Entrar"} →</span>}
      </div>
    </>
  )

  if (href) {
    return (
      <TrackedLink
        href={href}
        event={isMooc ? "mooc_link_clicked" : "microlearning_link_clicked"}
        targetName={isMooc ? "zurych-mooc" : "caua-microlearning"}
        source={`module-${module.slug ?? module.id}`}
        className={`dualita-step dualita-step--${tone}${isDone ? " is-done" : ""}`}
      >
        {inner}
      </TrackedLink>
    )
  }

  return (
    <div className={`dualita-step dualita-step--${tone} is-locked`} aria-disabled>
      {inner}
    </div>
  )
}
