import type { Metadata } from "next"
import Link from "next/link"
import SectionKicker from "@/components/ui/SectionKicker"
import DualitaHero from "@/components/dualita/DualitaHero"
import MOOCTrack from "@/components/dualita/MOOCTrack"
import MicroTrack from "@/components/dualita/MicroTrack"
import ProgressStrip from "@/components/aprende/ProgressStrip"
import TrackedLink from "@/components/analytics/TrackedLink"
import AtmospherePlane from "@/components/atmosphere/AtmospherePlane"
import FloatingPods from "@/components/atmosphere/FloatingPods"
import { getRegisteredMicroProgress } from "@/lib/microlearning-server"
import CourseIntroPlayer from "@/components/aprende/CourseIntroPlayer"
import { getCourseVideo } from "@/lib/course-videos"
import { shotById } from "@/lib/atmosphere"

export const metadata: Metadata = {
  title: "Campus · Master Cacaotier + Master Chocolatier",
  description: "Formación dual gamificada para dominar cacao Fine-Flavor desde el bioproceso hasta el chocolate.",
}

export default async function AprendePage() {
  const registered = await getRegisteredMicroProgress()
  const campusIntro = getCourseVideo("dualita-campus")

  return (
    <div className="bg-colab-forest min-h-screen">
      <div className="pt-16 pb-12 course-hero relative overflow-hidden">
        <AtmospherePlane src={shotById("coex-home").src} alt={shotById("coex-home").alt} overlay="forest" />
        <FloatingPods variant="stage" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-[1]">
          <p className="eyebrow text-colab-yellow">cacaotier campus · formación dual</p>
          <div className="grid lg:grid-cols-[1fr_.65fr] gap-10 items-end mt-4">
            <div>
              <h1 className="display-title text-colab-cream">
                Aprende haciendo.
                <br />
                <em>Sube de rango.</em>
              </h1>
              <p className="text-colab-cream/65 max-w-xl mt-6 leading-relaxed">
                Contexto, hábitos, oficio y territorio sincronizados — con la emoción de un chocolate
                que se gana. Conserva XP, racha, Sembrar y evidencia de tus misiones.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[["6", "rangos"], ["MD", "fidelidad"], ["Dualita", "guía"]].map(([value, label]) => (
                <div key={label} className="bg-white/[.05] border border-white/10 rounded-xl p-3 text-center">
                  <strong className="block font-serif text-xl text-colab-yellow">{value}</strong>
                  <small className="text-[9px] uppercase tracking-wider text-colab-cream/35">{label}</small>
                </div>
              ))}
            </div>
          </div>
          {campusIntro && (
            <div className="mt-10">
              <CourseIntroPlayer video={campusIntro} source="aprende-hub" />
            </div>
          )}
          <ProgressStrip registered={registered} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-5 mt-10 mb-16">
          <Link href="/campus/arquitecto-fermentacion" className="group rounded-3xl bg-colab-yellow p-7 md:p-9 min-h-80 flex flex-col text-colab-forest transition-transform hover:-translate-y-1">
            <div className="flex justify-between">
              <span className="eyebrow">Ruta de finca</span><span className="text-2xl">↗</span>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold uppercase tracking-wider opacity-55">Nivel 01 · campus registrado</p>
              <h2 className="font-serif text-4xl font-black mt-3">Master<br />Cacaotier</h2>
              <p className="text-sm opacity-65 mt-4 max-w-sm">Fermentación de precisión, trazabilidad y calidad Fine-Flavor. Empieza con FEAR 5.</p>
            </div>
          </Link>
          <Link href="/campus/maestro-chocolatier" className="group rounded-3xl bg-[#7b3729] border border-white/10 p-7 md:p-9 min-h-80 flex flex-col text-colab-cream transition-transform hover:-translate-y-1">
            <div className="flex justify-between">
              <span className="eyebrow text-colab-cream/70">Ruta de transformación</span><span className="text-2xl">↗</span>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold uppercase tracking-wider text-colab-cream/45">Nivel 02 · campaña Dualita · 720 XP</p>
              <h2 className="font-serif text-4xl font-black mt-3">Master<br />Chocolatier</h2>
              <p className="text-sm text-colab-cream/55 mt-4 max-w-sm">
                Barra 70 % CoEx/Awards · vidas, rachas y diploma. Benevolo duja es marca acelerada hermana.
              </p>
            </div>
          </Link>
        </div>

        <section className="mt-10 grid md:grid-cols-4 gap-3 mb-16">
          {[
            { step: "01", owner: "Zurych", title: "MOOC bean-to-bar", body: "Territorio Santander, agroecología y portafolio real — chocolatezurych.com." },
            { step: "02", owner: "CAÚA", title: "Protocolo diario", body: "Cacao funcional, orígenes Huila/Santander y hábito de 7 días — cauacolombia.co." },
            { step: "03", owner: "cacaotier", title: "Masterclasses", body: "Competencia profesional desde fermentación hasta bean-to-bar Benevolo." },
            { step: "04", owner: "Colab", title: "Conocimiento → mesa", body: "EUDR, Ecoyuma, CoEx y Benevolo: evidencia que se vuelve producto." },
          ].map((route) => (
            <article key={route.step} className="learning-sync-card">
              <div><span>{route.step}</span><strong>{route.owner}</strong></div>
              <h3>{route.title}</h3>
              <p>{route.body}</p>
            </article>
          ))}
        </section>
      </div>

      <section className="dualita-stage" id="dualita">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-[1]">
          <DualitaHero />
          <div className="dualita-rail">
            <MOOCTrack />
            <MicroTrack />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 pt-16">
        <section className="rounded-3xl border border-colab-yellow/25 bg-colab-yellow/[.07] p-7 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <p className="eyebrow text-colab-yellow">El círculo se está formando ahora</p>
            <h2 className="font-serif text-3xl font-bold text-colab-cream mt-3">Tu marca puede enseñar, retar o activar un territorio.</h2>
            <p className="text-sm text-colab-cream/50 leading-relaxed mt-3 max-w-2xl">
              La pauta no compra una credencial científica: financia una experiencia claramente identificada.
              Los primeros aliados definen retos, becas y presencia antes de cerrar cada cohorte.
            </p>
          </div>
          <TrackedLink
            href="https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20patrocinar%20una%20ruta%2C%20reto%20o%20nodo."
            external
            event="sponsor_interest"
            targetName="sponsor-colab"
            source="campus-fomo"
            className="shrink-0 bg-colab-yellow text-colab-forest rounded-full px-7 py-4 text-sm font-bold"
          >
            Reservar participación →
          </TrackedLink>
        </section>

        <div className="mt-14 border-t border-white/10 pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SectionKicker className="mb-3">¿Por qué Dualita?</SectionKicker>
            <h2 className="font-serif font-bold text-colab-cream text-2xl mb-4">
              Una escuela.<br />Dos velocidades.
            </h2>
            <p className="text-colab-cream/55 font-sans text-sm leading-relaxed">
              CAÚA te lleva a una decisión de hábito en minutos. Zurych conecta territorio y producto.
              Las masterclasses llevan eso a oficio verificable. Dualita es el motor pedagógico;
              cacaotier es la identidad profesional que construyes.
            </p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <p className="text-colab-yellow font-bold text-xs tracking-wider uppercase font-sans mb-3">El equipo Cacao Colab</p>
            <ul className="space-y-2 text-sm font-sans text-colab-cream/65">
              <li><strong className="text-colab-cream">Amaury Amed</strong> · Product Manager · Builder fundador</li>
              <li><strong className="text-colab-cream">Hellen Bareño</strong> · Frontend Lead · Builder fundadora</li>
              <li><strong className="text-colab-cream">Oscar Gamboa</strong> · Backend Lead · Builder fundador</li>
            </ul>
            <a
              href="https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20tengo%20preguntas%20sobre%20Dualita."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-bold text-colab-yellow hover:underline font-sans"
            >
              Preguntar al equipo →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
