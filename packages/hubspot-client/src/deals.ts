import { hubspotFetch } from "./client";

export type HubspotDeal = {
  id: string;
  dealname: string | null;
  amount: string | null;
  dealstage: string | null;
  closedate: string | null;
};

/**
 * Deals asociados a un contacto — usado por el panel de HubSpot del
 * portal /equipo (apps/web/components/team/TeamHubspotPanel.tsx). Devuelve
 * `[]` si el contacto no tiene deals asociados; nunca lanza para ese caso,
 * solo para errores reales de red/auth.
 */
export async function getDealsForContact(contactId: string): Promise<HubspotDeal[]> {
  const assocRes = await hubspotFetch<{ results: Array<{ toObjectId?: number; id?: string }> }>(
    `/crm/v3/objects/contacts/${contactId}/associations/deals`,
  );

  if (!assocRes.ok || !assocRes.data?.results?.length) return [];

  const dealIds = assocRes.data.results
    .map((r) => String(r.toObjectId ?? r.id))
    .filter(Boolean);

  if (dealIds.length === 0) return [];

  const batchRes = await hubspotFetch<{
    results: Array<{ id: string; properties: Record<string, string | null> }>;
  }>("/crm/v3/objects/deals/batch/read", {
    method: "POST",
    body: JSON.stringify({
      inputs: dealIds.map((id) => ({ id })),
      properties: ["dealname", "amount", "dealstage", "closedate"],
    }),
  });

  if (!batchRes.ok || !batchRes.data?.results) return [];

  return batchRes.data.results.map((d) => ({
    id: d.id,
    dealname: d.properties.dealname ?? null,
    amount: d.properties.amount ?? null,
    dealstage: d.properties.dealstage ?? null,
    closedate: d.properties.closedate ?? null,
  }));
}
