import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import ForumComposer from "@/components/colab/ForumComposer"
import ForumFeed from "@/components/colab/ForumFeed"
import { ensureForumSeed, loadForumFeed } from "./actions"

export const metadata: Metadata = {
  title: "Foro Colab · diplomas y avances",
  description:
    "Foro interno de Cacao Colab: exhibe diplomas digitales, avances de maestría y sincronicidades con likes 🍫.",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function ColabForumPage({
  searchParams,
}: {
  searchParams: Promise<{ share?: string; grade?: string; diploma?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/colab")

  const query = await searchParams
  await ensureForumSeed()
  const feed = await loadForumFeed()

  return (
    <div className="colab-forum">
      <div className="colab-forum-inner">
        <Link href="/cuenta" className="eyebrow text-colab-cream/40 hover:text-colab-yellow">
          ← Mi cuenta
        </Link>
        <header className="colab-forum-hero">
          <p className="eyebrow text-colab-yellow">Red interna · foro</p>
          <h1>
            Diplomas y <em>sincronicidades</em>
          </h1>
          <p>
            Exhibe tu diploma digital con el diseño de credencial, celebra avances y reacciona con
            🍫. Aquí el rigor se ve — no medallas inventadas.
          </p>
        </header>

        <div className="colab-forum-grid">
          <ForumComposer
            presetShare={query.share ?? null}
            presetGrade={query.grade ?? null}
            presetDiploma={query.diploma ?? null}
          />
          <ForumFeed items={feed} />
        </div>
      </div>
    </div>
  )
}
