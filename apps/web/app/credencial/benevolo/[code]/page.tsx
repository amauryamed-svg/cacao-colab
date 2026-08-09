import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DiplomaExhibit from "@/components/campus/DiplomaExhibit"
import { decodeDiploma } from "@/lib/campus-rigor"
import { diplomaShareMeta } from "@/lib/diploma-og"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial Benevolo" }
  const meta = diplomaShareMeta(diploma, `/credencial/benevolo/${code}`)
  return {
    title: meta.title,
    description: meta.description,
    openGraph: meta.openGraph,
    twitter: meta.twitter,
  }
}

export default async function BenevoloDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== "benevolo-duja") notFound()

  const pagePath = `/credencial/benevolo/${code}`
  const { absolute } = diplomaShareMeta(diploma, pagePath)

  return (
    <DiplomaExhibit
      diploma={diploma}
      absoluteUrl={absolute}
      brand="Chocolate Benevolo"
      variant="benevolo"
      lede="Completó la aceleración Benevolo: tendencia gianduja × duja de marañón FEAR 5 Quara × Zurych, con criterio de origen y llamado al colectivo. Hermana del Master Chocolatier 70 %."
      footnote="Output R&D Colab · cacaocolab.org · marca acelerada cacaotier"
      courseHref="/campus/benevolo"
      courseLabel="Track Dualita →"
      secondaryHref="/benevolo"
      secondaryLabel="Preordenar Bars. →"
    />
  )
}