import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DiplomaShareBar from "@/components/campus/DiplomaShareBar"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { decodeDiploma, gradeLabel } from "@/lib/campus-rigor"
import { diplomaAbsoluteUrl, diplomaOgImageUrl } from "@/lib/diploma-og"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial · Arquitecto de Fermentación" }
  const absolute = diplomaAbsoluteUrl(`/credencial/arquitecto-fermentacion/${code}`)
  const og = diplomaOgImageUrl(diploma)
  return {
    title: `${diploma.name} · ${gradeLabel(diploma.grade)} · Master Cacaotier`,
    description: `Diploma digital Cacao Colab — ${diploma.title}. Rigor técnico + edutainment.`,
    openGraph: {
      title: `${diploma.name} · Arquitecto de Fermentación`,
      description: gradeLabel(diploma.grade),
      url: absolute,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${diploma.name} · Arquitecto de Fermentación`,
      description: gradeLabel(diploma.grade),
      images: [og],
    },
  }
}

export default async function ArchitectDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== ARCHITECT_COURSE_SLUG) notFound()

  const absolute = diplomaAbsoluteUrl(`/credencial/arquitecto-fermentacion/${code}`)
  const issued = new Date(diploma.issuedAt).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const gLabel = gradeLabel(diploma.grade)

  return (
    <div className="diploma-page">
      <div className="diploma-card">
        <p className="diploma-eyebrow">Cacao Colab · diploma digital</p>
        <h1 className="diploma-brand">cacaotier</h1>
        <p className="diploma-course">{diploma.title}</p>
        <p className="diploma-certifies">Certifica que</p>
        <h2 className="diploma-name">{diploma.name}</h2>
        <p className="diploma-grade">{gLabel}</p>
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
        <DiplomaShareBar
          diplomaUrl={absolute}
          courseSlug={ARCHITECT_COURSE_SLUG}
          gradeLabelText={gLabel}
          shareText={`${diploma.name} · Arquitecto de Fermentación · ${gLabel} · Cacao Colab`}
          courseHref="/campus/arquitecto-fermentacion"
          secondaryHref="/cuenta"
          secondaryLabel="Mi cuenta →"
        />
        <p className="diploma-footnote">
          Edutainment cacao · verificar en cacaocolab.org · evidencia de lote sigue en tu bitácora
        </p>
      </div>
    </div>
  )
}
