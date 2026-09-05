import Link from "next/link"
import type { MasterAccess } from "@/lib/campus-access"
import { masterAccessCopy } from "@/lib/campus-access"
import { MasterShopifyCheckout } from "@/components/commerce/MasterShopifyCheckout"

type Props = {
  title: string
  access: MasterAccess
  courseSlug?: string
}

/** Pantalla cuando el Master aún no está abierto por rango — con checkout Shopify. */
export default function MasterAccessGate({ title, access, courseSlug }: Props) {
  return (
    <div className="min-h-screen bg-[#101d0b] text-colab-cream px-4 py-16">
      <main className="max-w-xl mx-auto">
        <p className="eyebrow text-colab-yellow">Master · rango o checkout</p>
        <h1 className="font-serif text-4xl font-black mt-3">{title}</h1>
        <p className="mt-4 text-colab-cream/70 leading-relaxed">{masterAccessCopy.principle}</p>
        <div className="mt-8 rounded-2xl border border-colab-yellow/25 bg-colab-yellow/10 p-5">
          <p className="text-sm font-bold text-colab-yellow">Aún no disponible por rango</p>
          <p className="mt-2 text-sm text-colab-cream/80 leading-relaxed">{access.message}</p>
          <p className="mt-3 text-xs text-colab-cream/45">
            Tu rango hoy: {access.currentRankName} · {access.lifetimeMd.toLocaleString("es-CO")} MD
            históricas
          </p>
        </div>
        {courseSlug && (
          <div className="mt-6">
            <MasterShopifyCheckout courseSlug={courseSlug} />
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          {masterAccessCopy.earnCtas.map((cta) => (
            <Link
              key={cta.href + cta.label}
              href={cta.href}
              className="rounded-full bg-colab-yellow px-5 py-2.5 text-sm font-bold text-colab-forest"
            >
              {cta.label} →
            </Link>
          ))}
          <Link
            href="/cuenta/mazorcas"
            className="rounded-full border border-colab-cream/25 px-5 py-2.5 text-sm font-bold text-colab-cream"
          >
            Ver wallet →
          </Link>
          <Link
            href="/shop#masters"
            className="rounded-full border border-colab-cream/25 px-5 py-2.5 text-sm font-bold text-colab-cream"
          >
            Tienda Masters →
          </Link>
        </div>
      </main>
    </div>
  )
}
