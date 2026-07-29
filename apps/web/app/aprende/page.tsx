import type { Metadata } from "next"
import Link from "next/link"
import SectionKicker from "@/components/ui/SectionKicker"
import MOOCTrack from "@/components/dualita/MOOCTrack"
import MicroTrack from "@/components/dualita/MicroTrack"
import ProgressStrip from "@/components/aprende/ProgressStrip"

export const metadata: Metadata = {
  title: "Campus · Master Cacaotier + Master Chocolatier",
  description: "Formación dual gamificada para dominar cacao Fine-Flavor desde el bioproceso hasta el chocolate.",
}

export default function AprendePage() {
  return (
    <div className="bg-colab-forest min-h-screen">
      <div className="pt-16 pb-12 course-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="eyebrow text-colab-yellow">cacaotier campus · formación dual</p>
          <div className="grid lg:grid-cols-[1fr_.65fr] gap-10 items-end mt-4">
            <div>
              <h1 className="display-title text-colab-cream">Aprende haciendo.<br /><em>Sube de rango.</em></h1>
              <p className="text-colab-cream/55 max-w-xl mt-6 leading-relaxed">
                Una ruta conecta finca, laboratorio, chocolate y mercado. Misiones cortas para actuar hoy;
                maestrías profundas para construir una competencia que se pueda demostrar.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[["0", "racha"], ["0", "XP hoy"], ["Aprendiz", "rango"]].map(([value, label]) => (
                <div key={label} className="bg-white/[.05] border border-white/10 rounded-xl p-3 text-center">
                  <strong className="block font-serif text-xl text-colab-yellow">{value}</strong>
                  <small className="text-[9px] uppercase tracking-wider text-colab-cream/35">{label}</small>
                </div>
              ))}
            </div>
          </div>
          <ProgressStrip />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-5 mt-10 mb-16">
          <Link href="/aprende/cacaotier" className="group rounded-3xl bg-colab-yellow p-7 md:p-9 min-h-80 flex flex-col text-colab-forest transition-transform hover:-translate-y-1">
            <div className="flex justify-between">
              <span className="eyebrow">Ruta de finca</span><span className="text-2xl">↗</span>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold uppercase tracking-wider opacity-55">Nivel 01 · disponible</p>
              <h2 className="font-serif text-4xl font-black mt-3">Master<br />Cacaotier</h2>
              <p className="text-sm opacity-65 mt-4 max-w-sm">Fermentación de precisión, trazabilidad y calidad Fine-Flavor. Empieza con FEAR 5.</p>
            </div>
          </Link>
          <article className="rounded-3xl bg-[#7b3729] border border-white/10 p-7 md:p-9 min-h-80 flex flex-col text-colab-cream">
            <div className="flex justify-between">
              <span className="eyebrow text-colab-cream/70">Ruta de transformación</span><span className="course-chip">Próximamente</span>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-bold uppercase tracking-wider text-colab-cream/45">Nivel 02 · curso pago</p>
              <h2 className="font-serif text-4xl font-black mt-3">Master<br />Chocolatier</h2>
              <p className="text-sm text-colab-cream/55 mt-4 max-w-sm">Tostión, refinado, formulación, sensorial y aplicaciones para crear chocolate de autor.</p>
            </div>
          </article>
        </div>

        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <p className="eyebrow text-colab-pod">Biblioteca abierta</p>
            <h2 className="font-serif text-3xl font-bold text-colab-cream mt-2">Explora Dualita</h2>
          </div>
          <p className="hidden md:block text-xs text-colab-cream/35 max-w-xs">Contenido complementario de cacao, aplicaciones HoReCa y negocio.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/[.04] border border-colab-yellow/15 rounded-2xl p-7">
            <MOOCTrack />
          </div>
          <div className="bg-white/[.04] border border-colab-green/15 rounded-2xl p-7">
            <MicroTrack />
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SectionKicker className="mb-3">¿Por qué Dualita?</SectionKicker>
            <h2 className="font-serif font-bold text-colab-cream text-2xl mb-4">
              Una escuela.<br />Dos velocidades.
            </h2>
            <p className="text-colab-cream/55 font-sans text-sm leading-relaxed">
              El microlearning te lleva a una decisión útil en minutos. La maestría conecta esas decisiones
              con ciencia, práctica de campo y un proyecto verificable. Dualita es el motor pedagógico;
              cacaotier es la identidad profesional que construyes.
            </p>
          </div>
          <div className="bg-white/[.04] border border-white/10 rounded-xl p-6">
            <p className="text-colab-yellow font-bold text-xs tracking-wider uppercase font-sans mb-3">El equipo Cacao Colab</p>
            <ul className="space-y-2 text-sm font-sans text-colab-cream/65">
              <li><strong className="text-colab-cream">Amaury Amed</strong> · CAÚA Colombia · Co-founder</li>
              <li><strong className="text-colab-cream">Hellen Bareño</strong> · Zurych · Chocolatería</li>
              <li><strong className="text-colab-cream">Oscar Gamboa</strong> · Zurych · Desarrollo</li>
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
