# Shopify Colab · cacao-colab.myshopify.com

> Tienda oficial Shopify de Cacao Colab. Una sola caja; dos dominios de vitrina.

## Dominios

| Campo | Valor |
|-------|--------|
| Storefront Colab | `https://cacao-colab.myshopify.com` |
| Dominio de marca Benevolo | `https://benevolo.shop` (misma tienda; default en Colab) |
| Colección Colab | `/collections/all` |
| Colección Bars. | `/collections/bars-benevolo` |
| Override host Colab | `NEXT_PUBLIC_COLAB_SHOPIFY_DOMAIN` |
| Override host Benevolo | `NEXT_PUBLIC_BENEVOLO_SHOP_DOMAIN` (vacío = `benevolo.shop`) |

El Colab enlaza Bars. a `benevolo.shop`. Los permalinks (`/products/bars-benevolo`, `/cart/{variantId}:1`) son los mismos que en `cacao-colab.myshopify.com`. Si el DNS aún no está Verified en Shopify, Connect domain + registros A/CNAME (abajo) o temporalmente `NEXT_PUBLIC_BENEVOLO_SHOP_DOMAIN=cacao-colab.myshopify.com`.

## Productos

- Masters digitales (`master-cacaotier`, `master-catador`, `master-chocolatier`)
- Bars. Benevolo (`bars-benevolo`, colección `bars-benevolo`)
- Coberturas + nibs + kits (ver `apps/web/lib/caua-shop.ts`)
- Set Catación 10 (`set-catacion-10`)

Variant IDs opcionales: `NEXT_PUBLIC_SHOPIFY_VARIANT_{CACAOTIER,CATADOR,CHOCOLATIER,BARS_BENEVOLO}`.

| SKU | Handle | Variant ID (storefront, sep 2026) |
|-----|--------|-----------------------------------|
| Bars. 80 g preventa | `bars-benevolo` | `51232297222396` |

Sin variant env en Masters se abre la ficha `/products/{handle}`. Bars. trae el variant público como fallback para el permalink de carrito.

## Hub Colab

- `/shop` — vitrina + Masters + **Bars. Benevolo** (`#benevolo`) + cross-sell nodos + FOB `/export`
- `/benevolo` — marca acelerada: CTA primario = `benevolo.shop/products/bars-benevolo`; WhatsApp confirma lote

## Benevolo.shop · conectar a la tienda Colab

`benevolo.shop` está registrado (GoDaddy). El Colab ya usa ese host por default. No es una tienda aparte: es un dominio extra de `cacao-colab.myshopify.com`. Hasta Connect + DNS, el apex puede seguir en parking (A `3.33.130.190` / `15.197.148.33`).

### En Shopify Admin (Amaury)

1. **Settings → Domains → Connect existing domain** → `benevolo.shop`
2. Dejar `cacao-colab.myshopify.com` como dominio del admin; `benevolo.shop` es adicional (no hace falta que sea primary)
3. Esperar **Verified**

### En GoDaddy DNS

Quitar los A de parking (`3.33.130.190`, `15.197.148.33`) y poner los de Shopify:

| Tipo | Nombre | Valor |
|------|--------|--------|
| A | `@` | `23.227.38.65` |
| CNAME | `www` | `shops.myshopify.com` |

TTL bajo (600 s) hasta que verifique.

### Theme (opcional, misma tienda)

Sin Shopify Plus, ambos hosts sirven el mismo theme Colab. Para que `benevolo.shop/` abra Bars. y no el home de Masters, en `theme.liquid` (o un redirect de Online Store):

```liquid
{% if request.host contains 'benevolo.shop' and request.path == '/' %}
  <script>location.replace('/collections/bars-benevolo');</script>
{% endif %}
```

### Sitio de marca (Claude · chocolate-benevolo-web)

El storytelling puede seguir en Vercel (`chocolate-benevolo-web.vercel.app` / `chocolatebenevolo.co`). Los CTA de `/bars`, `/preorden` y `/bons` deben apuntar a esta tienda, no a un checkout inventado:

| Uso | URL canónica Colab | Equivalente myshopify |
|-----|--------------------|------------------------|
| Ficha Bars. | `https://benevolo.shop/products/bars-benevolo` | `https://cacao-colab.myshopify.com/products/bars-benevolo` |
| Colección | `https://benevolo.shop/collections/bars-benevolo` | `https://cacao-colab.myshopify.com/collections/bars-benevolo` |
| Carrito 1× | `https://benevolo.shop/cart/51232297222396:1` | `https://cacao-colab.myshopify.com/cart/51232297222396:1` |

WhatsApp (`+57 310 222 7848`) queda como **confirmación de lote / preventa**, no como único CTA.

Código Colab: `apps/web/lib/shopify-colab.ts` → `benevoloShopifySku`, `benevoloProductUrl()`, `BenevoloShopifyCheckout`.
