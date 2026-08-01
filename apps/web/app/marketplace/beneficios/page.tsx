import type { Metadata } from "next"
import Link from "next/link"
import { plannedBenefits, communityRanks } from "@/lib/loyalty"
import { listBenefitCatalog } from "@/lib/loyalty-server"
import DualitaLoyaltyGuide from "@/components/edutainment/DualitaLoyaltyGuide"
import RedeemBenefitButton from "@/components/loyalty/RedeemBenefitButton"

export const metadata: Metadata = {
  title: "Beneficios · Mazorcas Doradas",
  description: "Catálogo transparente de beneficios, cursos y aceleraciones canjeables con Mazorcas Doradas.",
}

export const dynamic = "force-dynamic"

const statusLabels: Record<string, string> = {
  planned: "Planeado",
  active: "Activo",
  paused: "En pausa",
  retired: "Retirado",
}

export default async function BenefitsPage() {
  const catalog = await listBenefitCatalog()
  const benefits = catalog ?? plannedBenefits.map((benefit) => ({
    id: null as string | null,
    brandKey: benefit.brandKey,
    brand: benefit.brand,
    slug: benefit.title.toLowerCase().replace(/\s+/g, "-"),
    title: benefit.title,
    description: benefit.description,
    cost: benefit.cost,
    rank: benefit.rank,
    minRankSlug: null as string | null,
    status: benefit.status,
    connector: benefit.connector,
    connectorActive: benefit.status === "active" && benefit.connector === "Colab nativo",
    fulfillmentType: benefit.connector === "Colab nativo" ? "colab_digital" : "external_handoff",
    terms: "Catálogo declarado en código mientras la base de datos de fidelidad no está migrada.",
  }))
  const liveCatalog = catalog !== null

  return (
    <div className="min-h-screen bg-colab-cream">
      <header className="benefits-hero">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <p className="eyebrow text-colab-yellow">Economía MD · cursos y aceleraciones</p>
          <h1>Lo que cultivas<br /><em>vuelve a la comunidad.</em></h1>
          <p>
            Canjea Mazorcas Doradas por servicios digitales del Colab (aceleraciones, previews, mentoría).
            Las marcas externas siguen planeadas hasta acuerdo y conector activo. Sin multinivel: solo
            actividad propia y saldo.
          </p>
          <div className="benefits-hero-actions">
            <Link href="/cuenta/mazorcas">Abrir mi wallet →</Link>
            <Link href="/cuenta/mazorcas#scorecard" className="benefits-hero-secondary">
              Ver scorecard →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <DualitaLoyaltyGuide />

        <div className="flex items-end justify-between gap-6 mt-14 mb-6">
          <div>
            <p className="eyebrow text-colab-green">Catálogo</p>
            <h2 className="font-serif text-4xl font-black text-colab-forest mt-2">Beneficios por cultivar</h2>
          </div>
          <p className="text-xs text-colab-forest/45 max-w-sm">
            {liveCatalog
              ? "Estado leído del catálogo real. Los sinks Colab digitales activos se pueden canjear con saldo y rango."
              : "Catálogo declarado en código: aplica migraciones de fidelidad + economía MD para canje real."}
          </p>
        </div>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit) => {
            const redeemable =
              benefit.status === "active" &&
              (benefit.connectorActive || benefit.fulfillmentType === "colab_digital")
            return (
              <article key={`${benefit.brandKey}-${benefit.slug || benefit.title}`} className="benefit-card">
                <div className="flex items-center justify-between">
                  <span className="benefit-brand">{benefit.brand}</span>
                  <span className="benefit-status">{statusLabels[benefit.status] ?? benefit.status}</span>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <dl>
                  <div><dt>Costo</dt><dd>{benefit.cost} MD</dd></div>
                  <div><dt>Rango</dt><dd>{benefit.rank}</dd></div>
                  <div><dt>Integración</dt><dd>{benefit.connector}</dd></div>
                  <div><dt>Conector</dt><dd>{benefit.connectorActive ? "Activo" : "Inactivo"}</dd></div>
                </dl>
                <p className="benefit-terms">{benefit.terms}</p>
                <RedeemBenefitButton
                  catalogItemId={benefit.id}
                  redeemable={redeemable}
                  cost={benefit.cost}
                  title={benefit.title}
                />
              </article>
            )
          })}
        </section>

        <section className="mt-16">
          <p className="eyebrow text-colab-green">Escala comunitaria</p>
          <div className="community-rank-grid mt-5">
            {communityRanks.map((rank) => (
              <article key={rank.slug}>
                <span>{rank.icon}</span>
                <h3>{rank.name}</h3>
                <strong>{rank.threshold} MD</strong>
                <p>{rank.benefit}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="anti-pyramid-note mt-16">
          <strong>Cacao crece por conocimiento, no por reclutamiento.</strong>
          <p>
            No hay bonos por invitar personas, árboles de referidos ni comisiones por nivel. Los rangos
            reconocen aprendizaje, cuidado, comunidad moderada y compras verificadas. El XP apalanca el
            scorecard de productividad; no se vende ni se cambia 1:1 por MD.
          </p>
        </section>
      </main>
    </div>
  )
}
