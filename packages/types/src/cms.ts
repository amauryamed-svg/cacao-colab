import { z } from "zod";

/** Blog interno de tendencias de chocolate/cacao — nivel Callebaut/Valrhona. Ver docs/06-ARQUITECTURA.md. */
export const post = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().nullable(),
  contentMdx: z.string(),
  coverImageUrl: z.string().nullable(),
  authorProfileId: z.string().uuid().nullable(),
  publishedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
});
export type Post = z.infer<typeof post>;

export const tag = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
});
export type Tag = z.infer<typeof tag>;
