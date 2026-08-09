import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { decodeDiploma, gradeLabel, linkedInShareUrl } from "@/lib/campus-rigor"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial Benevolo" }
  return {
    title: `${diploma.name} · Benevolo · Cacao Colab`,
    description: gradeLabel(diploma.grade),
  }
}

export default async function BenevoloDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== "benevolo-duja") notFound()

  const absolute =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cacaocolab.org") +
    `/credencial/benevolo/${code}`

  return (
    <div className="diploma-page">
      <div className="diploma-card diploma-card--benevolo">
        <p className="diploma-eyebrow">Cacao Colab · marca acelerada</p>
        <h1 className="diploma-brand">Chocolate Benevolo</h1>
        <p className="diploma-course">{diploma.title}</p>
        <p className="diploma-certifies">Certifica que</p>
        <h2 className="diploma-name">{diploma.name}</h2>
        <p className="diploma-grade">{gradeLabel(diploma.grade)}</p>
        <p className="diploma-lede">
          Completó la aceleración Benevolo: tendencia gianduja × duja de marañón FEAR 5 Quara × Zurych,
          con criterio de origen y llamado al colectivo. Hermana del Master Chocolatier 70 %.
        </p>
        <div className="diploma-actions">
          <a href={linkedInShareUrl(absolute)} target="_blank" rel="noopener noreferrer" className="diploma-li">
            LinkedIn →
          </a>
          <Link href="/rd/bars" className="diploma-colab">
            Preordenar Bars. →
          </Link>
          <Link href="/unete">Únete al Colab</Link>
        </div>
      </div>
    </div>
  )
}
