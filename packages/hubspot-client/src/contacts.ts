import { hubspotFetch } from "./client";

const CONTACTS_PATH = "/crm/v3/objects/contacts";

export type HubspotContact = {
  id: string;
  properties: Record<string, string | null>;
};

export type UpsertContactResult =
  | { ok: true; action: "created" | "updated"; contactId: string | null }
  | { ok: false; error: string };

/**
 * Upsert por email — puerto directo del patrón usado hoy en
 * apps/web/app/api/onboarding/route.ts: intenta crear, y si HubSpot
 * responde 409 (el contacto ya existe), busca por email y hace PATCH.
 */
export async function upsertContactByEmail(
  properties: Record<string, string>,
): Promise<UpsertContactResult> {
  const email = properties.email;
  if (!email || !email.includes("@")) {
    return { ok: false, error: "email requerido" };
  }

  const createRes = await hubspotFetch<{ id: string }>(CONTACTS_PATH, {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  if (createRes.status === 409) {
    const existing = await getContactByEmail(email);
    if (!existing) {
      return { ok: false, error: "409 de HubSpot pero no se encontró el contacto por email" };
    }
    const patchRes = await hubspotFetch(`${CONTACTS_PATH}/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
    if (!patchRes.ok) {
      return { ok: false, error: patchRes.raw };
    }
    return { ok: true, action: "updated", contactId: existing.id };
  }

  if (!createRes.ok) {
    return { ok: false, error: createRes.raw };
  }

  return { ok: true, action: "created", contactId: createRes.data?.id ?? null };
}

/**
 * Busca un contacto por email exacto. Devuelve `null` si no existe — el
 * caller (ej. el panel de HubSpot en /equipo) debe tratar `null` como un
 * estado vacío legítimo, nunca inventar datos de reemplazo.
 */
export async function getContactByEmail(
  email: string,
  propertiesToFetch: string[] = [
    "email",
    "firstname",
    "lastname",
    "company",
    "city",
    "jobtitle",
    "lifecyclestage",
    "hs_lead_status",
  ],
): Promise<HubspotContact | null> {
  const res = await hubspotFetch<{
    results: Array<{ id: string; properties: Record<string, string | null> }>;
  }>(`${CONTACTS_PATH}/search`, {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
      properties: propertiesToFetch,
      limit: 1,
    }),
  });

  const hit = res.data?.results?.[0];
  if (!res.ok || !hit) return null;

  return { id: hit.id, properties: hit.properties };
}

async function countContacts(lifecycleStage?: string): Promise<number> {
  const res = await hubspotFetch<{ total: number }>(`${CONTACTS_PATH}/search`, {
    method: "POST",
    body: JSON.stringify({
      filterGroups: lifecycleStage
        ? [{ filters: [{ propertyName: "lifecyclestage", operator: "EQ", value: lifecycleStage }] }]
        : [],
      properties: ["email"],
      limit: 1,
    }),
  });
  if (!res.ok) throw new Error(`HubSpot contacts search falló (${res.status})`);
  return res.data?.total ?? 0;
}

export type HubspotFunnelSnapshot = {
  totalContacts: number;
  leads: number;
  marketingQualified: number;
  salesQualified: number;
  customers: number;
};

export async function getHubspotFunnelSnapshot(): Promise<HubspotFunnelSnapshot> {
  const [totalContacts, leads, marketingQualified, salesQualified, customers] = await Promise.all([
    countContacts(),
    countContacts("lead"),
    countContacts("marketingqualifiedlead"),
    countContacts("salesqualifiedlead"),
    countContacts("customer"),
  ]);
  return { totalContacts, leads, marketingQualified, salesQualified, customers };
}
