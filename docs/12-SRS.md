# Cacao Colab — SRS (Software Requirements Specification) v2

> Documento nuevo, pedido explícitamente en el pivote v2. Última actualización: 2026-07-26.
> **La numeración de RF continúa desde `00-SPEC.md` (RF-1 a RF-5, Spec v1) — no se reinicia.** Este documento empieza en RF-6.
> Los contratos de API y criterios de aceptación de abajo están escritos para que Oscar/Hellen puedan verificarlos sin depender de que Amaury esté disponible.

---

## 1. Requerimientos funcionales (RF-6 en adelante)

### RF-6 — Monorepo y scaffolding de las 3 apps

- El repo se reestructura a `apps/{web,api,mobile}` + `packages/*` vía pnpm workspaces + Turborepo.
- **Criterio de aceptación:** `pnpm turbo build` y `pnpm turbo lint` terminan en 0 para las 3 apps y los 6 packages, corriendo desde la raíz del repo sin configuración adicional.

### RF-7 — Modelo de datos (Supabase)

- 11 migraciones SQL cubren los dominios: organizaciones/territorios, perfiles/roles, listings, órdenes/comisión, membresías/cuentas conectadas, LMS, gamificación, companion, blog, CRM, portal interno.
- **Criterio de aceptación:** `supabase db push` (una vez exista el proyecto) aplica las 11 migraciones en orden sin error de sintaxis ni de dependencia entre FKs. Verificable localmente hoy con `supabase db start` + `supabase db reset` (Postgres local, sin necesidad de proyecto en la nube) — no se corrió en esta pasada porque requiere Docker corriendo, pero el SQL fue revisado manualmente.

### RF-8 — Cuentas de marketplace y roles de actor

- Un usuario de marketplace se registra vía Supabase Auth y obtiene un `profile` automáticamente (trigger `handle_new_marketplace_user`).
- Puede declarar uno o más `actor_roles` (`farmer`/`chocolatier`/`maquilador`/`buyer`).
- **Criterio de aceptación:** insertar una fila en `auth.users` (simulado localmente) crea automáticamente la fila correspondiente en `profiles` con `email` y `full_name` poblados desde `raw_user_meta_data` o el prefijo del email.

### RF-9 — Listings

- `POST /api/v1/listings` valida el body contra `createListingInputSchema` (derivado de `listingSchema` en `@cacao-colab/types`) y responde `400` con los errores de Zod si el shape es inválido, `501` si es válido pero Supabase no está conectado.
- `GET /api/v1/listings` responde `200` con `{ data: [], meta: {...} }` — lista vacía real, nunca datos simulados.
- **Criterio de aceptación (verificable hoy sin Supabase):** `curl -X POST /api/v1/listings -d '{}'` responde `400` con detalle de campos faltantes; `curl -X POST /api/v1/listings -d '<payload válido>'` responde `501` con nota explícita.

### RF-10 — Órdenes

- `POST /api/v1/orders` valida contra `createOrderInputSchema` (subset de `orderSchema` sin campos calculados por el servidor: `status`, `commissionCents`, `totalCents`, `stripePaymentIntentId`).
- **Criterio de aceptación:** igual patrón que RF-9 — `400` en input inválido, `501` en input válido sin backend conectado.

### RF-11 — Membresías

- `POST /api/v1/memberships` valida `{ organizationId, planId }` contra `membershipSchema.pick(...)`.
- **Criterio de aceptación:** igual patrón que RF-9/RF-10.

### RF-12 — Contenido de Dualita (API)

- `GET /api/v1/dualita` responde la lista de tracks disponibles (`mooc`/`micro`) como referencia — no lee de Supabase todavía, apunta a `apps/web/lib/dualita.ts` como fuente real hoy.
- **Criterio de aceptación:** `curl /api/v1/dualita` responde `200` con `{ data: { tracks: ["mooc","micro"], note: "..." } }`.

### RF-13 — Gamificación (esquema, sin UI en esta pasada)

- Tablas `learner_progress`/`xp_ledger`/`streaks`/`badges`/`profile_badges`/`leaderboard_weekly` existen en la migración `0007`, con RLS scoped por usuario.
- **Fuera de alcance de esta pasada:** UI de XP/rachas/badges/leaderboard — ver `09-GAMIFICACION.md` y `05-ROADMAP.md` Fase 2.

### RF-14 — Companion IA (esquema + package, sin conexión a UI en esta pasada)

- `packages/ai-companion` expone `streamDualitaCompanion(messages)` con guardrails de no-venta-directa.
- Tablas `companion_conversations`/`companion_messages`/`companion_memory` existen (migración `0008`).
- **Criterio de aceptación:** `pnpm --filter @cacao-colab/ai-companion build` (type-check) pasa sin errores. Ejercitar `streamDualitaCompanion` en runtime requiere `ANTHROPIC_API_KEY` — no verificado en esta pasada, es Fase 2.

### RF-15 — Webhooks (Stripe + HubSpot)

- `POST /api/v1/webhooks/stripe` verifica firma si hay `STRIPE_WEBHOOK_SECRET`; responde `501` (`StripeNotConfiguredError`) si no hay `STRIPE_SECRET_KEY`; responde `400` si falta la firma o el secreto.
- `POST /api/v1/webhooks/hubspot` calcula el hash SHA-256 del payload y lo devuelve — no persiste todavía (sin Supabase).
- **Criterio de aceptación:** `curl -X POST /api/v1/webhooks/stripe` sin header `stripe-signature` responde `400`; `curl -X POST /api/v1/webhooks/hubspot -d '{"a":1}'` responde `200` con un `payloadHash` de 64 caracteres hex.

### RF-16 — Portal interno `/equipo` (agregado 2026-07-26 durante la ejecución)

- Login vía Supabase Auth (magic link, `signInWithOtp`), sin password.
- Middleware (`apps/web/middleware.ts`) scoped a `/equipo/*` y `/auth/*` refresca la sesión.
- `/equipo` (protegido): si no hay sesión, redirige a `/equipo/login`; si hay sesión pero el email no está en `team_members`, muestra mensaje explícito (no error 500); si está, muestra `TeamWelcome` ("Hola {nombre}") + `TeamHubspotPanel`.
- El panel de HubSpot: si `team_members.hubspot_contact_email` es `null` → estado vacío explícito ("sin contacto vinculado"); si tiene valor pero el contacto no existe en HubSpot → estado vacío distinto ("no existe en HubSpot todavía"); si existe → datos reales (propiedades + deals asociados).
- **Criterio de aceptación (verificable hoy sin Supabase):** `pnpm --filter @cacao-colab/web build` compila sin error de tipos las rutas `/equipo`, `/equipo/login`, `/auth/callback`. Verificación end-to-end del login real requiere el proyecto Supabase (fuera de alcance de esta pasada) — ver `14-CRM-INTERNO.md`.
- **Dato verificado 2026-07-26:** Hellen Bareño (`hellenandba@gmail.com`) tiene contacto real en HubSpot; Oscar Gamboa (`amadooscarito@gmail.com`) no (buscado por nombre/apellido/compañía, cero resultados).

### RF-17 — App móvil (placeholder)

- Expo Router con 3 tabs: `index` (marketplace, solo lectura, datos placeholder explícitamente marcados como no-reales), `aprende` (tracks Dualita, sin gamificación), `perfil` (sin login todavía).
- **Criterio de aceptación:** `pnpm --filter @cacao-colab/mobile build` (type-check) pasa; `npx expo export --platform ios` y `--platform android` empaquetan sin errores (verificado en esta pasada: 1605/1693 módulos, bundles Hermes generados). Ver `13-MOBILE.md` para el detalle de qué se pudo y no se pudo verificar sin un dispositivo/simulador real (renderizado visual en Expo Go).

### RF-18 — CRM interno + sync HubSpot

- `crm_contacts`/`crm_activities`/`hubspot_sync_log` con RLS `service_role`-only.
- Anti-loop: comparar `payload_hash` antes de escribir en cualquier dirección (`to_hubspot`/`from_hubspot`).
- **Fuera de alcance de esta pasada:** el job/endpoint que efectivamente sincroniza en ambas direcciones — hoy solo existe el webhook receptor (RF-15) y el modelo de datos.

### RF-19 — Blog

- `posts`/`tags`/`post_tags` con RLS de lectura pública solo para `status='published'`.
- **Fuera de alcance de esta pasada:** UI del blog en `apps/web` — no se construyó ninguna ruta `/blog` todavía, es Fase 2-3 (ver `05-ROADMAP.md`).

### RF-20 — Observabilidad (Sentry)

- `@sentry/nextjs` instalado y configurado (modo no-op sin DSN) en `apps/web` y `apps/api`.
- **Criterio de aceptación:** el build de ambas apps incluye la instrumentación de Sentry (`instrumentation.ts`/`instrumentation-client.ts`) sin fallar aunque `SENTRY_DSN` esté vacío — verificado en esta pasada (`pnpm turbo build` en verde).
- **Fuera de alcance de esta pasada:** Sentry en `apps/mobile` — no se agregó `@sentry/react-native` (requiere configuración nativa/EAS que no se pudo verificar sin build nativo real, ver `13-MOBILE.md`).

### RF-21 — Deploy e infraestructura Vercel

- Proyectos Vercel `cacao-colab-web` (root: `apps/web`) y `cacao-colab-api` (root: `apps/api`) creados bajo la cuenta del usuario, desplegados y con alias estable en `*.vercel.app`.
- **Criterio de aceptación:** `curl -I https://cacao-colab-web.vercel.app` y `https://cacao-colab-api.vercel.app` responden `200`, sin redirect 308. Verificado en esta pasada.

---

## 2. Requerimientos no funcionales

| Categoría | Requerimiento | Cómo se verifica |
|-----------|-----------------|----------------------|
| **Rendimiento** | El blog/marketing (`apps/web`, rutas fuera de `/equipo`) debe poder servirse con ISR/edge cache agresivo sin acoplarse al ciclo de deploy de la API transaccional | Separación física en `apps/api` (RF-6) — ya cumplido por diseño |
| **Disponibilidad** | La API transaccional no debe caerse por picos de tráfico de marketing | Deploys independientes (`cacao-colab-web` vs `cacao-colab-api`) — ya cumplido por diseño |
| **Escala** | Soportar 10K usuarios en 3 meses desde el lanzamiento de Fase 3 | Supabase Pro + Supavisor + Upstash + pg_cron/pgmq — documentado en `06-ARQUITECTURA.md` §8, no implementado (requiere proyecto real) |
| **Seguridad** | Ningún dato de HubSpot se muestra sin verificación real (cero placeholders que parezcan datos reales) | `TeamHubspotPanel` distingue explícitamente 3 estados (sin mapping / mapping sin contacto / contacto real) — implementado y verificable en el código |
| **Seguridad** | RLS habilitado en toda tabla con datos de usuario desde el día 1 | Cada migración incluye `alter table ... enable row level security` + policies — verificado por inspección manual del SQL |
| **Seguridad** | Ningún endpoint de escritura transaccional (`orders`, `commission_ledger`) es alcanzable sin `service_role` o el `auth.uid()` del dueño | Policies en `0004_orders_commission.sql` — verificado por inspección manual |
| **Mantenibilidad** | Un solo lugar de verdad para tipos compartidos entre las 3 apps | `packages/types` (Zod), importado por `apps/web` y `apps/api` — verificado (ambos compilan usando los mismos schemas) |
| **Auditabilidad** | Comisiones y XP son append-only, nunca se sobreescriben | `commission_ledger`/`xp_ledger` sin policy de `UPDATE` — verificado por inspección manual del SQL |

---

## 3. Contratos de API (`apps/api`, base `/api/v1`)

| Endpoint | Método | Request | Response (Fase 0) | Response (Fase 3, prevista) |
|----------|--------|---------|----------------------|-------------------------------|
| `/listings` | GET | — | `200 { data: [], meta }` | `200 { data: Listing[] }` |
| `/listings` | POST | `CreateListingInput` (Zod) | `400` inválido / `501` válido sin backend | `201 { data: Listing }` |
| `/orders` | GET | — | `200 { data: [], meta }` | `200 { data: Order[] }` |
| `/orders` | POST | `CreateOrderInput` (Zod) | `400` / `501` | `201 { data: Order }` + Stripe PaymentIntent |
| `/memberships` | GET | — | `200 { data: [], meta }` | `200 { data: Membership[] }` |
| `/memberships` | POST | `{ organizationId, planId }` | `400` / `501` | `201 { data: Membership }` + Stripe Subscription |
| `/dualita` | GET | — | `200 { data: { tracks, note } }` | `200 { data: Course[] }` |
| `/webhooks/stripe` | POST | Stripe event (raw body + `stripe-signature` header) | `400`/`501` sin credenciales | `200 { ok: true, received }` |
| `/webhooks/hubspot` | POST | HubSpot payload (raw body) | `200 { ok: true, payloadHash, note }` (no persiste) | `200 { ok: true }` (persiste en `crm_contacts`) |

---

## 4. Trazabilidad con el PRD

Cada RF de este documento mapea a al menos una historia de usuario de `11-PRD.md` §4. Ver esa sección para el "por qué" de negocio detrás de cada RF; este documento es el "qué" técnico verificable.
