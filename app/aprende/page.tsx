import type { Metadata } from "next"
import SectionKicker from "@/components/ui/SectionKicker"
import DualitaHero from "@/components/dualita/DualitaHero"
import MOOCTrack from "@/components/dualita/MOOCTrack"
import MicroTrack from "@/components/dualita/MicroTrack"

export const metadata: Metadata = {
  title: "Dualita · Aprende cacao · Cacao Colab",
  description: "Sistema de aprendizaje dual: MOOC profundo en cacao colombiano + microlearning CAÚA Academy para cocina profesional.",
}

export default function AprendePage() {
  return (
    <div className="bg-colab-forest min-h-screen">
      {/* header */}
      <div className="pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <DualitaHero />
        </div>
      </div>

      {/* two tracks */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/[.04] border border-colab-yellow/15 rounded-2xl p-7">
            <MOOCTrack />
          </div>
          <div className="bg-white/[.04] border border-colab-green/15 rounded-2xl p-7">
            <MicroTrack />
          </div>
        </div>

        {/* philosophy */}
        <div className="mt-14 border-t border-white/10 pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SectionKicker className="mb-3">¿Por qué Dualita?</SectionKicker>
            <h2 className="font-serif font-bold text-colab-cream text-2xl mb-4">
              El cacao se aprende<br />en dos velocidades.
            </h2>
            <p className="text-colab-cream/55 font-sans text-sm leading-relaxed">
              El MOOC te da la base: historia, fermentación, terroir, negocio. El microlearning te da la práctica: recetas, coberturas, métricas en cocina. Juntos son Dualita — el sistema que hace que tu equipo aplique lo que aprende.
            </p>
          </div>
          <div className="bg-white/[.04] border border-white/10 rounded-xl p-6">
            <p className="text-colab-yellow font-bold text-xs tracking-wider uppercase font-sans mb-3">El equipo Cacao Colab</p>
            <ul className="space-y-2 text-sm font-sans text-colab-cream/65">
              <li><strong className="text-colab-cream">Amaury Amed</strong> · CAÚA Colombia · Co-founder</li>
              <li><strong className="text-colab-cream">Hellen Bareño</strong> · Zurych · Chocolatería</li>
              <li><strong className="text-colab-cream">Oscar Gamboa</strong> · Zurych · Desarrollo</li>
            </ul>
            <a
              href="https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20tengo%20preguntas%20sobre%20Dualita."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-bold text-colab-yellow hover:underline font-sans"
            >
              Preguntar al equipo →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
