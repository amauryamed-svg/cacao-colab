import Link from "next/link"
import { linkedInShareUrl, xShareUrl } from "@/lib/campus-rigor"
import { muroShareHref } from "@/lib/colab-foro"

/** CTAs compartibles: muro Colab + LinkedIn + X. */
export default function DiplomaShareBar({
  diplomaUrl,
  courseSlug,
  gradeLabelText,
  shareText,
  courseHref,
  courseLabel = "Ver el curso",
  secondaryHref,
  secondaryLabel,
}: {
  diplomaUrl: string
  courseSlug: string
  gradeLabelText: string
  shareText: string
  courseHref?: string
  courseLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  const muroHref = muroShareHref({
    courseSlug,
    gradeLabel: gradeLabelText,
    diplomaCode: diplomaUrl.split("/").pop() ?? null,
  })

  return (
    <div className="diploma-actions">
      <Link href={muroHref} className="diploma-muro">
        Publicar en el muro →
      </Link>
      <a
        href={linkedInShareUrl(diplomaUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="diploma-li"
      >
        LinkedIn →
      </a>
      <a
        href={xShareUrl(diplomaUrl, shareText)}
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
  )
}
