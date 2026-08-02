"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toggleForumReaction, type ForumFeedItem } from "@/app/colab/actions"
import { FORUM_EMOJIS, FORUM_KIND_LABEL, type ForumEmoji } from "@/lib/colab-foro"

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

export default function ForumFeed({ items }: { items: ForumFeedItem[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function react(postId: string, emoji: ForumEmoji) {
    if (pending) return
    startTransition(async () => {
      await toggleForumReaction(postId, emoji)
      router.refresh()
    })
  }

  if (items.length === 0) {
    return (
      <div className="colab-forum-empty">
        <p>Aún no hay publicaciones. Sé el primero en compartir un avance o una sincronicidad.</p>
      </div>
    )
  }

  return (
    <ul className="colab-forum-feed">
      {items.map((item) => (
        <li key={item.id} className={`colab-forum-card kind-${item.kind}`}>
          <header>
            <span className="colab-forum-kind">{FORUM_KIND_LABEL[item.kind]}</span>
            <time dateTime={item.createdAt}>{formatWhen(item.createdAt)}</time>
          </header>
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
                  className={mine ? "mine" : ""}
                  disabled={pending}
                  onClick={() => react(item.id, emoji)}
                  aria-pressed={mine}
                  title={emoji === "🍫" ? "Like chocolate" : `Reaccionar ${emoji}`}
                >
                  <span aria-hidden>{emoji}</span>
                  {count > 0 && <em>{count}</em>}
                </button>
              )
            })}
          </div>
        </li>
      ))}
    </ul>
  )
}
