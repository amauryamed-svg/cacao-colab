# Cacao Colab — Spec v2 (Master)

> **Método:** Spec-Driven. Este documento es la fuente de verdad del proyecto. Cualquier cambio de rumbo se reescribe aquí *antes* de tocar código, diseño o procesos.
> **Owner principal:** Amaury Amed (CTO · CAÚA Colombia)
> **Co-owner:** Equipo Zurych
> **Fecha de corte v1:** 2026-06-16 · **Fecha de corte v2:** 2026-07-24

---

## 0. Qué cambia en v2 (leer primero si venís de v1)

v1 era una **vitrina de leads sin transacciones** — explícitamente "no es joint venture legal"
(D1 original). v2 es un **pivote de tesis completo, confirmado por el owner**: Cacao Colab pasa a
ser un **marketplace transaccional** que conecta agricultores de cacao colombiano con chocolateros
y maquiladores, con app nativa (React Native), pagos internos (membresía + comisión), y un sistema
de aprendizaje gamificado (Dualita) con IA real. El horizonte de v2 es que en ~2 años Luker o
Nacional de Chocolates quieran licenciar la plataforma — la arquitectura y el contenido deben verse
"enterprise-grade", no un MVP descartable.

**Hallazgo crítico al iniciar v2 (2026-07-24):** `cacao-colab.vercel.app` en producción devolvía un
redirect 308 ciego a `caua.cloud/colab/*` — una copia pegada a mano dentro de `caua-io` que llevaba
desde 2026-07-07 sin actualizarse, mientras el repo real seguía activo. El repo que este Spec
describe **no estaba sirviendo nada en producción**. Corregido en Fase 0 de v2 (ver `06-ARQUITECTURA.md`).

Las decisiones D1–D10 de v1 se marcan abajo como **vigente** o **superseded** — nunca se borran, es
historial de decisión. D11 en adelante son decisiones de v2.

### Participantes fundadores (sin cambios)

| Marca | Rol | Web |
|-------|-----|-----|
| **CAÚA Colombia** | Origen, producto, logística Colombia | cauacolombia.co |
| **Chocolate Zurych** | Coberturas funcionales HoReCa | chocolatezurych.com |

### Propósito del Colab en v2

1. **Marketplace transaccional** — agricultores, chocolateros y maquiladores publican listings reales; compradores HoReCa y de especialidad compran con checkout propio (pagos internos, no redirección a WhatsApp).
2. **Dualita** — sistema de aprendizaje dual: MOOC largo (Zurych) + microlearning corto gamificado (CAÚA Academy), ahora con companion de IA real (no burbuja de tips estática).
3. **Blog interno** — mapeo de tendencias de cacao/chocolate nivel Callebaut/Valrhona, contenido B2B que construye la credibilidad para licenciamiento futuro.
4. **CRM interno** — operable por Oscar/Hellen/Amaury, sincronizado (no reemplazado) con el HubSpot compartido de Caúa.
5. **Co-branding** — productos conjuntos puntuales (e.g. NIBS CAÚA × Zurych × Lust) siguen vivos, sin cambios.

### North Star v2

**GMV transaccionado en el marketplace** (comisión + membresías = ingreso real, no solo leads).

Métricas secundarias: MRR de membresías, learners activos/retención Dualita, contactos HoReCa
calificados (heredado de v1, sigue midiéndose vía HubSpot).

---

## 1. Decisiones — v1 (heredadas)

| # | Decisión | Valor v1 | Estado en v2 |
|---|----------|----------|--------------|
| D1 | Identidad del Colab | Iniciativa colaborativa, no alianza de marca | **Superseded** — sigue sin ser joint venture legal formal, pero ahora mueve dinero real (comisiones, membresías) dentro de la plataforma. Ver D11. |
| D2 | Plataforma técnica | Next.js 16 App Router + Tailwind v4 + Vercel | **Vigente y extendido** — sigue siendo la base de `apps/web`/`apps/api`; se añade Expo/React Native para `apps/mobile`. Ver D12. |
| D3 | CRM | HubSpot | **Vigente y extendido** — HubSpot sigue siendo el CRM compartido con Caúa; se añade un CRM interno propio sincronizado. Ver D16. |
| D4 | Onboarding de entrada | Gate fullscreen en primera visita | **Vigente** — sin cambios en `apps/web`. |
| D5 | MOOC | Pertenece a Zurych · en proceso | **Vigente** — sigue sin fecha de lanzamiento confirmada por Zurych. |
| D6 | Cupón Alimentec | ALIMENTEC10 · tienda CAÚA · cauacolombia.co | **Vigente** — sin relación con el marketplace transaccional nuevo. |
| D7 | Emails HubSpot | Body-only HTML sin DOCTYPE | **Vigente** — sin cambios. |
| D8 | Paleta visual | Dark bg (#1A2E10 forest) | **Vigente** — fijada ahora en `packages/ui-tokens` como fuente única (antes hardcodeada en `globals.css`). |
| D9 | Tipografía plataforma | Georgia serif (display) + Arial (UI) | **Vigente** — misma fuente única `packages/ui-tokens`. Mobile requiere activo embebido, ver `13-MOBILE.md`. |
| D10 | WhatsApp contacto | +57 310 222 7848 | **Vigente** — se extiende a WhatsApp OTP para auth (D... ver `06-ARQUITECTURA.md`). |

---

## 2. Decisiones — v2 (nuevas)

| # | Decisión | Valor | Implicación |
|---|----------|-------|--------------|
| D11 | Alcance del pivote | **Marketplace transaccional real**, no solo vitrina | Dinero real se mueve dentro de la plataforma (Stripe Connect). Sube el estándar de auditoría, seguridad y RLS respecto a v1. |
| D12 | App móvil | **React Native vía Expo managed + EAS Build** | Elegido por velocidad de desarrollo con equipo de 3 personas y deadline de App Store en <3 meses. No bare RN — se reevalúa solo si un módulo nativo específico lo exige. |
| D13 | Repo | **Privatizar y reestructurar `amauryamed-svg/cacao-colab` en monorepo** (no repo nuevo, no se mueve a la org Caua-Corp por ahora) | pnpm workspaces + Turborepo. Ver `06-ARQUITECTURA.md`. |
| D14 | Modelo de negocio | **Híbrido: membresía/suscripción por actor + comisión reducida por transacción** | Requiere Stripe Connect Express (no Standard, no Custom). Ver `08-PAGOS.md`. |
| D15 | Base de datos | **Supabase (Postgres)**, no un backend separado | Reutiliza el ecosistema Caúa (ya en uso en `caua-io`); pooling obligatorio (Supavisor 6543) para no agotar conexiones a 10K usuarios. Ver `06-ARQUITECTURA.md`. |
| D16 | CRM interno vs HubSpot | **Coexisten** — CRM interno (`crm_contacts`) es la vista operativa diaria de los 3 colaboradores; HubSpot sigue siendo el CRM compartido de Caúa | Sync bidireccional con `hubspot_sync_log` anti-loop (hash de payload). Ver `14-CRM-INTERNO.md`. |
| D17 | IA para Dualita | **Se porta el patrón de Emily** (`caua-io/lib/emily-io/*`: `@ai-sdk/anthropic` directo + `tool()`, sin AI Gateway) | Memoria en Postgres real (`companion_memory`), NO el hack de HubSpot-deal-como-KV que usa Emily. Ver `10-DUALITA-IA.md`. |
| D18 | Env var HubSpot | **Renombrar `HUBSPOT_TOKEN` → `HUBSPOT_ACCESS_TOKEN`** | Alinea con el resto del ecosistema Caúa (`caua-io` ya usa ese nombre). Sin riesgo de migración en vivo: el token nunca se llegó a configurar en Vercel (P1 de v1 seguía pendiente). |
| D19 | Gobernanza vs cuenta transaccional | **Owner/Colaborador es nivel organización; farmer/chocolatier/maquilador/buyer es nivel cuenta** | `docs/04-ACTORES.md` no distinguía esto en v1 — un profile puede pertenecer a una organización Y tener uno o más `actor_roles`. Ver `04-ACTORES.md` actualizado. |
| D20 | "GShape" | **No es infraestructura** — es `GShapeSection.tsx`, una sección de marketing en la landing de `caua-io` | Mencionado en el pedido original de Amaury; verificado y cerrado como cabo suelto de narrativa, no de arquitectura. |

---

## 3. Requerimientos funcionales

Ver **`12-SRS.md`** para el detalle completo y testeable. Resumen: RF-1 a RF-5 (heredados de v1,
sin cambios funcionales) + RF-6 en adelante (marketplace transaccional, pagos, LMS data-driven,
gamificación, companion IA, CRM interno, mobile) definidos en el SRS.

---

## 4. Estado actual (2026-07-24)

| Componente | Estado | Notas |
|------------|--------|-------|
| Monorepo (`apps/web`, `apps/api`, `apps/mobile`, `packages/*`) | ✅ Reestructurado en rama `v2-pivot` | Sin `pnpm install` corrido todavía — pendiente de revisión |
| Redirect ciego a `caua.cloud/colab` | ✅ Corregido | Ver hallazgo en sección 0 |
| Migraciones Supabase (`supabase/migrations/0001-0008`) | ✅ Escritas | Sin proyecto Supabase real — pendiente `supabase login` |
| `apps/api` — route handlers `/api/v1/*` | ✅ Scaffold | Sin probar contra Supabase/Stripe reales |
| `apps/mobile` — Expo + expo-router, 3 tabs placeholder | ✅ Scaffold | Sin `icon.png`/`splash` reales (falta logo oficial) |
| Companion Dualita con IA (`packages/ai-companion`) | ✅ Scaffold, patrón portado de Emily | Sin probar |
| Docs v2 completos (`06`–`14`, PRD, SRS) | ✅ | Ver índice abajo |
| GitHub: repo privado + Oscar/Hellen invitados | 🔴 Pendiente | Necesita usernames/emails reales |
| Proyecto Supabase real | 🔴 Pendiente | Necesita `supabase login` del founder |
| Cuenta Stripe Connect (plataforma) | 🔴 Pendiente | Requiere entidad legal — no la crea el agente |
| Vercel: proyectos `web`/`api` nuevos | Ver `06-ARQUITECTURA.md` | — |
| Carpeta Drive con docs v2 | Ver entrega de esta sesión | — |

---

## 5. Índice de documentación Spec-Driven v2

| Doc | Contenido |
|-----|-----------|
| `00-SPEC.md` | Este documento — decisiones D1-D20, estado |
| `01-STRATEGY.md` | Posicionamiento, audiencia, go-to-market (heredado, extendido) |
| `02-PLATFORM.md` | Stack técnico v1 (heredado — ver `06-ARQUITECTURA.md` para v2) |
| `03-HUBSPOT.md` | Integración HubSpot (heredado, actualizado con D18) |
| `04-ACTORES.md` | Actores — Owner/Colaborador vs farmer/chocolatier/maquilador/buyer (D19) |
| `05-ROADMAP.md` | Roadmap heredado v1 + fases v2 |
| `06-ARQUITECTURA.md` | Monorepo, apps, packages, infra para 10K usuarios |
| `07-MODELO-DATOS.md` | Dominios, tablas, relaciones, RLS |
| `08-PAGOS.md` | Stripe Connect Express, comisión híbrida, webhooks |
| `09-GAMIFICACION.md` | XP/streaks/badges/leaderboard, mapeo desde prototipo Python |
| `10-DUALITA-IA.md` | Companion con IA real — arquitectura, tools, guardrails |
| `11-PRD.md` | Product Requirements Document completo |
| `12-SRS.md` | Software Requirements Specification completo |
| `13-MOBILE.md` | Expo SDK, OTA updates, checklist de submission |
| `14-CRM-INTERNO.md` | CRM interno — operación diaria, sync HubSpot |

---

## 6. Pendientes abiertos (bloqueantes para producción real)

| # | Tarea | Prioridad | Owner |
|---|-------|-----------|-------|
| P1 | Usernames/emails de GitHub de Oscar y Hellen → invitarlos al repo privado | 🔴 Alta | Amaury |
| P2 | `supabase login` → crear proyecto real → `supabase db push` | 🔴 Alta | Amaury |
| P3 | Emails de Oscar y Hellen → compartir carpeta de Drive | 🔴 Alta | Amaury |
| P4 | Cuenta Stripe Connect (entidad legal, KYC) | 🔴 Alta | Amaury |
| P5 | `HUBSPOT_ACCESS_TOKEN` real en Vercel (renombrado de `HUBSPOT_TOKEN`, P1 de v1 seguía sin cerrar) | 🟡 Media | Amaury |
| P6 | Dominio propio (`cacaocolab.co` o el que se defina) | 🟡 Media | Amaury |
| P7 | Logo/ícono oficial de Dualita/Cacao Colab para `apps/mobile/assets` | 🟡 Media | Amaury / Diseño |
| P8 | Confirmar con Zurych el pivote de tesis (D11) — este Spec documenta la decisión de Amaury, no confirma alineación del co-founder | 🔴 Alta | Amaury |
| P9 | MOOC Zurych lanzado (heredado de v1, sigue sin fecha) | 🟢 Baja | Zurych |

---

*Este Spec se actualiza con cada cambio de rumbo. Ver `05-ROADMAP.md` para detalle de fases.*
