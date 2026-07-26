import { z } from "zod";

/**
 * `team_members` — cuenta interna del equipo Cacao Colab (Oscar, Hellen,
 * Amaury), distinta de `profiles` (cuentas de marketplace). Respalda el
 * login real de /equipo en apps/web (Supabase Auth, magic link) y el
 * panel de HubSpot embebido ahí. Ver docs/06-ARQUITECTURA.md §Auth y
 * docs/14-CRM-INTERNO.md.
 *
 * `hubspotContactEmail` es nullable a propósito: no todo team member tiene
 * un contacto real en HubSpot. Nunca se debe intentar "adivinar" o crear
 * uno — si es null, el panel de HubSpot debe mostrar un estado vacío
 * explícito, nunca datos inventados.
 */
export const teamRoleSchema = z.enum([
  "founder",
  "engineering_backend",
  "engineering_frontend",
  "design",
]);
export type TeamRole = z.infer<typeof teamRoleSchema>;

export const teamMemberSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  email: z.string().email(),
  fullName: z.string().min(1),
  teamRole: teamRoleSchema,
  hubspotContactEmail: z.string().email().nullable(),
  createdAt: z.string().datetime(),
});
export type TeamMember = z.infer<typeof teamMemberSchema>;
