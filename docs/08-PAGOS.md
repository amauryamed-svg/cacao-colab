# Cacao Colab — Pagos (v2)

> Nuevo en v2. Última actualización: 2026-07-26.
> **Estado: sin cuenta Stripe ni credenciales.** Este documento describe el diseño; `packages/stripe-client` es un stub que lanza si se llama sin `STRIPE_SECRET_KEY`.

---

## 1. Modelo de negocio (D14, `00-SPEC.md`)

**Híbrido:** membresía/suscripción por actor (mensual, vía Stripe Subscriptions) + comisión reducida por transacción (vía Stripe Connect destination charges). Decisión ya tomada por el usuario — no es una opción a evaluar, es el modelo confirmado.

Razón del híbrido: una comisión pura penaliza a actores de bajo volumen pero alto valor (ej. un chocolatier chico con pocas órdenes grandes); una membresía pura no escala con el uso real. El híbrido cobra una base predecible (membresía) y alinea el resto con el volumen transaccionado (comisión).

---

## 2. Stripe Connect Express

**Por qué Express y no Standard/Custom:** Express delega la UI de onboarding (KYC, cuenta bancaria) a Stripe — ni Oscar ni Hellen construyen esa UI, y el vendedor (farmer/chocolatier) no necesita entender Stripe para empezar a vender. Custom daría más control pero exige construir todo el onboarding a mano, no justificado para el tamaño del equipo hoy.

### Flujo de onboarding de un vendedor

```
Organización decide vender → connected_accounts row creada (status: not_started)
    ↓
apps/api crea la cuenta Express real (POST /v1/accounts) cuando exista STRIPE_SECRET_KEY
    ↓
Stripe Account Link → onboarding hosted por Stripe (KYC, banco)
    ↓
Webhook account.updated → apps/api actualiza connected_accounts.status/payouts_enabled
```

### Destination charges (el patrón de cobro elegido)

En vez de "separate charges and transfers" (2 pasos, más superficie de error), se usa **destination charges**: un solo `PaymentIntent` con `transfer_data.destination` apuntando a la cuenta Connect del vendedor y `application_fee_amount` como la comisión de la plataforma. Ventajas: Stripe maneja el split atómicamente, y el comprador ve un solo cargo.

```ts
// Forma prevista — packages/stripe-client, sin implementar todavía
{
  amountCents: number          // total que paga el comprador
  currency: "cop"
  connectedAccountId: string   // cuenta Connect del vendedor
  applicationFeeCents: number  // comisión de Cacao Colab (calculada con commission_rules)
  orderId: string              // para reconciliar con commission_ledger
}
```

### Cálculo de la comisión

`commission_rules` define el `ratio_basis_points` (1 bp = 0.01%) aplicable — por defecto o por `membership_plan_id` (planes con membresía activa pagan menos comisión, ese es el "híbrido"). Al confirmarse el pago, `apps/api` calcula `commission_cents = subtotal_cents * ratio_basis_points / 10000` y escribe un asiento en `commission_ledger` (append-only, nunca se actualiza — correcciones son un nuevo asiento con `reversal_of_ledger_id`).

---

## 2.1 Packs de Mazorcas Doradas

Además del marketplace, el Colab venderá packs de MD (Saco / Cesta / Cosecha) para canjear cursos y aceleraciones. Flujo: `mazorca_pack_intents` → Checkout Stripe → webhook acredita `pack_purchase` **sin** sumar a `lifetime_earned` (anti pay-to-win de rango). Detalle en `26-ECONOMIA-MD-SCORECARD.md`. Hasta existir `STRIPE_SECRET_KEY`, la UI solo registra la intención.

## 3. Membresías (Stripe Subscriptions)

`membership_plans` define tiers (`free`/`pro`/`enterprise`) con `price_cents_monthly` y `commission_ratio_basis_points` propio (a menor comisión, mayor cuota mensual — el trade-off explícito del modelo híbrido). `memberships` trackea el estado (`trialing`/`active`/`past_due`/`cancelled`) sincronizado vía webhook de Stripe (`customer.subscription.updated`).

---

## 4. Webhooks

`apps/api/app/api/v1/webhooks/stripe/route.ts` — verifica la firma (`stripe.webhooks.constructEvent`) con `STRIPE_WEBHOOK_SECRET`. Hoy responde `501` si no hay credenciales (el código de verificación está escrito y es correcto, solo no ejercitable sin el secreto real). Eventos a manejar en Fase 3:

| Evento | Efecto esperado |
|--------|-------------------|
| `account.updated` | Actualiza `connected_accounts.status`/`payouts_enabled` |
| `payment_intent.succeeded` | `orders.status = 'paid'` + `INSERT` en `commission_ledger` |
| `payment_intent.payment_failed` | `orders.status` sin cambio, log para retry manual |
| `customer.subscription.updated` | Sincroniza `memberships.status`/`current_period_end` |
| `charge.refunded` | `orders.status = 'refunded'` + asiento de reverso en `commission_ledger` |

---

## 5. Qué falta para que esto sea real

1. **Entidad legal de la plataforma** — quién es el "merchant of record" que abre la cuenta Stripe Connect (¿CAÚA Colombia SAS? ¿una entidad nueva de Cacao Colab?). Decisión de negocio, no técnica — pendiente del founder.
2. **`STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`** en Vercel (`apps/api`).
3. **Proyecto Supabase real** — `connected_accounts`/`commission_ledger`/`memberships` no persisten sin él.
4. Definir los `commission_rules` reales por defecto (¿qué % es "reducido"? — number a definir con el founder, no inventado acá).
