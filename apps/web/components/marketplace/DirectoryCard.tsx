import { type DirectoryCandidate } from "@/lib/directory-candidates"

/**
 * Entrada de marca CANDIDATA del directorio — deliberadamente distinta
 * de BrandCard. Hairline, sin caja anidada: nada de esto está confirmado
 * todavía. Solo `publicBlurb` — nunca `notes` (research interno).
 */
export default function DirectoryCard({ candidate }: { candidate: DirectoryCandidate }) {
  return (
    <div className="border-t border-colab-ink/15 pt-4 pb-5 flex flex-col gap-2">
      <div>
        <p className="text-[9px] font-bold tracking-[2px] uppercase font-sans text-colab-ink/35 mb-1">
          {candidate.city}
        </p>
        <h4 className="font-serif text-lg font-bold text-colab-ink leading-tight">{candidate.name}</h4>
      </div>
      <p className="text-xs text-colab-ink/65 font-sans leading-relaxed flex-1">{candidate.publicBlurb}</p>
      <span className="text-[9px] font-bold tracking-[1.5px] uppercase font-sans text-colab-amber/80">
        Candidata · sin confirmar
      </span>
      {candidate.website ? (
        <a
          href={candidate.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-xs font-bold font-sans text-colab-ink underline decoration-colab-ink/25 underline-offset-4 hover:decoration-colab-ink/60"
        >
          Visitar sitio ↗
        </a>
      ) : (
        <span className="mt-1 text-xs font-sans text-colab-ink/30">Sin sitio verificado</span>
      )}
    </div>
  )
}
