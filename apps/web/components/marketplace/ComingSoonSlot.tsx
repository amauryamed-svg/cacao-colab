const WA_MARCA =
  "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20postular%20mi%20marca%20al%20marketplace."

export default function ComingSoonSlot({ hint }: { hint: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-colab-yellow/40 flex flex-col items-center justify-center min-h-[280px] gap-4 px-6 py-8 hover:border-colab-yellow/70 transition-colors">
      <div className="w-10 h-10 rounded-full border-2 border-colab-yellow/40 flex items-center justify-center">
        <span className="text-colab-yellow/60 text-xl leading-none">+</span>
      </div>
      <p className="text-xs text-colab-ink/50 font-sans text-center">{hint}</p>
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
