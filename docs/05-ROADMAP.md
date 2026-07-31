# Cacao Colab — Roadmap

> Última actualización: 2026-07-31 (builders fundadores + plug-and-play + stores)
> Método: Spec-Driven. Cada ítem tiene dueño y criterio de cierre.
> Dueños por defecto: Amaury (PM) · Hellen (Frontend) · Oscar (Backend) — ver `19-BUILDERS-FOUNDERS.md`.

---

## Fase 0 — Alimentec (completada ✅)

| Ítem | Estado | Fecha |
|------|--------|-------|
| Plataforma web live (cacao-colab.vercel.app) | ✅ | jun 2026 |
| Email seguimiento HubSpot (colab-seguimiento) | ✅ | jun 2026 |
| Co-branding NIBS CAÚA × Zurych × Lust | ✅ | 9 jun 2026 |
| HoReCa landing diseñada (horeca-final.html) | ✅ local | jun 2026 |
| Onboarding gate 5 pasos | ✅ | jun 2026 |
| API HubSpot (create/upsert contacto) | ✅ código | jun 2026 |
| Cookie server-side (no vuelve a aparecer) | ✅ | jun 2026 |

---

## Fase 0.5 — Fundación del pivote v2 (completada ✅ 2026-07-26)

Esta fase es nueva — es el trabajo hecho en la rama `v2-pivot` para preparar el terreno del marketplace transaccional. No implementa features completos, es la fundación (estructura, tipos, esquema, scaffolding, docs).

| Ítem | Estado | Fecha |
|------|--------|-------|
| Bug de producción corregido (308 ciego a caua.cloud/colab) | ✅ | 26 jul 2026 |
| Monorepo pnpm + Turborepo (`apps/{web,api,mobile}` + `packages/*`) | ✅ | 26 jul 2026 |
| Modelo de datos completo — 11 migraciones SQL escritas (sin aplicar) | ✅ | 26 jul 2026 |
| Scaffolding `apps/api` (headless, `/api/v1/*` con contratos validados) | ✅ | 26 jul 2026 |
| Scaffolding `apps/mobile` (Expo Router, 3 tabs placeholder) | ✅ | 26 jul 2026 |
| Portal interno `/equipo` (login Supabase Auth + panel HubSpot) | ✅ código, ⚠️ no operable en vivo | 26 jul 2026 |
| Sentry SDK en las 3 apps | ✅ | 26 jul 2026 |
| Proyectos Vercel nuevos (`cacao-colab-web`, `cacao-colab-api`) | ✅ live | 26 jul 2026 |
| Documentación Spec-Driven completa (`00-SPEC.md`–`14-CRM-INTERNO.md`) | ✅ | 26 jul 2026 |
| Proyecto Supabase real | 🔴 Pendiente | requiere `supabase login` (Amaury) |
| Cuenta Stripe Connect | 🔴 Pendiente | requiere datos legales (Amaury) |

---

## Fase 1 — Activación digital (jun–ago 2026, en curso, sin cambios de alcance)

| Ítem | Estado | Dueño | Criterio de cierre |
|------|--------|-------|-------------------|
| `HUBSPOT_ACCESS_TOKEN` en Vercel env vars (renombrado desde `HUBSPOT_TOKEN`) | 🔴 Pendiente | Amaury | Contacto creado en HubSpot desde prod |
| Push horeca-final.html a Shopify | 🟡 Pendiente | Amaury | cauacolombia.co/pages/horeca live |
| Página `/aprende` con contenido real | 🟡 Pendiente | Amaury | 6 módulos Academy con links reales |
| Lust como Colaborador en marketplace | 🟡 Pendiente | Amaury | BrandCard Lust live en /marketplace |
| OG image redes sociales | 🟢 Backlog | Diseño | og-cacao-colab.png en /public |
| Contenido semanal IG/LinkedIn Colab | 🟡 Pendiente | Amaury | Primer post publicado |

---

## Fase 2 — Dualita gamificada (ago–oct 2026, evoluciona en v2)

| Ítem | Estado | Dueño | Criterio de cierre |
|------|--------|-------|-------------------|
| CAÚA Academy 6 módulos con links reales | 🟡 | Amaury | — |
| MOOC Zurych lanzado | ⏳ Zurych | Zurych | — |
| Email nurturing HubSpot (día 1 / 7 / 14) | 🟡 | Amaury | — |
| Migrar `lessons`/`courses` de seed local (`lib/*.ts`) a Supabase real | 🟢 Backlog | Oscar | Proyecto Supabase existente + migraciones aplicadas |
| XP/rachas/insignias/leaderboard (`09-GAMIFICACION.md`) | 🟢 Backlog | Oscar + Hellen | `learner_progress`/`xp_ledger` poblados desde uso real |
| Companion IA con guardrails (`10-DUALITA-IA.md`) | 🟢 Backlog | Oscar | `ANTHROPIC_API_KEY` configurada + companion respondiendo en `/aprende` |

---

## Fase 3 — Marketplace transaccional (oct 2026+, reemplaza "Marketplace abierto" de v1)

| Ítem | Estado | Dueño | Criterio de cierre |
|------|--------|-------|-------------------|
| Listings reales (farmer/chocolatier publican) | 🟢 Backlog | Oscar | CRUD de `listings` funcionando sobre Supabase real |
| Checkout + Stripe Connect Express | 🟢 Backlog | Oscar | Cuenta Stripe Connect creada (Amaury) + destination charges funcionando |
| Roles de actor reales (`actor_roles`) en onboarding | 🟢 Backlog | Hellen | Un profile puede declarar farmer/chocolatier/maquilador/buyer |
| Membresías (Stripe Subscriptions) | 🟢 Backlog | Oscar | `membership_plans` con checkout real |
| CRM interno con sync bidireccional HubSpot | 🟢 Backlog | Oscar | `hubspot_sync_log` sin loops, verificado en ambos sentidos |
| Formulario de solicitud de marca | 🟢 Backlog | Amaury | — |
| Criterios de admisión públicos | 🟢 Backlog | Amaury + Zurych | — |

---

## Fase 4 — Escala a 10K usuarios (nueva en v2)

| Ítem | Estado | Dueño | Criterio de cierre |
|------|--------|-------|-------------------|
| Supabase Pro + Supavisor (pooling transaction mode) | 🟢 Backlog | Amaury | Proyecto en plan Pro, pooler configurado |
| Rate limiting (Upstash) | 🟢 Backlog | Oscar | Middleware de rate limit en `apps/api` |
| Jobs nativos (`pg_cron`/`pgmq`) — refresh de `leaderboard_weekly`, digest de CRM | 🟢 Backlog | Oscar | Jobs corriendo en Supabase real |
| App móvil transaccional (no solo lectura) | 🟢 Backlog | Hellen | Checkout funcionando en Expo Go / build nativo |
| Publicación en stores (App Store / Play Store) | 🟡 Docs + scaffolding | Amaury (cuentas) · Hellen (UI/assets) · Oscar (EAS) | `docs/21-APP-STORES.md` + `apps/mobile/eas.json`; Expo Go ya usable vía plug-and-play |

---

## Backlog (sin fase asignada)

- Sistema de reseñas verificadas por marca
- Integración Shopify → HubSpot para órdenes del marketplace
- Dashboard de analítica para las marcas colaboradoras
- Blog de tendencias (estilo Callebaut/Valrhona) con contenido real
- Decisión de dominio propio (`cacaocolab.co` u otro) — ver D17 en `00-SPEC.md`
- Privatización del repo (hoy público, reversible al instante — ver D16)
- Merge de `v2-pivot` → `main` (corrige el 308 del proyecto Vercel viejo)
