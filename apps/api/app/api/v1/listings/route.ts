import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@cacao-colab/supabase-client";

/**
 * RF-6 (docs/12-SRS.md) — listings del marketplace. Scaffold: requiere supabase/migrations
 * 0001_marketplace.sql aplicada. GET es público (solo status='published'); POST requiere sesión
 * autenticada del vendedor (auth se resuelve en Fase 1, ver docs/06-ARQUITECTURA.md).
 */

const createListingSchema = z.object({
  organizationId: z.string().uuid().nullable().optional(),
  profileId: z.string().uuid().nullable().optional(),
  territoryId: z.string().uuid().nullable().optional(),
  category: z.string(),
  title: z.string().min(3),
  description: z.string().nullable().optional(),
  unit: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().default("USD"),
  minOrderQty: z.number().int().positive(),
  stockQty: z.number().int().nonnegative(),
  traceabilityLotCode: z.string().nullable().optional(),
  certifications: z.array(z.string()).default([]),
});

export async function GET(req: NextRequest) {
  const db = createServiceClient();
  const territoryId = req.nextUrl.searchParams.get("territoryId");
  const category = req.nextUrl.searchParams.get("category");

  let query = db.from("listings").select("*").eq("status", "published");
  if (territoryId) query = query.eq("territory_id", territoryId);
  if (category) query = query.eq("category", category);

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, listings: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createListingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const db = createServiceClient();
  const { data, error } = await db
    .from("listings")
    .insert({
      organization_id: parsed.data.organizationId ?? null,
      profile_id: parsed.data.profileId ?? null,
      territory_id: parsed.data.territoryId ?? null,
      category: parsed.data.category,
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      unit: parsed.data.unit,
      price_cents: parsed.data.priceCents,
      currency: parsed.data.currency,
      min_order_qty: parsed.data.minOrderQty,
      stock_qty: parsed.data.stockQty,
      traceability_lot_code: parsed.data.traceabilityLotCode ?? null,
      certifications: parsed.data.certifications,
      status: "draft", // publicación requiere moderación de admin — ver docs/12-SRS.md RF-6
    })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, listing: data }, { status: 201 });
}
