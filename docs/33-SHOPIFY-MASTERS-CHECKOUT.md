# Shopify Colab · Masters digitales + cross-sell nodos

> Checkout de producto digital para los tres Masters en la tienda Shopify de Cacao Colab,
> con venta cruzada a coberturas/nibs de nodos.

## Flujo

1. Comprador elige Master en `/shop#masters` o en el gate de `/campus/*`.
2. Si hay `NEXT_PUBLIC_SHOPIFY_VARIANT_*` → permalink `/cart/{variantId}:1` en el dominio Shopify.
3. Si no hay variant → WhatsApp de inscripción (sin carrito fingido).
4. Tras cerrar maestría → rail de cross-sell a SKUs de nodos (WhatsApp mientras nodos offline).

## Env

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_COLAB_SHOPIFY_DOMAIN` | Dominio tienda (default `shop.cacaocolab.org`) |
| `NEXT_PUBLIC_SHOPIFY_VARIANT_CACAOTIER` | Variant ID Master Cacaotier |
| `NEXT_PUBLIC_SHOPIFY_VARIANT_CATADOR` | Variant ID Master Catador |
| `NEXT_PUBLIC_SHOPIFY_VARIANT_CHOCOLATIER` | Variant ID Master Chocolatier |

## Código

| Recurso | Ruta |
|---------|------|
| Catálogo + checkout | `apps/web/lib/shopify-colab.ts` |
| UI | `apps/web/components/commerce/MasterShopifyCheckout.tsx` |
| Gate campus | `MasterAccessGate` |
| Cierre + cross-sell | `MasteryClose` |

## Dual path de acceso

- **Rango MD** (Sembrar + Dualita) sigue abriendo campus.
- **Shopify** habilita inscripción pagada sin canjear MD (anti pay-to-win de rango).
- Webhook `orders/paid` → otorgar acceso campus: backlog (activar cuando existan credentials Admin API).
