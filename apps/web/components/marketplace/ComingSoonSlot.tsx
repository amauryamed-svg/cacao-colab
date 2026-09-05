const WA_MARCA =
  "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20postular%20mi%20marca%20al%20marketplace."

export default function ComingSoonSlot({ hint }: { hint: string }) {
  return (
    <div className="border-t border-dashed border-colab-yellow/45 flex flex-col justify-center min-h-[8rem] gap-3 py-5">
      <p className="text-xs text-colab-ink/50 font-sans">{hint}</p>
      <a
        href={WA_MARCA}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-bold text-colab-yellow hover:underline font-sans"
      >
        ¿Tu marca aquí? →
      </a>
    </div>
  )
}
