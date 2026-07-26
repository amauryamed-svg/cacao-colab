import Stripe from "stripe";

/**
 * STUB — no hay cuenta Stripe Connect ni STRIPE_SECRET_KEY todavía (el
 * plan lo deja explícitamente pendiente de datos legales de la entidad de
 * la plataforma). Este paquete define la forma del cliente y las
 * operaciones que va a exponer (docs/08-PAGOS.md: destination charges,
 * Connect Express, webhooks) pero `getStripeClient()` lanza si se llama
 * sin la env var — no hay ningún fallback simulado ni mockeado que pueda
 * confundirse con un pago real.
 */
export class StripeNotConfiguredError extends Error {
  constructor() {
    super(
      "Stripe no está configurado: falta STRIPE_SECRET_KEY. La cuenta Stripe " +
        "Connect de la plataforma es una decisión legal pendiente del " +
        "founder — ver docs/08-PAGOS.md.",
    );
    this.name = "StripeNotConfiguredError";
  }
}

let cached: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (cached) return cached;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new StripeNotConfiguredError();

  cached = new Stripe(key, {
    apiVersion: "2026-06-24.dahlia",
  });
  return cached;
}

/**
 * Forma prevista para destination charges con comisión de plataforma
 * (modelo híbrido: membresía + comisión reducida, ver docs/08-PAGOS.md).
 * Sin implementar todavía — placeholder de firma para que Oscar sepa el
 * contrato esperado antes de que exista la cuenta.
 */
export type CreateDestinationChargeInput = {
  amountCents: number;
  currency: "cop";
  connectedAccountId: string;
  applicationFeeCents: number;
  orderId: string;
};

export async function createDestinationCharge(
  _input: CreateDestinationChargeInput,
): Promise<never> {
  throw new StripeNotConfiguredError();
}
