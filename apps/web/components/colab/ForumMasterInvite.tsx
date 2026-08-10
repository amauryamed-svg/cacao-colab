import Image from "next/image"
import Link from "next/link"
import {
  forumGradeLabel,
  forumMasterOgThumb,
  masterInviteFor,
  type MasterInviteMeta,
} from "@/lib/colab-foro"

type Props = {
  courseSlug: string
  authorName: string
  grade?: string | null
  /** compact = preview en composer */
  compact?: boolean
}

export default function ForumMasterInvite({
  courseSlug,
  authorName,
  grade,
  compact = false,
}: Props) {
  const invite = masterInviteFor(courseSlug)
  if (!invite) return null

  const og = forumMasterOgThumb({ authorName, courseSlug, grade })
  const gradeText = forumGradeLabel(grade)

  return (
    <aside
      className={`forum-master-invite${compact ? " is-compact" : ""}`}
      style={{ ["--invite-accent" as string]: invite.accent }}
    >
      <div className="forum-master-invite-media">
        {og ? (
          // OG diploma dinámico — atrae a certificar
          // eslint-disable-next-line @next/next/no-img-element
          <img src={og} alt="" className="forum-master-invite-og" />
        ) : (
          <Image
            src={invite.poster}
            alt=""
            fill
            className="forum-master-invite-poster"
            sizes="(max-width: 768px) 100vw, 520px"
          />
        )}
        <span className="forum-master-invite-pack">{invite.packLabel}</span>
      </div>

      <div className="forum-master-invite-copy">
        <p className="forum-master-invite-kicker">Invitación Dualita · Master</p>
        <h4>{invite.label}</h4>
        <p className="forum-master-invite-grade">{gradeText}</p>
        <p className="forum-master-invite-blurb">{invite.dualitaLine}</p>
        <p className="forum-master-invite-body">{invite.blurb}</p>
        {!compact && (
          <div className="forum-master-invite-actions">
            <Link href={invite.campusHref} className="forum-master-invite-cta">
              Empezar este Master →
            </Link>
            <Link href={invite.inviteHref} className="forum-master-invite-ghost">
              Ver programa
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}

/** Banda de Masters para el feed vacío / header. */
export function ForumMasterRail({ masters }: { masters: MasterInviteMeta[] }) {
  return (
    <div className="forum-master-rail" aria-label="Masters del Colab">
      <p className="forum-master-rail-label">Certifícate con Dualita</p>
      <ul>
        {masters.map((m) => (
          <li key={m.slug}>
            <Link href={m.campusHref}>
              <span className="forum-master-rail-thumb">
                <Image src={m.poster} alt="" width={72} height={72} />
              </span>
              <span>
                <strong>{m.shortLabel}</strong>
                <em>{m.dualitaLine}</em>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
