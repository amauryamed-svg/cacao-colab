import type { Metadata } from "next"
import Link from "next/link"
import FobCotizador from "@/components/export/FobCotizador"
import { COLAB_SHOPIFY_STOREFRONT } from "@/lib/shopify-colab"

export const metadata: Metadata = {
  title: "App FOB · cotizador exportación",
  description:
    "App completa de cotización FOB Cartagena en Cacao Colab: comparar USA, UE, China y Japón, escenarios y proforma.",
}

export default function ExportPage() {
  return (
    <div className="bg-colab-forest min-h-screen text-colab-cream fob-app-page">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <Link href="/" className="eyebrow text-colab-cream/40 hover:text-colab-yellow">
            ← Cacao Colab
          </Link>
          <p className="eyebrow text-colab-yellow mt-6">App Colab · cotizador FOB</p>
          <h1
            className="font-serif font-black leading-[0.95] mt-4 max-w-3xl"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)" }}
          >
            Cotizador FOB.
            <br />
            <em className="text-colab-yellow not-italic">Exportación Fine-Flavor.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-colab-cream/60 leading-relaxed">
            Herramienta completa de internacionalización propiedad de Cacao Colab: cotiza, compara
            mercados USA / UE / Asia, copia o imprime la orientación y pide proforma con lote real.
            Criterio heredado de CAÚA Cloud — MoR comercial en Colab.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href={COLAB_SHOPIFY_STOREFRONT}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-colab-yellow text-colab-forest px-6 py-3 text-sm font-bold"
            >
              Tienda cacao-colab.myshopify.com →
            </a>
            <Link
              href="/shop"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
            >
              Hub /shop →
            </Link>
            <Link
              href="/marketplace"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
            >
              Red de marcas →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <FobCotizador />
      </main>
    </div>
  )
}
