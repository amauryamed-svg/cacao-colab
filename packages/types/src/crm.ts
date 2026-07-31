import { z } from "zod";

/**
 * CRM propio, sincronizado con HubSpot (docs/14-CRM-INTERNO.md). No
 * reemplaza HubSpot — es la copia local que permite reportes/consultas sin
 * pegarle a la API de HubSpot en cada request, con sync bidireccional.
 */
export const crmContactSchema = z.object({
  id: z.string().uuid(),
  hubspotContactId: z.string().nullable(),
  profileId: z.string().uuid().nullable(),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  city: z.string().nullable(),
  lifecycleStage: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type CrmContact = z.infer<typeof crmContactSchema>;

export const crmActivityTypeSchema = z.enum([
  "onboarding_started",
  "onboarding_submitted",
  "account_registered",
  "microlearning_link_clicked",
  "mooc_link_clicked",
  "listing_viewed",
  "order_placed",
  "lesson_completed",
  "membership_started",
  "sponsor_interest",
  "knowledge_link_clicked",
  "ecoyuma_link_clicked",
  "caua_shop_clicked",
  "zurych_shop_clicked",
  "benevolo_interest",
  "note",
]);
export type CrmActivityType = z.infer<typeof crmActivityTypeSchema>;

export const crmActivitySchema = z.object({
  id: z.string().uuid(),
  crmContactId: z.string().uuid(),
  type: crmActivityTypeSchema,
  metadata: z.record(z.string(), z.unknown()).default({}),
  createdAt: z.string().datetime(),
});
export type CrmActivity = z.infer<typeof crmActivitySchema>;

/**
 * `hubspot_sync_log` — con hash anti-loop: antes de escribir hacia
 * HubSpot (o de aceptar un webhook entrante), se compara el hash del
 * payload contra el último hash sincronizado para esa entidad. Si son
 * iguales, se descarta — evita el ciclo infinito de updates
 * HubSpot→Supabase→HubSpot.
 */
export const hubspotSyncDirectionSchema = z.enum(["to_hubspot", "from_hubspot"]);
export type HubspotSyncDirection = z.infer<typeof hubspotSyncDirectionSchema>;

export const hubspotSyncLogSchema = z.object({
  id: z.string().uuid(),
  crmContactId: z.string().uuid(),
  direction: hubspotSyncDirectionSchema,
  payloadHash: z.string().min(1),
  success: z.boolean(),
  errorMessage: z.string().nullable(),
  createdAt: z.string().datetime(),
});
export type HubspotSyncLog = z.infer<typeof hubspotSyncLogSchema>;
