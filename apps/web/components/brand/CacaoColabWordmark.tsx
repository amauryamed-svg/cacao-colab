type Props = { size?: "sm" | "md" | "lg"; inverted?: boolean }

export default function CacaoColabWordmark({ size = "md", inverted = false }: Props) {
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-3xl" }
  const color = inverted ? "text-white" : "text-colab-forest"

  return (
    <span className={`font-serif font-bold tracking-[-.03em] ${sizes[size]} ${color}`}>
      cacaotier
      <span className="ml-2 font-sans font-bold text-[.5em] uppercase tracking-[.18em] text-colab-yellow">
        Cacao Colab
      </span>
    </span>
  )
}
