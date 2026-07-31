import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import CourseIntroPlayer from "@/components/aprende/CourseIntroPlayer"
import {
  benevoloFormulation,
  chocolatierMissions,
  chocolatierTotalXp,
  coexPrinciples,
} from "@/lib/chocolatier-course"
import { getCourseVideo } from "@/lib/course-videos"

export const metadata: Metadata = {
  title: "Master Chocolatier · bean-to-bar COEX",
  description:
    "Formulaciones bean-to-bar a la altura de Cacao of Excellence. Capstone: Chocolate Benevolo Bars. con FEAR 5 de Quara Cacao.",
}

export default function MasterChocolatierPage() {
  const intro = getCourseVideo("master-chocolatier")

  return (
    <div className="bg-[#1a120c] min-h-screen text-colab-cream">
      <header className="benevolo-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <Link href="/aprende" className="eyebrow text-white/40 hover:text-[#E8C9A0]">
            ← Volver al campus
          </Link>
          <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-end mt-10">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="course-chip">Nivel 02</span>
                <span className="course-chip">6 misiones</span>
                <span className="course-chip">{chocolatierTotalXp} XP</span>
                <span className="course-chip">COEX lens</span>
              </div>
              <p className="eyebrow text-[#FF6A3D]">Master Chocolatier · Protocolo 02</p>
              <h1 className="display-title text-colab-cream mt-4 max-w-3xl">
                Del grano FEAR 5<br />a la <em>gianduja</em>.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/55">
                Bean-to-bar con rigor de Cacao of Excellence: tostión, licor, panel ciego y formulación.
                El capstone es <strong className="text-[#E8C9A0]">Chocolate Benevolo Bars.</strong> —
                duja de marañón, leche orgánica, alulosa y stevia sobre cacao FEAR 5 del nodo Quara (Arauca).
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/campus/maestro-chocolatier"
                  className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Empezar campaña con Dualita →
                </Link>
                <Link
                  href="/cuenta/entrar?next=/campus/maestro-chocolatier"
                  className="border border-white/20 text-colab-cream rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Entrar al campus
                </Link>
                <Link href="/benevolo" className="border border-white/20 text-colab-cream rounded-full px-7 py-3.5 text-sm font-bold">
                  Ver output Benevolo
                </Link>
              </div>
              {intro && (
                <div className="mt-10">
                  <CourseIntroPlayer video={intro} source="master-chocolatier-hero" />
                </div>
              )}
            </div>
            <div className="credential-card !bg-[#FF6A3D] !text-[#140e0a]">
              <div className="flex justify-between items-start">
                <span className="text-4xl">◈</span>
                <span className="eyebrow opacity-60">Credencial 02</span>
              </div>
              <p className="font-serif text-3xl font-bold mt-10">Master Chocolatier</p>
              <p className="text-sm opacity-70 mt-3 leading-relaxed">
                Completa las seis misiones bean-to-bar y entrega Benevolo como producto defendible ante un panel COEX y ante el mercado.
              </p>
              <div className="mt-8 pt-4 border-t border-black/15 flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>Zurych × Quara</span><span>FEAR 5</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <section className="mb-20">
          <p className="eyebrow text-[#E8C9A0]">Lente COEX</p>
          <h2 className="font-serif text-4xl font-bold mt-3">Criterios a la altura de Cacao of Excellence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {coexPrinciples.map((item) => (
              <article key={item.title} className="benevolo-claim">
                <strong>{item.title}</strong>
                <p className="text-xs text-white/45 leading-relaxed mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="eyebrow text-[#FF6A3D]">Tu campaña</p>
              <h2 className="font-serif text-4xl font-bold mt-3">Seis misiones bean-to-bar</h2>
              <p className="text-white/45 mt-3 max-w-xl text-sm leading-relaxed">
                Cada misión tiene 3 pasos, un reto de criterio y Dualita. El progreso vive en el campus registrado.
              </p>
            </div>
            <Link
              href="/campus/maestro-chocolatier"
              className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold shrink-0"
            >
              Abrir campaña →
            </Link>
          </div>
          <div className="space-y-3 mt-8">
            {chocolatierMissions.map((mission, index) => (
              <article key={mission.slug} className={`mission-card ${index === 0 ? "mission-card-live" : ""}`}>
                <span className="mission-number">{mission.number}</span>
                <div className="flex-1 min-w-0">
                  <p className="eyebrow text-colab-cream/35">{mission.skill}</p>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-colab-cream mt-1">{mission.title}</h3>
                  <p className="text-xs text-colab-cream/45 mt-2 leading-relaxed">{mission.summary}</p>
                  <p className="text-[11px] text-[#E8C9A0]/70 mt-2 leading-relaxed">
                    <strong>COEX:</strong> {mission.coexLens}
                  </p>
                  <p className="text-[11px] text-colab-cream/35 mt-1">
                    <strong>Práctica:</strong> {mission.practice}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <strong className="block text-[#FF6A3D]">{mission.xp} XP</strong>
                  <small className="text-colab-cream/40">{mission.duration}</small>
                </div>
                <span className="mission-lock" aria-label={index === chocolatierMissions.length - 1 ? "Capstone" : index === 0 ? "Disponible" : "Secuencial"}>
                  {index === chocolatierMissions.length - 1 ? "★" : index === 0 ? "→" : "◇"}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#FF6A3D]/30 bg-[#FF6A3D]/[0.06] p-7 md:p-10 mb-20">
          <p className="eyebrow text-[#FF6A3D]">Capstone · Output Master Chocolatier</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">{benevoloFormulation.name}</h2>
          <p className="text-white/55 mt-4 max-w-2xl leading-relaxed">
            {benevoloFormulation.style}. {benevoloFormulation.inspiration}. Cacao{" "}
            {benevoloFormulation.cacao.genotype} del nodo {benevoloFormulation.cacao.node} (
            {benevoloFormulation.cacao.place}).
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            {benevoloFormulation.targets.map((target) => (
              <article key={target.label} className="benevolo-claim">
                <span>{target.label}</span>
                <strong>{target.value}</strong>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <p className="eyebrow text-[#E8C9A0]">Fórmula declarada</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {benevoloFormulation.ingredients.map((item) => (
                <li key={item} className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/benevolo" className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold">
              Abrir página Benevolo →
            </Link>
            <Link href="/conocimiento/cacao-of-excellence" className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold">
              Criterios CoEx
            </Link>
            <TrackedLink
              href="https://www.cacaoofexcellence.org/"
              event="knowledge_link_clicked"
              targetName="cacao-of-excellence"
              source="master-chocolatier-capstone"
              external
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              cacaoofexcellence.org →
            </TrackedLink>
          </div>
        </section>

        <section>
          <p className="eyebrow text-[#E8C9A0]">Quién sostiene el output</p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {benevoloFormulation.partners.map((partner) => (
              <article key={partner.name} className="benevolo-ally">
                <strong>{partner.name}</strong>
                <p>{partner.role}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
