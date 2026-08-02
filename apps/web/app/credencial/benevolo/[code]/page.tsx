import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DiplomaShareBar from "@/components/campus/DiplomaShareBar"
import { decodeDiploma, gradeLabel } from "@/lib/campus-rigor"
import { diplomaAbsoluteUrl, diplomaOgImageUrl } from "@/lib/diploma-og"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial Benevolo" }
  const absolute = diplomaAbsoluteUrl(`/credencial/benevolo/${code}`)
  const og = diplomaOgImageUrl(diploma)
  return {
    title: `${diploma.name} · Benevolo · Cacao Colab`,
    description: gradeLabel(diploma.grade),
    openGraph: {
      title: `${diploma.name} · Benevolo`,
      description: gradeLabel(diploma.grade),
      url: absolute,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${diploma.name} · Benevolo`,
      images: [og],
    },
  }
}

export default async function BenevoloDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== "benevolo-duja") notFound()

  const absolute = diplomaAbsoluteUrl(`/credencial/benevolo/${code}`)
  const gLabel = gradeLabel(diploma.grade)

  return (
    <div className="diploma-page">
      <div className="diploma-card diploma-card--benevolo">
        <p className="diploma-eyebrow">Cacao Colab · marca acelerada</p>
        <h1 className="diploma-brand">Chocolate Benevolo</h1>
        <p className="diploma-course">{diploma.title}</p>
        <p className="diploma-certifies">Certifica que</p>
        <h2 className="diploma-name">{diploma.name}</h2>
        <p className="diploma-grade">{gLabel}</p>
        <p className="diploma-lede">
          Completó la aceleración Benevolo: tendencia gianduja × duja de marañón FEAR 5 Quara × Zurych,
          con criterio de origen y llamado al colectivo. Hermana del Master Chocolatier 70 %.
        </p>
        <DiplomaShareBar
          diplomaUrl={absolute}
          courseSlug="benevolo"
          gradeLabelText={gLabel}
          shareText={`${diploma.name} · Benevolo · ${gLabel} · Cacao Colab`}
          courseHref="/campus/benevolo"
          secondaryHref="/benevolo"
          secondaryLabel="Preordenar Bars. →"
        />
      </div>
    </div>
  )
}