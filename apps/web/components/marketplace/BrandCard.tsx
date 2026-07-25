import { type Brand } from "@/lib/brands"

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: brand.bgColor, color: brand.textColor }}
    >
      {/* header */}
      <div className="px-6 pt-8 pb-4">
        <p className="text-[10px] font-bold tracking-[3px] uppercase font-sans mb-2" style={{ color: brand.accentColor }}>
          {brand.role === 'colaborador' ? 'Colaborador Cacao Colab' : 'Socio Cacao Colab'}
        </p>
        <h3 className="font-serif text-2xl font-bold leading-tight">{brand.name}</h3>
        <p className="text-sm mt-1 opacity-70 font-sans">{brand.tagline}</p>
      </div>

      {/* divider */}
      <div className="mx-6 border-t opacity-20" style={{ borderColor: brand.accentColor }} />

      {/* description */}
      <div className="px-6 py-4 flex-1">
        <p className="text-sm leading-relaxed opacity-80 font-sans">{brand.description}</p>

        <ul className="mt-4 space-y-1">
          {brand.products.map((p) => (
            <li key={p} className="text-xs font-sans flex gap-2 items-start">
              <span style={{ color: brand.accentColor }}>▸</span>
              <span className="opacity-85">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* cta */}
      <div className="px-6 pb-7">
        <a
          href={brand.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-sm font-bold py-3 px-5 rounded-full transition-opacity hover:opacity-80 font-sans"
          style={{ background: brand.accentColor, color: brand.bgColor }}
        >
          {brand.ctaLabel}
        </a>
      </div>
    </div>
  )
}
