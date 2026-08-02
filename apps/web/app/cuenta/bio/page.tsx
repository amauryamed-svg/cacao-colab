import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import NodeBioFlow from "@/components/nodo/NodeBioFlow"
import { loadCuentaHome } from "@/lib/cuenta/home"
import { NODE_KIND_LABEL } from "@/lib/nodo/types"
import { CANONICAL_SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Mi bio de nodo · Cuenta Colab",
  description: "Gestiona tu bio de finca, marca o aliado dentro de tu espacio personal en Cacao Colab.",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

const BIO_STATUS: Record<string, string> = {
  pending: "En revisión",
  published: "Publicada en el directorio",
  rejected: "Necesita ajustes",
}

export default async function CuentaBioPage({
  searchParams,
}: {
  searchParams: Promise<{ editar?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user?.email) redirect("/cuenta/entrar?next=/cuenta/bio")

  const query = await searchParams
  const home = await loadCuentaHome(
    user.id,
    user.email,
    typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : null,
  )
  const forceEdit = query.editar === "1" || !home.bio

  if (forceEdit) {
    return (
      <main className="onboard-page min-h-screen bg-colab-forest flex flex-col">
        <div className="w-full border-b border-white/8 py-4 px-6 flex items-center justify-between">
          <Link
            href="/cuenta"
            className="text-xs font-bold tracking-[3px] uppercase text-colab-cream/40 hover:text-colab-cream/70 transition-colors"
          >
            ← Mi cuenta
          </Link>
          <Link href="/nodo" className="text-xs font-bold tracking-[3px] uppercase text-colab-pod">
            Directorio
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16">
          <div className="w-full max-w-xl">
            <p className="eyebrow text-colab-yellow mb-4 text-center">Personalización · Mi cuenta</p>
            <NodeBioFlow
              presetEmail={user.email}
              presetName={home.bio?.displayName ?? home.displayName}
              presetOrg={home.bio?.orgName}
              presetCity={home.bio?.city ?? home.city ?? undefined}
              presetKind={home.bio?.kind}
              presetTerritory={home.bio?.territory}
              presetIntro={home.bio?.intro}
              presetAvatarUrl={home.bio?.avatarUrl}
              presetProductUrl={home.bio?.productImageUrl}
              presetProductCaption={home.bio?.productCaption}
              presetWhatsapp={home.bio?.whatsapp}
              presetInstagram={home.bio?.instagram}
              returnTo="/cuenta"
            />
          </div>
        </div>
      </main>
    )
  }

  const bio = home.bio!
  const shareUrl = `${CANONICAL_SITE_URL}/nodo/${bio.slug}`

  return (
    <div className="cuenta-hub">
      <div className="cuenta-hub-inner">
        <Link href="/cuenta" className="eyebrow text-colab-cream/40 hover:text-colab-yellow">
          ← Mi cuenta
        </Link>
        <header className="cuenta-hub-hero mt-6">
          <div>
            <p className="eyebrow text-colab-yellow">Bio de nodo</p>
            <h1>
              Tu presencia <em>en la red</em>
            </h1>
            <p className="cuenta-hub-meta">
              {BIO_STATUS[bio.status] ?? bio.status} · {NODE_KIND_LABEL[bio.kind]}
            </p>
          </div>
          <Link href="/cuenta/bio?editar=1" className="cuenta-btn-primary">
            Actualizar bio →
          </Link>
        </header>

        <article className="cuenta-bio-card cuenta-bio-card--solo">
          <div className="cuenta-bio-visual">
            {bio.avatarUrl ? (
              <Image src={bio.avatarUrl} alt="" width={120} height={120} className="cuenta-bio-avatar" unoptimized />
            ) : (
              <div className="cuenta-bio-avatar-fallback" aria-hidden>
                {bio.displayName.slice(0, 1)}
              </div>
            )}
            {bio.productImageUrl && (
              <Image
                src={bio.productImageUrl}
                alt=""
                width={200}
                height={120}
                className="cuenta-bio-product"
                unoptimized
              />
            )}
          </div>
          <div className="cuenta-bio-body">
            <h3>{bio.orgName}</h3>
            <p>
              {bio.displayName}
              {bio.city ? ` · ${bio.city}` : ""}
              {bio.territory ? ` · ${bio.territory}` : ""}
            </p>
            <p className="cuenta-bio-intro">{bio.intro}</p>
            {bio.productCaption && <p className="cuenta-bio-intro">{bio.productCaption}</p>}
            <dl className="cuenta-bio-dl">
              <div>
                <dt>Email</dt>
                <dd>{bio.email}</dd>
              </div>
              {bio.whatsapp && (
                <div>
                  <dt>WhatsApp</dt>
                  <dd>{bio.whatsapp}</dd>
                </div>
              )}
              {bio.instagram && (
                <div>
                  <dt>Instagram</dt>
                  <dd>{bio.instagram}</dd>
                </div>
              )}
            </dl>
            <div className="cuenta-bio-links">
              {bio.status === "published" && <Link href={`/nodo/${bio.slug}`}>Abrir perfil público →</Link>}
              <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                Copiar / abrir enlace →
              </a>
              <Link href="/cuenta/mazorcas">Ir a mi wallet →</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
