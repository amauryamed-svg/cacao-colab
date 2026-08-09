import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DiplomaExhibit from "@/components/campus/DiplomaExhibit"
import { decodeDiploma } from "@/lib/campus-rigor"
import { diplomaShareMeta } from "@/lib/diploma-og"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial · Cacao Colab" }
  const meta = diplomaShareMeta(diploma, `/credencial/maestro-chocolatier/${code}`)
  return {
    title: meta.title,
    description: meta.description,
    openGraph: meta.openGraph,
    twitter: meta.twitter,
  }
}

export default async function ChocolatierDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== "maestro-chocolatier") notFound()

  const pagePath = `/credencial/maestro-chocolatier/${code}`
  const { absolute } = diplomaShareMeta(diploma, pagePath)

  return (
    <DiplomaExhibit
      diploma={diploma}
      absoluteUrl={absolute}
      brand="cacaotier"
      lede="Completó Master Chocolatier (barra 70 % · lente CoEx / Chocolate Awards) con tipicidad, vidas, rachas y puesta en escena del cacao. No es medalla oficial — es credencial de oficio y colectivo."
      footnote="Edutainment cacao · verificar en cacaocolab.org · lente CoEx ≠ premio CoEx"
      courseHref="/aprende/chocolatier"
      secondaryHref="/unete"
      secondaryLabel="Únete al Colab →"
    />
  )
}
