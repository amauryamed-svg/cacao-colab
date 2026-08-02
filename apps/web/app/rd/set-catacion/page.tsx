import type { Metadata } from "next"
import Link from "next/link"
import {
  tastingDropMeta,
  tastingGuideSteps,
  tastingSamples,
} from "@/lib/tasting-drop-colombian"

export const metadata: Metadata = {
  title: "Set Catación Colombia · 10 chocolatinas",
  description:
    "Drop Fine-Flavor Colab: 10 piezas de aprendizaje con guía profesional de catación. Contexto CoEx / tipicidad colombiana.",
}

const EVIDENCE_LABEL = {
  coex_context: "Contexto CoEx",
  salon_context: "Contexto Salón",
  colab_reference: "Referencia Colab",
  territorial: "Territorial",
} as const

export default function SetCatacionPage() {
  return (
    <div className="bg-[#100c09] min-h-screen text-colab-cream">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-22">
        <Link href="/rd" className="eyebrow text-white/40 hover:text-colab-yellow">
          ← R&D Colab
        </Link>
        <p className="eyebrow text-colab-yellow mt-8">{tastingDropMeta.eyebrow}</p>
        <h1 className="display-title mt-4 max-w-3xl">
          {tastingDropMeta.title.split("·")[0]}
          <br />
          <em>10 chocolatinas.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-white/55 leading-relaxed">{tastingDropMeta.subtitle}</p>
        <p className="mt-4 text-sm text-white/40 max-w-2xl">{tastingDropMeta.honesty}</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href={tastingDropMeta.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold"
          >
            Pedir set (WhatsApp) →
          </a>
          <Link
            href="/aprende/catador"
            className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
          >
            Master Catador →
          </Link>
          <Link
            href="/conocimiento/rueda-fine-flavor"
            className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
          >
            Rueda Fine-Flavor →
          </Link>
        </div>
        <p className="text-xs text-white/30 mt-4">{tastingDropMeta.priceNote}</p>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
        <p className="eyebrow text-colab-yellow">Guía profesional incluida</p>
        <h2 className="font-serif text-3xl font-black mt-2">Protocolo de catación</h2>
        <p className="text-white/50 mt-3 max-w-2xl">{tastingDropMeta.guideBlurb}</p>
        <ol className="grid md:grid-cols-5 gap-3 mt-8">
          {tastingGuideSteps.map((step) => (
            <li key={step.n} className="rounded-xl border border-white/10 bg-white/[.04] p-4">
              <span className="text-colab-yellow text-xs font-bold">{step.n}</span>
              <h3 className="font-bold text-sm mt-2">{step.title}</h3>
              <p className="text-xs text-white/45 mt-2 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <p className="eyebrow text-colab-yellow">Flight · 10 piezas</p>
        <h2 className="font-serif text-3xl font-black mt-2">Las chocolatinas</h2>
        <ul className="grid md:grid-cols-2 gap-4 mt-8">
          {tastingSamples.map((sample) => (
            <li
              key={sample.id}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.05] to-transparent p-5"
            >
              <div className="flex justify-between gap-3">
                <span className="text-colab-yellow font-bold">{sample.number}</span>
                <span className="text-[10px] uppercase tracking-wider text-white/35">
                  {EVIDENCE_LABEL[sample.evidenceLevel]}
                </span>
              </div>
              <h3 className="font-bold mt-2">{sample.name}</h3>
              <p className="text-xs text-white/45 mt-1">
                {sample.origin} · {sample.genotype} · {sample.format}
              </p>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">{sample.evidenceNote}</p>
              <p className="text-xs text-colab-yellow/80 mt-3">
                Foco rueda: {sample.wheelFocus.join(" · ")}
              </p>
              <p className="text-xs text-white/40 mt-2 italic">{sample.guidePrompt}</p>
              {sample.sourceHref && (
                <a
                  href={sample.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-colab-yellow mt-3"
                >
                  Fuente →
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
