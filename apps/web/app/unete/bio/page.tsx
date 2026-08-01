import type { Metadata } from "next"
import Link from "next/link"
import NodeBioFlow from "@/components/nodo/NodeBioFlow"

export const metadata: Metadata = {
  title: "Bio de nodo · Unirme al Colab",
  description:
    "Crea tu bio de finca o marca en Cacao Colab: foto, intro e imagen de producto para activar la red social interna del cacao.",
}

export default async function UneteBioPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; nombre?: string; operacion?: string; ciudad?: string }>
}) {
  const q = await searchParams
  return (
    <main className="onboard-page min-h-screen bg-colab-forest flex flex-col">
      <div className="w-full border-b border-white/8 py-4 px-6 flex items-center justify-between">
        <Link
          href="/unete"
          className="text-xs font-bold tracking-[3px] uppercase text-colab-cream/40 hover:text-colab-cream/70 transition-colors"
        >
          ← Unirme
        </Link>
        <Link href="/manifiesto" className="text-xs font-bold tracking-[3px] uppercase text-colab-pod">
          Manifiesto .org
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-xl">
          <NodeBioFlow
            presetEmail={q.email}
            presetName={q.nombre}
            presetOrg={q.operacion}
            presetCity={q.ciudad}
          />
        </div>
      </div>
      <div className="w-full border-t border-white/8 py-5 px-6 text-center">
        <p className="text-xs text-colab-cream/20 max-w-md mx-auto leading-relaxed">
          Cacao Colab · org sin ánimo de lucro · intermediarios de la comunidad colaborativa del cacao
        </p>
      </div>
    </main>
  )
}
