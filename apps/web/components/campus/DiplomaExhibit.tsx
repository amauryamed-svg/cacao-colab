import Link from "next/link"
import {
  gradeLabel,
  linkedInShareUrl,
  xShareUrl,
  type DiplomaPayload,
} from "@/lib/campus-rigor"

type MetaItem = { label: string; value: string }

export default function DiplomaExhibit({
  diploma,
  absoluteUrl,
  brand = "cacaotier",
  lede,
  footnote,
  courseHref,
  courseLabel = "Ver el curso",
  secondaryHref,
  secondaryLabel,
  variant = "default",
}: {
  diploma: DiplomaPayload
  absoluteUrl: string
  brand?: string
  lede: string
  footnote: string
  courseHref?: string
  courseLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  variant?: "default" | "benevolo"
}) {
  const gLabel = gradeLabel(diploma.grade)
  const issued = new Date(diploma.issuedAt).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const shareText = `${diploma.name} · ${diploma.title} · ${gLabel} · Cacao Colab`
  const meta: MetaItem[] = [
    { label: "XP", value: String(diploma.xp) },
    { label: "1er intento", value: `${diploma.firstTry}/${diploma.total}` },
    { label: "Racha", value: String(diploma.streak) },
    { label: "Fecha", value: issued },
  ]

  return (
    <div className={`diploma-page${variant === "benevolo" ? " is-benevolo" : ""}`}>
      <div className="diploma-atmosphere" aria-hidden />
      <article className="diploma-exhibit" aria-label="Diploma digital de exhibición">
        <div className="diploma-exhibit-frame">
          <header className="diploma-exhibit-top">
            <p className="diploma-eyebrow">Cacao Colab · diploma digital verificable</p>
            <p className="diploma-brand">{brand}</p>
            <p className="diploma-course">{diploma.title}</p>
          </header>

          <div className="diploma-exhibit-seal" aria-hidden>
            <span>◈</span>
            <em>Oficio</em>
          </div>

          <div className="diploma-exhibit-body">
            <p className="diploma-certifies">Certifica que</p>
            <h1 className="diploma-name">{diploma.name}</h1>
            <p className="diploma-grade">{gLabel}</p>
            <p className="diploma-lede">{lede}</p>
          </div>

          <dl className="diploma-meta">
            {meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <footer className="diploma-exhibit-foot">
            <p>Verificar en cacaocolab.org</p>
            <p className="diploma-exhibit-url">{absoluteUrl.replace(/^https?:\/\//, "")}</p>
          </footer>
        </div>
      </article>

      <div className="diploma-actions">
        <a
          href={linkedInShareUrl(absoluteUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="diploma-li"
        >
          Exhibir en LinkedIn →
        </a>
        <a
          href={xShareUrl(absoluteUrl, shareText)}
          target="_blank"
          rel="noopener noreferrer"
          className="diploma-x"
        >
          X / redes →
        </a>
        {secondaryHref && secondaryLabel && (
          <Link href={secondaryHref} className="diploma-colab">
            {secondaryLabel}
          </Link>
        )}
        {courseHref && <Link href={courseHref}>{courseLabel}</Link>}
      </div>
      <p className="diploma-footnote">{footnote}</p>
    </div>
  )
}
