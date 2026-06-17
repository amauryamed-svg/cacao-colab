import { moocModules } from "@/lib/dualita"
import ModuleCard from "./ModuleCard"

const WA_MOOC =
  "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20inscribirme%20al%20MOOC%20Dualita."

export default function MOOCTrack() {
  return (
    <div className="flex flex-col gap-4">
      {/* track header */}
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-colab-yellow" />
        <div>
          <p className="text-[10px] font-bold tracking-[2.5px] uppercase font-sans text-colab-yellow">Track MOOC</p>
          <p className="text-xs font-sans text-white/50 mt-0.5">Formación profunda · 4 módulos · ~4 horas</p>
        </div>
      </div>
      {/* modules */}
      <div className="flex flex-col gap-3">
        {moocModules.map((m) => (
          <ModuleCard key={m.id} module={m} track="mooc" />
        ))}
      </div>
      {/* cta */}
      <a
        href={WA_MOOC}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 block text-center text-sm font-bold py-3 px-5 rounded-full bg-colab-yellow text-colab-forest hover:bg-colab-amber transition-colors font-sans"
      >
        Pre-registrarme en el MOOC →
      </a>
      <p className="text-[10px] text-center text-white/35 font-sans -mt-1">Lanzamiento 2026 · cupos limitados</p>
    </div>
  )
}
