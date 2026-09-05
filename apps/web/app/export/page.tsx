import type { Metadata } from "next"
import Link from "next/link"
import FobCotizador from "@/components/export/FobCotizador"

export const metadata: Metadata = {
  title: "Exportación FOB · internacionalización",
  description:
    "Cotizador FOB Cartagena de Cacao Colab: grano Fine-Flavor, nibs y coberturas hacia USA, UE, China y Japón con flete y landed estimado.",
}

export default function ExportPage() {
  return (
    <div className="bg-colab-forest min-h-screen text-colab-cream">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <Link href="/" className="eyebrow text-colab-cream/40 hover:text-colab-yellow">
            ← Cacao Colab
          </Link>
          <p className="eyebrow text-colab-yellow mt-6">Cacao Colab · propietario del cotizador</p>
          <h1
            className="font-serif font-black leading-[0.95] mt-4 max-w-3xl"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)" }}
          >
            Exportación Fine-Flavor.
            <br />
            <em className="text-colab-yellow not-italic">FOB a USA, UE y Asia.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-colab-cream/60 leading-relaxed">
            Plataforma de marcas para visibilidad internacional: cotiza salida FOB Cartagena con
            flete real tipificado y landed estimado hacia Estados Unidos, Unión Europea, China y
            Japón. Herramienta Colab (criterio heredado de CAÚA Cloud) — proforma firmada por
            WhatsApp con lote trazable.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/marketplace"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
            >
              Red de marcas →
            </Link>
            <Link
              href="/conocimiento/eudr-deforestacion"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
            >
              EUDR · cumplimiento →
            </Link>
            <Link href="/nodo" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold">
              Nodos origen →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <FobCotizador />

        <section className="mt-16 grid md:grid-cols-3 gap-5">
          {[
            {
              t: "Herencia → mercado",
              b: "La generación que recibe la tierra cotiza con el mismo rigor de fermentación que defiende en finca.",
            },
            {
              t: "Marcas visibles",
              b: "Cada nodo mantiene identidad; Colab abre la ventana FOB para compradores USA / UE / Asia.",
            },
            {
              t: "Sin stock fingido",
              b: "La cifra orienta. La proforma sale cuando hay lote, documentos y canal confirmados.",
            },
          ].map((card) => (
            <article
              key={card.t}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h2 className="font-serif text-xl font-bold text-colab-yellow">{card.t}</h2>
              <p className="mt-3 text-sm text-colab-cream/55 leading-relaxed">{card.b}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
