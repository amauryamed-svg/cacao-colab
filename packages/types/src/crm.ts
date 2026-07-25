import { z } from "zod";

/**
 * CRM interno operable por los 3 colaboradores, sincronizado con el HubSpot compartido de Caúa.
 * hubspotSyncLog es el mecanismo anti-loop: se compara payloadHash contra el último sync exitoso
 * antes de reenviar, para que un webhook entrante de HubSpot no dispare un push saliente inmediato
 * del mismo estado. Ver docs/14-CRM-INTERNO.md.
 */
export const lifecycleStage = z.enum(["lead", "mql", "sql", "customer", "churned"]);
export type LifecycleStage = z.infer<typeof lifecycleStage>;

export const crmContact = z.object({
  id: z.string().uuid(),
  hubspotContactId: z.string().nullable(),
  profileId: z.string().uuid().nullable(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  ownerProfileId: z.string().uuid().nullable(),
  lifecycleStage,
  createdAt: z.string().datetime(),
});
export type CrmContact = z.infer<typeof crmContact>;

export const crmActivityType = z.enum(["note", "call", "email", "whatsapp", "meeting"]);
export type CrmActivityType = z.infer<typeof crmActivityType>;

export const crmActivity = z.object({
  id: z.string().uuid(),
  crmContactId: z.string().uuid(),
  type: crmActivityType,
  body: z.string(),
  ownerProfileId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
});
export type CrmActivity = z.infer<typeof crmActivity>;

export const syncDirection = z.enum(["to_hubspot", "from_hubspot"]);
export type SyncDirection = z.infer<typeof syncDirection>;

export const syncStatus = z.enum(["ok", "error", "skipped_no_change"]);
export type SyncStatus = z.infer<typeof syncStatus>;

export const hubspotSyncLog = z.object({
  id: z.string().uuid(),
  entityType: z.enum(["crm_contact", "organization", "order"]),
  localId: z.string().uuid(),
  hubspotId: z.string().nullable(),
  direction: syncDirection,
  payloadHash: z.string(),
  status: syncStatus,
  createdAt: z.string().datetime(),
});
export type HubspotSyncLog = z.infer<typeof hubspotSyncLog>;
