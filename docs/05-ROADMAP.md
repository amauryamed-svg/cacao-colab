# Cacao Colab — Roadmap

> Última actualización: 2026-06-17 · **v2: 2026-07-24**
> Método: Spec-Driven. Cada ítem tiene dueño y criterio de cierre.
> Fases 0-3 (abajo) son la operación v1, siguen corriendo en paralelo — no se detienen por el
> pivote. Fases 4-7 (al final) son el roadmap técnico de v2, alineado con `01-STRATEGY.md` § 8.

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

## Fase 1 — Activación digital (jun–ago 2026)

| Ítem | Estado | Dueño | Criterio de cierre |
|------|--------|-------|-------------------|
| `HUBSPOT_TOKEN` en Vercel env vars | 🔴 Pendiente | Amaury | Contacto creado en HubSpot desde prod |
| Push horeca-final.html a Shopify | 🟡 Pendiente | Amaury | cauacolombia.co/pages/horeca live |
| Página `/aprende` con contenido real | 🟡 Pendiente | Amaury | 6 módulos Academy con links reales |
| Lust como Colaborador en marketplace | 🟡 Pendiente | Amaury | BrandCard Lust live en /marketplace |
| OG image redes sociales | 🟢 Backlog | Diseño | og-cacao-colab.png en /public |
| Contenido semanal IG/LinkedIn Colab | 🟡 Pendiente | Amaury | Primer post publicado |

---

## Fase 2 — Dualita activa (ago–oct 2026)

| Ítem | Estado | Dueño |
|------|--------|-------|
| CAÚA Academy 6 módulos con links reales | 🟡 | Amaury |
| MOOC Zurych lanzado | ⏳ Zurych | Zurych |
| Email nurturing HubSpot (día 1 / 7 / 14) | 🟡 | Amaury |
| Analytics de módulos completados | 🟡 | Amaury |

---

## Fase 3 — Marketplace abierto (oct 2026+)

| Ítem | Estado | Dueño |
|------|--------|-------|
| Formulario de solicitud de marca | 🟢 | Amaury |
| Criterios de admisión públicos | 🟢 | Amaury + Zurych |
| Marca 3 en marketplace | 🟢 | TBD |
| Métricas de impacto por marca en plataforma | 🟢 | Amaury |

---

## Backlog (sin fase asignada, v1)

- Sistema de reseñas verificadas por marca
- ~~App móvil (PWA) del microlearning~~ — **superseded por D12**: app nativa React Native/Expo, no PWA. Ver Fase 4-7 abajo.
- Integración Shopify → HubSpot para órdenes del marketplace
- Dashboard de analítica para las marcas colaboradoras

---

## Fase 4 — Fundación técnica del monorepo v2 (2026-07 → 2026-08)

| Ítem | Estado | Dueño | Criterio de cierre |
|------|--------|-------|---------------------|
| Redirect ciego a caua.cloud/colab eliminado | ✅ | Amaury (esta sesión) | `curl -I` ya no devuelve 308 |
| Monorepo pnpm+Turborepo (`apps/web`, `apps/api`, `apps/mobile`, `packages/*`) | ✅ | Amaury (esta sesión) | `pnpm turbo build` en verde |
| Migraciones Supabase escritas (`0001`-`0008`) | ✅ | Amaury (esta sesión) | Revisadas, sin aplicar aún |
| Docs Spec-Driven v2 completos (`06`-`14`, PRD, SRS) | ✅ | Amaury (esta sesión) | Este set de documentos |
| Repo privado + Oscar/Hellen invitados | 🔴 Pendiente | Amaury | Ambos con acceso confirmado |
| Proyecto Supabase real + `supabase db push` | 🔴 Pendiente | Amaury | Tablas visibles en Supabase Studio |
| Proyectos Vercel `cacao-colab-web`/`cacao-colab-api` | Ver `06-ARQUITECTURA.md` | Amaury | Preview deploy funcionando |

## Fase 5 — MVP marketplace + auth + LMS esqueleto (2026-08 → 2026-10)

| Ítem | Dueño | Criterio de cierre |
|------|-------|----------------------|
| Supabase Auth (email + WhatsApp OTP) en web y mobile | Oscar | Usuario se registra y mantiene sesión en ambos |
| `/marketplace` con listings reales (no `BrandCard` estático) | Hellen + Oscor | Listing visible desde DB, con moderación admin |
| LMS data-driven reemplazando `lib/dualita.ts`/`lib/lessons.ts` | Oscar | Lección completa persiste progreso |
| Pantallas mobile de marketplace (read) y aprende | Hellen | Navegable en Expo Go/TestFlight |

## Fase 6 — Pagos + CRM interno + sync HubSpot (2026-10 → 2026-11)

| Ítem | Dueño | Criterio de cierre |
|------|-------|----------------------|
| Cuenta Stripe Connect (plataforma) creada | Amaury | KYC aprobado |
| Stripe Connect Express onboarding de vendedores | Oscar | `connected_accounts.charges_enabled = true` en al menos 1 cuenta |
| Checkout con destination charges | Oscar | Transacción de prueba (modo test) exitosa con comisión correcta en `commission_ledger` |
| Membresías (Stripe Billing) | Oscar | Suscripción de prueba activa |
| CRM interno operable por los 3 | Amaury + Hellen | Los 3 pueden ver/editar `crm_contacts` |
| Sync bidireccional HubSpot con `hubspot_sync_log` | Oscar | Sin duplicados tras 10 ciclos de sync de prueba |

## Fase 7 — Gamificación + blog/CMS + hardening 10K + submission (2026-11 → 2027-01)

| Ítem | Dueño | Criterio de cierre |
|------|-------|----------------------|
| Gamificación completa (XP/streaks/badges/leaderboard) portada del prototipo Python | Hellen + Oscar | Ver `09-GAMIFICACION.md` |
| Companion Dualita con IA real reemplaza burbuja estática | Oscar | Conversación end-to-end con tools funcionando |
| Blog/CMS estilo Callebaut/Valrhona | Amaury | 5 posts publicados mínimo |
| Hardening 10K usuarios (pooling, rate limiting, Sentry, carga sintética) | Oscar | Prueba de carga sin degradación |
| EAS Build producción + submission App Store/Play Store | Hellen | App aprobada y publicada en ambas tiendas |
