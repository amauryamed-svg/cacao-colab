import { z } from "zod";

/**
 * Dualita Companion — infra portada del patrón de Emily (Caua-Corp/caua-io/lib/emily-io/*),
 * pero con memoria en Postgres real en vez del hack de HubSpot-deal-como-KV que usa Emily.
 * Ver docs/10-DUALITA-IA.md.
 */
export const companionChannel = z.enum(["mobile", "web"]);
export type CompanionChannel = z.infer<typeof companionChannel>;

export const companionConversation = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  channel: companionChannel,
  startedAt: z.string().datetime(),
});
export type CompanionConversation = z.infer<typeof companionConversation>;

export const companionMessageRole = z.enum(["user", "assistant", "tool"]);
export type CompanionMessageRole = z.infer<typeof companionMessageRole>;

export const companionMessage = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  role: companionMessageRole,
  content: z.string(),
  createdAt: z.string().datetime(),
});
export type CompanionMessage = z.infer<typeof companionMessage>;

/** Key-value por profile: preferencias de aprendizaje, último tema, intención de compra detectada, etc. */
export const companionMemory = z.object({
  profileId: z.string().uuid(),
  key: z.string(),
  value: z.unknown(),
  updatedAt: z.string().datetime(),
});
export type CompanionMemory = z.infer<typeof companionMemory>;
