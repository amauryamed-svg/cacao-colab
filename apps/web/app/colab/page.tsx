import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import ForumComposer from "@/components/colab/ForumComposer"
import ForumFeed from "@/components/colab/ForumFeed"
import { ensureForumSeed, loadForumFeed } from "./actions"

export const metadata: Metadata = {
  title: "Foro Colab · red de herencia y oficio",
  description:
    "Red social interna de Cacao Colab: avances de maestría, sincronicidades de finca y anuncios del colectivo.",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function ColabForumPage({
  searchParams,
}: {
  searchParams: Promise<{ share?: string; grade?: string }>
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
          <p className="eyebrow text-colab-yellow">Red interna · herencia viva</p>
          <h1>
            Foro del <em>Colab</em>
          </h1>
          <p>
            Comparte avances de maestría, sincronicidades de finca y lo que heredas del oficio.
            Aquí la generación nueva se ve — con rigor, no con medallas inventadas.
          </p>
          <div className="colab-forum-hero-links">
            <Link href="/aprende">Tres Masters →</Link>
            <Link href="/export">Cotizador FOB →</Link>
            <Link href="/shop#masters">Checkout Shopify →</Link>
          </div>
        </header>

        <div className="colab-forum-grid">
          <ForumComposer presetShare={query.share ?? null} presetGrade={query.grade ?? null} />
          <ForumFeed items={feed} />
        </div>
      </div>
    </div>
  )
}
