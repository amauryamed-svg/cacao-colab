import type { Metadata } from "next"
import SectionKicker from "@/components/ui/SectionKicker"
import BrandNetwork from "@/components/marketplace/BrandNetwork"
import DirectoryCard from "@/components/marketplace/DirectoryCard"
import { founderBrands, collaboratorBrands, comingSoonSlots } from "@/lib/brands"
import { directoryCandidates } from "@/lib/directory-candidates"
import { territories } from "@/lib/territories"

export const metadata: Metadata = {
  title: "Marketplace · Cacao Colab",
  description: "Marcas de cacao de especialidad colombiano seleccionadas por Cacao Colab.",
}

const WA_MARCA =
  "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20postular%20mi%20marca%20de%20cacao%20al%20marketplace."

export default function MarketplacePage() {
  return (
    <div className="bg-colab-cream min-h-screen">
      {/* header */}
      <div className="bg-colab-forest py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionKicker className="mb-4">Marketplace · Cacao Colab</SectionKicker>
          <h1
            className="font-serif font-black text-colab-cream leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Las marcas<br />
            <span className="text-colab-yellow">del Colab.</span>
          </h1>
          <p className="text-colab-cream/55 font-sans mt-4 max-w-lg">
            Criterios de admisión: trazabilidad por lote, origen colombiano verificado, propuesta funcional y visión de sostenibilidad.
          </p>
        </div>
      </div>

      {/* red de nodos — territorios · círculo fundador · colaboradoras + próximamente */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <BrandNetwork
          founders={founderBrands}
          collaborators={collaboratorBrands}
          comingSoonSlots={comingSoonSlots}
          territories={territories}
        />

        {/* directorio — candidatas, no confirmadas, no forman parte del marketplace */}
        <div className="mt-16 border-t border-colab-ink/10 pt-12">
          <SectionKicker className="mb-3 text-colab-ink/40">El directorio</SectionKicker>
          <h2 className="font-serif font-bold text-colab-ink mb-3" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)" }}>
            Marcas que seguimos de cerca.
          </h2>
          <p className="text-colab-ink/55 font-sans max-w-2xl mb-8 text-sm leading-relaxed">
            Cacao y chocolate colombiano real que investigamos antes de invitar formalmente al marketplace — ninguna de estas marcas fue contactada todavía. No son socias ni colaboradoras del Colab; es nuestra lista de candidatas, honesta y pública.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {directoryCandidates.map((c) => (
              <DirectoryCard key={c.id} candidate={c} />
            ))}
          </div>
        </div>

        {/* criteria */}
        <div className="mt-16 border-t border-colab-ink/10 pt-12">
          <SectionKicker className="mb-4 text-colab-ink/40">Criterios de admisión</SectionKicker>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Trazabilidad", desc: "Origen verificado por lote. Relación directa o semi-directa con el agricultor." },
              { n: "02", title: "Propuesta funcional", desc: "Aplicación clara en HoReCa, pastelería profesional o retail de especialidad." },
              { n: "03", title: "Sin azúcar añadida", desc: "O versión sin azúcar añadida disponible. Compromiso con la salud y el sabor real del cacao." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-xl p-6">
                <p className="font-serif font-black text-colab-yellow text-4xl leading-none mb-2">{n}</p>
                <h3 className="font-bold text-colab-ink font-sans mb-1">{title}</h3>
                <p className="text-sm text-colab-ink/60 font-sans leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* cta */}
        <div className="mt-12 text-center">
          <a
            href={WA_MARCA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-colab-forest text-colab-cream font-bold text-sm px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-sans"
          >
            Postular mi marca →
          </a>
        </div>
      </div>
    </div>
  )
}
