import Image from "next/image"
import Link from "next/link"
import SquirrelSVG from "@/components/brand/SquirrelSVG"
import DualitaMascot from "@/components/brand/DualitaMascot"
import SectionKicker from "@/components/ui/SectionKicker"
import Button from "@/components/ui/Button"
import BrandNetwork from "@/components/marketplace/BrandNetwork"
import DualitaHero from "@/components/dualita/DualitaHero"
import MOOCTrack from "@/components/dualita/MOOCTrack"
import MicroTrack from "@/components/dualita/MicroTrack"
import AtmospherePlane from "@/components/atmosphere/AtmospherePlane"
import FloatingPods from "@/components/atmosphere/FloatingPods"
import MazorcaSVG from "@/components/atmosphere/MazorcaSVG"
import { founderBrands, collaboratorBrands, comingSoonSlots } from "@/lib/brands"
import { territories } from "@/lib/territories"
import { shotById } from "@/lib/atmosphere"

const WA_MARCA =
  "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20postular%20mi%20marca%20de%20cacao%20al%20marketplace."

export default function Home() {
  const heroShot = shotById("broken")
  const bars = shotById("bars-fear5")

  return (
    <>
      {/* ══════════ HERO — universo cacao ══════════ */}
      <section className="colab-hero relative overflow-hidden">
        <AtmospherePlane src={heroShot.src} alt={heroShot.alt} overlay="cocoa" priority />
        <FloatingPods variant="hero" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-20 flex flex-col lg:flex-row items-end gap-10 lg:gap-14">
          <div className="flex-1 text-center lg:text-left colab-hero-copy">
            <p className="eyebrow text-colab-champagne mb-4">Cacao Colab · universo Fine-Flavor</p>
            <h1 className="font-serif font-black text-colab-cream leading-[.9] mb-5">
              <span className="block" style={{ fontSize: "clamp(3.2rem, 10vw, 6.8rem)" }}>
                Cacao Colab
              </span>
              <span
                className="block text-colab-yellow mt-2"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 600 }}
              >
                El sabor que mueve la industria.
              </span>
            </h1>
            <p className="text-colab-cream/70 font-sans leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 text-base md:text-lg">
              Un universo de mazorcas, coberturas y marcas generacionales — rigor de oficio con
              la emoción de abrir un chocolate. Aprende, siembra, cocina y acelera.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button href="/aprende">Entrar al campus →</Button>
              <Button variant="outline" href="/benevolo">
                Probar Bars. Benevolo
              </Button>
            </div>
          </div>

          <Link href="/benevolo" className="colab-hero-packshot group">
            <div className="colab-hero-packshot-glow" />
            <Image
              src={bars.src}
              alt={bars.alt}
              width={720}
              height={480}
              priority
              className="relative w-full h-auto"
            />
            <span className="colab-hero-packshot-label">
              Bars. · Duja de Marañón sugar free →
            </span>
          </Link>
        </div>

        <div className="relative border-t border-white/10 bg-black/25 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: "FEAR 5", label: "genética viva" },
              { num: "70 %", label: "excelencia dark" },
              { num: "6", label: "nodos en red" },
              { num: "MD", label: "Mazorcas Doradas" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p
                  className="font-serif font-black text-colab-yellow"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}
                >
                  {num}
                </p>
                <p className="text-[11px] font-sans text-colab-cream/50 uppercase tracking-wider mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ecosistema" className="colab-warm-band py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[.75fr_1.25fr] gap-12">
            <div>
              <SectionKicker className="mb-4">El núcleo builder</SectionKicker>
              <h2
                className="font-serif font-bold text-colab-cream leading-[1.02]"
                style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}
              >
                De la finca<br />
                <em className="text-colab-coral not-italic">al deseo</em> del cacao.
              </h2>
              <p className="text-colab-cream/55 text-sm leading-relaxed mt-5 max-w-sm">
                Formación, experimentación y comercio en un mismo ciclo — con la misma emoción que
                un chocolate que se parte en la mesa.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  step: "01",
                  title: "Master Cacaotier",
                  body: "Fermentación, finca y calidad Fine-Flavor con sabor de territorio.",
                  tone: "yellow" as const,
                },
                {
                  step: "02",
                  title: "Master Chocolatier",
                  body: "Tostión, barra 70 % y aplicaciones que se desean preordenar.",
                  tone: "coral" as const,
                },
                {
                  step: "03",
                  title: "Sembrar",
                  body: "Plántulas Ecoyuma, bitácora y agroforestería para tu finca idónea.",
                  tone: "pod" as const,
                },
                {
                  step: "04",
                  title: "R&D Colab",
                  body: "Benevolo + coberturas CAÚA × Zurych — del lab a la cobertura.",
                  tone: "cocoa" as const,
                },
              ].map((item) => (
                <article key={item.step} className="colab-desire-card">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-serif italic text-3xl text-colab-yellow/40">{item.step}</span>
                    <MazorcaSVG tone={item.tone} size={36} />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-colab-cream mt-5">{item.title}</h3>
                  <p className="text-xs text-colab-cream/50 leading-relaxed mt-2">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MARKETPLACE ══════════ */}
      <section id="marketplace" className="bg-colab-cream py-20 relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/3 opacity-[.12] pointer-events-none hidden lg:block">
          <Image src={shotById("shards").src} alt="" fill className="object-cover" sizes="40vw" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="mb-14 grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-end">
            <div>
              <SectionKicker className="mb-3 text-colab-ink/50">Punta de lanza</SectionKicker>
              <h2
                className="font-serif font-bold text-colab-ink"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}
              >
                Conocimiento avanzado.
                <br />
                <span className="text-colab-green">Soluciones comestibles.</span>
              </h2>
              <p
                className="text-colab-ink/60 font-sans max-w-xl mt-4"
                style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
              >
                EUDR, orgánico, calidad internacional y genética FEAR 5 convergen en Ecoyuma, el campus
                cacaotier y Benevolo: la barra que traduce el bioproceso a la mesa.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/conocimiento">Base de conocimiento →</Button>
              <Button
                variant="outline"
                href="https://tienda.ecoyuma.com.co/11-plantulas-de-cacao"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vivero Ecoyuma
              </Button>
            </div>
          </div>
          <SectionKicker className="mb-3 text-colab-ink/50">Mapa vivo · Colombia al mundo</SectionKicker>
          <h2
            className="font-serif font-bold text-colab-ink mb-3"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}
          >
            Seis nodos.
            <br />
            Un círculo abierto.
          </h2>
          <p
            className="text-colab-ink/60 font-sans max-w-xl mb-10"
            style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
          >
            cacaotier conecta Bogotá con Landázuri, Arbeláez, Paicol, Tame y Guamal. Cada marca
            conserva su identidad mientras comparte conocimiento y abre oportunidades.
          </p>
          <BrandNetwork
            founders={founderBrands}
            collaborators={collaboratorBrands}
            comingSoonSlots={comingSoonSlots}
            territories={territories}
          />
        </div>
      </section>

      {/* ══════════ DUALITA ══════════ */}
      <section id="dualita" className="dualita-stage">
        <FloatingPods variant="stage" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-[1]">
          <DualitaHero />
          <div className="dualita-rail">
            <MOOCTrack />
            <MicroTrack />
          </div>
        </div>
      </section>

      {/* Desire strip · drizzle */}
      <section className="colab-desire-strip">
        <AtmospherePlane src={shotById("drizzle").src} alt="" overlay="coral" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
          <p className="eyebrow text-colab-champagne">Universo Colab</p>
          <h2
            className="font-serif font-black text-colab-cream mt-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
          >
            Menos laboratorio frío.
            <br />
            <span className="text-colab-coral">Más chocolate que late.</span>
          </h2>
          <p className="text-colab-cream/65 max-w-xl mx-auto mt-5 text-sm leading-relaxed">
            El rigor del cacao generacional — fermentación, temperado, origen — con la dopamina de
            un universo Wonka aterrizado a finca colombiana.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button href="/rd">R&D · coberturas y Benevolo</Button>
            <Button variant="outline" href="/juega">
              Sembrar mazorcas →
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════ ÚNETE CTA ══════════ */}
      <section className="bg-colab-cream py-20 border-t border-colab-forest/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="colab-join-panel px-8 md:px-14 py-14 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
            <div className="relative flex-1 text-center md:text-left">
              <SectionKicker className="mb-4">Cacao con propósito · HoReCa</SectionKicker>
              <h2
                className="font-serif font-black text-colab-cream leading-tight mb-4"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)" }}
              >
                ¿Listo para llevar
                <br />
                cacao colombiano
                <br />
                <span className="text-colab-yellow">a tu cocina?</span>
              </h2>
              <p
                className="text-colab-cream/55 font-sans max-w-md mb-8"
                style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
              >
                Cuéntanos sobre tu operación. En 3 minutos sabemos si somos la combinación perfecta.
              </p>
              <a
                href="/unete"
                className="inline-flex items-center gap-2 bg-colab-yellow text-colab-forest font-bold text-sm px-8 py-4 rounded-full hover:bg-colab-amber transition-colors font-sans"
              >
                Únete al Colab →
              </a>
            </div>

            <div className="relative flex-shrink-0 w-full md:w-auto flex flex-col items-center gap-4">
              <DualitaMascot size={172} />
              <div className="flex flex-wrap justify-center gap-2">
                {["Restaurante", "Hotel", "Cafetería", "Pastelería"].map((t) => (
                  <span key={t} className="colab-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA FINAL ══════════ */}
      <section className="bg-colab-yellow py-20 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden"
        >
          <SquirrelSVG size={320} className="opacity-10" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center md:text-left">
          <SectionKicker className="mb-4 text-colab-forest/60">Para marcas de cacao</SectionKicker>
          <h2
            className="font-serif font-black text-colab-forest leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
          >
            ¿Tu marca quiere
            <br />
            ser Cacao Colab?
          </h2>
          <p
            className="text-colab-forest/65 font-sans max-w-md mb-8"
            style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}
          >
            Abrimos el marketplace a marcas de cacao colombiano con trazabilidad, propuesta
            diferenciada y visión de largo plazo.
          </p>
          <a
            href={WA_MARCA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-colab-forest text-colab-cream font-bold text-sm px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-sans"
          >
            Postular mi marca →
          </a>
        </div>
      </section>
    </>
  )
}
