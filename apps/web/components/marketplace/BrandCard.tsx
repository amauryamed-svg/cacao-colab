import { type Brand } from "@/lib/brands"
import Link from "next/link"

/** Panel de marca seleccionada: un plano de color de marca (interacción), sin caja anidada. */
export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div
      className="flex flex-col"
      style={{ background: brand.bgColor, color: brand.textColor }}
    >
      <div className="px-1 pt-2 pb-4 sm:px-0">
        <p
          className="text-[10px] font-bold tracking-[3px] uppercase font-sans mb-2"
          style={{ color: brand.accentColor }}
        >
          {brand.role === "epicenter"
            ? "Epicentro educativo · ownership Amaury Amed"
            : "Nodo regional · círculo abierto"}
        </p>
        <h3 className="font-serif text-2xl font-bold leading-tight">{brand.name}</h3>
        <p className="text-sm mt-1 opacity-70 font-sans">{brand.tagline}</p>
        <p
          className="text-[10px] mt-3 uppercase tracking-[.16em] font-bold font-sans"
          style={{ color: brand.accentColor }}
        >
          {brand.location}
        </p>
      </div>

      <div className="border-t opacity-20" style={{ borderColor: brand.accentColor }} />

      <div className="py-4 flex-1 px-1 sm:px-0">
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

      <div className="pb-2 px-1 sm:px-0">
        {brand.ctaUrl.startsWith("/") ? (
          <Link
            href={brand.ctaUrl}
            className="inline-flex text-sm font-bold py-3 px-5 rounded-full transition-opacity hover:opacity-80 font-sans"
            style={{ background: brand.accentColor, color: brand.bgColor }}
          >
            {brand.ctaLabel}
          </Link>
        ) : (
          <a
            href={brand.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-bold py-3 px-5 rounded-full transition-opacity hover:opacity-80 font-sans"
            style={{ background: brand.accentColor, color: brand.bgColor }}
          >
            {brand.ctaLabel}
          </a>
        )}
      </div>
    </div>
  )
}
