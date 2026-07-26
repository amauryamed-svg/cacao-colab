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
      tracks: ["mooc", "micro"],
      note:
        "Contenido real de módulos vive hoy en apps/web/lib/dualita.ts y lessons.ts " +
        "como seed local. Migra a Supabase (courses/modules/lessons) cuando exista el proyecto.",
    },
  });
}
