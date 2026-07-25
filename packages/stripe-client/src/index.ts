import Stripe from "stripe";

/**
 * STUB sin cuenta Stripe Connect real todavía — pendiente de que se cree la cuenta de plataforma
 * (requiere entidad legal/KYC, ver docs/08-PAGOS.md y el plan aprobado: "no la crea el agente").
 * El código es funcional una vez exista STRIPE_SECRET_KEY; no se ha probado contra una cuenta real.
 */
let client: Stripe | undefined;

export function stripe(): Stripe {
  if (client) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY no configurada");
  client = new Stripe(key, { apiVersion: "2024-12-18.acacia" });
  return client;
}

/** Onboarding de vendedor (farmer/chocolatier/maquilador) — cuenta Express, no Standard ni Custom. */
export async function createConnectedAccountLink(params: {
  accountId?: string;
  email: string;
  refreshUrl: string;
  returnUrl: string;
}) {
  const s = stripe();
  const account =
    params.accountId != null
      ? await s.accounts.retrieve(params.accountId)
      : await s.accounts.create({ type: "express", email: params.email });

  const link = await s.accountLinks.create({
    account: account.id,
    refresh_url: params.refreshUrl,
    return_url: params.returnUrl,
    type: "account_onboarding",
  });

  return { accountId: account.id, onboardingUrl: link.url };
}

/**
 * Destination charge: un solo PaymentIntent con application_fee_amount (comisión, resuelta vía
 * commission_rules) y transfer_data.destination (cuenta Express del vendedor). Stripe hace el
 * split en el mismo cobro — no hay charge+transfer separado que reconciliar a mano.
 */
export async function createMarketplaceCharge(params: {
  amountCents: number;
  currency: string;
  commissionAmountCents: number;
  destinationAccountId: string;
  buyerCustomerId?: string;
  metadata: Record<string, string>;
}) {
  const s = stripe();
  return s.paymentIntents.create({
    amount: params.amountCents,
    currency: params.currency,
    application_fee_amount: params.commissionAmountCents,
    transfer_data: { destination: params.destinationAccountId },
    customer: params.buyerCustomerId,
    metadata: params.metadata,
  });
}

/** Verificación de firma de webhook — usar SIEMPRE con el raw body, nunca con req.json() ya parseado. */
export function constructWebhookEvent(rawBody: string | Buffer, signature: string, webhookSecret: string) {
  return stripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
}

export { Stripe };
