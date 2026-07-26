import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from "@cacao-colab/types";

/** Ver docs/12-SRS.md RF-10. Mismo patrón que /listings: Fase 0 valida el shape, no persiste. */
const createOrderInputSchema = orderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  commissionCents: true,
  totalCents: true,
  stripePaymentIntentId: true,
});

export async function GET() {
  return NextResponse.json({
    data: [],
    meta: { note: "Supabase no está conectado todavía (Fase 0)." },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = createOrderInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues }, { status: 400 });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "not_implemented",
      note:
        "El shape es válido. Falta: Supabase real + Stripe Connect (packages/stripe-client) " +
        "para calcular comisión y crear el payment intent — ver docs/08-PAGOS.md.",
    },
    { status: 501 },
  );
}
