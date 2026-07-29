import { z } from "zod";

export const mazorcaCategorySchema = z.enum([
  "learning", "care", "community", "verified_purchase", "redemption", "adjustment",
]);
export type MazorcaCategory = z.infer<typeof mazorcaCategorySchema>;

export const mazorcaWalletSchema = z.object({
  profileId: z.string().uuid(),
  balance: z.number().int().nonnegative(),
  lifetimeEarned: z.number().int().nonnegative(),
  updatedAt: z.string().datetime(),
});
export type MazorcaWallet = z.infer<typeof mazorcaWalletSchema>;

export const mazorcaLedgerEntrySchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  amount: z.number().int(),
  category: mazorcaCategorySchema,
  reasonCode: z.string().min(1),
  idempotencyKey: z.string().min(1),
  sourceType: z.string().nullable(),
  sourceId: z.string().nullable(),
  metadata: z.record(z.string(), z.unknown()),
  createdAt: z.string().datetime(),
});
export type MazorcaLedgerEntry = z.infer<typeof mazorcaLedgerEntrySchema>;

export const communityRankSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  minLifetimeMd: z.number().int().nonnegative(),
  sortOrder: z.number().int().positive(),
});
export type CommunityRank = z.infer<typeof communityRankSchema>;

export const benefitStatusSchema = z.enum(["planned", "active", "paused", "retired"]);
export const benefitCatalogItemSchema = z.object({
  id: z.string().uuid(),
  brandKey: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  costMd: z.number().int().positive(),
  minRankSlug: z.string().nullable(),
  status: benefitStatusSchema,
  terms: z.string().min(1),
});
export type BenefitCatalogItem = z.infer<typeof benefitCatalogItemSchema>;

export const commerceAdapterTypeSchema = z.enum([
  "none", "manual_coupon", "colab_native", "shopify", "woocommerce", "custom_webhook",
]);
export const commerceAdapterStatusSchema = z.enum(["inactive", "active", "error"]);
