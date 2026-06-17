import SquirrelSVG from "@/components/brand/SquirrelSVG"
import SectionKicker from "@/components/ui/SectionKicker"
import Button from "@/components/ui/Button"
import BrandCard from "@/components/marketplace/BrandCard"
import ComingSoonSlot from "@/components/marketplace/ComingSoonSlot"
import DualitaHero from "@/components/dualita/DualitaHero"
import MOOCTrack from "@/components/dualita/MOOCTrack"
import MicroTrack from "@/components/dualita/MicroTrack"
import { brands, comingSoonSlots } from "@/lib/brands"

const WA_MARCA =
  "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20postular%20mi%20marca%20de%20cacao%20al%20marketplace."

export default function Home() {
  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="bg-colab-forest relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-serif font-black text-white/[.03] leading-none"
            style={{ fontSize: "clamp(12rem, 30vw, 28rem)" }}
          >
            CC
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <SectionKicker className="mb-4">CAÚA × Zurych · Est. 2026</SectionKicker>
            <h1
              className="font-serif font-black text-colab-cream leading-[.95] mb-6"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            >
              El mejor<br />
              cacao<br />
              <span className="text-colab-yellow">colombiano.</span>
            </h1>
            <p
              className="text-colab-cream/65 font-sans leading-relaxed mb-8 max-w-md mx-auto md:mx-0"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)" }}
            >
              Ahora aprendes con él. Marketplace de especialidad + sistema de aprendizaje dual Dualita: MOOC profundo y microlearning aplicado.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button href="#marketplace">Explorar el colab →</Button>
              <Button variant="outline" href="#dualita">Conocer Dualita</Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <SquirrelSVG size={220} className="squirrel-bob" />
          </div>
        </div>

        {/* stats band */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: "4",  label: "regiones de origen" },
              { num: "0",  label: "azúcar añadida" },
              { num: "2",  label: "marcas fundadoras" },
              { num: "6",  label: "módulos gratis" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif font-black text-colab-yellow" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                  {num}
                </p>
                <p className="text-[11px] font-sans text-colab-cream/45 uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MARKETPLACE ══════════ */}
      <section id="marketplace" className="bg-colab-cream py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionKicker className="mb-3 text-colab-ink/50">Las marcas del Colab</SectionKicker>
          <h2
            className="font-serif font-bold text-colab-ink mb-3"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}
          >
            Cacao de especialidad,<br />seleccionado.
          </h2>
          <p className="text-colab-ink/60 font-sans max-w-xl mb-10" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
            Solo marcas con trazabilidad por lote, origen colombiano verificado y propuesta funcional para HoReCa y retail de especialidad.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
            {comingSoonSlots.map((slot) => (
              <ComingSoonSlot key={slot.id} hint={slot.hint} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DUALITA ══════════ */}
      <section id="dualita" className="bg-colab-forest py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <DualitaHero />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/[.04] border border-colab-yellow/15 rounded-2xl p-6">
              <MOOCTrack />
            </div>
            <div className="bg-white/[.04] border border-colab-green/15 rounded-2xl p-6">
              <MicroTrack />
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
            ¿Tu marca quiere<br />ser Cacao Colab?
          </h2>
          <p className="text-colab-forest/65 font-sans max-w-md mb-8" style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>
            Abrimos el marketplace a marcas de cacao colombiano con trazabilidad, propuesta diferenciada y visión de largo plazo.
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
