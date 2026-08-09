import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import DiplomaLinkedInShare from "@/components/campus/DiplomaLinkedInShare"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { decodeDiploma, gradeLabel, xShareUrl } from "@/lib/campus-rigor"
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
  const meta = diplomaShareMeta(diploma, pagePath)
  const issued = new Date(diploma.issuedAt).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="diploma-page">
      <div className="diploma-card">
        <p className="diploma-eyebrow">Cacao Colab · diploma digital</p>
        <h1 className="diploma-brand">cacaotier</h1>
        <p className="diploma-course">{diploma.title}</p>
        <p className="diploma-certifies">Certifica que</p>
        <h2 className="diploma-name">{diploma.name}</h2>
        <p className="diploma-grade">{gradeLabel(diploma.grade)}</p>
        <p className="diploma-lede">
          Completó la ruta Master Cacaotier (Arquitecto de Fermentación): seis misiones de criterio
          trazable, vidas, rachas y retos al primer intento. Exigente y divertido — no reemplaza un
          laboratorio acreditado; sí acredita oficio y método.
        </p>
        <dl className="diploma-meta">
          <div>
            <dt>XP</dt>
            <dd>{diploma.xp}</dd>
          </div>
          <div>
            <dt>1er intento</dt>
            <dd>
              {diploma.firstTry}/{diploma.total}
            </dd>
          </div>
          <div>
            <dt>Racha</dt>
            <dd>{diploma.streak}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{issued}</dd>
          </div>
        </dl>

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
          <Link href="/cuenta" className="diploma-colab">
            Mi cuenta →
          </Link>
          <Link href="/campus/arquitecto-fermentacion">Certifícate tú también →</Link>
        </div>
        <p className="diploma-footnote">
          Edutainment cacao · verificar en cacaocolab.org · evidencia de lote sigue en tu bitácora
        </p>
      </div>
    </div>
  )
}
