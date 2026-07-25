/**
 * Generaliza el patrón que ya vivía en apps/web/app/api/onboarding/route.ts (upsert por email,
 * create → 409 → search → patch). Estandariza en HUBSPOT_ACCESS_TOKEN (nombre usado en el resto
 * del ecosistema Caúa / caua-io), reemplazando HUBSPOT_TOKEN. Ver docs/03-HUBSPOT.md y 14-CRM-INTERNO.md.
 */
import crypto from "node:crypto";

const HS_CONTACTS_BASE = "https://api.hubapi.com/crm/v3/objects/contacts";

export interface HubspotContactProperties {
  firstname?: string;
  email: string;
  company?: string;
  city?: string;
  mobilephone?: string;
  jobtitle?: string;
  lifecyclestage?: string;
  hs_lead_status?: string;
  [key: string]: string | undefined;
}

export interface UpsertResult {
  ok: boolean;
  action: "created" | "updated" | "skipped_no_change" | "error";
  hubspotContactId?: string;
  payloadHash: string;
  error?: string;
}

function hashPayload(properties: Record<string, string | undefined>): string {
  const stable = JSON.stringify(properties, Object.keys(properties).sort());
  return crypto.createHash("sha256").update(stable).digest("hex");
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/**
 * Anti-loop: el caller (route handler) debe pasar `lastKnownHash` desde hubspot_sync_log
 * (última entrada `direction='from_hubspot'` o `to_hubspot` exitosa para este contacto).
 * Si el hash no cambió, no se llama a HubSpot — evita que un webhook entrante dispare
 * inmediatamente un push saliente del mismo estado.
 */
export async function upsertContact(
  token: string,
  properties: HubspotContactProperties,
  lastKnownHash?: string,
): Promise<UpsertResult> {
  const payloadHash = hashPayload(properties);
  if (lastKnownHash && lastKnownHash === payloadHash) {
    return { ok: true, action: "skipped_no_change", payloadHash };
  }

  const createRes = await fetch(HS_CONTACTS_BASE, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ properties }),
  });

  if (createRes.status === 409) {
    const searchRes = await fetch(`${HS_CONTACTS_BASE}/search`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: properties.email }] }],
        properties: ["email"],
        limit: 1,
      }),
    });
    const searchData = await searchRes.json();
    const contactId: string | undefined = searchData?.results?.[0]?.id;

    if (!contactId) {
      return { ok: false, action: "error", payloadHash, error: "409 pero no se encontró el contacto por email" };
    }

    const patchRes = await fetch(`${HS_CONTACTS_BASE}/${contactId}`, {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify({ properties }),
    });
    if (!patchRes.ok) {
      return { ok: false, action: "error", payloadHash, error: await patchRes.text() };
    }
    return { ok: true, action: "updated", hubspotContactId: contactId, payloadHash };
  }

  if (!createRes.ok) {
    return { ok: false, action: "error", payloadHash, error: await createRes.text() };
  }

  const created = await createRes.json();
  return { ok: true, action: "created", hubspotContactId: created.id, payloadHash };
}

/** Vocabulario compartido con el onboarding gate actual — ver docs/03-HUBSPOT.md RF-3. */
export const TIPO_LABEL: Record<string, string> = {
  restaurante: "Restaurante",
  hotel: "Hotel & Glamping",
  cafeteria: "Cafetería & Bar de cacao",
  pasteleria: "Pastelería & Chocolatería",
  farmer: "Productor / finca",
  chocolatier: "Chocolatero",
  maquilador: "Maquilador",
  otra: "Otra operación",
};

export const INTERES_LABEL: Record<string, string> = {
  productos: "Productos CAÚA",
  aprendizaje: "Aprendizaje Dualita",
  marca: "Marketplace — postular marca",
  vender: "Marketplace — vender como productor/chocolatero",
  todo: "Todo el ecosistema",
};

export { hashPayload };
