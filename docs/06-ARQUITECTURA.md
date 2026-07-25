# Cacao Colab — Arquitectura técnica v2

> Fuente: diseño validado en la sesión de pivote 2026-07-24, verificado contra el código real de
> `amauryamed-svg/cacao-colab` y `Caua-Corp/caua-io` (no hipotético).

---

## 1. Monorepo

**pnpm workspaces + Turborepo.** No Nx (curva de config innecesaria para 3 personas), no lerna
(obsoleto). pnpm resuelve dependencias nativas de RN/Expo mejor que npm (lo que usaba v1); Turborepo
da cache remota gratis vía el mismo Vercel donde ya se despliega.

```
cacao-colab/
├── apps/
│   ├── web/       Next.js 16 — marketing, /marketplace (browse), /aprende, blog, admin
│   ├── api/       Next.js headless — /api/v1/{listings,orders,memberships,dualita,webhooks}
│   └── mobile/    Expo managed + expo-router — app nativa iOS/Android
├── packages/
│   ├── types/            Zod schemas → tipos TS compartidos
│   ├── ui-tokens/         Paleta/tipografía de marca (única fuente de verdad)
│   ├── supabase-client/
│   ├── hubspot-client/    Generaliza el patrón de apps/web/app/api/onboarding/route.ts
│   ├── stripe-client/     Connect Express, destination charges (sin credenciales aún)
│   ├── ai-companion/      Port del patrón de Emily (caua-io/lib/emily-io/*)
│   └── config/            tsconfig base compartido
├── supabase/
│   ├── config.toml
│   └── migrations/        0001-0008, ver 07-MODELO-DATOS.md
└── docs/
```

### Por qué `apps/api` separado de `apps/web`

Mismo stack (Next.js — cero curva nueva para Oscar/Hellen) pero **deploys independientes** con
dominio propio (`api.cacaocolab.co`): el blog/marketing necesita ISR/edge caching agresivo; la API
transaccional necesita comportamiento dinámico sin cache y su propio ciclo de release — Oscar no
debería esperar a que Hellen mergee un post de blog para deployar un fix de webhook de Stripe.
`apps/api` es la única fuente de lógica de negocio, consumida tanto por `apps/web` como por
`apps/mobile` ("backend for two frontends"). No se monta un backend separado (Node/Nest/Fastify) —
sería una pieza más que operar sin beneficio real al volumen de la sección 4.

---

## 2. Variables de entorno por app

| Variable | apps/web | apps/api | apps/mobile |
|----------|:---:|:---:|:---:|
| `HUBSPOT_ACCESS_TOKEN` | ✓ | ✓ | — |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | ✓ | ✓ | — |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✓ | — | — |
| `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` | — | — | ✓ |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | — | ✓ | — |
| `ANTHROPIC_API_KEY` | — | ✓ | — |
| `SENTRY_DSN` | ✓ | ✓ | ✓ |

Ninguna credencial real está commiteada — `.env.local` por app, en `.gitignore`. Ver
`docs/00-SPEC.md` § pendientes para qué falta de configurar en cada una.

---

## 3. Infraestructura para 10.000 usuarios en 3 meses

10K usuarios activos en un marketplace B2B de nicho no es tráfico de hiperescala — picos probables
de 200-500 concurrentes en campañas puntuales, no sostenidos. Supabase + Vercel serverless lo
aguantan nativamente **si** se hacen bien un puñado de cosas específicas; si no, el modo de falla
típico no es "el compute no alcanza", es agotamiento de conexiones Postgres.

- **DB:** Supabase Pro (compute add-on Small/Medium) + **conexión pooleada (Supavisor, puerto 6543,
  transaction mode)** desde toda función serverless — la conexión directa (5432) es solo para
  migraciones vía CLI. Esto es lo que realmente rompe stacks Supabase+Vercel a esta escala si se
  ignora.
- **Auth:** Supabase Auth, email + WhatsApp OTP (Twilio) — coherente con D10 (WhatsApp-first).
- **CDN/edge:** Vercel para `apps/web` — blog con `generateStaticParams` + ISR con tags, no SSR por request.
- **Rate limiting:** Upstash Redis (Vercel Marketplace) — abuso de API, cap de mensajes/día del
  companion IA por tier de membresía, idempotencia de webhooks de Stripe.
- **Colas/jobs:** `pg_cron` + `pgmq` (extensiones nativas de Supabase), no Redis+BullMQ aparte —
  para sync HubSpot, refresh de `leaderboard_weekly`, dunning de membresías. Una pieza de infra
  menos que 3 personas operen; se escala a Trigger.dev/Vercel Cron solo si el volumen de jobs lo
  exige — no lo va a exigir a 10K usuarios.
- **Observabilidad:** Vercel Logs/Analytics + Supabase Logs (ambos incluidos) + **Sentry** (tier
  gratis, SDK sólido para Expo) en las 3 apps.
- **Media:** Supabase Storage + transformación de imágenes (plan Pro) para fotos de listings.
- **Push mobile:** Expo Push Notifications (gratis) + tabla `push_tokens` (agregar en Fase 5).

**Costo realista a 10K usuarios:** Supabase Pro (~$25-60/mes) + Vercel Pro (3 seats) + Upstash
(<$10/mes) + Sentry (gratis) + Stripe (% variable, sin costo fijo) → **~$150-300/mes**. No hace
falta Kubernetes ni infra dedicada.

---

## 4. Camino de integración con Emily → Dualita

Ver `10-DUALITA-IA.md` para el detalle completo. Resumen: se porta el patrón real de
`Caua-Corp/caua-io/lib/emily-io/*` (`@ai-sdk/anthropic` directo, `streamText` + `tool()`), pero con
memoria en Postgres real (`companion_memory`) en vez del hack de HubSpot-deal-como-KV que usa Emily
hoy — Dualita sí tiene Supabase, no necesita ese workaround.

---

## 5. Deploy

- `apps/web` → Vercel, proyecto `cacao-colab-web`.
- `apps/api` → Vercel, proyecto `cacao-colab-api`, dominio `api.cacaocolab.co` (o subdominio de
  `vercel.app` mientras no haya dominio propio).
- `apps/mobile` → EAS Build (perfiles `development`/`preview`/`production` en `eas.json`), OTA
  updates vía `expo-updates` una vez en producción — ver `13-MOBILE.md`.
