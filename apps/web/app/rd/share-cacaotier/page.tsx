import type { Metadata } from "next"
import Link from "next/link"
import CacaotierShareKit from "@/components/cacaotier/CacaotierShareKit"

export const metadata: Metadata = {
  title: "Share kit · Master Cacaotier",
  description: "Herramienta interna UTM / HubSpot / thumbnails para publicar Master Cacaotier.",
  robots: { index: false, follow: false },
}

/**
 * Back-office: UTMs + OG downloads.
 * La página pública de aprendizaje es /aprende/cacaotier (sin este kit).
 */
export default function ShareCacaotierRdPage() {
  return (
    <div className="bg-colab-forest min-h-screen">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Link href="/aprende/cacaotier" className="eyebrow text-colab-cream/45 hover:text-colab-yellow transition-colors">
          ← Ver página pública
        </Link>
        <p className="eyebrow text-colab-yellow mt-8">R&D · herramienta interna</p>
        <h1 className="display-title text-colab-cream mt-3">
          Share kit.<br /><em>No va en el front público.</em>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-colab-cream/55">
          Genera enlaces UTM y thumbnails OG. El visitante de
          /aprende/cacaotier solo ve el atlas pedagógico y la campaña.
        </p>
        <div className="mt-10">
          <CacaotierShareKit />
        </div>
      </main>
    </div>
  )
}
