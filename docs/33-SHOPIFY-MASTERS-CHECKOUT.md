# Shopify Colab · cacao-colab.myshopify.com

> Tienda oficial Shopify de Cacao Colab.

## Dominio

| Campo | Valor |
|-------|--------|
| Storefront | `https://cacao-colab.myshopify.com` |
| Colección | `/collections/all` |
| Override env | `NEXT_PUBLIC_COLAB_SHOPIFY_DOMAIN` |

## Productos

- Masters digitales (`master-cacaotier`, `master-catador`, `master-chocolatier`)
- Bars. Benevolo (`bars-benevolo`)
- Set Catación 10 (`set-catacion-10`)

Variant IDs opcionales: `NEXT_PUBLIC_SHOPIFY_VARIANT_{CACAOTIER,CATADOR,CHOCOLATIER}` — sin ellos se abre la ficha `/products/{handle}`.

## Hub Colab

`/shop` — vitrina + Masters + cross-sell nodos + link a app FOB `/export`.

## Acreditación de Masters (pago → cuenta)

El checkout Shopify **sí puede** abrir el campus cuando está configurado el webhook.

| Paso | Detalle |
|------|---------|
| Webhook | `POST /api/shopify/webhooks/orders-paid` |
| Evento Shopify | Order payment (`orders/paid`) |
| Secret | `SHOPIFY_WEBHOOK_SECRET` (HMAC `X-Shopify-Hmac-Sha256`) |
| Matching | email de la orden ↔ `profiles.email` (mismo email que Mi cuenta) |
| Entitlement | `campus_progress.state.shopify_unlocked = true` |

Handles → course slug:

| Handle Shopify | Campus |
|----------------|--------|
| `master-cacaotier` | `arquitecto-fermentacion` |
| `master-catador` | `catador-cacao` |
| `master-chocolatier` | `maestro-chocolatier` |

Otras puertas (sin Shopify):

1. **Rango** — MD históricas (Sembrar + Dualita)
2. **Canje MD** — `campus_progress.state.md_unlocked` (beneficio digital)

Sin `SHOPIFY_WEBHOOK_SECRET` el endpoint responde `503 webhook_not_configured`. Sin cuenta Colab con ese email, el pago queda registrado en Shopify pero el unlock espera a que el learner cree/inicie sesión con el mismo correo.
