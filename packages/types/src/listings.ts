import { z } from "zod";

export const listingStatusSchema = z.enum([
  "draft",
  "active",
  "paused",
  "archived",
]);
export type ListingStatus = z.infer<typeof listingStatusSchema>;

export const listingUnitSchema = z.enum(["kg", "g", "unidad", "caja"]);
export type ListingUnit = z.infer<typeof listingUnitSchema>;

export const listingSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  territoryId: z.string().uuid().nullable(),
  title: z.string().min(1),
  description: z.string().min(1),
  status: listingStatusSchema.default("draft"),
  priceCents: z.number().int().nonnegative(),
  currency: z.literal("COP").default("COP"),
  unit: listingUnitSchema,
  minOrderQty: z.number().int().positive().default(1),
  stockQty: z.number().int().nonnegative().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Listing = z.infer<typeof listingSchema>;

export const listingMediaSchema = z.object({
  id: z.string().uuid(),
  listingId: z.string().uuid(),
  url: z.string().url(),
  altText: z.string().nullable(),
  sortOrder: z.number().int().nonnegative().default(0),
  createdAt: z.string().datetime(),
});
export type ListingMedia = z.infer<typeof listingMediaSchema>;
