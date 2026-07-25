# Cacao Colab — Dualita con IA real

> Port directo del patrón real de Emily (`Caua-Corp/caua-io/lib/emily-io/*` +
> `app/api/chat/route.ts`), no una reinvención. Implementado en `packages/ai-companion` +
> `apps/api/app/api/v1/dualita/chat/route.ts` — sin probar contra tráfico real todavía.

---

## 1. Por qué el patrón de Emily y no otro

`caua-io` tiene **dos** frameworks de agentes conviviendo: el patrón directo (`streamText` + `tool()`
del Vercel AI SDK) usado por Emily en `app/api/chat/route.ts`, y `eve` (paquete npm separado,
`defineAgent`/`eveChannel`/`defineTool`) usado para un widget de Alignment distinto y más complejo
(multi-canal). **Dualita v1 usa el patrón directo, no `eve`** — es lo que Oscar/Hellen necesitan
aprender una sola vez, y Dualita no tiene (todavía) un requisito de multi-canal que justifique la
complejidad extra de `eve`. Se reevalúa si algún día Dualita necesita WhatsApp/otros canales.

---

## 2. Arquitectura

```
packages/ai-companion/
  model.ts     dualitaModel = anthropic("claude-sonnet-5")  ← @ai-sdk/anthropic directo, NO AI Gateway
  prompts.ts   DUALITA_SYSTEM_PROMPT (tono + guardrail, ver sección 4)
  tools.ts     getLearnerProgress · suggestNextLesson · explainConcept · flagBuyerIntent

apps/api/app/api/v1/dualita/chat/route.ts
  streamText({ model: dualitaModel, system: DUALITA_SYSTEM_PROMPT, tools: dualitaTools,
               stopWhen: stepCountIs(5) })
  → result.toUIMessageStreamResponse()
```

**Por qué sin AI Gateway:** mismo motivo que Emily — el Gateway de Vercel exige tarjeta de crédito
en el team incluso para créditos gratis. `@ai-sdk/anthropic` directo con `ANTHROPIC_API_KEY` evita
esa fricción.

**`stopWhen: stepCountIs(5)`:** tope de pasos de tool-calling para que la conversación no quede en
loop — mismo patrón que Emily.

---

## 3. Tools (todas server-side, con `execute`)

Se usa el patrón server-side (con `execute`, mismo que `analyzeWebsite`/`captureLead` en Emily), no
el patrón client-side (tool sin `execute`, resuelto en el browser vía `onToolCall`) — Dualita no
necesita ejecutar acciones de UI del navegador, todo lo que hace es leer/escribir datos del propio backend.

| Tool | Qué hace | Tabla(s) |
|------|----------|----------|
| `getLearnerProgress` | Progreso, XP total, racha del usuario actual | `learner_progress`, `xp_ledger`, `streaks` |
| `suggestNextLesson` | Siguiente lección incompleta de un track | `lessons`, `modules`, `courses`, `learner_progress` |
| `explainConcept` | Explica un concepto usando contenido **real publicado** (posts/lecciones), nunca conocimiento inventado — mismo cap de ~8000 chars que `lib/emily-io/firecrawl.ts` usa para grounding | `posts` |
| `flagBuyerIntent` | Registra intención de compra/venta detectada como lead en HubSpot | vía `packages/hubspot-client`, prefijo `[Dualita]` en `jobtitle` para no mezclar la fuente del lead con `[Emily-CauaIO]`/`[Emily-Alignment]` |

---

## 4. Guardrail (mismo espíritu que `NEGOTIATION_GUARDRAIL` de Emily)

Definido en `packages/ai-companion/src/prompts.ts`. Reglas explícitas en el system prompt:

- **Nunca cierra una venta ni procesa un pago** — deriva al checkout real.
- **Nunca cotiza precio final ni confirma disponibilidad de stock** — solo lo que devuelva la
  tool de listings, siempre como "según el listado", no como promesa propia.
- **Nunca inventa certificaciones, orígenes o afirmaciones de producto** que no vengan de una
  fuente verificada (contenido publicado real, no conocimiento general del modelo). Esto es
  consistente con la regla de "no inventar claims sobre el producto" del resto del ecosistema Caúa.
- Tono: tuteo bogotano ("tú", nunca "vos/empezá") — mismo estándar de copy que el resto de la marca.

---

## 5. Memoria — por qué NO se copia el hack de Emily

Emily guarda memoria de organización como un JSON serializado en el campo `description` de un Deal
de HubSpot (`lib/emily-io/org-memory.ts`) — un workaround válido para un producto que **no tiene
base de datos propia**. Dualita sí tiene Supabase desde el día 1: `companion_conversations` +
`companion_messages` + `companion_memory` son tablas Postgres reales, con RLS por `profile_id`
(`auth.uid() = profile_id`). Es más defendible frente a la narrativa "enterprise-grade" que busca
la licencia futura a Luker/Nacional — un JSON escondido en un campo de HubSpot no resiste una
auditoría técnica seria.

---

## 6. Mobile — nota técnica de streaming

`useChat`/`DefaultChatTransport` de `@ai-sdk/react` **no streamea por defecto en React Native** — hay
que pasar `expo/fetch` (polyfill con `ReadableStream` real, Expo SDK 50+) como implementación de
`fetch` al hook, si no el stream llega bufferizado en vez de token a token. Verificar esto
explícitamente al implementar la pantalla de chat en `apps/mobile` (Fase 7). Ver `13-MOBILE.md`.

## 7. No implementado / no probado todavía

- Ninguna tool se ha ejecutado contra datos reales (requiere Supabase + `ANTHROPIC_API_KEY`).
- Verificación de la firma exacta de `tool()` contra la versión de `ai` que quede fijada tras `pnpm install` (el scaffold usa la forma de AI SDK v4/v7 con `parameters`; si el equipo fija una versión más nueva con `inputSchema`, ajustar `packages/ai-companion/src/tools.ts`).
- Cap de mensajes/día por tier de membresía (mencionado en `06-ARQUITECTURA.md` § rate limiting) — no implementado, solo documentado.
