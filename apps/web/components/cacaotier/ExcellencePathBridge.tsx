import Link from "next/link"
import type { CSSProperties } from "react"
import FineFlavorWheel from "@/components/sensory/FineFlavorWheel"
import {
  excellenceGates,
  excellencePathMeta,
  precursorToWheelLinks,
} from "@/lib/excellence-path"

export default function ExcellencePathBridge() {
  return (
    <section className="excellence-bridge" id="camino-excelencia" aria-labelledby="excellence-bridge-title">
      <div className="excellence-bridge-header">
        <div>
          <p className="eyebrow text-colab-yellow">{excellencePathMeta.eyebrow}</p>
          <h2 id="excellence-bridge-title" className="display-title text-colab-cream mt-3">
            Fermentación limpia.<br />
            Complejidad legible.<br />
            <em>Tostión que respeta.</em>
          </h2>
        </div>
        <p className="excellence-bridge-lede">{excellencePathMeta.lede}</p>
      </div>

      <ol className="excellence-gates">
        {excellenceGates.map((gate) => (
          <li key={gate.id} style={{ "--gate-accent": gate.accent } as CSSProperties}>
            <span className="excellence-gate-step">{gate.step}</span>
            <h3>{gate.title}</h3>
            <p className="excellence-gate-claim">{gate.claim}</p>
            <p className="excellence-gate-detail">{gate.detail}</p>
            <Link href={gate.href} className="excellence-gate-cta">
              {gate.cta} →
            </Link>
          </li>
        ))}
      </ol>

      <div className="excellence-correlations">
        <div>
          <p className="eyebrow text-colab-yellow">Correlación Cacaotier → rueda</p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-colab-cream mt-3">
            Del péptido al radio sensorial.
          </h3>
          <p className="text-sm leading-relaxed text-colab-cream/55 mt-3">
            Misma evidencia del atlas: cuando la fermentación acumula precursores superiores,
            la rueda gana radios complementary y tipicidad. Si pierdes la ventana, aparecen off-flavours
            — y ninguna tostión bean-to-bar los convierte en excelencia.
          </p>
          <ul className="excellence-corr-list">
            {precursorToWheelLinks.map((row) => (
              <li key={row.peptide}>
                <strong>{row.peptide}</strong>
                <span className="excellence-corr-notes">{row.notes}</span>
                <span className="excellence-corr-spokes">
                  {row.spokes.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </span>
                <p>{row.why}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="excellence-wheel-panel">
          <p className="eyebrow text-colab-cream/45">Rueda Fine-Flavor Colab</p>
          <p className="text-sm text-colab-cream/55 mt-2 mb-5 leading-relaxed">
            Gira los radios: floral, nuez, fruta y tipicidad son el destino de una fermentación limpia;
            defectos son la huella de un lote abandonado.
          </p>
          <FineFlavorWheel />
          <div className="excellence-wheel-actions">
            <Link href="/conocimiento/rueda-fine-flavor" className="excellence-gate-cta">
              Profundizar en la rueda →
            </Link>
            <Link href="/aprende/catador" className="excellence-gate-cta excellence-gate-cta-ghost">
              Entrenar en Master Catador →
            </Link>
            <Link href="/aprende/chocolatier" className="excellence-gate-cta excellence-gate-cta-ghost">
              Diseñar tostión en Chocolatier →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
