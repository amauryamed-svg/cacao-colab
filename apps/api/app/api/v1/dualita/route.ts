import { NextResponse } from "next/server";

/**
 * Ver docs/12-SRS.md RF-12. En Fase 0 devuelve la lista de cursos/tracks
 * disponible como referencia estática (mismo contenido que
 * apps/web/lib/dualita.ts) — cuando exista Supabase, esto pasa a leer de
 * `courses`/`modules`/`lessons` reales.
 */
export async function GET() {
  return NextResponse.json({
    data: {
      tracks: [
        { id: "mooc-contexto", owner: "Zurych", purpose: "historia, territorio y cultura" },
        { id: "micro-funcional", owner: "CAÚA", purpose: "cacao funcional y hábitos saludables" },
        { id: "master-cacaotier", owner: "Amaury Amed", purpose: "competencia profesional de finca y bioprocesos" },
        { id: "master-chocolatier", owner: "Amaury Amed", purpose: "transformación y aplicaciones" },
      ],
      registeredRoutes: ["/campus/arquitecto-fermentacion", "/juega"],
      note:
        "Contenido real de módulos vive hoy en apps/web/lib/dualita.ts y lessons.ts " +
        "como seed local. Migra a Supabase (courses/modules/lessons) cuando exista el proyecto.",
    },
  });
}
