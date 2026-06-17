import SectionKicker from "@/components/ui/SectionKicker"

export default function DualitaHero() {
  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <SectionKicker className="mb-4 justify-center">Sistema de aprendizaje · Dualita</SectionKicker>
      <h2
        className="font-serif font-bold leading-tight text-colab-cream mb-4"
        style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
      >
        Aprende cacao<br />
        <span className="text-colab-yellow">de especialidad.</span>
      </h2>
      <p className="text-colab-cream/65 font-sans leading-relaxed max-w-lg mx-auto"
         style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>
        Dualita combina dos velocidades: el <strong className="text-colab-yellow">MOOC</strong> para formación profunda
        en cacao, fermentación y negocio; y el <strong className="text-colab-pod">Microlearning</strong> de CAÚA Academy
        para aplicación inmediata en cocina profesional.
      </p>
      {/* visual dual-track indicator */}
      <div className="mt-8 flex items-center justify-center gap-4 text-xs font-sans font-bold">
        <span className="flex items-center gap-1.5 text-colab-yellow">
          <span className="w-2.5 h-2.5 rounded-full bg-colab-yellow inline-block" />
          MOOC · Teoría profunda
        </span>
        <span className="text-white/20">×</span>
        <span className="flex items-center gap-1.5 text-colab-pod">
          <span className="w-2.5 h-2.5 rounded-full bg-colab-green inline-block" />
          Microlearning · Práctica rápida
        </span>
      </div>
    </div>
  )
}
