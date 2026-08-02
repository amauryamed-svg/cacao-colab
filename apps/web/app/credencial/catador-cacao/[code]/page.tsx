import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DiplomaExhibit from "@/components/campus/DiplomaExhibit"
import { decodeDiploma } from "@/lib/campus-rigor"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { diplomaShareMeta } from "@/lib/diploma-og"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial · Cacao Colab" }
  const meta = diplomaShareMeta(diploma, `/credencial/catador-cacao/${code}`)
  return {
    title: meta.title,
    description: meta.description,
    openGraph: meta.openGraph,
    twitter: meta.twitter,
  }
}

export default async function CatadorDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== CATADOR_COURSE_SLUG) notFound()

  const pagePath = `/credencial/catador-cacao/${code}`
  const { absolute } = diplomaShareMeta(diploma, pagePath)

  return (
    <DiplomaExhibit
      diploma={diploma}
      absoluteUrl={absolute}
      brand="cacaotier"
      lede="Completó Master Catador de Cacao: panel ciego, Rueda Fine-Flavor Colab, defectos no negociables y tipicidad defendible con lente CoEx / puente Callebaut. Credencial de oficio sensorial — no medalla oficial."
      footnote="Edutainment cacao · cacaocolab.org · lente CoEx ≠ premio CoEx"
      courseHref="/aprende/catador"
      secondaryHref="/rd/set-catacion"
      secondaryLabel="Set Catación 10 →"
    />
  )
}
