import { z } from "zod";

export const tagSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
});
export type Tag = z.infer<typeof tagSchema>;

export const postStatusSchema = z.enum(["draft", "published"]);
export type PostStatus = z.infer<typeof postStatusSchema>;

export const postSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  bodyMdx: z.string().min(1),
  coverImageUrl: z.string().url().nullable(),
  authorProfileId: z.string().uuid().nullable(),
  status: postStatusSchema.default("draft"),
  publishedAt: z.string().datetime().nullable(),
  tagIds: z.array(z.string().uuid()).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Post = z.infer<typeof postSchema>;
