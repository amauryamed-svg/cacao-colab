type Props = { size?: "sm" | "md" | "lg"; inverted?: boolean }

export default function CacaoColabWordmark({ size = "md", inverted = false }: Props) {
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-3xl" }
  const color = inverted ? "text-white" : "text-colab-forest"

  return (
    <span className={`font-bold tracking-wider ${sizes[size]} ${color} font-sans`}>
      CACAO{" "}
      <span className="font-light tracking-[.2em]">COLAB</span>
    </span>
  )
}
