import type { Metadata } from "next"
import Link from "next/link"
import { plannedBenefits, communityRanks } from "@/lib/loyalty"
import DualitaLoyaltyGuide from "@/components/edutainment/DualitaLoyaltyGuide"

export const metadata: Metadata = {
  title: "Beneficios · Mazorcas Doradas",
  description: "Catálogo transparente de beneficios planeados y activos del programa Mazorcas Doradas.",
}

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-colab-cream">
      <header className="benefits-hero">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <p className="eyebrow text-colab-yellow">Edutainment + fidelidad</p>
          <h1>Lo que cultivas<br /><em>vuelve a la comunidad.</em></h1>
          <p>
            Mazorcas Doradas conecta aprendizaje, cuidado y beneficios. Cada tarjeta indica si el canje está activo,
            planeado o depende de una integración de marca.
          </p>
          <Link href="/cuenta/mazorcas">Abrir mi wallet →</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <DualitaLoyaltyGuide />

        <div className="flex items-end justify-between gap-6 mt-14 mb-6">
          <div><p className="eyebrow text-colab-green">Catálogo beta</p><h2 className="font-serif text-4xl font-black text-colab-forest mt-2">Beneficios por cultivar</h2></div>
          <p className="text-xs text-colab-forest/45 max-w-sm">Las marcas conservan control sobre términos, inventario y cumplimiento.</p>
        </div>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plannedBenefits.map((benefit) => (
            <article key={benefit.brandKey} className="benefit-card">
              <div className="flex items-center justify-between">
                <span className="benefit-brand">{benefit.brand}</span>
                <span className="benefit-status">Planeado</span>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <dl>
                <div><dt>Costo previsto</dt><dd>{benefit.cost} MD</dd></div>
                <div><dt>Rango</dt><dd>{benefit.rank}</dd></div>
                <div><dt>Integración</dt><dd>{benefit.connector}</dd></div>
              </dl>
              <button type="button" disabled>Canje aún no disponible</button>
            </article>
          ))}
        </section>

        <section className="mt-16">
          <p className="eyebrow text-colab-green">Escala comunitaria</p>
          <div className="community-rank-grid mt-5">
            {communityRanks.map((rank) => (
              <article key={rank.slug}><span>{rank.icon}</span><h3>{rank.name}</h3><strong>{rank.threshold} MD</strong><p>{rank.benefit}</p></article>
            ))}
          </div>
        </section>

        <section className="anti-pyramid-note mt-16">
          <strong>Cacao crece por conocimiento, no por reclutamiento.</strong>
          <p>No hay bonos por invitar personas, árboles de referidos ni comisiones por nivel. Los rangos reconocen aprendizaje, cuidado, comunidad moderada y compras verificadas.</p>
        </section>
      </main>
    </div>
  )
}
