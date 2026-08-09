import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DiplomaExhibit from "@/components/campus/DiplomaExhibit"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { decodeDiploma } from "@/lib/campus-rigor"
import { diplomaShareMeta } from "@/lib/diploma-og"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial · Arquitecto de Fermentación" }
  const meta = diplomaShareMeta(diploma, `/credencial/arquitecto-fermentacion/${code}`)
  return {
    title: meta.title,
    description: meta.description,
    openGraph: meta.openGraph,
    twitter: meta.twitter,
  }
}

export default async function ArchitectDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== ARCHITECT_COURSE_SLUG) notFound()

  const pagePath = `/credencial/arquitecto-fermentacion/${code}`
  const { absolute } = diplomaShareMeta(diploma, pagePath)

  return (
    <DiplomaExhibit
      diploma={diploma}
      absoluteUrl={absolute}
      brand="cacaotier"
      lede="Completó Master Cacaotier · Arquitecto de Fermentación: seis misiones de criterio trazable, vidas, rachas y retos al primer intento. Exigente y divertido — acredita oficio y método, no un laboratorio acreditado."
      footnote="Edutainment cacao · verificar en cacaocolab.org · evidencia de lote sigue en tu bitácora"
      courseHref="/campus/arquitecto-fermentacion"
      secondaryHref="/cuenta"
      secondaryLabel="Mi cuenta →"
    />
  )
}
