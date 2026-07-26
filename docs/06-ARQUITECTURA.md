# Cacao Colab — Arquitectura (v2)

> Nuevo en v2. Última actualización: 2026-07-26.
> Documento técnico de referencia para Oscar (backend) y Hellen (frontend).

---

## 1. Por qué monorepo

El pedido de pivote agrega: app nativa, LMS gamificado, pagos, CRM propio, blog. Eso es 3 superficies de producto (web, API transaccional, mobile) que comparten tipos, lógica de negocio y clientes de terceros (Supabase, HubSpot, Stripe, Anthropic). Un monorepo con **pnpm workspaces + Turborepo** evita duplicar esa lógica 3 veces y mantiene un único lugar de verdad para el modelo de datos.

Se descartó **Nx** y **Lerna** por sobre-ingeniería para el tamaño actual del equipo (2 devs + Amaury). Turborepo es lo mismo que ya usa el resto del ecosistema Caúa (menos curva de aprendizaje para quien venga de otro repo Caúa).

---

## 2. Estructura del repo

```
cacao-colab/
  apps/
    web/       ← Next.js 16 App Router — marketing, marketplace (lectura + escritura futura),
                 aprende (Dualita), blog, admin, portal interno /equipo
    api/       ← Next.js 16 headless — /api/v1/{listings,orders,memberships,dualita,webhooks}
    mobile/    ← Expo managed + expo-router — marketplace (lectura), aprende, perfil
  packages/
    types/            ← Zod schemas, fuente única de tipos compartidos
    ui-tokens/         ← paleta de marca (Tailwind + tema RN)
    supabase-client/   ← clientes Supabase (browser/server/middleware)
    hubspot-client/    ← cliente HubSpot generalizado (upsert, search, deals)
    stripe-client/     ← STUB — sin credenciales todavía
    ai-companion/      ← companion IA de Dualita (Vercel AI SDK, port de emily-io)
  supabase/
    migrations/        ← SQL, sin proyecto vivo todavía
    seed.sql
    config.toml
  docs/                ← este Spec-Driven
```

---

## 3. Por qué `apps/api` separado de `apps/web`

Mismo stack (Next.js, cero curva nueva para Oscar/Hellen) pero **ciclos de deploy independientes**:

- El blog y la landing necesitan ISR/edge cache agresivo — cambia poco, se sirve mucho.
- La API transaccional (`/api/v1/orders`, webhooks de Stripe/HubSpot) necesita comportamiento dinámico, y no debería esperar a que se mergee un cambio de contenido del blog para desplegarse, ni viceversa.
- Permite escalar/rate-limitar la API por separado sin afectar el tráfico de marketing.

El portal interno `/equipo` (login + panel HubSpot) vive en `apps/web`, no en `apps/api` — es una superficie de UI (páginas, no solo endpoints), y su volumen de tráfico es mínimo (2-3 usuarios internos), no justifica la separación.

---

## 4. Packages compartidos

### `@cacao-colab/types`
Zod schemas para cada dominio (`organizations`, `profiles`, `listings`, `orders`, `memberships`, `lms`, `gamification`, `companion`, `blog`, `crm`, `team`). Es el contrato de API entre `apps/web`, `apps/api` y `apps/mobile` — todos importan de acá, nunca redefinen un tipo igual dos veces. Ver `07-MODELO-DATOS.md`.

### `@cacao-colab/ui-tokens`
Paleta de marca ya fijada en Spec v1 (`#F2C830`/`#1A2E10`/`#3D7A2C`, Georgia+Arial). `apps/web` la vuelca a `@theme` de Tailwind v4; `apps/mobile` la consume directo como objeto para `StyleSheet`.

### `@cacao-colab/supabase-client`
Tres entry points separados a propósito (`./browser`, `./server`, `./middleware`) para no mezclar código server-only (`server-only` package, `next/headers`) con código de browser en el mismo bundle. Ver §6 (Auth) para el detalle del flujo de login.

### `@cacao-colab/hubspot-client`
Generaliza el patrón que ya existía en `app/api/onboarding/route.ts` (upsert por email, 409→search→patch). Estandariza en `HUBSPOT_ACCESS_TOKEN` (con fallback a `HUBSPOT_TOKEN`). Agrega `getContactByEmail` y `getDealsForContact`, usados por el panel de `/equipo`.

### `@cacao-colab/stripe-client`
**Stub.** No hay cuenta Stripe Connect ni `STRIPE_SECRET_KEY` — es una decisión legal pendiente del founder (entidad de la plataforma, KYC). El paquete define la forma del cliente (`getStripeClient()`, `createDestinationCharge()`) para que Oscar sepa el contrato esperado, pero lanza `StripeNotConfiguredError` si se llama sin la env var. Ver `08-PAGOS.md`.

### `@cacao-colab/ai-companion`
Puerto directo del patrón de `Caua-Corp/caua-io/lib/emily-io/{model,firecrawl,prompts}.ts`: `streamText` + `tool()` de Vercel AI SDK, `anthropic('claude-sonnet-5')` sin AI Gateway. Es infraestructura ya probada en el ecosistema Caúa (Emily), no hay que reinventarla. Ver `10-DUALITA-IA.md`.

---

## 5. Base de datos — Supabase

**Decisión (D15, `00-SPEC.md`):** Postgres gestionado vía Supabase. Razones: Auth incluido (necesario para `/equipo` y para el marketplace), RLS nativo (modelo de permisos por fila sin capa extra), Realtime si se necesita después para notificaciones, y es el estándar del resto del ecosistema Caúa (menor fricción para quien ya conoce Supabase de otros repos Caúa).

**Estado:** migraciones SQL completas en `supabase/migrations/` (11 archivos, uno por dominio), revisadas pero **sin aplicar** — no existe proyecto real todavía. Requiere `supabase login` (interactivo) + `supabase link`/`supabase db push`, que corre el usuario, no un agente.

Cada tabla tiene RLS habilitado desde el día 1 (no se agrega "después") — ver comentarios en cada archivo de migración para el razonamiento de cada policy. Resumen de patrones usados:

- **Lectura pública:** `organizations`, `territories`, `listings` (solo `status='active'`), `courses`/`modules`/`lessons`/`quizzes`, `badges`, `posts` (solo `status='published'`), `membership_plans`.
- **Scoped al usuario (`auth.uid()`):** `profiles`, `actor_roles`, `learner_progress`, `xp_ledger`, `streaks`, `companion_*`, `team_members`.
- **Scoped a la organización del usuario:** `listings` (escritura), `orders` (lado vendedor), `memberships`, `connected_accounts`.
- **Solo `service_role` (backend/admin, nunca desde el cliente):** `commission_rules`, `commission_ledger`, `crm_contacts`, `crm_activities`, `hubspot_sync_log`.

---

## 6. Auth — dos sistemas separados, a propósito

Cacao Colab v2 tiene **dos** flujos de autenticación con Supabase Auth que **no se deben mezclar**:

1. **Marketplace (`profiles` + `actor_roles`)** — Fase 3. Farmers/chocolatiers/maquiladores/buyers se registran con su cuenta, cualquiera puede crear una. Trigger `handle_new_marketplace_user()` crea el `profile` automáticamente al hacer signup.
2. **Portal interno `/equipo` (`team_members`)** — ya implementado en esta pasada (requerimiento agregado 2026-07-26). Solo Oscar, Hellen y Amaury. No es autoservicio: la fila en `team_members` se pre-registra por email (`supabase/seed.sql`) antes de que la persona haga login por primera vez. Trigger `link_team_member()` conecta `user_id` la primera vez que esa persona se autentica con ese email exacto.

**Por qué separados:** mezclar ambos en una sola tabla `profiles` habría requerido lógica condicional en cada policy de RLS para distinguir "es staff" vs "es actor de marketplace", y el radio de exposición de un bug de esa lógica es mucho mayor (un staff viendo datos de otro usuario, o viceversa). Dos tablas con dos triggers separados en `auth.users` es más código pero cero ambigüedad.

### Flujo de login del portal `/equipo`

```
LoginForm (client) → requestMagicLink() [server action]
  → supabase.auth.signInWithOtp({ email, emailRedirectTo: '/auth/callback?next=/equipo' })
  → usuario recibe email → click
  → GET /auth/callback?code=... → exchangeCodeForSession(code)
  → redirect /equipo
  → server component: getUser() → SELECT team_members WHERE email = user.email
  → TeamWelcome + TeamHubspotPanel
```

Middleware (`apps/web/middleware.ts`) refresca la cookie de sesión, **scoped** a `/equipo/*` y `/auth/*` — el resto del sitio (marketing, blog) no paga el costo de este middleware, importante para mantener el ISR agresivo mencionado en §3.

**Estado real:** código completo y funcional, pero **no operable en vivo** hasta que exista el proyecto Supabase (mismo bloqueador que el resto de la base de datos). Ver `14-CRM-INTERNO.md` para el detalle completo, incluyendo el caso de Oscar (sin contacto en HubSpot).

---

## 7. Observabilidad — Sentry

SDK instalado en las 3 apps (`@sentry/nextjs` en web/api, `@sentry/react-native` seria el equivalente en mobile — no instalado aún en esta pasada, ver `13-MOBILE.md` para el motivo). Configuración en modo no-op: `enabled: Boolean(process.env.SENTRY_DSN)` — no falla si no hay DSN, pero queda cableado para cuando exista el proyecto Sentry (pendiente, no requiere login interactivo, se puede crear cuando Amaury lo decida).

---

## 8. Infra para 10K usuarios (documentado, se activa cuando exista Supabase real)

| Necesidad | Solución elegida | Por qué |
|-----------|-------------------|---------|
| Pooling de conexiones Postgres | Supavisor (puerto 6543, transaction mode) — nativo de Supabase | No hay que gestionar PgBouncer aparte |
| Rate limiting | Upstash (Redis serverless) | Ya usado en otros repos Caúa, sin servidor propio que mantener |
| Jobs programados (refresh de leaderboard, digest de CRM) | `pg_cron` (nativo de Supabase Postgres) | Evita levantar un worker/cola aparte para tareas simples y periódicas |
| Colas (ej. reintentos de sync HubSpot) | `pgmq` (nativo de Supabase) | Mismo razonamiento — Postgres ya hace de cola, no se suma Redis+BullMQ |
| Plan de Supabase | Pro (no Free) | Free tiene límites de conexiones y pausa por inactividad, incompatible con 10K usuarios |

Ninguna de estas piezas requiere trabajo de código hoy — se activan/configuran cuando el proyecto Supabase exista. Documentado acá para que Oscar no tenga que re-investigar la decisión.

---

## 9. Decisiones abiertas (a resolver en Fase 1-3, no bloquean la fundación)

- ¿El trigger `handle_new_marketplace_user()` debe correr para **todo** signup, o se necesita distinguir signup de marketplace vs. signup accidental de un email que también está en `team_members`? Hoy ambos triggers (`on_auth_user_created_profile` y `on_auth_user_created_link_team_member`) corren para cualquier insert en `auth.users` — funciona porque son independientes (uno crea/actualiza `profiles`, el otro solo hace `UPDATE` de `team_members` si el email matchea), pero vale la pena revisar si un team member necesita *también* un `profile` de marketplace o si deben quedar completamente separados.
- ¿`leaderboard_weekly` (vista materializada) necesita RLS real antes de exponerse en `apps/api`, o alcanza con que solo `apps/api` (vía `service_role`) la consulte y filtre antes de responder al cliente?
