import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import ForumComposer from "@/components/colab/ForumComposer"
import ForumFeed from "@/components/colab/ForumFeed"
import { ensureForumSeed, loadForumFeed } from "./actions"

export const metadata: Metadata = {
  title: "Muro de la comunidad · Cacao Colab",
  description:
    "Muro interno de Cacao Colab: comparte diplomas digitales, avances de maestría y sincronicidades con likes 🍫.",
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
          <p className="eyebrow text-colab-yellow">Red interna · muro</p>
          <h1>
            Muro de la <em>comunidad</em>
          </h1>
          <p>
            Publica tu diploma digital, avances de maestría y sincronicidades. Aquí celebramos el
            rigor — no medallas inventadas.
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
