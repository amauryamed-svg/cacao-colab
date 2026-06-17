import type { Metadata } from "next"
import SectionKicker from "@/components/ui/SectionKicker"
import BrandCard from "@/components/marketplace/BrandCard"
import ComingSoonSlot from "@/components/marketplace/ComingSoonSlot"
import { brands, comingSoonSlots } from "@/lib/brands"

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

      {/* grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
          {comingSoonSlots.map((slot) => (
            <ComingSoonSlot key={slot.id} hint={slot.hint} />
          ))}
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
