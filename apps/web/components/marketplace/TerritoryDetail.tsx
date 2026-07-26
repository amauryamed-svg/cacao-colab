import { type Territory } from "@/lib/territories"

/**
 * Mismo lenguaje visual que BrandCard (rounded-2xl, font-serif, divisor con
 * el color de acento) pero para un nodo de territorio, no de marca — sin
 * nombres de Guardianes individuales (ver nota de cumplimiento en
 * lib/territories.ts).
 */
export default function TerritoryDetail({ territory }: { territory: Territory }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-colab-ink text-colab-cream">
      <div className="px-6 pt-8 pb-4">
        <p
          className="text-[10px] font-bold tracking-[3px] uppercase font-sans mb-2"
          style={{ color: territory.accentColor }}
        >
          Territorio · Cacao Colab
        </p>
        <h3 className="font-serif text-2xl font-bold leading-tight">{territory.name}</h3>
      </div>
      <div className="mx-6 border-t opacity-20" style={{ borderColor: territory.accentColor }} />
      <div className="px-6 py-5">
        <p className="text-sm leading-relaxed opacity-80 font-sans">{territory.flavorProfile}</p>
      </div>
    </div>
  )
}
