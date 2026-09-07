import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import { benevoloProduct } from "@/lib/knowledge-base"
import {
  BENEVOLO_SHOP_BRAND_HOST,
  benevoloCheckoutUrl,
  benevoloCollectionUrl,
  benevoloProductUrl,
  benevoloShopifySku,
} from "@/lib/shopify-colab"

type Props = {
  source: string
  compact?: boolean
}

export function BenevoloShopifyCheckout({ source, compact = false }: Props) {
  const checkout = benevoloCheckoutUrl()
  const productHref = benevoloProductUrl()
  const collectionHref = benevoloCollectionUrl()

  return (
    <article className={compact ? "benevolo-shopify-card compact" : "benevolo-shopify-card"}>
      <p className="eyebrow text-[#FF6A3D]">Shopify Colab · {BENEVOLO_SHOP_BRAND_HOST}</p>
      <h3>{benevoloShopifySku.title}</h3>
      <p>{benevoloShopifySku.blurb}</p>
      <p className="benevolo-shopify-price">
        <strong>{benevoloShopifySku.priceCopLabel}</strong>
        <span>Misma caja que cacao-colab.myshopify.com</span>
      </p>
      <div className="benevolo-shopify-actions">
        <TrackedLink
          href={productHref}
          event="benevolo_interest"
          targetName="benevolo-shopify-product"
          source={source}
          external
          className="benevolo-shopify-buy"
        >
          Preordenar en Shopify →
        </TrackedLink>
        <TrackedLink
          href={checkout.href}
          event="benevolo_interest"
          targetName="benevolo-shopify-cart"
          source={source}
          external
          className="benevolo-shopify-cart"
        >
          Agregar al carrito →
        </TrackedLink>
        <TrackedLink
          href={benevoloProduct.preorderWhatsapp}
          event="benevolo_interest"
          targetName="benevolo-preorder-wa"
          source={source}
          external
          className="benevolo-shopify-wa"
        >
          Confirmar lote por WhatsApp
        </TrackedLink>
      </div>
      {!compact && (
        <p className="benevolo-shopify-note">
          Preventa honesta: la ficha y el carrito viven en la tienda Colab. WhatsApp confirma el primer
          lote — no hay stock ni envío inmediato inventado. Colección{" "}
          <TrackedLink
            href={collectionHref}
            event="benevolo_interest"
            targetName="benevolo-shopify-collection"
            source={source}
            external
            className="underline decoration-white/25 underline-offset-4 hover:text-[#FF6A3D]"
          >
            /collections/bars-benevolo
          </TrackedLink>
          .{" "}
          <Link href="/campus/benevolo" className="underline decoration-white/25 underline-offset-4 hover:text-[#FF6A3D]">
            Track Dualita →
          </Link>
        </p>
      )}
    </article>
  )
}
