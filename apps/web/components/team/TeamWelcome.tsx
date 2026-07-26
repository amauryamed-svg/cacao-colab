import CacaoColabWordmark from "@/components/brand/CacaoColabWordmark"

type Props = {
  fullName: string
}

export default function TeamWelcome({ fullName }: Props) {
  const firstName = fullName.split(" ")[0]

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <CacaoColabWordmark size="lg" />
      <h1 className="font-serif text-3xl text-colab-forest">Hola {firstName}</h1>
      <p className="text-sm text-colab-forest/55 font-sans">
        Portal interno del equipo Cacao Colab.
      </p>
    </div>
  )
}
