import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

/**
 * Thumbnail redes / WhatsApp · Master Cacaotier
 * - default: 1200×630 (link preview)
 * - ?v=square: 1080×1080 (stories / estado)
 */
export async function GET(request: NextRequest) {
  const square = request.nextUrl.searchParams.get("v") === "square"
  const width = square ? 1080 : 1200
  const height = square ? 1080 : 630

  const peptides = ["FASKDQPLNA", "FGVPSKL", "GINDYRL", "LAIN", "ESYF"]
  const notes = ["Floral", "Nuez", "Frutal", "Especiado"]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0E1809",
          color: "#F7F1EE",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Atmosphere */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 70% 60% at 8% 10%, rgba(242,200,48,0.28), transparent 52%), radial-gradient(ellipse 55% 50% at 95% 90%, rgba(134,182,107,0.22), transparent 48%), radial-gradient(ellipse 40% 35% at 70% 20%, rgba(220,119,95,0.14), transparent 50%)",
          }}
        />

        {/* Soft grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.12,
            backgroundImage:
              "linear-gradient(rgba(247,241,238,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(247,241,238,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Frame */}
        <div
          style={{
            position: "absolute",
            inset: square ? 36 : 28,
            border: "2px solid rgba(242,200,48,0.45)",
            borderRadius: square ? 36 : 28,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: square ? "72px 70px" : "52px 64px",
          }}
        >
          {/* Top brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: square ? 18 : 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: square ? 64 : 52,
                  height: square ? 64 : 52,
                  borderRadius: 999,
                  border: "3px solid #F2C830",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F2C830",
                  fontSize: square ? 22 : 18,
                  fontWeight: 900,
                  fontFamily: "sans-serif",
                }}
              >
                CC
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{
                    display: "flex",
                    color: "#F2C830",
                    fontSize: square ? 22 : 18,
                    fontWeight: 800,
                    letterSpacing: 7,
                    textTransform: "uppercase",
                    fontFamily: "sans-serif",
                  }}
                >
                  CACAO COLAB
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "rgba(247,241,238,0.55)",
                    fontSize: square ? 20 : 16,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    fontFamily: "sans-serif",
                  }}
                >
                  Master Cacaotier · CoEx × Arauca
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: square ? 14 : 8,
                marginTop: square ? 28 : 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: square ? 72 : 54,
                  fontWeight: 800,
                  lineHeight: 1.02,
                  maxWidth: square ? 920 : 860,
                }}
              >
                Del péptido al bouquet internacional
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: square ? 28 : 24,
                  color: "rgba(247,241,238,0.72)",
                  maxWidth: square ? 900 : 820,
                  lineHeight: 1.3,
                }}
              >
                Fermentación controlada Tc-pH → floral, nuez y frutal limpio para Japón y Europa
              </div>
            </div>
          </div>

          {/* Middle: peptide → aroma flow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: square ? 18 : 14,
              marginTop: square ? 36 : 8,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {peptides.map((p) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    background: "rgba(242,200,48,0.12)",
                    border: "1px solid rgba(242,200,48,0.45)",
                    borderRadius: 12,
                    color: "#F2C830",
                    fontFamily: "ui-monospace, Menlo, monospace",
                    fontSize: square ? 22 : 18,
                    fontWeight: 700,
                    padding: square ? "12px 18px" : "10px 14px",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                color: "#86B66B",
                fontSize: square ? 22 : 18,
                fontFamily: "sans-serif",
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              PÉPTIDO → VOLÁTIL → SABOR DE EXCELENCIA
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {notes.map((n) => (
                <div
                  key={n}
                  style={{
                    display: "flex",
                    background: "rgba(134,182,107,0.16)",
                    border: "1px solid rgba(134,182,107,0.45)",
                    borderRadius: 999,
                    color: "#F7F1EE",
                    fontSize: square ? 24 : 20,
                    fontWeight: 700,
                    padding: square ? "12px 22px" : "10px 18px",
                    fontFamily: "sans-serif",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              marginTop: square ? 28 : 4,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {["72 h metabolómico", "120 h sensorial", "Alta sibarita"].map((label) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      background: "rgba(247,241,238,0.06)",
                      border: "1px solid rgba(247,241,238,0.16)",
                      borderRadius: 10,
                      color: "rgba(247,241,238,0.78)",
                      fontSize: square ? 20 : 16,
                      fontWeight: 600,
                      padding: "8px 14px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  background: "#F2C830",
                  color: "#0E1809",
                  fontSize: square ? 26 : 22,
                  fontWeight: 800,
                  padding: square ? "14px 26px" : "12px 22px",
                  borderRadius: 14,
                  fontFamily: "sans-serif",
                  width: "fit-content",
                }}
              >
                www.cacaocolab.org/aprende/cacaotier
              </div>
            </div>

            {!square && (
              <div
                style={{
                  display: "flex",
                  width: 110,
                  height: 110,
                  borderRadius: 999,
                  border: "3px solid rgba(242,200,48,0.55)",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 4,
                  background: "rgba(14,24,9,0.65)",
                }}
              >
                <div style={{ display: "flex", color: "#F2C830", fontSize: 28, fontWeight: 900 }}>Tc</div>
                <div
                  style={{
                    display: "flex",
                    color: "rgba(247,241,238,0.55)",
                    fontSize: 14,
                    fontFamily: "sans-serif",
                    letterSpacing: 2,
                  }}
                >
                  pH
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { width, height },
  )
}
