import { z } from "zod";

export const listingStatus = z.enum(["draft", "published", "archived"]);
export type ListingStatus = z.infer<typeof listingStatus>;

export const listing = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid().nullable(),
  profileId: z.string().uuid().nullable(),
  territoryId: z.string().uuid().nullable(),
  category: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  unit: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().default("USD"),
  minOrderQty: z.number().int().positive(),
  stockQty: z.number().int().nonnegative(),
  traceabilityLotCode: z.string().nullable(),
  certifications: z.array(z.string()).default([]),
  status: listingStatus,
  createdAt: z.string().datetime(),
});
export type Listing = z.infer<typeof listing>;

export const listingMedia = z.object({
  id: z.string().uuid(),
  listingId: z.string().uuid(),
  url: z.string().url(),
  altText: z.string().nullable(),
  position: z.number().int().nonnegative(),
});
export type ListingMedia = z.infer<typeof listingMedia>;
