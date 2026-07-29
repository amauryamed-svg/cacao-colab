import { tool } from "ai";
import { z } from "zod";

/**
 * Tools del companion — puerto del patrón de herramientas de Emily
 * (caua-io/lib/emily-io/model.ts usa `tool()` de Vercel AI SDK). Por ahora
 * son stubs de solo-lectura: devuelven datos de contenido de la lección
 * actual, nunca escriben ni disparan acciones de negocio (ver guardrail
 * #1 en prompts.ts). La escritura real a `learner_progress`/`xp_ledger`
 * pasa por apps/api, no por el companion directamente.
 */

export const getLessonTipTool = tool({
  description:
    "Devuelve un tip corto y verificado sobre la lección actual, para variar la conversación sin repetir el contenido base.",
  inputSchema: z.object({
    lessonSlug: z.string().describe("Slug de la lección actual, ej. 'cacao-bioactivo'"),
  }),
  execute: async ({ lessonSlug }: { lessonSlug: string }) => {
    // Placeholder — Fase 1 conecta esto a `lessons.companionTips` real vía
    // Supabase en lugar de devolver un string fijo.
    return {
      lessonSlug,
      tip: "Aún no hay tips cargados desde la base de datos real — esto es un stub de Fase 0.",
    };
  },
});

export const redirectToMarketplaceTool = tool({
  description:
    "Cuando el usuario expresa intención de comprar, usa esta tool para generar el link correcto al marketplace en vez de intentar cerrar la venta en el chat.",
  inputSchema: z.object({
    listingSlug: z.string().optional().describe("Slug del listing si se conoce, si no se omite"),
  }),
  execute: async ({ listingSlug }: { listingSlug?: string }) => {
    return {
      url: listingSlug ? `/marketplace/${listingSlug}` : "/marketplace",
    };
  },
});

export const explainMazorcasPolicyTool = tool({
  description:
    "Explica cómo se ganan y usan las Mazorcas Doradas, diferenciándolas de XP y evitando cualquier mecánica de reclutamiento.",
  inputSchema: z.object({ topic: z.enum(["earn", "ranks", "redeem", "anti-fraud"]).default("earn") }),
  execute: async ({ topic }: { topic: "earn" | "ranks" | "redeem" | "anti-fraud" }) => ({
    topic,
    currency: "Mazorcas Doradas",
    cashValue: false,
    referralRewards: false,
    earningSources: ["aprendizaje verificado", "cuidado con límites", "aporte comunitario aprobado", "compra verificada"],
    note: "XP mide progreso educativo; Mazorcas Doradas son puntos de fidelidad sujetos a términos y disponibilidad.",
  }),
});

export const redirectToBenefitsTool = tool({
  description: "Genera el enlace al catálogo transparente de beneficios de Mazorcas Doradas.",
  inputSchema: z.object({ brandKey: z.string().optional() }),
  execute: async ({ brandKey }: { brandKey?: string }) => ({
    url: brandKey ? `/marketplace/beneficios?marca=${encodeURIComponent(brandKey)}` : "/marketplace/beneficios",
  }),
});

export const getBrandConnectorStatusTool = tool({
  description:
    "Informa si una marca tiene integración ecommerce activa. Nunca afirma cupones, stock ni descuentos no configurados.",
  inputSchema: z.object({ brandKey: z.string() }),
  execute: async ({ brandKey }: { brandKey: string }) => ({
    brandKey,
    status: "inactive",
    redeemableNow: false,
    note: "Los conectores permanecen inactivos hasta acuerdo, credenciales, términos y prueba de fulfillment.",
  }),
});

export const dualitaTools = {
  getLessonTip: getLessonTipTool,
  redirectToMarketplace: redirectToMarketplaceTool,
  explainMazorcasPolicy: explainMazorcasPolicyTool,
  redirectToBenefits: redirectToBenefitsTool,
  getBrandConnectorStatus: getBrandConnectorStatusTool,
};
