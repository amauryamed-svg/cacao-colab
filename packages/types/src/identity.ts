import { z } from "zod";

/**
 * Owner/Colaborador es un nivel de ORGANIZACIÓN (quién gobierna el Colab).
 * farmer/chocolatier/maquilador/buyer es un nivel de CUENTA (qué hace un profile en el marketplace).
 * Un profile puede pertenecer a una organization Y tener uno o más actor_roles. No son la misma jerarquía.
 * Ver docs/04-ACTORES.md.
 */
export const orgRole = z.enum(["owner", "colaborador"]);
export type OrgRole = z.infer<typeof orgRole>;

export const orgStatus = z.enum(["active", "pending", "archived"]);
export type OrgStatus = z.infer<typeof orgStatus>;

export const actorType = z.enum(["farmer", "chocolatier", "maquilador", "buyer"]);
export type ActorType = z.infer<typeof actorType>;

export const territory = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  flavorProfile: z.string().nullable(),
  accentColor: z.string().nullable(),
});
export type Territory = z.infer<typeof territory>;

export const organization = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  tagline: z.string().nullable(),
  description: z.string().nullable(),
  role: orgRole,
  accentColor: z.string().nullable(),
  bgColor: z.string().nullable(),
  textColor: z.string().nullable(),
  ctaUrl: z.string().url().nullable(),
  territoryId: z.string().uuid().nullable(),
  status: orgStatus,
  admittedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
});
export type Organization = z.infer<typeof organization>;

export const profile = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  locale: z.string().default("es-CO"),
  organizationId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
});
export type Profile = z.infer<typeof profile>;

export const actorRoleAssignment = z.object({
  profileId: z.string().uuid(),
  role: actorType,
  assignedAt: z.string().datetime(),
});
export type ActorRoleAssignment = z.infer<typeof actorRoleAssignment>;
