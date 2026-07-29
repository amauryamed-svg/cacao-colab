import type { Metadata } from "next"
import Link from "next/link"
import SectionKicker from "@/components/ui/SectionKicker"
import MOOCTrack from "@/components/dualita/MOOCTrack"
import MicroTrack from "@/components/dualita/MicroTrack"
import ProgressStrip from "@/components/aprende/ProgressStrip"
import TrackedLink from "@/components/analytics/TrackedLink"

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
                Contexto, hábitos, oficio y territorio sincronizados. Entra con una sola cuenta para conservar
                XP, racha, Cacao Gotchi y evidencia de tus misiones.
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
          <ProgressStrip />
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
            <p className="eyebrow text-colab-pod">Dos rutas patrocinables</p>
            <h2 className="font-serif text-3xl font-bold text-colab-cream mt-2">Contexto + hábitos con Dualita</h2>
          </div>
          <p className="hidden md:block text-xs text-colab-cream/35 max-w-xs">Cada sponsor aporta contenido explícito sin ocultar su participación.</p>
        </div>

        <section className="mt-10 grid md:grid-cols-4 gap-3">
          {[
            { step: "01", owner: "Zurych", title: "MOOC Contexto Cacao", body: "Historia, territorio y cultura para comprender de dónde viene el chocolate." },
            { step: "02", owner: "CAÚA", title: "Cacao funcional", body: "Microlearning sobre elección, hábitos y consumo saludable en contexto." },
            { step: "03", owner: "cacaotier", title: "Masterclasses", body: "Competencia profesional desde fermentación hasta aplicaciones." },
            { step: "04", owner: "Nodos", title: "Territorio activo", body: "Lotes, retos y evidencia de Landázuri, Arbeláez, Paicol, Tame y Guamal." },
          ].map((route) => (
            <article key={route.step} className="learning-sync-card">
              <div><span>{route.step}</span><strong>{route.owner}</strong></div>
              <h3>{route.title}</h3>
              <p>{route.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-colab-yellow/25 bg-colab-yellow/[.07] p-7 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
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
              <li><strong className="text-colab-cream">Amaury Amed</strong> · Founder de cacaotier + builder del Colab</li>
              <li><strong className="text-colab-cream">Hellen Bareño</strong> · Builder · chocolatería y experiencia</li>
              <li><strong className="text-colab-cream">Oscar Gamboa</strong> · Builder · desarrollo y operación</li>
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
