import { z } from "zod";

export const membershipPlanTierSchema = z.enum(["free", "pro", "enterprise"]);
export type MembershipPlanTier = z.infer<typeof membershipPlanTierSchema>;

export const membershipPlanSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  tier: membershipPlanTierSchema,
  priceCentsMonthly: z.number().int().nonnegative(),
  commissionRatioBasisPoints: z.number().int().min(0).max(10000),
  createdAt: z.string().datetime(),
});
export type MembershipPlan = z.infer<typeof membershipPlanSchema>;

export const membershipStatusSchema = z.enum([
  "active",
  "past_due",
  "cancelled",
  "trialing",
]);
export type MembershipStatus = z.infer<typeof membershipStatusSchema>;

export const membershipSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  planId: z.string().uuid(),
  status: membershipStatusSchema.default("trialing"),
  stripeSubscriptionId: z.string().nullable(),
  currentPeriodEnd: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Membership = z.infer<typeof membershipSchema>;

/**
 * `connected_accounts` — Stripe Connect Express por organización vendedora.
 * Sin credenciales todavía (ver packages/stripe-client). El registro se
 * crea igual para trackear estado de onboarding, incluso antes de tener
 * cuenta Stripe real.
 */
export const connectedAccountStatusSchema = z.enum([
  "not_started",
  "onboarding",
  "restricted",
  "active",
  "disabled",
]);
export type ConnectedAccountStatus = z.infer<typeof connectedAccountStatusSchema>;

export const connectedAccountSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  stripeAccountId: z.string().nullable(),
  status: connectedAccountStatusSchema.default("not_started"),
  payoutsEnabled: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ConnectedAccount = z.infer<typeof connectedAccountSchema>;
