import { z } from "zod";

/**
 * Modelo híbrido: membresía recurrente por actor + comisión reducida por transacción.
 * Ver docs/08-PAGOS.md para el flujo completo de Stripe Connect (Express, destination charges).
 */

export const orderStatus = z.enum(["pending", "paid", "fulfilled", "cancelled", "refunded"]);
export type OrderStatus = z.infer<typeof orderStatus>;

export const order = z.object({
  id: z.string().uuid(),
  buyerProfileId: z.string().uuid(),
  sellerOrganizationId: z.string().uuid().nullable(),
  sellerProfileId: z.string().uuid().nullable(),
  status: orderStatus,
  stripePaymentIntentId: z.string().nullable(),
  subtotalCents: z.number().int().nonnegative(),
  commissionCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
  currency: z.string().default("USD"),
  createdAt: z.string().datetime(),
});
export type Order = z.infer<typeof order>;

export const orderItem = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  listingId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitPriceCents: z.number().int().nonnegative(),
});
export type OrderItem = z.infer<typeof orderItem>;

export const commissionLedgerStatus = z.enum(["pending", "settled", "reversed"]);
export type CommissionLedgerStatus = z.infer<typeof commissionLedgerStatus>;

export const commissionLedgerEntry = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  commissionRateBps: z.number().int().nonnegative(),
  commissionAmountCents: z.number().int().nonnegative(),
  sellerPayoutCents: z.number().int().nonnegative(),
  stripeTransferId: z.string().nullable(),
  status: commissionLedgerStatus,
  createdAt: z.string().datetime(),
});
export type CommissionLedgerEntry = z.infer<typeof commissionLedgerEntry>;

export const commissionRule = z.object({
  id: z.string().uuid(),
  actorType: z.enum(["farmer", "chocolatier", "maquilador", "buyer"]),
  membershipTier: z.string(),
  rateBps: z.number().int().min(0).max(10000),
  effectiveFrom: z.string().datetime(),
});
export type CommissionRule = z.infer<typeof commissionRule>;

export const billingInterval = z.enum(["month", "year"]);
export type BillingInterval = z.infer<typeof billingInterval>;

export const membershipPlan = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  actorType: z.enum(["farmer", "chocolatier", "maquilador", "buyer"]),
  stripePriceId: z.string().nullable(),
  billingInterval,
  priceCents: z.number().int().nonnegative(),
  commissionTier: z.string(),
});
export type MembershipPlan = z.infer<typeof membershipPlan>;

export const membershipStatus = z.enum(["trialing", "active", "past_due", "canceled"]);
export type MembershipStatus = z.infer<typeof membershipStatus>;

export const membership = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  planId: z.string().uuid(),
  stripeSubscriptionId: z.string().nullable(),
  status: membershipStatus,
  currentPeriodEnd: z.string().datetime().nullable(),
});
export type Membership = z.infer<typeof membership>;

export const connectedAccount = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  stripeAccountId: z.string(),
  accountType: z.literal("express"),
  chargesEnabled: z.boolean().default(false),
  payoutsEnabled: z.boolean().default(false),
});
export type ConnectedAccount = z.infer<typeof connectedAccount>;
