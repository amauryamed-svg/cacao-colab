import { z } from "zod";

/**
 * Companion IA de Dualita (docs/10-DUALITA-IA.md). Persistencia real en
 * Postgres — a diferencia del hack actual de Emily (caua-io) que usa un
 * HubSpot deal como KV store para memoria de conversación.
 */
export const companionConversationSchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid().nullable(),
  lessonId: z.string().uuid().nullable(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().nullable(),
});
export type CompanionConversation = z.infer<typeof companionConversationSchema>;

export const companionMessageRoleSchema = z.enum(["user", "assistant", "tool"]);
export type CompanionMessageRole = z.infer<typeof companionMessageRoleSchema>;

export const companionMessageSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  role: companionMessageRoleSchema,
  content: z.string(),
  createdAt: z.string().datetime(),
});
export type CompanionMessage = z.infer<typeof companionMessageSchema>;

/** Memoria de largo plazo por profile — key/value simple, sin vector store aún. */
export const companionMemorySchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  key: z.string().min(1),
  value: z.string(),
  updatedAt: z.string().datetime(),
});
export type CompanionMemory = z.infer<typeof companionMemorySchema>;
