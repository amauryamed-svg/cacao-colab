import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import DiplomaLinkedInShare from "@/components/campus/DiplomaLinkedInShare"
import { decodeDiploma, gradeLabel, xShareUrl } from "@/lib/campus-rigor"
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
  const meta = diplomaShareMeta(diploma, pagePath)

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

        <DiplomaLinkedInShare diplomaUrl={meta.absolute} copy={meta.linkedInCopy} />

        <div className="diploma-actions">
          <a
            href={xShareUrl(meta.absolute, meta.linkedInCopy.split("\n")[0] ?? meta.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="diploma-x"
          >
            Compartir en X →
          </a>
          <Link href="/benevolo" className="diploma-colab">
            Preordenar Bars. →
          </Link>
          <Link href="/unete">Únete al Colab</Link>
        </div>
      </div>
    </div>
  )
}
