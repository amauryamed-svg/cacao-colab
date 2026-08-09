import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import AtmospherePlane from "@/components/atmosphere/AtmospherePlane"
import FloatingPods from "@/components/atmosphere/FloatingPods"
import MasteryCurveStrip from "@/components/funnel/MasteryCurveStrip"
import {
  COLLABORATORIO_PATH,
  colabRutaSteps,
  colabRutaTracks,
  collaboratorioEssence,
} from "@/lib/colab-ruta"
import { shotById } from "@/lib/atmosphere"

export const metadata: Metadata = {
  title: "Collaboratorio · de ceros a página de producto",
  description:
    "Ruta Colab: emprendedor y marca desde cero hasta maestría chocolatier y R&D. El Collaboratorio es la esencia — nodos que publican su propio producto.",
  openGraph: {
    title: "Collaboratorio · Cacao Colab",
    description: collaboratorioEssence.lede,
    url: `https://cacaocolab.org${COLLABORATORIO_PATH}`,
  },
}

export default function CollaboratorioPage() {
  return (
    <div className="collaboratorio">
      <header className="collaboratorio-hero relative overflow-hidden">
        <AtmospherePlane src={shotById("shards").src} alt="" overlay="cocoa" />
        <FloatingPods variant="stage" />
        <div className="collaboratorio-hero-inner relative z-[1]">
          <Link href="/rd" className="eyebrow text-colab-cream/40 hover:text-colab-yellow">
            ← R&D Colab
          </Link>
          <p className="eyebrow text-colab-yellow mt-5">Esencia · Collaboratorio</p>
          <h1>
            De ceros a
            <br />
            <em>página de producto</em>
          </h1>
          <p className="collaboratorio-lede">{collaboratorioEssence.lede}</p>
          <div className="collaboratorio-ctas">
            <Link href="/unete" className="collab-cta-primary">
              Empezar desde cero →
            </Link>
            <Link href="/aprende/chocolatier" className="collab-cta-ghost">
              Ver Master Chocolatier →
            </Link>
            <Link href="/nodo" className="collab-cta-ghost">
              Red de nodos →
            </Link>
          </div>
        </div>
      </header>

      <main className="collaboratorio-main">
        <section className="collaboratorio-principles">
          {collaboratorioEssence.principles.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="collaboratorio-tracks">
          <p className="eyebrow text-colab-yellow">Tres puertas · misma ruta</p>
          <h2>Emprendedor, marca y nodo</h2>
          <p className="collaboratorio-section-lede">
            No llegas solo como alumno. Llegas como quien va a publicar. Elige tu puerta — el
            Collaboratorio te pide evidencia en cada peldaño.
          </p>
          <div className="collaboratorio-tracks-grid">
            {colabRutaTracks.map((track) => (
              <article key={track.id} data-track={track.id}>
                <p className="eyebrow">{track.eyebrow}</p>
                <h3>{track.title}</h3>
                <p>{track.body}</p>
                <ol>
                  {track.milestones.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className="collaboratorio-ruta">
          <p className="eyebrow text-[#FF6A3D]">Ruta de mejoramiento</p>
          <h2>
            Seis peldaños hasta
            <br />
            tu propio output R&D
          </h2>
          <ol className="collaboratorio-steps">
            {colabRutaSteps.map((step) => (
              <li key={step.n}>
                <div className="collaboratorio-step-head">
                  <span>{step.n}</span>
                  <small>{step.phase}</small>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <em>Evidencia: {step.evidence}</em>
                <Link href={step.href}>{step.cta}</Link>
              </li>
            ))}
          </ol>
        </section>

        <div className="collaboratorio-curve">
          <MasteryCurveStrip />
        </div>

        <section className="collaboratorio-case">
          <div>
            <p className="eyebrow text-[#FF6A3D]">Caso · modelo para nodos</p>
            <h2>{collaboratorioEssence.caseStudy.name}</h2>
            <p className="collaboratorio-case-role">{collaboratorioEssence.caseStudy.role}</p>
            <p>{collaboratorioEssence.caseStudy.body}</p>
            <div className="collaboratorio-ctas">
              <Link href={collaboratorioEssence.caseStudy.href} className="collab-cta-primary">
                {collaboratorioEssence.caseStudy.cta}
              </Link>
              <Link href="/rd" className="collab-cta-ghost">
                Hub R&D →
              </Link>
            </div>
          </div>
          <aside>
            <p className="eyebrow text-colab-yellow">Por qué importa</p>
            <h3>Que tu nodo quiera su página</h3>
            <p>
              Cuando un emprendedor cierra Chocolatier y deja un producto en el Collaboratorio, el
              siguiente nodo deja de preguntar «¿curso?» y pregunta «¿cuándo publico la mía?». Esa
              es la gravedad Colab.
            </p>
            <Link href="/unete/bio">Crear bio de nodo →</Link>
          </aside>
        </section>

        <section className="collaboratorio-close">
          <p className="eyebrow text-colab-yellow">Tu siguiente microvictoria</p>
          <h2>Empieza en ceros. Publica con criterio.</h2>
          <p>
            Únete, gana tu primer hábito en Dualita/Sembrar, sube a Chocolatier y lleva un output al
            R&D. El Collaboratorio te espera — y la red también.
          </p>
          <div className="collaboratorio-ctas">
            <Link href="/unete" className="collab-cta-primary">
              Unirme ahora →
            </Link>
            <TrackedLink
              href="https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20llevar%20mi%20nodo%20a%20una%20p%C3%A1gina%20de%20producto%20en%20R%26D."
              event="sponsor_interest"
              targetName="collaboratorio-nodo-producto"
              source="collaboratorio"
              external
              className="collab-cta-ghost"
            >
              Hablar de mi página de producto →
            </TrackedLink>
          </div>
        </section>
      </main>
    </div>
  )
}
