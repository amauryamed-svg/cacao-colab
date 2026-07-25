# Cacao Colab — Software Requirements Specification (SRS) v2

> Continúa la numeración RF-1..RF-5 de `00-SPEC.md` v1 (no se reinicia). Requerimientos no
> funcionales, contratos de API y criterios de aceptación pensados para que Oscar y Hellen puedan
> ejecutar sin depender de Amaury para cada decisión de detalle.

---

## 1. Requerimientos funcionales

RF-1 a RF-5 (heredados de v1: plataforma web, onboarding gate, integración HubSpot, email de
seguimiento, HoReCa landing) — ver `00-SPEC.md` v1 en el historial de git y `03-HUBSPOT.md`. Sin
cambios funcionales, solo de ubicación de archivos (`apps/web/`) y renombre de env var (D18).

### RF-6 — Listings del marketplace

- Un `profile` con `actor_role` farmer/chocolatier/maquilador puede crear un listing (`POST /api/v1/listings`).
- Un listing en estado `draft` no es visible públicamente hasta moderación manual (Fase 5-6).
- `GET /api/v1/listings` es público, filtrable por `territoryId`/`category`, devuelve solo `status='published'`.
- **Criterio de aceptación:** un usuario sin sesión puede hacer `GET /api/v1/listings` y recibir solo listings publicados; un intento de `POST` sin `profileId`/`organizationId` válido falla con 400.

### RF-7 — Checkout transaccional

- `POST /api/v1/orders` crea una orden + items, resuelve la comisión vigente (`commission_rules`, fallback 800 bps) y genera un `PaymentIntent` de Stripe como destination charge.
- La orden se crea en estado `pending` **antes** de llamar a Stripe — si Stripe falla, la orden queda `pending` sin `stripe_payment_intent_id`, no se duplica en el reintento.
- **Criterio de aceptación:** en modo test de Stripe, una orden con 1 item resulta en `commission_ledger` con `commission_amount_cents = round(subtotal × rate_bps / 10000)` exacto.

### RF-8 — Membresías

- `POST /api/v1/memberships` crea una Checkout Session de Stripe en modo `subscription` para un `membership_plans.slug` existente.
- El webhook `customer.subscription.*` mantiene `memberships.status` sincronizado.
- **Criterio de aceptación:** tras completar un checkout de prueba, `memberships.status = 'active'` y `current_period_end` coincide con el período de Stripe.

### RF-9 — LMS data-driven

- `courses`/`modules`/`lessons`/`quizzes` reemplazan los arrays hardcodeados de v1 (`lib/dualita.ts`, `lib/lessons.ts`).
- Completar una lección registra `learner_progress.status='completed'` y una entrada en `xp_ledger` con `reason='lesson_completed'`.
- **Criterio de aceptación:** el XP total de un profile (`SUM(xp_ledger.amount)`) coincide con la suma de `xp_reward` de sus lecciones completadas + bonos de quiz/racha aplicables.

### RF-10 — Gamificación

- `leaderboard_weekly` muestra **solo usuarios reales**, sin datos simulados (ver `09-GAMIFICACION.md` § 3 — corrección explícita respecto al prototipo Python que usaba bots).
- Badges se otorgan por criterios verificables (ej. completar N lecciones), no manualmente sin trazabilidad.
- **Criterio de aceptación:** revisar `leaderboard_weekly` y confirmar que cada fila tiene un `profile_id` real con actividad correspondiente en `xp_ledger`.

### RF-11 — Companion Dualita con IA

- `POST /api/v1/dualita/chat` streamea respuestas usando `packages/ai-companion`, con las 4 tools definidas en `10-DUALITA-IA.md`.
- El companion nunca cierra una venta ni cotiza precio final (guardrail en `DUALITA_SYSTEM_PROMPT`).
- **Criterio de aceptación:** una conversación de prueba que pregunte "¿cuánto cuesta X?" resulta en una respuesta que deriva al listing/checkout real, no en un precio inventado por el modelo.

### RF-12 — CRM interno + sync HubSpot

- Los 3 colaboradores pueden ver/editar `crm_contacts`/`crm_activities` vía `apps/web/admin` (Fase 6, no implementado en el scaffold de esta sesión).
- El sync con HubSpot usa `hubspot_sync_log` para evitar loops (ver `14-CRM-INTERNO.md`).
- **Criterio de aceptación:** 10 ciclos de sincronización de prueba (ida y vuelta) no producen más de 1 push saliente real por cambio de estado — el resto se marca `skipped_no_change`.

### RF-13 — App móvil

- `apps/mobile` ofrece marketplace (lectura), aprende y perfil como mínimo (Fase 5); checkout y companion IA en fases posteriores.
- Auth compartida con `apps/web` vía Supabase Auth.
- **Criterio de aceptación:** un usuario que se registra en `apps/web` puede iniciar sesión con las mismas credenciales en `apps/mobile`.

---

## 2. Requerimientos no funcionales

### RNF-1 — Rendimiento
- P95 de `GET /api/v1/listings` bajo 500ms con hasta 10K listings publicados.
- Streaming del companion IA debe emitir el primer token en menos de 2s (P95).

### RNF-2 — Disponibilidad
- `apps/api` y `apps/web` en Vercel (SLA de la plataforma). Sin SLA propio adicional en año 1 —
  no se contrata infraestructura redundante propia a este volumen (ver `06-ARQUITECTURA.md` § costo).

### RNF-3 — Escala (10.000 usuarios en <3 meses)
- Conexión a Postgres **siempre** vía pooler Supavisor (6543, transaction mode) desde código serverless — nunca la directa (5432). Ver `06-ARQUITECTURA.md` § 3.
- Rate limiting en `apps/api` (Upstash) antes de exponer el companion IA públicamente — evita abuso de costo de tokens.

### RNF-4 — Seguridad y cumplimiento
- RLS habilitado en **todas** las tablas de `supabase/migrations/*` — ninguna tabla queda sin `enable row level security`.
- Tablas financieras (`commission_ledger`, `commission_rules`, `crm_contacts`, `hubspot_sync_log`) sin policy de `select` para `authenticated` — acceso solo vía service role desde backend.
- Webhooks de Stripe verificados por firma (`constructWebhookEvent`) contra el raw body, nunca el body ya parseado.
- **Restricción de contenido heredada y verificada** (`apps/web/lib/territories.ts`, comentario en el propio código): los territorios (Huila, Santander, Meta, Arauca, Cundinamarca) se describen por perfil de sabor, **nunca nombrando Guardianes individuales** hasta que su compensación esté liquidada — solo 3 de 5 están "Activo" a la fecha de este documento. Esta restricción aplica a **todo** contenido nuevo de v2 (blog, listings, marketing de territorio) que toque estos 5 territorios, no solo al código heredado.
- PII de farmers/chocolatiers/maquiladores (nombre, teléfono, ubicación de finca) protegida por RLS de `profiles` — nunca expuesta en `GET /api/v1/listings` público más allá de lo que el vendedor decida publicar en el listing mismo.

### RNF-5 — Auditabilidad
- `commission_ledger` y `xp_ledger` son append-only — ninguna ruta de la API debe hacer `UPDATE`/`DELETE` sobre montos ya escritos, solo `INSERT` de nuevas filas o cambios de `status`.

### RNF-6 — Internacionalización
- Español (es-CO) único idioma soportado en v2 — `profiles.locale` existe en el schema para extensión futura, sin implementación de i18n real todavía (fuera de alcance, ver `11-PRD.md` § 5).

---

## 3. Contratos de API (resumen — ver código en `apps/api/app/api/v1/*` para el detalle exacto)

| Endpoint | Método | Auth | Descripción |
|----------|--------|------|-------------|
| `/api/v1/health` | GET | Ninguna | Health check |
| `/api/v1/listings` | GET | Ninguna (público) | Lista listings publicados, filtrable |
| `/api/v1/listings` | POST | Sesión de vendedor | Crea listing en `draft` |
| `/api/v1/orders` | POST | Sesión de buyer | Crea orden + PaymentIntent |
| `/api/v1/memberships` | POST | Sesión de vendedor | Crea Checkout Session de suscripción |
| `/api/v1/dualita/chat` | POST | Sesión de usuario | Streaming del companion IA |
| `/api/v1/webhooks/stripe` | POST | Firma Stripe (`stripe-signature`) | Eventos de pagos/membresías |
| `/api/v1/webhooks/hubspot` | POST | Suscripción de HubSpot (no configurada aún) | Property changes de contactos |

Todos los cuerpos de request/response siguen los schemas de `packages/types` — cualquier cambio de
forma de datos se refleja primero ahí, no se improvisa `any` en un route handler.

---

## 4. Requisitos de integración

- **Supabase**: proyecto real pendiente (`supabase login`), migraciones en `supabase/migrations/0001-0008` en orden.
- **Stripe**: cuenta Connect de plataforma pendiente (KYC), modo test disponible sin esa cuenta para desarrollo local con claves de prueba propias de cada dev.
- **HubSpot**: token compartido de Caúa, renombrado a `HUBSPOT_ACCESS_TOKEN` (D18). Webhook de HubSpot requiere configurar la suscripción en el Private App — no se puede hacer sin acceso al panel de HubSpot compartido.
- **Anthropic**: `ANTHROPIC_API_KEY` propia del proyecto (no compartida con `caua-io`, para no mezclar cuotas/costos entre productos).
- **Expo/EAS**: cuenta de organización Expo pendiente de crear para builds de equipo (no una cuenta personal de un solo dev).

---

## 5. Criterios de aceptación — ya cubiertos arriba por RF. Resumen de "definición de hecho" por fase

- **Fase 5 (MVP):** RF-6, RF-9, RF-13 (parcial) cumplen sus criterios de aceptación contra datos de prueba, sin dinero real.
- **Fase 6 (pagos/CRM):** RF-7, RF-8, RF-12 cumplen sus criterios en modo test de Stripe.
- **Fase 7 (lanzamiento):** RF-10, RF-11, RF-13 (completo) cumplen sus criterios; RNF-3 verificado con prueba de carga sintética antes de cualquier campaña de adquisición.
