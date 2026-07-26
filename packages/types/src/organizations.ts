import { z } from "zod";

/**
 * `organizations` — reemplaza el array hardcodeado de `lib/brands.ts` en
 * apps/web/Spec v1. Una organización es una marca/actor institucional del
 * Colab (CAÚA, Zurych, Lust, futuros productores/chocolateros).
 *
 * Distinción clave (ver docs/04-ACTORES.md): `organizations` es un concepto
 * de **cuenta institucional** — separado de `actor_roles` en profiles.ts,
 * que es el rol operativo de una *persona* (farmer/chocolatier/maquilador/
 * buyer). Una organización puede tener múltiples profiles asociados.
 */
export const organizationRoleSchema = z.enum(["owner", "colaborador"]);
export type OrganizationRole = z.infer<typeof organizationRoleSchema>;

export const organizationSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  accentColor: z.string().min(1),
  bgColor: z.string().min(1),
  textColor: z.string().min(1),
  products: z.array(z.string()).default([]),
  ctaLabel: z.string().min(1),
  ctaUrl: z.string().url(),
  role: organizationRoleSchema.default("colaborador"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Organization = z.infer<typeof organizationSchema>;

/**
 * `territories` — reemplaza `lib/territories.ts`. Región de origen de
 * cacao (Huila, Santander, Meta, Arauca, Cundinamarca). Deliberadamente
 * sin nombres de Guardianes individuales — ver nota de cumplimiento en
 * apps/web/lib/territories.ts (D15/A7, memoria del founder).
 */
export const territorySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  flavorProfile: z.string().min(1),
  accentColor: z.string().min(1),
  createdAt: z.string().datetime(),
});
export type Territory = z.infer<typeof territorySchema>;
