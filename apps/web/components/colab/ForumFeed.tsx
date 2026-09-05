"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toggleForumReaction, type ForumFeedItem } from "@/app/colab/actions"
import ForumMasterInvite, { ForumMasterRail } from "@/components/colab/ForumMasterInvite"
import {
  FORUM_EMOJIS,
  FORUM_KIND_LABEL,
  MASTER_INVITES,
  type ForumEmoji,
  type ForumPostKind,
} from "@/lib/colab-foro"

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso))
  } catch {
    return iso.slice(0, 10)
  }
}

const RAIL_MASTERS = [
  MASTER_INVITES["arquitecto-fermentacion"],
  MASTER_INVITES["maestro-chocolatier"],
  MASTER_INVITES["catador-cacao"],
]

const FILTERS: { id: "all" | ForumPostKind; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "progress", label: "Maestrías" },
  { id: "sync", label: "Sincronicidades" },
  { id: "announcement", label: "Anuncios" },
]

export default function ForumFeed({ items }: { items: ForumFeedItem[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [filter, setFilter] = useState<"all" | ForumPostKind>("all")

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.kind === filter)),
    [items, filter],
  )

  function react(postId: string, emoji: ForumEmoji) {
    if (pending) return
    startTransition(async () => {
      await toggleForumReaction(postId, emoji)
      router.refresh()
    })
  }

  return (
    <div className="colab-forum-feed-wrap">
      <ForumMasterRail masters={RAIL_MASTERS} />

      <div className="colab-forum-filters" role="tablist" aria-label="Filtrar foro">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={filter === f.id ? "active" : undefined}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="colab-forum-empty">
          <p>
            {items.length === 0
              ? "Aún no hay publicaciones. Sé el primero en compartir un avance de herencia u oficio."
              : "No hay publicaciones en este filtro."}
          </p>
        </div>
      ) : (
        <ul className="colab-forum-feed">
          {visible.map((item) => (
            <li key={item.id} className={`colab-forum-card kind-${item.kind}`}>
              <header>
                <span className="colab-forum-kind">{FORUM_KIND_LABEL[item.kind]}</span>
                <time dateTime={item.createdAt}>{formatWhen(item.createdAt)}</time>
              </header>

              {item.kind === "progress" && item.courseSlug && (
                <ForumMasterInvite
                  courseSlug={item.courseSlug}
                  authorName={item.authorName}
                  grade={item.grade}
                />
              )}

              <h3>{item.title}</h3>
              <p className="colab-forum-author">{item.authorName}</p>
              <p className="colab-forum-body">{item.body}</p>
              <div className="colab-forum-reacts" role="group" aria-label="Reacciones cacao">
                {FORUM_EMOJIS.map((emoji) => {
                  const count = item.reactions[emoji] ?? 0
                  const mine = item.mine.includes(emoji)
                  return (
                    <button
                      key={emoji}
                      type="button"
                      className={mine ? "mine" : undefined}
                      disabled={pending}
                      onClick={() => react(item.id, emoji)}
                    >
                      {emoji}
                      {count > 0 && <em>{count}</em>}
                    </button>
                  )
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
