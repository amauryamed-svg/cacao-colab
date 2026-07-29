import Link from "next/link"
import { microModules } from "@/lib/dualita"
import ModuleCard from "./ModuleCard"

export default function MicroTrack() {
  return (
    <div className="flex flex-col gap-4">
      {/* track header */}
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-colab-green" />
        <div>
          <p className="text-[10px] font-bold tracking-[2.5px] uppercase font-sans text-colab-pod">Microlearning Cacao Funcional · por CAÚA</p>
          <p className="text-xs font-sans text-white/50 mt-0.5">Elección, hábitos y consumo saludable · 6 módulos</p>
        </div>
      </div>
      {/* modules */}
      <div className="flex flex-col gap-3">
        {microModules.map((m) => (
          <ModuleCard key={m.id} module={m} track="micro" />
        ))}
      </div>
      {/* cta */}
      <Link
        href="/aprende/cacao-bioactivo"
        className="mt-1 block text-center text-sm font-bold py-3 px-5 rounded-full border-2 border-colab-green text-colab-pod hover:bg-colab-green hover:text-white transition-colors font-sans"
      >
        Crear un hábito saludable →
      </Link>
      <p className="text-[10px] text-center text-white/35 font-sans -mt-1">Contenido educativo CAÚA · no sustituye consejo médico</p>
    </div>
  )
}
