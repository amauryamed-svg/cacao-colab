import { type Territory } from "@/lib/territories"

/**
 * Panel de territorio: mismo lenguaje que BrandCard (plano de color + hairline),
 * sin caja redondeada anidada. Sin nombres de Guardianes individuales.
 */
export default function TerritoryDetail({ territory }: { territory: Territory }) {
  return (
    <div className="bg-colab-ink text-colab-cream">
      <div className="pt-2 pb-4">
        <p
          className="text-[10px] font-bold tracking-[3px] uppercase font-sans mb-2"
          style={{ color: territory.accentColor }}
        >
          Territorio · Cacao Colab
        </p>
        <h3 className="font-serif text-2xl font-bold leading-tight">{territory.name}</h3>
      </div>
      <div className="border-t opacity-20" style={{ borderColor: territory.accentColor }} />
      <div className="py-5">
        <p className="text-sm leading-relaxed opacity-80 font-sans">{territory.flavorProfile}</p>
      </div>
    </div>
  )
}
