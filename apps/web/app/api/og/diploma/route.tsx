import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

/** OG image for shareable diplomas (muro / LinkedIn / X). */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const name = (searchParams.get("name") ?? "Nodo Colab").slice(0, 60)
  const title = (searchParams.get("title") ?? "Diploma Cacao Colab").slice(0, 80)
  const grade = (searchParams.get("grade") ?? "Especialidad aprobada").slice(0, 48)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background:
            "linear-gradient(145deg, #1a120c 0%, #2d1a12 45%, #0f2a1c 100%)",
          color: "#F7F1EE",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 22, color: "#F2C830", letterSpacing: 4, fontWeight: 700 }}>
            CACAO COLAB · DIPLOMA DIGITAL
          </div>
          <div style={{ fontSize: 28, color: "rgba(247,241,238,0.65)" }}>{title}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 22, color: "rgba(247,241,238,0.45)" }}>Certifica que</div>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>{name}</div>
          <div
            style={{
              marginTop: 8,
              fontSize: 28,
              color: "#FF6A3D",
              fontWeight: 700,
            }}
          >
            {grade}
          </div>
        </div>
        <div style={{ fontSize: 20, color: "rgba(247,241,238,0.4)" }}>cacaocolab.org</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
