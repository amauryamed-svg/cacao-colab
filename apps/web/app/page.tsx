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
      {/* ══════════ HERO — amante del cacao ══════════ */}
      <section className="colab-hero colab-hero-lover relative overflow-hidden">
        <AtmospherePlane src={heroShot.src} alt={heroShot.alt} overlay="cocoa" priority />
        <FloatingPods variant="hero" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-24 md:pb-28">
          <div className="max-w-2xl text-center mx-auto lg:text-left lg:mx-0 colab-hero-copy">
            <p className="eyebrow text-colab-champagne mb-5">Para quien ama el cacao</p>
            <h1 className="font-serif font-black text-colab-cream leading-[0.9]">
              <span className="block" style={{ fontSize: "clamp(3.4rem, 11vw, 7rem)" }}>
                Cacao Colab
              </span>
            </h1>
            <p
              className="font-serif text-colab-yellow mt-5 leading-snug"
              style={{ fontSize: "clamp(1.55rem, 3.8vw, 2.35rem)", fontWeight: 600 }}
            >
              El chocolate que se prueba.
              <br className="hidden sm:block" /> El oficio que se hereda.
            </p>
            <p className="mt-6 text-colab-cream/70 font-sans leading-relaxed max-w-md mx-auto lg:mx-0 text-base md:text-lg">
              Casa de amantes del cacao Fine-Flavor: catar, aprender y pertenecer a la cultura que
              pasa de finca a mesa.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-9">
              <Button href="/unete">Unirme al Colab →</Button>
              <Button variant="outline" href="/benevolo">
                Probar Bars. →
              </Button>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-gradient-to-t from-black/50 to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-colab-cream/45 font-sans">
            <span>Origen · fermentación · temperado</span>
            <Link href="/colab" className="text-colab-champagne hover:text-colab-yellow transition-colors">
              Foro de amantes →
            </Link>
            <Link href="/aprende" className="text-colab-champagne hover:text-colab-yellow transition-colors">
              Tres Masters →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ DESEO — Bars. como ancla sensorial ══════════ */}
      <section className="colab-lover-desire relative overflow-hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <SectionKicker className="mb-4">El antojo con rigor</SectionKicker>
            <h2
              className="font-serif font-bold text-colab-cream leading-[1.05]"
              style={{ fontSize: "clamp(2.1rem, 4.8vw, 3.6rem)" }}
            >
              Primero se prueba.
              <br />
              <em className="text-colab-coral not-italic">Después se entiende.</em>
            </h2>
            <p className="text-colab-cream/55 text-sm md:text-base leading-relaxed mt-5 max-w-md">
              Bars. Benevolo es el chocolate de leche con marañón sugar free que acerca el Fine-Flavor
              a tu mesa — sin sermón, con oficio.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/benevolo">Preordenar Bars. →</Button>
              <Button variant="outline" href="/shop#masters">
                Aprender el oficio →
              </Button>
            </div>
          </div>
          <Link href="/benevolo" className="colab-hero-packshot group mx-auto lg:mx-0">
            <div className="colab-hero-packshot-glow" />
            <Image
              src={bars.src}
              alt={bars.alt}
              width={720}
              height={480}
              className="relative w-full h-auto"
            />
            <span className="colab-hero-packshot-label">Bars. · leche + marañón sugar free →</span>
          </Link>
        </div>
      </section>

      <section id="ecosistema" className="colab-warm-band py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[.75fr_1.25fr] gap-12">
            <div>
              <SectionKicker className="mb-4">Tu camino en el Colab</SectionKicker>
              <h2
                className="font-serif font-bold text-colab-cream leading-[1.02]"
                style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}
              >
                Amar el cacao
                <br />
                <em className="text-colab-coral not-italic">es practicarlo.</em>
              </h2>
              <p className="text-colab-cream/55 text-sm leading-relaxed mt-5 max-w-sm">
                Desde la mazorca hasta la barra: aprende, siembra y cocina con la misma emoción de
                abrir un chocolate.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  step: "01",
                  title: "Master Cacaotier",
                  body: "Fermentación, finca y tipicidad — el sabor nace en el bioproceso.",
                  tone: "yellow" as const,
                },
                {
                  step: "02",
                  title: "Master Chocolatier",
                  body: "Tostión y barra 70 %: el oficio que convierte origen en deseo.",
                  tone: "coral" as const,
                },
                {
                  step: "03",
                  title: "Sembrar",
                  body: "Plántulas, bitácora y cuidado — heredar la tierra con criterio.",
                  tone: "pod" as const,
                },
                {
                  step: "04",
                  title: "Foro + R&D",
                  body: "Comparte avances, prueba Benevolo y coberturas de los nodos.",
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
          <SectionKicker className="mb-3 text-colab-ink/50">Plataforma de marcas · internacionalización</SectionKicker>
          <h2
            className="font-serif font-bold text-colab-ink mb-3"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}
          >
            Visibilidad de nodos.
            <br />
            Cotización FOB al mundo.
          </h2>
          <p
            className="text-colab-ink/60 font-sans max-w-xl mb-6"
            style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
          >
            Cada marca conserva su identidad. Cacao Colab las conecta a compradores en USA, UE y
            Asia con criterio Fine-Flavor y proforma honesta.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Button href="/export">Abrir cotizador FOB →</Button>
            <Button variant="outline" href="/marketplace">
              Ver marketplace
            </Button>
          </div>
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
          <p className="eyebrow text-colab-champagne">Si el cacao te mueve</p>
          <h2
            className="font-serif font-black text-colab-cream mt-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
          >
            Menos industria fría.
            <br />
            <span className="text-colab-coral">Más chocolate que late.</span>
          </h2>
          <p className="text-colab-cream/65 max-w-xl mx-auto mt-5 text-sm leading-relaxed">
            Fermentación, temperado y origen — con la emoción de quien ama el cacao y quiere
            pertenecer a su cultura.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button href="/unete">Unirme al Colab →</Button>
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
              <SectionKicker className="mb-4">Cacao con propósito</SectionKicker>
              <h2
                className="font-serif font-black text-colab-cream leading-tight mb-4"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)" }}
              >
                ¿Listo para vivir
                <br />
                el cacao
                <br />
                <span className="text-colab-yellow">de cerca?</span>
              </h2>
              <p
                className="text-colab-cream/55 font-sans max-w-md mb-8"
                style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
              >
                Amantes, cocina y oficio: cuéntanos quién eres. En minutos vemos cómo encajas en el
                Colab.
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
                {["Amante", "Cocina", "Finca", "Marca"].map((t) => (
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
