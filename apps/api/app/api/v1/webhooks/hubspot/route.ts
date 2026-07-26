import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook entrante de HubSpot (workflows → cambios de propiedad de
 * contacto). Ver docs/14-CRM-INTERNO.md — sync bidireccional con
 * hubspot_sync_log y hash anti-loop: se calcula el hash del payload y se
 * compara contra el último hash registrado para ese contacto+dirección
 * antes de escribir en crm_contacts. Si coincide, se descarta (evita el
 * ciclo infinito HubSpot→Supabase→HubSpot).
 *
 * Fase 0: calcula el hash y lo devuelve, pero no persiste todavía (no hay
 * Supabase real conectado).
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const payloadHash = createHash("sha256").update(rawBody).digest("hex");

  return NextResponse.json({
    ok: true,
    payloadHash,
    note:
      "Hash calculado, no persistido todavía (Fase 0, sin Supabase). " +
      "Ver hubspot_sync_log en supabase/migrations/20260726100010_crm.sql.",
  });
}
