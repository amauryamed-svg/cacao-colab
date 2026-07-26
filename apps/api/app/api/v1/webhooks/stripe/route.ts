import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, StripeNotConfiguredError } from "@cacao-colab/stripe-client";

/**
 * Webhook de Stripe Connect — destination charges, payouts, actualización
 * de connected_accounts. Ver docs/08-PAGOS.md. Verificación de firma real
 * (`stripe.webhooks.constructEvent`) queda escrita pero no ejercitable
 * hasta que exista STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  try {
    const stripe = getStripeClient();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { ok: false, error: "Falta stripe-signature o STRIPE_WEBHOOK_SECRET" },
        { status: 400 },
      );
    }

    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    // TODO Fase 1: switch(event.type) — account.updated → connected_accounts,
    // payment_intent.succeeded → orders.status='paid' + commission_ledger insert.
    return NextResponse.json({ ok: true, received: event.type });
  } catch (err) {
    if (err instanceof StripeNotConfiguredError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 501 });
    }
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "error desconocido" },
      { status: 400 },
    );
  }
}
