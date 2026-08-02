import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { mapNodeBioRow } from "@/lib/nodo/map"
import { NODE_KIND_LABEL } from "@/lib/nodo/types"
import { CANONICAL_SITE_URL } from "@/lib/site"

export const dynamic = "force-dynamic"

async function loadBio(slug: string) {
  try {
    const admin = createSupabaseAdminClient()
    const { data } = await admin.from("node_bios").select("*").eq("slug", slug).maybeSingle()
    if (!data) return null
    const bio = mapNodeBioRow(data as Parameters<typeof mapNodeBioRow>[0])
    if (bio.status !== "published") return null
    return bio
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const bio = await loadBio(slug)
  if (!bio) return { title: "Nodo Colab" }
  return {
    title: `${bio.orgName} · nodo Colab`,
    description: bio.intro.slice(0, 160),
    openGraph: {
      title: `${bio.orgName} · Cacao Colab`,
      description: bio.intro.slice(0, 160),
      url: `/nodo/${bio.slug}`,
      images: bio.productImageUrl ? [{ url: bio.productImageUrl }] : undefined,
    },
  }
}

export default async function NodoSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const bio = await loadBio(slug)
  if (!bio) notFound()

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const sessionEmail = user?.email?.trim().toLowerCase() ?? null
  const isOwner =
    Boolean(user) &&
    ((bio.profileId && bio.profileId === user!.id) ||
      (sessionEmail != null && bio.email.trim().toLowerCase() === sessionEmail))

  const shareUrl = `${CANONICAL_SITE_URL}/nodo/${bio.slug}`
  const waShare = `https://wa.me/?text=${encodeURIComponent(`Conoce mi nodo en Cacao Colab: ${shareUrl}`)}`

  return (
    <div className="nodo-profile bg-[#100c09] text-colab-cream min-h-screen">
      <header className="nodo-profile__hero">
        {bio.productImageUrl && (
          <Image src={bio.productImageUrl} alt={bio.productCaption ?? bio.orgName} fill className="nodo-profile__cover" unoptimized priority />
        )}
        <div className="nodo-profile__veil" />
        <div className="nodo-profile__content">
          <Link href="/nodo" className="eyebrow text-colab-cream/50 hover:text-colab-yellow">
            ← Red de nodos
          </Link>
          <p className="eyebrow text-colab-yellow mt-5">{NODE_KIND_LABEL[bio.kind]}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-black leading-[0.95] mt-3">{bio.orgName}</h1>
          <p className="mt-3 text-sm text-colab-cream/55">
            {bio.displayName}
            {bio.city ? ` · ${bio.city}` : ""}
            {bio.territory ? ` · ${bio.territory}` : ""}
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 grid md:grid-cols-[7rem_1fr] gap-8 items-start">
        <div className="nodo-profile__avatar">
          {bio.avatarUrl ? (
            <Image src={bio.avatarUrl} alt={bio.displayName} width={112} height={112} className="rounded-full object-cover" unoptimized />
          ) : (
            <div className="nodo-profile__avatar-fallback">{bio.displayName.slice(0, 1)}</div>
          )}
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">Intro</h2>
          <p className="mt-3 text-sm leading-relaxed text-colab-cream/70 whitespace-pre-wrap">{bio.intro}</p>
          {bio.productCaption && (
            <p className="mt-4 text-xs uppercase tracking-wider text-[#E8C9A0]/70">{bio.productCaption}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={waShare} target="_blank" rel="noopener noreferrer" className="amaury-cta amaury-cta--primary">
              Compartir nodo →
            </a>
            {bio.whatsapp && (
              <a
                href={`https://wa.me/${bio.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="amaury-cta amaury-cta--ghost"
              >
                WhatsApp
              </a>
            )}
            {bio.instagram && (
              <a
                href={`https://www.instagram.com/${bio.instagram.replace(/^@/, "")}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="amaury-cta amaury-cta--ghost"
              >
                @{bio.instagram.replace(/^@/, "")}
              </a>
            )}
            {isOwner ? (
              <Link href="/cuenta/bio" className="amaury-cta amaury-cta--ghost">
                Gestionar mi bio →
              </Link>
            ) : (
              <Link href="/cuenta/bio" className="amaury-cta amaury-cta--ghost">
                Crear mi bio →
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
