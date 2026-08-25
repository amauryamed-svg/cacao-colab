import { microModules } from "@/lib/dualita"
import ModuleCard from "./ModuleCard"
import TrackedLink from "@/components/analytics/TrackedLink"

export default function MicroTrack() {
  return (
    <article className="dualita-column dualita-column--micro">
      <header className="dualita-column-head">
        <p className="dualita-column-eyebrow">Microlearning · por CAÚA</p>
        <h3 className="dualita-column-brand">CAÚA</h3>
        <p className="dualita-column-title">Protocolo diario de cacao</p>
        <p className="dualita-column-lede">
          Cacao funcional, no chocolate de góndola — orígenes Huila y Santander, cubos, coberturas
          y hábito de 7 días. Sin dosis clínicas ni márgenes inventados.
        </p>
        <p className="dualita-column-stats">6 módulos · ~40 min · Dualita Companion</p>
      </header>

      <ol className="dualita-spine">
        {microModules.map((m, i) => (
          <li
            key={m.id}
            className="dualita-spine-item"
            style={{ animationDelay: `${0.08 * i + 0.12}s` }}
          >
            <ModuleCard module={m} track="micro" />
          </li>
        ))}
      </ol>

      <TrackedLink
        href="/aprende/cacao-bioactivo"
        event="microlearning_link_clicked"
        targetName="caua-microlearning"
        source="micro-track-cta"
        className="dualita-column-cta dualita-column-cta--micro"
      >
        Empezar protocolo CAÚA
      </TrackedLink>
      <p className="dualita-column-footnote">
        Contenido educativo CAÚA · no sustituye consejo médico
      </p>
    </article>
  )
}
