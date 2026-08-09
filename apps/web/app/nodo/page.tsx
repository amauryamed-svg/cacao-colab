import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { mapNodeBioRow } from "@/lib/nodo/map"
import { NODE_KIND_LABEL } from "@/lib/nodo/types"

export const metadata: Metadata = {
  title: "Red de nodos · Cacao Colab",
  description: "Bios públicas de fincas, marcas y aliados del cacao — red social interna del Colab.",
}

export const dynamic = "force-dynamic"

async function loadPublished() {
  try {
    const admin = createSupabaseAdminClient()
    const { data } = await admin
      .from("node_bios")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(60)
    return (data ?? []).map((row) => mapNodeBioRow(row as Parameters<typeof mapNodeBioRow>[0]))
  } catch {
    return []
  }
}

export default async function NodoIndexPage() {
  const nodes = await loadPublished()

  return (
    <div className="min-h-screen bg-[#100c09] text-colab-cream">
      <header className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <p className="eyebrow text-colab-yellow">Red social interna del cacao</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 leading-tight">
          Nodos del Colab
        </h1>
        <p className="mt-4 text-sm text-colab-cream/55 max-w-xl leading-relaxed">
          Cada bio es una puerta a la comunidad colectiva. Comparte tu enlace y conecta finca, marca y
          oficio.
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <Link href="/unete/bio" className="amaury-cta amaury-cta--primary">
            Crear mi bio de nodo →
          </Link>
          <Link href="/collaboratorio" className="amaury-cta amaury-cta--ghost">
            Ruta a página de producto →
          </Link>
          <Link href="/manifiesto" className="amaury-cta amaury-cta--ghost">
            Manifiesto .org →
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20">
        {nodes.length === 0 ? (
          <p className="text-sm text-colab-cream/45 py-16">
            Aún no hay nodos publicados (o falta aplicar la migración). Sé el primero:{" "}
            <Link href="/unete/bio" className="text-colab-yellow underline">
              crear bio →
            </Link>
          </p>
        ) : (
          <ul className="nodo-grid">
            {nodes.map((node) => (
              <li key={node.id}>
                <Link href={`/nodo/${node.slug}`} className="nodo-card">
                  <div className="nodo-card__media">
                    {node.productImageUrl ? (
                      <Image src={node.productImageUrl} alt={node.orgName} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="nodo-card__placeholder" />
                    )}
                  </div>
                  <div className="nodo-card__body">
                    <span>{NODE_KIND_LABEL[node.kind]}</span>
                    <strong>{node.orgName}</strong>
                    <p>{node.displayName}{node.city ? ` · ${node.city}` : ""}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
