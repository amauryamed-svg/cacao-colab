# Cacao Colab — Pagos (Stripe Connect)

> Modelo de negocio: híbrido — membresía/suscripción por actor + comisión reducida por
> transacción (D14, `00-SPEC.md`). **No implementado contra una cuenta real** — requiere que exista
> la entidad legal de la plataforma y su cuenta Stripe Connect (P4 en `00-SPEC.md`, no la crea el
> agente).

---

## 1. Por qué Connect Express (no Standard, no Custom)

- **Standard** le da al vendedor un dashboard Stripe independiente con menos control de marca para
  la plataforma — no encaja con la narrativa "enterprise-grade" de cara a un futuro licenciamiento.
- **Custom** obliga a construir todo el flujo de KYC/onboarding a mano — inviable en 3 meses con 3 personas.
- **Express** da onboarding hospedado por Stripe (KYC rápido), dashboard ligero para el vendedor, y
  control de marca vía `on_behalf_of` — el punto medio que Stripe recomienda explícitamente para
  marketplaces con muchos vendedores que necesitan *algún* dashboard propio.

---

## 2. Flujo de onboarding de vendedor

```
Farmer/chocolatier/maquilador se registra como vendedor
    ↓
POST /api/v1/stripe/connect/onboard (crear en apps/api, pendiente de Fase 6)
    ↓
packages/stripe-client::createConnectedAccountLink()
    ↓
Stripe Account Link hospedado (KYC del vendedor)
    ↓
Webhook account.updated → connected_accounts.charges_enabled/payouts_enabled = true
```

## 3. Flujo de checkout (destination charge)

Un solo `PaymentIntent` con `application_fee_amount` (la comisión) y `transfer_data.destination`
(cuenta Express del vendedor) — Stripe hace el split en el mismo cobro, no hay charge+transfer
separado que reconciliar a mano. Implementado en `apps/api/app/api/v1/orders/route.ts` vía
`packages/stripe-client::createMarketplaceCharge()`.

```
POST /api/v1/orders { buyerProfileId, sellerConnectedAccountId, items }
    ↓
resolver commission_rules vigente (por actor_type + membership_tier)
    ↓
crear orders (status=pending) + order_items
    ↓
createMarketplaceCharge → PaymentIntent con application_fee_amount + transfer_data.destination
    ↓
guardar stripe_payment_intent_id en orders
    ↓
cliente confirma con el clientSecret devuelto (Stripe Elements / PaymentSheet)
    ↓
webhook payment_intent.succeeded → orders.status = 'paid' + commission_ledger entry
```

## 4. Membresías (independiente de Connect)

Stripe Billing/Subscriptions sobre la cuenta **de la plataforma** (no las conectadas) — negocio
SaaS estándar. `POST /api/v1/memberships` crea una Checkout Session en modo `subscription`.
`commission_rules.membership_tier` referencia el plan activo para resolver la tasa de comisión —
una membresía más alta baja la comisión sin necesidad de redeploy.

## 5. Webhooks obligatorios

Ruta: `apps/api/app/api/v1/webhooks/stripe/route.ts`, **runtime Node (no edge)** — se necesita el
raw body para `stripe.webhooks.constructEvent`, llamar a `req.json()` antes rompe la verificación
de firma.

| Evento | Acción |
|--------|--------|
| `payment_intent.succeeded` | `orders.status = 'paid'` |
| `payment_intent.payment_failed` | `orders.status = 'cancelled'` |
| `charge.refunded` | `orders.status = 'refunded'` + reversar `commission_ledger` (Fase 6) |
| `account.updated` | Actualizar `connected_accounts.charges_enabled`/`payouts_enabled` |
| `customer.subscription.{created,updated}` | Upsert `memberships` |
| `customer.subscription.deleted` | `memberships.status = 'canceled'` |
| `invoice.payment_failed` | Dunning — notificar al actor (Fase 6, no implementado) |

## 6. Mobile

`@stripe/stripe-react-native` requiere un dev client custom (rompe Expo Go plano). Para no
bloquear Fase 6 con eso: arrancar con **Stripe Checkout hospedado** abierto en `expo-web-browser`
(WebView del sistema) — más rápido de shippear — y subir a `PaymentSheet` nativo en Fase 7 si el
tiempo lo permite. Ver `13-MOBILE.md`.

## 7. Cálculo de comisión — ejemplo

```
subtotal = Σ (unit_price_cents × quantity)
rate_bps = commission_rules vigente para (seller.actor_type, seller.membership_tier)
commission_cents = round(subtotal × rate_bps / 10000)
seller_payout_cents = subtotal - commission_cents
total_cents (lo que paga el comprador) = subtotal   ← la comisión se descuenta del payout del
                                                        vendedor, no se suma al comprador
```

Tasa fallback conservadora si no hay `commission_rules` configurada: **800 bps (8%)** — ver
`apps/api/app/api/v1/orders/route.ts`. Se reemplaza por las reglas reales una vez el equipo defina
los tiers de membresía (Fase 6).

## 8. No implementado todavía

- Reembolsos parciales y disputas (`charge.dispute.*`).
- Reversión automática de `commission_ledger` en refund.
- Dunning real (solo el webhook está scaffolded, sin lógica de notificación).
- `PaymentSheet` nativo en mobile (arranca con checkout hospedado).
