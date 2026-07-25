import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@cacao-colab/supabase-client";
import { stripe } from "@cacao-colab/stripe-client";

/**
 * RF-8 (docs/12-SRS.md) — membresías por actor (farmer/chocolatier/maquilador/buyer). Stripe
 * Billing sobre la cuenta de la PLATAFORMA, independiente de las cuentas Connect de los
 * vendedores — es negocio SaaS estándar. Ver docs/08-PAGOS.md.
 */
const createMembershipCheckoutSchema = z.object({
  profileId: z.string().uuid(),
  planSlug: z.string(),
  customerEmail: z.string().email(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createMembershipCheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const db = createServiceClient();
  const { data: plan } = await db
    .from("membership_plans")
    .select("id, stripe_price_id")
    .eq("slug", parsed.data.planSlug)
    .maybeSingle();

  if (!plan?.stripe_price_id) {
    return NextResponse.json({ ok: false, error: "plan no encontrado o sin stripe_price_id" }, { status: 404 });
  }

  const session = await stripe().checkout.sessions.create({
    mode: "subscription",
    customer_email: parsed.data.customerEmail,
    line_items: [{ price: plan.stripe_price_id, quantity: 1 }],
    success_url: parsed.data.successUrl,
    cancel_url: parsed.data.cancelUrl,
    metadata: { profileId: parsed.data.profileId, planId: plan.id },
  });

  return NextResponse.json({ ok: true, checkoutUrl: session.url });
}
