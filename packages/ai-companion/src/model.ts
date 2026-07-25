import { anthropic } from "@ai-sdk/anthropic";

/**
 * Mismo patrón que Caua-Corp/caua-io/lib/emily-io/model.ts: @ai-sdk/anthropic directo,
 * NO Vercel AI Gateway (el Gateway exige tarjeta de crédito en el team incluso para créditos
 * gratis — comentario original de ese archivo, sigue aplicando acá).
 */
export const dualitaModel = anthropic("claude-sonnet-5");
