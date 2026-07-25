import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { dualitaModel, DUALITA_SYSTEM_PROMPT, dualitaTools } from "@cacao-colab/ai-companion";

/**
 * Mismo patrón que Caua-Corp/caua-io/app/api/chat/route.ts (Emily) — streamText + tools server-side
 * con `execute`, tope de pasos con stepCountIs para no dejar la conversación en loop de tool-calls.
 * Ver docs/10-DUALITA-IA.md para el diseño completo (guardrails, memoria en Postgres).
 */
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: dualitaModel,
    system: DUALITA_SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
    tools: dualitaTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
