import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "cacao-colab-api", version: "0.1.0" });
}
