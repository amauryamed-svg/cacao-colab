import type { Metadata } from "next"
import Link from "next/link"
import FermentationLab from "@/components/cacaotier/FermentationLab"
import { cacaotierMissions, paperSources } from "@/lib/cacaotier-course"

export const metadata: Metadata = {
  title: "Master Cacaotier · Fermentación de precisión",
  description:
    "Microlearning aplicado para comparar fermentación de cacao FEAR 5 en biorreactor, tanque adaptado y cajón tradicional.",
}

const fieldKit = [
  "2 sensores de temperatura calibrados",
  "Medidor de pH + soluciones buffer",
  "Balanza, reloj y ficha de lote",
  "Muestra testigo por cada 24 horas",
  "Protocolo común de secado",
  "Evaluación de corte y taza",
]

export default function CacaotierCoursePage() {
  return (
    <div className="bg-colab-forest min-h-screen">
      <header className="course-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
          <Link href="/aprende" className="eyebrow text-colab-cream/45 hover:text-colab-yellow transition-colors">
            ← Volver al campus
          </Link>
          <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-end mt-10">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="course-chip">Nivel profesional</span>
                <span className="course-chip">6 misiones</span>
                <span className="course-chip">700 XP</span>
              </div>
              <p className="eyebrow text-colab-yellow">Master Cacaotier · Protocolo 01</p>
              <h1 className="display-title text-colab-cream mt-4 max-w-4xl">
                Diseña el sabor<br />antes de <em>tostarlo.</em>
              </h1>
              <p className="mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-colab-cream/60">
                Aprende a pilotar la fermentación como bioproceso: lee temperatura, pH y ventanas de
                precursores. Distingue 72 h (óptimo metabolómico Tc-pH), 96–120 h (cajón) y 120 h
                (ancla sensorial del chocolate de biorreactor publicado).
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/campus/arquitecto-fermentacion" className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold">
                  Empezar campaña con Dualita →
                </Link>
                <Link href="/cuenta/entrar?next=/campus/arquitecto-fermentacion" className="border border-white/20 text-colab-cream rounded-full px-7 py-3.5 text-sm font-bold">
                  Entrar al campus
                </Link>
              </div>
            </div>
            <div className="credential-card">
              <div className="flex justify-between items-start">
                <span className="text-4xl">◉</span>
                <span className="eyebrow text-colab-forest/50">Credencial 01</span>
              </div>
              <p className="font-serif text-3xl font-bold text-colab-forest mt-10">Arquitecto de fermentación</p>
              <p className="text-sm text-colab-forest/65 mt-3 leading-relaxed">
                Completa las seis misiones, documenta un lote y desbloquea la ruta Master Chocolatier.
              </p>
              <div className="mt-8 pt-4 border-t border-colab-forest/15 flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>Amaury Amed</span><span>cacaotier</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <section className="grid lg:grid-cols-[.7fr_1.3fr] gap-12 items-start mb-24">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow text-colab-pod">Tu campaña</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-colab-cream mt-4">
              De recolector<br />a maestro de lote.
            </h2>
            <p className="text-sm leading-relaxed text-colab-cream/55 mt-5">
              Cada misión combina una decisión real de finca, una lectura corta y un reto verificable.
              El XP reconoce avance; la bitácora demuestra competencia.
            </p>
            <div className="quest-status mt-7">
              <div><span>Rango comunitario</span><strong>Semilla</strong></div>
              <div><span>Siguiente rango</span><strong>Brote · 100 MD</strong></div>
            </div>
          </div>
          <div className="space-y-3">
            {cacaotierMissions.map((mission, index) => (
              <article key={mission.number} className={`mission-card ${index === 0 ? "mission-card-live" : ""}`}>
                <span className="mission-number">{mission.number}</span>
                <div className="flex-1">
                  <p className="eyebrow text-colab-cream/35">{mission.skill}</p>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-colab-cream mt-1">{mission.title}</h3>
                </div>
                <div className="text-right">
                  <strong className="block text-colab-yellow">{mission.xp} XP</strong>
                  <small className="text-colab-cream/40">{mission.duration}</small>
                </div>
                <span className="mission-lock" aria-label={index === 0 ? "Disponible" : "Se desbloquea en secuencia"}>
                  {index === 0 ? "→" : "◇"}
                </span>
              </article>
            ))}
          </div>
        </section>

        <FermentationLab />

        <section className="mt-16 rounded-3xl border border-white/10 bg-[#101d0b] p-7 md:p-10">
          <p className="eyebrow text-colab-yellow">Lectura del paper · §3.4.3 y conclusiones</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-colab-cream mt-3">
            Por qué aparecen dos tiempos a la vez.
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-8">
            <article>
              <strong className="text-colab-yellow text-sm">72 h · Tc-pH</strong>
              <p className="text-sm leading-relaxed text-colab-cream/55 mt-3">
                Óptimo metabolómico propuesto a 45 °C con pH espontáneo. Ahí peakean péptidos de
                calidad superior (FASKDQPLNA, FGVPSKL, LAIN…). No hubo panel sensorial de chocolate a 72 h.
              </p>
            </article>
            <article>
              <strong className="text-colab-yellow text-sm">120 h · ancla sensorial</strong>
              <p className="text-sm leading-relaxed text-colab-cream/55 mt-3">
                Punto en el que se elaboró el chocolate de biorreactor y se construyeron las redes
                péptido–volátil–atributo (Fig. 6). Sirve para replicar el paper, no para confundirlo con el óptimo de precursores.
              </p>
            </article>
            <article>
              <strong className="text-colab-yellow text-sm">96–120 h · cajón</strong>
              <p className="text-sm leading-relaxed text-colab-cream/55 mt-3">
                Óptimo propuesto para fermentación estándar. Más allá de 144 h se intensifican biomarcadores
                de calidad inferior. Con pH controlado el paper propuso 48–72 h, con el riesgo de amargor si la acidificación fue demasiado rápida.
              </p>
            </article>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mt-24">
          <div className="field-card">
            <p className="eyebrow text-colab-green">Kit de campo</p>
            <h2 className="font-serif text-3xl font-bold text-colab-forest mt-3">Antes de iniciar el lote</h2>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {fieldKit.map((item) => (
                <li key={item} className="field-check"><span>✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="field-card bg-colab-yellow">
            <p className="eyebrow text-colab-forest/60">Regla del maestro</p>
            <blockquote className="font-serif text-3xl md:text-4xl font-bold leading-tight text-colab-forest mt-4">
              “La curva orienta.<br />El lote decide.”
            </blockquote>
            <p className="text-sm leading-relaxed text-colab-forest/65 mt-7">
              No copies un setpoint sin medir masa, transferencia térmica, pH interno, corte, secado y taza.
              El artículo estudió una finca, una cosecha y un lote FEAR 5: es una base experimental, no una
              garantía universal.
            </p>
          </div>
        </section>

        <section className="mt-24 border-t border-white/10 pt-12" id="fuentes">
          <div className="grid lg:grid-cols-[.6fr_1.4fr] gap-10">
            <div>
              <p className="eyebrow text-colab-yellow">Biblioteca de evidencia</p>
              <h2 className="font-serif text-3xl font-bold text-colab-cream mt-3">Lee la fuente,<br />no solo la curva.</h2>
            </div>
            <div className="space-y-3">
              {paperSources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-row"
                >
                  <span><strong>{source.label}</strong><small>{source.note}</small></span>
                  <span aria-hidden>↗</span>
                </a>
              ))}
              <p className="text-xs leading-relaxed text-colab-cream/40 pt-3">
                Nota de rigor: “pH controlado” en el estudio fue acidificación inicial, no control continuo
                por realimentación. La concentración de ácido presenta una inconsistencia entre método y tabla;
                por eso este curso no prescribe esa dosificación.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
