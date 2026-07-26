import { z } from "zod";

/**
 * `actor_roles` — el rol de marketplace de una *persona* (no de una
 * organización). Un mismo profile puede tener más de un rol a la vez
 * (ej. un chocolatero que también compra insumos).
 */
export const actorRoleTypeSchema = z.enum([
  "farmer",
  "chocolatier",
  "maquilador",
  "buyer",
]);
export type ActorRoleType = z.infer<typeof actorRoleTypeSchema>;

export const actorRoleSchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  role: actorRoleTypeSchema,
  isPrimary: z.boolean().default(false),
  createdAt: z.string().datetime(),
});
export type ActorRole = z.infer<typeof actorRoleSchema>;

/**
 * `profiles` — cuenta de usuario del marketplace, 1:1 con auth.users de
 * Supabase (id compartido). Distinto de `team_members` (team.ts), que es
 * la cuenta interna de Oscar/Hellen/Amaury para el portal /equipo.
 */
export const profileSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid().nullable(),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable(),
  city: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Profile = z.infer<typeof profileSchema>;
