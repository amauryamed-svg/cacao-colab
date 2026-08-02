import type { Metadata } from "next"
import Link from "next/link"
import FineFlavorWheel from "@/components/sensory/FineFlavorWheel"
import MasteryCurveStrip from "@/components/funnel/MasteryCurveStrip"
import {
  catadorMissions,
  catadorPrinciples,
  catadorTotalXp,
} from "@/lib/catador-course"
import { fineFlavorWheelMeta, wheelCompareRows } from "@/lib/fine-flavor-wheel"
import { tastingDropMeta } from "@/lib/tasting-drop-colombian"

export const metadata: Metadata = {
  title: "Master Catador de Cacao · Fine-Flavor Colab",
  description:
    "Certificación de catación con lente CoEx, comparación Callebaut y Rueda Fine-Flavor Colab. Set Colombia 10.",
}

export default function MasterCatadorPage() {
  return (
    <div className="bg-[#12180f] min-h-screen text-colab-cream">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-22">
        <Link href="/aprende" className="eyebrow text-white/40 hover:text-colab-yellow">
          ← Volver al campus
        </Link>
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-end mt-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="course-chip">Nivel sensorial</span>
              <span className="course-chip">6 misiones</span>
              <span className="course-chip">{catadorTotalXp} XP</span>
              <span className="course-chip">Labrador+</span>
              <span className="course-chip">Rueda Colab</span>
            </div>
            <p className="eyebrow text-colab-yellow">Master Catador · Protocolo sensorial</p>
            <h1 className="display-title text-colab-cream mt-4 max-w-3xl">
              Catar con método.
              <br />
              <em>Dominar tipicidad.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/55">
              Entrena el músculo del panel: higiene ciega, Rueda Fine-Flavor Colab, defectos CoEx,
              tipicidad vs gusto, ficha defendible y capstone con el Set Catación Colombia 10. Resuelve
              el «solo sé que nada sé» con microvictorias — no con un sprint de confianza.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/campus/catador-cacao"
                className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold"
              >
                Empezar campaña Dualita →
              </Link>
              <Link
                href="/rd/set-catacion"
                className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
              >
                Set 10 chocolatinas →
              </Link>
              <Link
                href="/conocimiento/rueda-fine-flavor"
                className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
              >
                Ver rueda →
              </Link>
            </div>
          </div>
          <div className="credential-card !bg-[#3D7A2C] !text-[#F7F1EE]">
            <p className="eyebrow opacity-70">Diploma digital</p>
            <p className="font-serif text-3xl font-bold mt-8">Master Catador</p>
            <p className="text-sm opacity-70 mt-3 leading-relaxed">
              Lente CoEx · puente Callebaut · rueda propia Colab. No es medalla oficial: es oficio.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <MasteryCurveStrip highlight="optimism-informed" compact />
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <p className="eyebrow text-colab-yellow">{fineFlavorWheelMeta.eyebrow}</p>
        <h2 className="font-serif text-3xl font-black mt-2">{fineFlavorWheelMeta.name}</h2>
        <p className="text-white/55 max-w-2xl mt-3 leading-relaxed">{fineFlavorWheelMeta.principle}</p>
        <div className="mt-8">
          <FineFlavorWheel />
        </div>
        <div className="overflow-x-auto mt-10">
          <table className="ff-compare-table">
            <thead>
              <tr>
                <th>Eje</th>
                <th>CoEx</th>
                <th>Callebaut / Academy</th>
                <th>Colab</th>
              </tr>
            </thead>
            <tbody>
              {wheelCompareRows.map((row) => (
                <tr key={row.axis}>
                  <th>{row.axis}</th>
                  <td>{row.coex}</td>
                  <td>{row.callebaut}</td>
                  <td>{row.colab}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/35 mt-4 max-w-3xl">
          {fineFlavorWheelMeta.softwareNote} {fineFlavorWheelMeta.scaleNote}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid md:grid-cols-3 gap-4">
        {catadorPrinciples.map((p) => (
          <article key={p.title} className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-sm text-white/50 mt-2 leading-relaxed">{p.body}</p>
          </article>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <p className="eyebrow text-colab-yellow">6 misiones</p>
        <h2 className="font-serif text-3xl font-black mt-2">Syllabus Catador</h2>
        <ol className="mt-8 grid gap-3">
          {catadorMissions.map((m) => (
            <li
              key={m.slug}
              className="rounded-2xl border border-white/10 bg-white/[.03] p-5 grid md:grid-cols-[auto_1fr_auto] gap-3 items-start"
            >
              <span className="text-colab-yellow font-bold">{m.number}</span>
              <div>
                <h3 className="font-bold">{m.title}</h3>
                <p className="text-sm text-white/50 mt-1 leading-relaxed">{m.summary}</p>
                <p className="text-xs text-colab-yellow/80 mt-2">Curva: {m.curvePhase}</p>
              </div>
              <small className="text-white/35">
                {m.duration} · {m.xp} XP
              </small>
            </li>
          ))}
        </ol>
        <div className="mt-10 rounded-2xl border border-colab-yellow/25 bg-colab-yellow/10 p-6">
          <p className="eyebrow text-colab-yellow">{tastingDropMeta.eyebrow}</p>
          <h3 className="font-serif text-2xl font-bold mt-2">{tastingDropMeta.title}</h3>
          <p className="text-sm text-white/60 mt-2 max-w-2xl">{tastingDropMeta.subtitle}</p>
          <Link
            href="/rd/set-catacion"
            className="inline-block mt-5 bg-colab-yellow text-colab-forest rounded-full px-6 py-3 text-sm font-bold"
          >
            Ver set + guía →
          </Link>
        </div>
      </section>
    </div>
  )
}
