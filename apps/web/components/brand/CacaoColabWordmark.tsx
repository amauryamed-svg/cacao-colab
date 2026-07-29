type Props = { size?: "sm" | "md" | "lg"; inverted?: boolean }

export default function CacaoColabWordmark({ size = "md", inverted = false }: Props) {
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-3xl" }
  const color = inverted ? "text-white" : "text-colab-forest"

  return (
    <span className={`font-sans font-bold uppercase tracking-[.16em] ${sizes[size]} ${color}`}>
      Cacao <span className="font-light">Colab</span>
    </span>
  )
}
