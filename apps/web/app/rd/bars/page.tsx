import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import BarsPackagingViewer from "@/components/rd/BarsPackagingViewer"
import {
  BARS_PRODUCT_PATH,
  barsPackaging,
  barsProductPage,
} from "@/lib/bars-colab-product"

export const metadata: Metadata = {
  title: barsProductPage.title,
  description: barsProductPage.description,
  openGraph: {
    title: "Bars. · Output R&D Cacao Colab",
    description: barsProductPage.description,
    url: `https://cacaocolab.org${BARS_PRODUCT_PATH}`,
    images: [{ url: barsPackaging.assets.packshot }],
  },
}

export default function BarsColabProductPage() {
  return (
    <div className="bars-product">
      <header className="bars-product-hero">
        <div className="bars-product-hero-inner">
          <Link href="/rd" className="eyebrow text-white/40 hover:text-[#F05A28]">
            ← R&D Colab
          </Link>
          <p className="eyebrow text-[#F05A28] mt-5">{barsProductPage.heroEyebrow}</p>
          <div className="bars-product-hero-grid">
            <div>
              <p className="bars-product-house">{barsPackaging.house}</p>
              <h1>
                {barsProductPage.heroTitle}
                <span>{barsProductPage.heroSub}</span>
              </h1>
              <p className="bars-product-lede">{barsProductPage.heroLede}</p>
              <div className="bars-product-ctas">
                <TrackedLink
                  href={barsProductPage.preorderWhatsapp}
                  event="benevolo_interest"
                  targetName="bars-preorder"
                  source="rd-bars-hero"
                  external
                  className="bars-cta-primary"
                >
                  Preordenar Bars. →
                </TrackedLink>
                <Link href="/campus/benevolo" className="bars-cta-ghost">
                  Track aceleración →
                </Link>
                <Link href="/aprende/cacaotier" className="bars-cta-ghost">
                  Campus cacaotier →
                </Link>
              </div>
            </div>
            <BarsPackagingViewer />
          </div>
        </div>
      </header>

      <main className="bars-product-main">
        <section className="bars-claims">
          {barsProductPage.claims.map((claim) => (
            <article key={claim.label}>
              <span>{claim.label}</span>
              <strong>{claim.value}</strong>
            </article>
          ))}
        </section>

        <section className="bars-story">
          <div>
            <p className="eyebrow text-[#F05A28]">Por qué no Benevolo.co</p>
            <h2>
              Producto Colab,
              <br />
              no micrositio paralelo.
            </h2>
            <p>
              Bars. es el output tangible de la aceleración Dualita: origen FEAR 5 (Quara), oficio
              Zurych y marca nativa <em>cacaotier</em> dentro de Cacao Colab. La casa canónica es{" "}
              <strong>cacaocolab.org/rd/bars</strong> — campaña, preventa y empaque viven aquí, junto
              al laboratorio R&D.
            </p>
          </div>
          <ul className="bars-formula">
            <li>
              <span>Cacao</span>
              <strong>FEAR 5 · Quara / Arauca</strong>
            </li>
            <li>
              <span>Categoría</span>
              <strong>Duja de Marañón sugar free</strong>
            </li>
            <li>
              <span>Formato</span>
              <strong>Bars. · 80 g</strong>
            </li>
            <li>
              <span>Dulzor</span>
              <strong>Alulosa + stevia</strong>
            </li>
          </ul>
        </section>

        <section className="bars-pillars">
          <p className="eyebrow text-[#E8C9A0]">Ruta de aceleración</p>
          <h2>Del campus a la barra</h2>
          <div className="bars-pillars-grid">
            {barsProductPage.pillars.map((pillar) => (
              <article key={pillar.n}>
                <span>{pillar.n}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
                <Link href={pillar.href}>{pillar.cta}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bars-print">
          <div>
            <p className="eyebrow text-[#F05A28]">Impresión · campaña</p>
            <h2>Empaque en capas SVG</h2>
            <p>
              Frente y dorso en vectores editables (180×95 mm): patrón, tipografía, sello FEAR 5,
              ingredientes y comunicación de marca Colab. Descarga los SVG, activa las guías de
              bleed y sustituye el QR placeholder por el real a esta página.
            </p>
            <div className="bars-product-ctas">
              <a href={barsPackaging.assets.frontSvg} download className="bars-cta-primary">
                Frente SVG →
              </a>
              <a href={barsPackaging.assets.backSvg} download className="bars-cta-ghost">
                Dorso SVG →
              </a>
              <a href="/benevolo/packaging/README.md" className="bars-cta-ghost">
                Notas de print →
              </a>
            </div>
          </div>
          <div className="bars-print-meta">
            <p>
              <strong>Artboard</strong> {barsPackaging.artboardMm.width}×
              {barsPackaging.artboardMm.height} mm · bleed {barsPackaging.artboardMm.bleed} mm
            </p>
            <p>
              <strong>Naranja</strong> {barsPackaging.colors.orange}
            </p>
            <p>
              <strong>Navy</strong> {barsPackaging.colors.navy}
            </p>
            <p>
              <strong>SKU</strong> {barsPackaging.sku}
            </p>
          </div>
        </section>

        <section className="bars-ready-grid">
          <div>
            <p className="eyebrow text-[#E8C9A0]">Listo para campaña</p>
            <ul>
              {barsProductPage.whatIsReady.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="muted">
            <p className="eyebrow text-white/35">Aún no afirmamos</p>
            <ul>
              {barsProductPage.whatIsNotReady.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bars-close">
          <h2>Preordena el primer lote real</h2>
          <p>Sin stock inventado. Ayúdanos a dimensionar Bars. desde el Colab.</p>
          <TrackedLink
            href={barsProductPage.preorderWhatsapp}
            event="benevolo_interest"
            targetName="bars-preorder"
            source="rd-bars-close"
            external
            className="bars-cta-primary"
          >
            WhatsApp · preordenar →
          </TrackedLink>
        </section>
      </main>
    </div>
  )
}
