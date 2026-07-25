import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@cacao-colab/supabase-client";
import { hashPayload } from "@cacao-colab/hubspot-client";

/**
 * Recibe cambios de contacto desde el HubSpot compartido (propertyChange subscription) y los
 * refleja en crm_contacts — dirección 'from_hubspot' en hubspot_sync_log, para que el próximo
 * push saliente (packages/hubspot-client) vea el hash sin cambios y no reenvíe en loop.
 * Configurar la suscripción de webhook en el Private App de HubSpot antes de activar esto en
 * producción — no configurado todavía (pendiente de acceso al HubSpot compartido).
 */
export async function POST(req: NextRequest) {
  const events = await req.json();
  const db = createServiceClient();

  for (const event of events) {
    if (event.subscriptionType !== "contact.propertyChange") continue;

    const payloadHash = hashPayload(event.propertyValue ? { [event.propertyName]: event.propertyValue } : {});

    await db.from("hubspot_sync_log").insert({
      entity_type: "crm_contact",
      hubspot_id: String(event.objectId),
      direction: "from_hubspot",
      payload_hash: payloadHash,
      status: "ok",
    });

    // TODO Fase 2: upsert real en crm_contacts por hubspot_contact_id.
  }

  return NextResponse.json({ ok: true });
}
