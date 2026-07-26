# Cacao Colab — Dualita IA (companion) (v2)

> Nuevo en v2. Última actualización: 2026-07-26.

---

## 1. Qué es

Dualita hoy (Spec v1) es una mascota/companion con mensajes **estáticos** por lección (`components/aprende/DualitaCompanion.tsx` + strings en `apps/web/lib/lessons.ts`). En v2, se porta el patrón de "Emily" (el companion de `caua-io`) para que Dualita responda con IA real, manteniendo el mismo rol pedagógico y los mismos guardrails de no-venta-directa.

---

## 2. Por qué portar el patrón de Emily y no construir uno nuevo

`Caua-Corp/caua-io/lib/emily-io/{model,firecrawl,prompts}.ts` + `app/api/chat/route.ts` es infraestructura **ya en producción** dentro del ecosistema Caúa: `streamText` + `tool()` de Vercel AI SDK, `anthropic('claude-sonnet-5')` directo (sin AI Gateway de por medio). Portarlo a `packages/ai-companion` evita reinventar el wiring de streaming, manejo de tool calls y guardrails desde cero.

**Diferencia clave con Emily:** Emily guarda memoria de conversación en un HubSpot deal usado como KV store (un hack). Dualita usa Postgres real (`companion_conversations`/`companion_messages`/`companion_memory`, ver `07-MODELO-DATOS.md`) — no hay razón para repetir ese hack en un dominio nuevo cuando ya existe una base de datos real disponible.

---

## 3. Arquitectura (`packages/ai-companion`)

```
src/
  model.ts      ← streamDualitaCompanion(messages) — streamText + anthropic('claude-sonnet-5')
  prompts.ts    ← DUALITA_SYSTEM_PROMPT — guardrails
  tools.ts      ← dualitaTools — getLessonTip, redirectToMarketplace (stubs de solo lectura)
  firecrawl.ts  ← puerto opcional, no usado por Dualita hoy (ver §5)
```

### Guardrails (idénticos en espíritu a los de Emily)

1. **Nunca cierra una venta ni toma un pedido en el chat.** Cualquier intención de compra se redirige al marketplace real vía la tool `redirectToMarketplace`, nunca se simula un checkout dentro del chat.
2. **Nunca inventa disponibilidad, precio o promesas de entrega.**
3. **Nunca nombra a un Guardián/agricultor individual por nombre** — el contenido de origen es por territorio (ver nota de cumplimiento en `apps/web/lib/territories.ts` y `04-ACTORES.md`).
4. **Admite cuando no sabe algo** — no rellena con una respuesta genérica que suene autoritativa.
5. **Tono:** tuteo bogotano (nunca voseo), cercano y profesional.

Estos guardrails viven en `prompts.ts` como parte del system prompt — no son un filtro post-hoc, son la instrucción principal del modelo.

---

## 4. Memoria de conversación

A diferencia de Emily (HubSpot-deal-como-KV), Dualita usa:

- `companion_conversations` — una fila por sesión de chat, opcionalmente ligada a `profile_id` y `lesson_id`.
- `companion_messages` — mensajes individuales (`role`: user/assistant/tool).
- `companion_memory` — pares clave/valor de largo plazo por profile (ej. "ya completó el módulo de fermentación", "prefiere respuestas cortas") — sin vector store todavía; es una tabla simple, no hay RAG en esta fundación.

---

## 5. `firecrawl.ts` — portado pero no usado activamente

Se portó el wrapper de Firecrawl de `emily-io` por completitud del patrón, pero Dualita no tiene hoy un caso de uso de scraping (no busca contenido externo). Queda disponible para cuando el blog de tendencias (Fase 2-3) necesite research automatizado de fuentes externas (ej. precios de bolsa de cacao, tendencias Callebaut/Valrhona) — no está wireado a ninguna tool del companion todavía.

---

## 6. Qué falta para que esto sea real

1. **`ANTHROPIC_API_KEY`** en Vercel (`apps/web`, donde vive el companion).
2. **Proyecto Supabase real** — sin él, `companion_conversations`/`companion_messages`/`companion_memory` no persisten (el companion podría funcionar sin memoria persistente como fallback temporal, pero no es el diseño final).
3. **Conectar `DualitaCompanion.tsx`** (hoy muestra strings estáticos de `lib/lessons.ts`) a un endpoint que llame `streamDualitaCompanion()` — no implementado en esta pasada, es Fase 2.
4. Definir si el companion es el mismo en web y mobile, o si mobile tiene una versión reducida (sin streaming, por ejemplo) — decisión de UX pendiente con Hellen.
