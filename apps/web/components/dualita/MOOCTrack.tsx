import { moocModules } from "@/lib/dualita"
import ModuleCard from "./ModuleCard"
import TrackedLink from "@/components/analytics/TrackedLink"

const firstAvailable =
  moocModules.find((m) => m.status === "available" && m.url)?.url ??
  "/aprende/mooc/zurych-territorio"

export default function MOOCTrack() {
  return (
    <article className="dualita-column dualita-column--mooc">
      <header className="dualita-column-head">
        <p className="dualita-column-eyebrow">MOOC · patrocinio Zurych</p>
        <h3 className="dualita-column-brand">Zurych</h3>
        <p className="dualita-column-title">Bean-to-bar con propósito</p>
        <p className="dualita-column-lede">
          De Santander a Bogotá: territorio, agroecología y portafolio real — con hechos de
          chocolatezurych.com y @tiendazurych. Tres módulos jugables; el cuarto en apertura.
        </p>
        <p className="dualita-column-stats">4 módulos · ~3 h · Dualita Companion</p>
      </header>

      <ol className="dualita-spine">
        {moocModules.map((m, i) => (
          <li
            key={m.id}
            className="dualita-spine-item"
            style={{ animationDelay: `${0.08 * i + 0.12}s` }}
          >
            <ModuleCard module={m} track="mooc" />
          </li>
        ))}
      </ol>

      <TrackedLink
        href={firstAvailable}
        event="mooc_link_clicked"
        targetName="zurych-mooc"
        source="mooc-track-cta"
        className="dualita-column-cta dualita-column-cta--mooc"
      >
        Abrir módulo 1 · Territorio
      </TrackedLink>
      <p className="dualita-column-footnote">
        Presentado por Zurych · espacio de patrocinio educativo explícito
      </p>
    </article>
  )
}
