import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DiplomaShareBar from "@/components/campus/DiplomaShareBar"
import { decodeDiploma, gradeLabel } from "@/lib/campus-rigor"
import { diplomaAbsoluteUrl, diplomaOgImageUrl } from "@/lib/diploma-og"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial · Cacao Colab" }
  const absolute = diplomaAbsoluteUrl(`/credencial/maestro-chocolatier/${code}`)
  const og = diplomaOgImageUrl(diploma)
  return {
    title: `${diploma.name} · ${gradeLabel(diploma.grade)} · Master Chocolatier`,
    description: `Diploma digital Cacao Colab — ${diploma.title}. Edutainment con rigor Fine-Flavor.`,
    openGraph: {
      title: `${diploma.name} · Master Chocolatier`,
      description: gradeLabel(diploma.grade),
      url: absolute,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${diploma.name} · Master Chocolatier`,
      description: gradeLabel(diploma.grade),
      images: [og],
    },
  }
}

export default async function ChocolatierDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== "maestro-chocolatier") notFound()

  const absolute = diplomaAbsoluteUrl(`/credencial/maestro-chocolatier/${code}`)
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
          Completó la ruta Master Chocolatier (barra 70 % · lente CoEx / Chocolate Awards) con
          criterio de especialidad: tipicidad, vidas, rachas y puesta en escena del cacao. No es una
          medalla oficial — es credencial de oficio y colectivo.
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
          courseSlug="maestro-chocolatier"
          gradeLabelText={gLabel}
          shareText={`${diploma.name} · Master Chocolatier · ${gLabel} · Cacao Colab`}
          courseHref="/aprende/chocolatier"
          secondaryHref="/unete"
          secondaryLabel="Únete al Colab →"
        />
        <p className="diploma-footnote">
          Edutainment cacao · verificar siempre en cacaocolab.org · lente CoEx ≠ premio CoEx
        </p>
      </div>
    </div>
  )
}
