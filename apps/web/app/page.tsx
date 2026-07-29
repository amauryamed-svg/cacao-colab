import SquirrelSVG from "@/components/brand/SquirrelSVG"
import SectionKicker from "@/components/ui/SectionKicker"
import Button from "@/components/ui/Button"
import BrandNetwork from "@/components/marketplace/BrandNetwork"
import DualitaHero from "@/components/dualita/DualitaHero"
import MOOCTrack from "@/components/dualita/MOOCTrack"
import MicroTrack from "@/components/dualita/MicroTrack"
import { founderBrands, collaboratorBrands, comingSoonSlots } from "@/lib/brands"
import { territories } from "@/lib/territories"

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
            <SectionKicker className="mb-4">Cacao Fine-Flavor · by Amaury Amed</SectionKicker>
            <h1
              className="font-serif font-black text-colab-cream leading-[.95] mb-6"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            >
              Cultiva<br />
              conocimiento.<br />
              <span className="text-colab-yellow">Cosecha sabor.</span>
            </h1>
            <p
              className="text-colab-cream/65 font-sans leading-relaxed mb-8 max-w-md mx-auto md:mx-0"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)" }}
            >
              cacaotier es la escuela futurista donde agricultores y chocolateros dominan el bioproceso,
              construyen reputación y llevan cada lote colombiano al mercado Fine-Flavor.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button href="/aprende/cacaotier">Entrar al laboratorio →</Button>
              <Button variant="outline" href="#ecosistema">Ver el ecosistema</Button>
            </div>
          </div>
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-colab-yellow/20 blur-3xl rounded-full" />
            <div className="relative border border-white/10 bg-white/[.04] rounded-[2rem] p-8">
              <p className="eyebrow text-colab-yellow mb-5">Lote vivo · 72 h</p>
              <div className="flex items-end gap-5">
                <div><strong className="font-serif text-6xl text-colab-cream">45°</strong><small className="block text-colab-cream/35 mt-1">temperatura</small></div>
                <div><strong className="font-serif text-4xl text-colab-yellow">4.5</strong><small className="block text-colab-cream/35 mt-1">pH interno</small></div>
              </div>
              <div className="h-16 mt-7 flex items-end gap-1" aria-hidden>
                {[22, 30, 38, 49, 58, 64, 64, 64, 64, 64, 64, 64].map((height, index) => (
                  <span key={index} className="flex-1 bg-colab-yellow/70 rounded-t" style={{ height }} />
                ))}
              </div>
              <p className="text-xs text-colab-cream/45 mt-4">FEAR 5 · protocolo de precisión</p>
            </div>
          </div>
        </div>

        {/* stats band */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: "3",  label: "líneas comparadas" },
              { num: "45°", label: "protocolo de precisión" },
              { num: "700", label: "XP de campo" },
              { num: "2",  label: "maestrías conectadas" },
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

      <section id="ecosistema" className="bg-[#101d0b] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[.75fr_1.25fr] gap-12">
            <div>
              <SectionKicker className="mb-4">El núcleo builder</SectionKicker>
              <h2 className="font-serif font-bold text-colab-cream leading-[1.02]" style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)" }}>
                De la finca<br />al futuro del cacao.
              </h2>
              <p className="text-colab-cream/50 text-sm leading-relaxed mt-5 max-w-sm">
                Formación, experimentación y comercio en un mismo ciclo. Lo aprendido mejora el lote;
                el lote construye reputación; la reputación abre mercado.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { step: "01", title: "Master Cacaotier", body: "Fermentación, finca, datos y calidad Fine-Flavor." },
                { step: "02", title: "Master Chocolatier", body: "Tostión, formulación, aplicaciones y creación sensorial." },
                { step: "03", title: "Cacao Gotchi", body: "Cuida un lote virtual, toma decisiones y conserva tu racha." },
                { step: "04", title: "Cacao Colab", body: "Publica evidencia, conecta actores y lleva productos al mercado." },
              ].map((item) => (
                <article key={item.step} className="bg-white/[.035] border border-white/10 rounded-2xl p-6 hover:border-colab-yellow/30 transition-colors">
                  <span className="font-serif italic text-3xl text-colab-yellow/35">{item.step}</span>
                  <h3 className="font-serif font-bold text-xl text-colab-cream mt-7">{item.title}</h3>
                  <p className="text-xs text-colab-cream/45 leading-relaxed mt-2">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MARKETPLACE ══════════ */}
      <section id="marketplace" className="bg-colab-cream py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionKicker className="mb-3 text-colab-ink/50">Mapa vivo · Colombia al mundo</SectionKicker>
          <h2
            className="font-serif font-bold text-colab-ink mb-3"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}
          >
            Seis nodos.<br />Un círculo abierto.
          </h2>
          <p className="text-colab-ink/60 font-sans max-w-xl mb-10" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
            cacaotier conecta Bogotá con Landázuri, Arbeláez, Paicol, Tame y Guamal.
            Cada marca conserva su identidad mientras comparte conocimiento y abre oportunidades.
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

      {/* ══════════ ÚNETE CTA ══════════ */}
      <section className="bg-colab-cream py-20 border-t border-colab-forest/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-colab-forest rounded-2xl px-8 md:px-14 py-14 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
            {/* decorative bg text */}
            <div
              aria-hidden
              className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden"
            >
              <span
                className="font-serif font-black text-white/[.03] leading-none pr-6"
                style={{ fontSize: "clamp(8rem, 18vw, 18rem)" }}
              >
                ↗
              </span>
            </div>

            <div className="relative flex-1 text-center md:text-left">
              <SectionKicker className="mb-4">Cacao con propósito · HoReCa</SectionKicker>
              <h2
                className="font-serif font-black text-colab-cream leading-tight mb-4"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)" }}
              >
                ¿Listo para llevar<br />cacao colombiano<br />
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

            <div className="relative flex-shrink-0 hidden md:flex flex-col items-center gap-4">
              <SquirrelSVG size={140} className="squirrel-bob" />
              <div className="flex gap-2">
                {["Restaurante", "Hotel", "Cafetería", "Pastelería"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(242,200,48,.12)", color: "#F2C830", border: "1px solid rgba(242,200,48,.2)" }}
                  >
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
