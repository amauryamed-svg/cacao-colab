import Link from "next/link"
import {
  masteryCurvePrinciple,
  masteryFunnelPath,
  masteryPhases,
  type MasteryPhaseId,
} from "@/lib/mastery-curve"

type Props = {
  highlight?: MasteryPhaseId
  compact?: boolean
}

export default function MasteryCurveStrip({ highlight, compact = false }: Props) {
  return (
    <section className={`mastery-curve ${compact ? "is-compact" : ""}`}>
      <div className="mastery-curve-head">
        <p className="eyebrow text-colab-yellow">Funnel · curva de maestría</p>
        <h2>Del optimismo desinformado al oficio</h2>
        <p>{masteryCurvePrinciple}</p>
      </div>
      <ol className="mastery-curve-phases">
        {masteryPhases.map((phase) => (
          <li
            key={phase.id}
            className={highlight === phase.id ? "is-current" : undefined}
          >
            <span>{phase.eyebrow}</span>
            <strong>{phase.title}</strong>
            {!compact && <p>{phase.body}</p>}
            <em>Microvictoria: {phase.microVictory}</em>
            <Link href={phase.gravityHref}>{phase.gravityCta} →</Link>
          </li>
        ))}
      </ol>
      <div className="mastery-curve-path">
        {masteryFunnelPath.map((step) => (
          <Link key={step.n} href={step.href}>
            <small>{step.n}</small>
            <strong>{step.title}</strong>
            <span>{step.note}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
