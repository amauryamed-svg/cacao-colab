import { z } from "zod";

export const orderStatusSchema = z.enum([
  "pending_payment",
  "paid",
  "fulfilled",
  "cancelled",
  "refunded",
]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderSchema = z.object({
  id: z.string().uuid(),
  buyerProfileId: z.string().uuid(),
  sellerOrganizationId: z.string().uuid(),
  status: orderStatusSchema.default("pending_payment"),
  subtotalCents: z.number().int().nonnegative(),
  commissionCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
  currency: z.literal("COP").default("COP"),
  stripePaymentIntentId: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Order = z.infer<typeof orderSchema>;

export const orderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  listingId: z.string().uuid(),
  qty: z.number().int().positive(),
  unitPriceCents: z.number().int().nonnegative(),
  totalPriceCents: z.number().int().nonnegative(),
});
export type OrderItem = z.infer<typeof orderItemSchema>;

/**
 * `commission_rules` — porcentaje de comisión por defecto o por
 * organización/membresía. Ver docs/08-PAGOS.md — modelo híbrido:
 * membresía + comisión reducida por transacción.
 */
export const commissionRuleSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid().nullable(),
  membershipPlanId: z.string().uuid().nullable(),
  ratioBasisPoints: z.number().int().min(0).max(10000),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
});
export type CommissionRule = z.infer<typeof commissionRuleSchema>;

/**
 * `commission_ledger` — append-only, auditable. Nunca se hace UPDATE de
 * una fila existente; correcciones se hacen con un asiento de reverso
 * (`reversalOfLedgerId`).
 */
export const commissionLedgerEntrySchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  commissionRuleId: z.string().uuid().nullable(),
  amountCents: z.number().int(),
  reversalOfLedgerId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
});
export type CommissionLedgerEntry = z.infer<typeof commissionLedgerEntrySchema>;
