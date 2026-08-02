import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DiplomaShareBar from "@/components/campus/DiplomaShareBar"
import { decodeDiploma, gradeLabel } from "@/lib/campus-rigor"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { diplomaAbsoluteUrl, diplomaOgImageUrl } from "@/lib/diploma-og"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial · Cacao Colab" }
  const absolute = diplomaAbsoluteUrl(`/credencial/catador-cacao/${code}`)
  const og = diplomaOgImageUrl(diploma)
  return {
    title: `${diploma.name} · ${gradeLabel(diploma.grade)} · Master Catador`,
    description: `Diploma digital Cacao Colab — ${diploma.title}. Catación Fine-Flavor con lente CoEx.`,
    openGraph: {
      title: `${diploma.name} · Master Catador`,
      description: gradeLabel(diploma.grade),
      url: absolute,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${diploma.name} · Master Catador`,
      description: gradeLabel(diploma.grade),
      images: [og],
    },
  }
}

export default async function CatadorDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== CATADOR_COURSE_SLUG) notFound()

  const absolute = diplomaAbsoluteUrl(`/credencial/catador-cacao/${code}`)
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
          Completó Master Catador de Cacao: panel ciego, Rueda Fine-Flavor Colab, defectos no
          negociables y tipicidad defendible con lente CoEx / puente Callebaut. No es medalla oficial
          — es credencial de oficio sensorial.
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
          courseSlug={CATADOR_COURSE_SLUG}
          gradeLabelText={gLabel}
          shareText={`${diploma.name} · Master Catador · ${gLabel} · Cacao Colab`}
          courseHref="/aprende/catador"
          secondaryHref="/rd/set-catacion"
          secondaryLabel="Set Catación 10 →"
        />
        <p className="diploma-footnote">
          Edutainment cacao · cacaocolab.org · lente CoEx ≠ premio CoEx
        </p>
      </div>
    </div>
  )
}
