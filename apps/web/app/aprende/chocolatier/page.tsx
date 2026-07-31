import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import CourseIntroPlayer from "@/components/aprende/CourseIntroPlayer"
import {
  chocolatierMissions,
  chocolatierTotalXp,
  coexPrinciples,
  grownChocolateStance,
} from "@/lib/chocolatier-course"
import { benevoloFormulation } from "@/lib/benevolo-brand"
import { getCourseVideo } from "@/lib/course-videos"

export const metadata: Metadata = {
  title: "Master Chocolatier · barra 70 % CoEx",
  description:
    "Ruta 70 % estilo CoEx/Chocolate Awards: excelencia, puesta en escena, vidas, rachas y diploma digital. Benevolo duja es marca acelerada hermana.",
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
                <span className="course-chip">70 % · CoEx lens</span>
                <span className="course-chip">Diploma LinkedIn</span>
              </div>
              <p className="eyebrow text-[#FF6A3D]">Master Chocolatier · Protocolo 02</p>
              <h1 className="display-title text-colab-cream mt-4 max-w-3xl">
                Del grano FEAR 5<br />a la barra <em>70 %</em>.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/55">
                Ruta de excelencia estilo CoEx y Chocolate Awards: tostión, refino, conchado, panel
                ciego y formulación dark 70 % con contexto de origen. Aspira a la medalla — y celebra
                el reconocimiento de hacer un muy buen chocolate de especialidad. Vidas, rachas y
                diploma digital para compartir en LinkedIn con enlace al Colab.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/campus/maestro-chocolatier"
                  className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Empezar campaña Dualita →
                </Link>
                <Link
                  href="/cuenta/entrar?next=/campus/maestro-chocolatier"
                  className="border border-white/20 text-colab-cream rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Entrar al campus
                </Link>
                <Link
                  href="/benevolo"
                  className="border border-white/20 text-colab-cream rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Marca Benevolo (duja) →
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
                <span className="eyebrow opacity-60">Diploma digital</span>
              </div>
              <p className="font-serif text-3xl font-bold mt-10">Master Chocolatier</p>
              <p className="text-sm opacity-70 mt-3 leading-relaxed">
                Aprueba con rigor edutainment: ♥ vidas diarias, 🔥 rachas y nota por primer intento.
                Comparte en LinkedIn — Coursera vibes, onda cacao.
              </p>
              <div className="mt-8 pt-4 border-t border-black/15 flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>70 % dark</span>
                <span>FEAR 5</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <section className="mb-20">
          <p className="eyebrow text-[#E8C9A0]">Lente COEX · Awards</p>
          <h2 className="font-serif text-4xl font-bold mt-3">Excelencia y puesta en escena</h2>
          <p className="text-white/45 mt-3 max-w-2xl text-sm leading-relaxed">
            La paradoja Colab: entrenamos para medalla y para el reconocimiento cotidiano de un
            chocolate de especialidad muy bien hecho. Ambos cuentan.
          </p>
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
              <h2 className="font-serif text-4xl font-bold mt-3">Seis misiones · barra 70 %</h2>
              <p className="text-white/45 mt-3 max-w-xl text-sm leading-relaxed">
                Retos con vidas. Primer intento limpio sube tu diploma (Excelencia / Especialidad). La
                duja vive en Benevolo, no aquí.
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
              <article
                key={mission.slug}
                className={`mission-card ${index === 0 ? "mission-card-live" : ""}`}
              >
                <span className="mission-number">{mission.number}</span>
                <div className="flex-1 min-w-0">
                  <p className="eyebrow text-colab-cream/35">{mission.skill}</p>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-colab-cream mt-1">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-colab-cream/45 mt-2 leading-relaxed">{mission.summary}</p>
                </div>
                <div className="text-right shrink-0">
                  <strong className="block text-[#FF6A3D]">{mission.xp} XP</strong>
                  <small className="text-colab-cream/40">{mission.duration}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-20 border-t border-white/10 pt-16">
          <p className="eyebrow text-[#FF6A3D]">{grownChocolateStance.title}</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 max-w-3xl">
            Especialidad frente a lo genérico.
          </h2>
          <p className="text-white/55 mt-5 max-w-2xl leading-relaxed text-sm">
            {grownChocolateStance.lede}
          </p>
          <p className="mt-8 max-w-2xl text-[#E8C9A0] text-sm leading-relaxed font-medium">
            {grownChocolateStance.callToGeneration}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/unete" className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold">
              Únete al colectivo →
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-[#FF6A3D]/30 bg-[#FF6A3D]/[0.06] p-7 md:p-10 mb-20">
          <p className="eyebrow text-[#FF6A3D]">Marca hermana · no es el capstone</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">{benevoloFormulation.name}</h2>
          <p className="text-white/55 mt-4 max-w-2xl leading-relaxed">
            {benevoloFormulation.style}. Aceleración cacaotier que conecta tendencias (gianduja,
            dulzor moderno) con el oficio del chocolatier. Track Dualita propio en{" "}
            <Link href="/campus/benevolo" className="text-[#E8C9A0] underline">
              /campus/benevolo
            </Link>
            .
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-8">
            {benevoloFormulation.trends.map((t) => (
              <article key={t.title} className="benevolo-claim">
                <strong>{t.title}</strong>
                <p className="text-xs text-white/45 mt-2 leading-relaxed">{t.body}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/benevolo" className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold">
              Abrir Chocolate Benevolo →
            </Link>
            <TrackedLink
              href="https://www.cacaoofexcellence.org/"
              event="knowledge_link_clicked"
              targetName="cacao-of-excellence"
              source="master-chocolatier-syllabus"
              external
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              cacaoofexcellence.org →
            </TrackedLink>
          </div>
        </section>
      </main>
    </div>
  )
}
