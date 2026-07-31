import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import {
  benevoloProduct,
  ecosystemSpearhead,
  evidenceLabels,
  knowledgeTopics,
  priorityVarieties,
} from "@/lib/knowledge-base"

export const metadata: Metadata = {
  title: "Conocimiento · Cacao Colab",
  description:
    "Base de conocimiento del ecosistema: EUDR, orgánico, denominación de origen, Cacao of Excellence, FEAR 5, Ecoyuma y Benevolo.",
}

export default function ConocimientoPage() {
  return (
    <div className="bg-colab-forest min-h-screen">
      <header className="course-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
          <p className="eyebrow text-colab-yellow">Biblioteca viva del ecosistema</p>
          <h1 className="display-title text-colab-cream mt-4 max-w-4xl">
            Del paper<br /><em>a la mesa.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-colab-cream/60">
            {ecosystemSpearhead.body}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/rd" className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold">
              R&D · Benevolo + coberturas →
            </Link>
            <TrackedLink
              href="https://tienda.ecoyuma.com.co/11-plantulas-de-cacao"
              event="ecoyuma_link_clicked"
              targetName="ecoyuma-plantulas"
              source="conocimiento-hero"
              external
              className="border border-white/20 text-colab-cream rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Abrir vivero Ecoyuma
            </TrackedLink>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <section className="grid md:grid-cols-4 gap-3 mb-20">
          {ecosystemSpearhead.steps.map((step) => (
            <Link key={step.n} href={step.href} className="kb-step">
              <span>{step.n}</span>
              <strong>{step.title}</strong>
              <small>{step.cta} →</small>
            </Link>
          ))}
        </section>

        <section className="mb-20">
          <p className="eyebrow text-colab-pod">Genética prioritaria</p>
          <h2 className="font-serif text-4xl font-bold text-colab-cream mt-3">FEAR 5 · TCS 19 · TCS 06</h2>
          <p className="text-sm text-colab-cream/50 mt-4 max-w-2xl">
            En el catálogo Ecoyuma aparecen como TCS. En campo a veces se dicen TSS. Aquí usamos el código comercial verificado y enlazamos la ficha real.
          </p>
          <div className="grid lg:grid-cols-3 gap-4 mt-8">
            {priorityVarieties.map((variety) => (
              <article key={variety.code} className="kb-variety">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow text-colab-yellow">{variety.priority === "primary" ? "Eje cacaotier" : "Prioridad"}</p>
                  <span className="kb-evidence">{evidenceLabels[variety.evidence]}</span>
                </div>
                <h3>{variety.code}</h3>
                <p className="kb-family">{variety.family}</p>
                <p>{variety.whyItMatters}</p>
                <TrackedLink
                  href={variety.ecoyumaUrl}
                  event="ecoyuma_link_clicked"
                  targetName={variety.code}
                  source="conocimiento-varieties"
                  external
                >
                  Ver plántula en Ecoyuma →
                </TrackedLink>
              </article>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow text-colab-pod">Rutas de conocimiento</p>
          <h2 className="font-serif text-4xl font-bold text-colab-cream mt-3">Regulación, calidad y mercado</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {knowledgeTopics.map((topic) => (
              <Link key={topic.slug} href={`/conocimiento/${topic.slug}`} className="kb-topic">
                <span className="kb-evidence">{evidenceLabels[topic.evidence]}</span>
                <p className="eyebrow text-colab-cream/35 mt-4">{topic.eyebrow}</p>
                <h3>{topic.title}</h3>
                <p>{topic.summary}</p>
                <strong>Abrir ruta →</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-white/10 pt-12 grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-end">
          <div>
            <p className="eyebrow text-colab-yellow">{benevoloProduct.brand}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-colab-cream mt-3">
              {benevoloProduct.tagline}
            </h2>
            <p className="text-sm leading-relaxed text-colab-cream/55 mt-5 max-w-xl">
              {benevoloProduct.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link href="/benevolo" className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold text-center">
              Preordenar Benevolo →
            </Link>
            <Link href="/marketplace" className="border border-white/20 text-colab-cream rounded-full px-7 py-3.5 text-sm font-bold text-center">
              Ver marcas colaboradoras
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
