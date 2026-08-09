import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

/**
 * OG 1200×630 — diploma de exhibición para LinkedIn / X / muro.
 * Colores cacao Colab (naranja · cream · forest), no plantilla genérica.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const name = (searchParams.get("name") ?? "Nodo Colab").slice(0, 48)
  const title = (searchParams.get("title") ?? "Diploma Cacao Colab").slice(0, 72)
  const grade = (searchParams.get("grade") ?? "Especialidad aprobada").slice(0, 42)
  const course = (searchParams.get("course") ?? "").slice(0, 40)

  const brand =
    course.includes("benevolo")
      ? "Chocolate Benevolo"
      : course.includes("catador")
        ? "Master Catador"
        : course.includes("chocolatier")
          ? "Master Chocolatier"
          : "Master Cacaotier"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#140e0a",
          color: "#F7F1EE",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Atmosphere */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 15% 0%, rgba(255,106,61,0.35), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(242,200,48,0.18), transparent 50%)",
            display: "flex",
          }}
        />

        {/* Outer frame */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "2px solid rgba(232,201,160,0.45)",
            borderRadius: 28,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(255,106,61,0.35)",
            borderRadius: 22,
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                color: "#F2C830",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              CACAO COLAB · DIPLOMA DIGITAL
            </div>
            <div style={{ display: "flex", fontSize: 34, color: "#FF6A3D", fontWeight: 800 }}>
              {brand}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "rgba(247,241,238,0.62)",
                maxWidth: 900,
              }}
            >
              {title}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 4,
                color: "rgba(247,241,238,0.4)",
                textTransform: "uppercase",
              }}
            >
              Certifica que
            </div>
            <div
              style={{
                display: "flex",
                fontSize: name.length > 28 ? 52 : 64,
                fontWeight: 800,
                lineHeight: 1.05,
                maxWidth: 980,
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: "#F2C830",
                  color: "#140e0a",
                  fontSize: 24,
                  fontWeight: 800,
                  padding: "12px 28px",
                  borderRadius: 999,
                }}
              >
                {grade}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                color: "rgba(247,241,238,0.45)",
                fontSize: 20,
              }}
            >
              <div style={{ display: "flex" }}>Oficio verificable · cacaotier</div>
              <div style={{ display: "flex", color: "#FF6A3D", fontWeight: 700 }}>
                cacaocolab.org
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: 96,
                height: 96,
                borderRadius: 999,
                border: "3px solid #F2C830",
                alignItems: "center",
                justifyContent: "center",
                color: "#F2C830",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              ◈
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
