import { NextRequest, NextResponse } from "next/server";
import { membershipSchema } from "@cacao-colab/types";

/** Ver docs/12-SRS.md RF-11 y docs/08-PAGOS.md (Stripe Subscriptions sobre Connect). */
const createMembershipInputSchema = membershipSchema.pick({
  organizationId: true,
  planId: true,
});

export async function GET() {
  return NextResponse.json({
    data: [],
    meta: { note: "Supabase no está conectado todavía (Fase 0)." },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = createMembershipInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues }, { status: 400 });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "not_implemented",
      note: "Falta Stripe Connect real y proyecto Supabase — ver docs/08-PAGOS.md.",
    },
    { status: 501 },
  );
}
