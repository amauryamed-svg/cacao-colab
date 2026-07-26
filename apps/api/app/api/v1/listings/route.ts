import { NextRequest, NextResponse } from "next/server";
import { listingSchema } from "@cacao-colab/types";

/**
 * Contrato de /api/v1/listings — Fase 0: sin Supabase real conectado
 * todavía. GET devuelve una lista vacía real (no inventada) con metadata
 * explícita; POST valida el shape del input contra el schema compartido y
 * responde 501 (not implemented) en vez de simular una creación exitosa.
 * Ver docs/12-SRS.md RF-9.
 */

const createListingInputSchema = listingSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial({ status: true, currency: true, minOrderQty: true, stockQty: true, territoryId: true });

export async function GET() {
  return NextResponse.json({
    data: [],
    meta: {
      note: "Supabase no está conectado todavía (Fase 0). Esta lista es real (vacía), no simulada.",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = createListingInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      ok: false,
      error: "not_implemented",
      note: "El shape del input es válido, pero la escritura a Supabase todavía no está conectada (Fase 0).",
    },
    { status: 501 },
  );
}
