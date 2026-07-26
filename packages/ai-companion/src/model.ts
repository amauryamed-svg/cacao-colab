import { anthropic } from "@ai-sdk/anthropic";
import { streamText, type ModelMessage } from "ai";
import { DUALITA_SYSTEM_PROMPT } from "./prompts";
import { dualitaTools } from "./tools";

/**
 * Mismo patrón que caua-io/lib/emily-io/model.ts: `streamText` +
 * `tool()`, `anthropic('claude-sonnet-5')` directo (sin AI Gateway). Se
 * portó porque ya es la infraestructura probada del ecosistema Caúa — no
 * hay que reinventar el wiring de streaming.
 *
 * Requiere `ANTHROPIC_API_KEY` en el entorno. En Fase 0 esto solo se
 * ejercita si se llama explícitamente; no bloquea el build ni el resto
 * del sitio si falta la key.
 */
export function streamDualitaCompanion(messages: ModelMessage[]) {
  return streamText({
    model: anthropic("claude-sonnet-5"),
    system: DUALITA_SYSTEM_PROMPT,
    messages,
    tools: dualitaTools,
  });
}
