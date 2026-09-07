import type { Metadata } from "next"
import Link from "next/link"
import FreemiumPrueba from "@/components/freemium/FreemiumPrueba"

export const metadata: Metadata = {
  title: "Prueba freemium · Colab abierto",
  description:
    "Tres preguntas de criterio Fine-Flavor para quien llega desde Secretaría, Cancillería, un nodo o un comprador. El Colab está abierto: Colombia al mundo.",
}

export default function PruebaPage() {
  return (
    <div className="bg-colab-forest min-h-screen text-colab-cream">
      <header className="course-hero">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10">
          <Link href="/" className="eyebrow text-colab-cream/45 hover:text-colab-yellow">
            ← Cacao Colab
          </Link>
          <p className="eyebrow text-colab-yellow mt-6">Colab abierto · freemium</p>
          <h1 className="display-title text-colab-cream mt-4">
            Prueba el criterio.
            <br />
            <em>Lleva Colombia al mundo.</em>
          </h1>
          <p className="mt-6 text-colab-cream/60 leading-relaxed">
            Grupos de interés que entran ahora — Secretaría, Cancillería, nodos y compradores —
            encuentran el campus abierto. Tres preguntas. Sin muro de rango. Sin fingir alianza
            oficial.
          </p>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <FreemiumPrueba />
        <p className="text-xs text-colab-cream/40 mt-12 leading-relaxed">
          Cacao Colab no es un programa de la Cancillería ni de una Secretaría. Es la casa de oficio
          Fine-Flavor para quien llega desde esas mesas — y para quien hereda la tierra.
        </p>
      </main>
    </div>
  )
}
