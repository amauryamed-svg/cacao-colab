import { tool } from "ai";
import { z } from "zod";
import { createServiceClient } from "@cacao-colab/supabase-client";
import { upsertContact } from "@cacao-colab/hubspot-client";

/**
 * Tools server-side (con `execute`), mismo patrón que analyzeWebsite/captureLead en
 * caua-io/app/api/chat/route.ts. No usamos el patrón client-side (tool sin `execute`, resuelto
 * en el browser vía onToolCall) porque Dualita no necesita ejecutar acciones de UI del navegador —
 * todo lo que hace es leer/escribir datos del propio backend.
 *
 * NOTA: requieren supabase/migrations aplicadas (tablas learner_progress, xp_ledger, lessons,
 * posts) y HUBSPOT_ACCESS_TOKEN configurada — no probadas contra datos reales todavía. Verificar
 * la firma exacta de `tool()` contra la versión de "ai" instalada al hacer `pnpm install`.
 */

export const getLearnerProgress = tool({
  description: "Devuelve el progreso de aprendizaje (lecciones completadas, XP, racha) del usuario actual",
  parameters: z.object({ profileId: z.string().uuid() }),
  execute: async ({ profileId }) => {
    const db = createServiceClient();
    const [{ data: progress }, { data: streak }, { data: xp }] = await Promise.all([
      db.from("learner_progress").select("lesson_id, status, completed_at").eq("profile_id", profileId),
      db.from("streaks").select("current_streak, longest_streak").eq("profile_id", profileId).maybeSingle(),
      db.from("xp_ledger").select("amount").eq("profile_id", profileId),
    ]);
    const totalXp = (xp ?? []).reduce((sum, row) => sum + row.amount, 0);
    return { progress: progress ?? [], streak: streak ?? null, totalXp };
  },
});

export const suggestNextLesson = tool({
  description: "Sugiere la siguiente lección incompleta del track de microlearning o MOOC del usuario",
  parameters: z.object({ profileId: z.string().uuid(), track: z.enum(["mooc_zurych", "micro_caua"]) }),
  execute: async ({ profileId, track }) => {
    const db = createServiceClient();
    const { data } = await db
      .from("lessons")
      .select("id, slug, title, module_id, modules!inner(course_id, courses!inner(track))")
      .eq("modules.courses.track", track)
      .not("id", "in", db.from("learner_progress").select("lesson_id").eq("profile_id", profileId).eq("status", "completed"))
      .order("position", { ascending: true })
      .limit(1)
      .maybeSingle();
    return { nextLesson: data ?? null };
  },
});

export const explainConcept = tool({
  description: "Explica un concepto de cacao/chocolate usando contenido real publicado (posts del blog o lecciones), nunca conocimiento inventado",
  parameters: z.object({ query: z.string() }),
  execute: async ({ query }) => {
    const db = createServiceClient();
    // Cap a ~8000 chars por resultado, mismo límite que lib/emily-io/firecrawl.ts usa para grounding.
    const { data } = await db
      .from("posts")
      .select("title, content_mdx")
      .textSearch("content_mdx", query)
      .limit(3);
    return {
      sources: (data ?? []).map((p) => ({ title: p.title, excerpt: p.content_mdx.slice(0, 8000) })),
    };
  },
});

export const flagBuyerIntent = tool({
  description: "Registra intención de compra/venta detectada en la conversación como lead en el CRM/HubSpot compartido",
  parameters: z.object({
    profileId: z.string().uuid(),
    email: z.string().email(),
    fullName: z.string(),
    intentSummary: z.string(),
  }),
  execute: async ({ email, fullName, intentSummary }) => {
    const token = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!token) return { ok: false, error: "HUBSPOT_ACCESS_TOKEN no configurada" };
    // Prefijo [Dualita] para no mezclar la fuente del lead con [Emily-CauaIO]/[Emily-Alignment].
    const result = await upsertContact(token, {
      email,
      firstname: fullName,
      lifecyclestage: "lead",
      hs_lead_status: "NEW",
      jobtitle: `[Dualita] ${intentSummary}`.slice(0, 255),
    });
    return { ok: result.ok, action: result.action };
  },
});

export const dualitaTools = {
  getLearnerProgress,
  suggestNextLesson,
  explainConcept,
  flagBuyerIntent,
};
