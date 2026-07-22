import { type DirectoryCandidate } from "@/lib/directory-candidates"

/**
 * Tarjeta de una marca CANDIDATA del directorio — deliberadamente distinta
 * de BrandCard (colores planos de marca, botón "Conocer X →"). Esta usa
 * borde punteado y sin CTA de marca porque nada de esto está confirmado
 * todavía: ninguna de estas marcas fue contactada. Solo mostramos su
 * `publicBlurb` (copy corto y honesto) — nunca `notes` (research interno).
 */
export default function DirectoryCard({ candidate }: { candidate: DirectoryCandidate }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-colab-ink/12 bg-white/60 p-5 flex flex-col gap-3">
      <div>
        <p className="text-[9px] font-bold tracking-[2px] uppercase font-sans text-colab-ink/35 mb-1.5">
          {candidate.city}
        </p>
        <h4 className="font-serif text-lg font-bold text-colab-ink leading-tight">{candidate.name}</h4>
      </div>
      <p className="text-xs text-colab-ink/65 font-sans leading-relaxed flex-1">{candidate.publicBlurb}</p>
      <div className="flex items-center justify-between pt-1">
        <span className="text-[9px] font-bold tracking-[1.5px] uppercase font-sans text-colab-amber/80">
          Candidata · sin confirmar
        </span>
        {candidate.website && (
          <a
            href={candidate.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold font-sans text-colab-ink/45 hover:text-colab-ink/80 transition-colors"
          >
            Sitio ↗
          </a>
        )}
      </div>
    </div>
  )
}
