import type { Metadata } from "next"
import Link from "next/link"
import { manifiesto } from "@/lib/manifiesto"

export const metadata: Metadata = {
  title: "Manifiesto · Cacao Colab .org",
  description: manifiesto.lede,
}

export default function ManifiestoPage() {
  return (
    <div className="manifiesto-page">
      <header className="manifiesto-hero">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
          <p className="eyebrow text-colab-yellow">{manifiesto.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-colab-cream leading-[0.95] mt-4">
            {manifiesto.title}
          </h1>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-colab-cream/65 max-w-2xl">
            {manifiesto.lede}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#E8C9A0]/80 max-w-2xl">{manifiesto.whyOrg}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/unete/bio" className="amaury-cta amaury-cta--primary">
              {manifiesto.ctaBio}
            </Link>
            <Link href="/unete" className="amaury-cta amaury-cta--ghost">
              {manifiesto.ctaUnete}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-14">
        <ol className="manifiesto-list">
          {manifiesto.principles.map((item) => (
            <li key={item.kicker}>
              <span>{item.kicker}</span>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
        <blockquote className="manifiesto-pledge">{manifiesto.pledge}</blockquote>
        <div className="flex flex-wrap gap-3 mt-10">
          <Link href="/unete/bio" className="amaury-cta amaury-cta--primary">
            {manifiesto.ctaBio}
          </Link>
          <Link href="/nodo" className="amaury-cta amaury-cta--ghost">
            Ver red de nodos →
          </Link>
          <Link href="/legal/privacidad" className="amaury-cta amaury-cta--ghost">
            Privacidad →
          </Link>
        </div>
      </main>
    </div>
  )
}
