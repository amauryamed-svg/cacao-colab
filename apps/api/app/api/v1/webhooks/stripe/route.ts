import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@cacao-colab/stripe-client";
import { createServiceClient } from "@cacao-colab/supabase-client";

/**
 * Runtime Node (NO edge) — se necesita el raw body para verificar la firma con
 * stripe.webhooks.constructEvent; llamar a req.json() antes rompe la verificación.
 * Eventos suscritos: ver docs/08-PAGOS.md. No probado contra una cuenta Stripe real.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ ok: false, error: "falta stripe-signature o STRIPE_WEBHOOK_SECRET" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event;
  try {
    event = constructWebhookEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ ok: false, error: `firma inválida: ${err}` }, { status: 400 });
  }

  const db = createServiceClient();

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as { id: string; metadata: { orderId?: string } };
      if (pi.metadata.orderId) {
        await db.from("orders").update({ status: "paid" }).eq("id", pi.metadata.orderId);
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as { id: string; metadata: { orderId?: string } };
      if (pi.metadata.orderId) {
        await db.from("orders").update({ status: "cancelled" }).eq("id", pi.metadata.orderId);
      }
      break;
    }
    case "charge.refunded": {
      // TODO Fase 2: marcar order 'refunded' + reversar commission_ledger correspondiente.
      break;
    }
    case "account.updated": {
      const account = event.data.object as { id: string; charges_enabled: boolean; payouts_enabled: boolean };
      await db
        .from("connected_accounts")
        .update({ charges_enabled: account.charges_enabled, payouts_enabled: account.payouts_enabled })
        .eq("stripe_account_id", account.id);
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as { id: string; status: string; current_period_end: number; metadata: { profileId?: string; planId?: string } };
      if (sub.metadata.planId) {
        await db.from("memberships").upsert({
          profile_id: sub.metadata.profileId ?? null,
          plan_id: sub.metadata.planId,
          stripe_subscription_id: sub.id,
          status: sub.status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as { id: string };
      await db.from("memberships").update({ status: "canceled" }).eq("stripe_subscription_id", sub.id);
      break;
    }
    case "invoice.payment_failed": {
      // TODO Fase 2: dunning — notificar al actor, degradar tier de comisión si aplica.
      break;
    }
  }

  return NextResponse.json({ ok: true });
}
