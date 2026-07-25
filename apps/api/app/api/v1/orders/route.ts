import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@cacao-colab/supabase-client";
import { createMarketplaceCharge } from "@cacao-colab/stripe-client";

/**
 * RF-7 (docs/12-SRS.md) — checkout del marketplace. Crea la orden en estado 'pending', resuelve
 * la tasa de comisión vigente (commission_rules, por tier de membresía del vendedor) y arma el
 * PaymentIntent como destination charge (ver docs/08-PAGOS.md). No se ha probado contra una
 * cuenta Stripe Connect real — pendiente de que exista STRIPE_SECRET_KEY (fuera del alcance de
 * este agente, requiere KYC de la entidad legal de la plataforma).
 */
const createOrderSchema = z.object({
  buyerProfileId: z.string().uuid(),
  sellerConnectedAccountId: z.string(),
  items: z
    .array(
      z.object({
        listingId: z.string().uuid(),
        quantity: z.number().int().positive(),
        unitPriceCents: z.number().int().nonnegative(),
      }),
    )
    .min(1),
  currency: z.string().default("USD"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const { buyerProfileId, sellerConnectedAccountId, items, currency } = parsed.data;
  const db = createServiceClient();

  const subtotalCents = items.reduce((sum, i) => sum + i.unitPriceCents * i.quantity, 0);

  // Resuelve la comisión vigente. Fallback conservador de 800 bps (8%) si no hay regla configurada
  // todavía — se reemplaza por la fila real de commission_rules una vez el equipo defina los tiers.
  const { data: rule } = await db
    .from("commission_rules")
    .select("rate_bps")
    .lte("effective_from", new Date().toISOString())
    .order("effective_from", { ascending: false })
    .limit(1)
    .maybeSingle();
  const commissionRateBps = rule?.rate_bps ?? 800;
  const commissionCents = Math.round((subtotalCents * commissionRateBps) / 10_000);
  const totalCents = subtotalCents; // la comisión se descuenta del payout del vendedor, no se suma al comprador

  const { data: order, error: orderError } = await db
    .from("orders")
    .insert({
      buyer_profile_id: buyerProfileId,
      status: "pending",
      subtotal_cents: subtotalCents,
      commission_cents: commissionCents,
      total_cents: totalCents,
      currency,
    })
    .select()
    .single();
  if (orderError) return NextResponse.json({ ok: false, error: orderError.message }, { status: 500 });

  const { error: itemsError } = await db.from("order_items").insert(
    items.map((i) => ({
      order_id: order.id,
      listing_id: i.listingId,
      quantity: i.quantity,
      unit_price_cents: i.unitPriceCents,
    })),
  );
  if (itemsError) return NextResponse.json({ ok: false, error: itemsError.message }, { status: 500 });

  try {
    const paymentIntent = await createMarketplaceCharge({
      amountCents: totalCents,
      currency,
      commissionAmountCents: commissionCents,
      destinationAccountId: sellerConnectedAccountId,
      metadata: { orderId: order.id },
    });

    await db.from("orders").update({ stripe_payment_intent_id: paymentIntent.id }).eq("id", order.id);

    return NextResponse.json(
      { ok: true, orderId: order.id, clientSecret: paymentIntent.client_secret },
      { status: 201 },
    );
  } catch (err) {
    // La orden queda en 'pending' sin PaymentIntent — reintentar desde el checkout, no duplicar la orden.
    return NextResponse.json(
      { ok: false, orderId: order.id, error: err instanceof Error ? err.message : "stripe error" },
      { status: 502 },
    );
  }
}
