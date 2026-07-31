import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  decodeDiploma,
  gradeLabel,
  linkedInShareUrl,
} from "@/lib/campus-rigor"

type Props = { params: Promise<{ code: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma) return { title: "Credencial · Cacao Colab" }
  return {
    title: `${diploma.name} · ${gradeLabel(diploma.grade)} · Master Chocolatier`,
    description: `Diploma digital Cacao Colab — ${diploma.title}. Edutainment con rigor Fine-Flavor.`,
    openGraph: {
      title: `${diploma.name} · Master Chocolatier`,
      description: gradeLabel(diploma.grade),
    },
  }
}

export default async function ChocolatierDiplomaPage({ params }: Props) {
  const { code } = await params
  const diploma = decodeDiploma(code)
  if (!diploma || diploma.course !== "maestro-chocolatier") notFound()

  const pagePath = `/credencial/maestro-chocolatier/${code}`
  // Absolute URL for LinkedIn — prefer public site
  const absolute =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cacao-colab.vercel.app") + pagePath
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
        <div className="diploma-actions">
          <a
            href={linkedInShareUrl(absolute)}
            target="_blank"
            rel="noopener noreferrer"
            className="diploma-li"
          >
            Compartir en LinkedIn →
          </a>
          <Link href="/unete" className="diploma-colab">
            Únete al Colab →
          </Link>
          <Link href="/aprende/chocolatier">Ver el curso</Link>
        </div>
        <p className="diploma-footnote">
          Edutainment cacao · verificar siempre en cacao-colab.vercel.app · lente CoEx ≠ premio CoEx
        </p>
      </div>
    </div>
  )
}
