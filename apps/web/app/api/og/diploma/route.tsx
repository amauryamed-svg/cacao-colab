import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

/**
 * OG 1200×630 — thumbnail LinkedIn / X / muro.
 * Diseñado para atraer certificación, no caja blanca.
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 15% 0%, rgba(255,106,61,0.38), transparent 55%), radial-gradient(ellipse 60% 50% at 92% 100%, rgba(242,200,48,0.22), transparent 50%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "2px solid rgba(232,201,160,0.5)",
            borderRadius: 28,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(255,106,61,0.4)",
            borderRadius: 22,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                color: "#F2C830",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              CACAO COLAB · DIPLOMA DIGITAL
            </div>
            <div style={{ display: "flex", fontSize: 36, color: "#FF6A3D", fontWeight: 800 }}>
              {brand}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "rgba(247,241,238,0.62)",
                maxWidth: 920,
              }}
            >
              {title}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
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
                fontSize: name.length > 28 ? 50 : 62,
                fontWeight: 800,
                lineHeight: 1.05,
                maxWidth: 980,
              }}
            >
              {name}
            </div>
            <div style={{ display: "flex", marginTop: 10, gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  background: "#F2C830",
                  color: "#140e0a",
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "12px 26px",
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
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{
                  display: "flex",
                  color: "rgba(247,241,238,0.5)",
                  fontSize: 20,
                }}
              >
                Oficio verificable · Fine-Flavor Colombia
              </div>
              <div
                style={{
                  display: "flex",
                  background: "#FF6A3D",
                  color: "#140e0a",
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "10px 22px",
                  borderRadius: 12,
                }}
              >
                Certifícate en cacaocolab.org
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: 92,
                height: 92,
                borderRadius: 999,
                border: "3px solid #F2C830",
                alignItems: "center",
                justifyContent: "center",
                color: "#F2C830",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              CC
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
