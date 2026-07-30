# Cacao Colab — Spec v2 (Master)

> **Método:** Spec-Driven. Este documento es la fuente de verdad del proyecto. Cualquier cambio de rumbo se reescribe aquí *antes* de tocar código, diseño o procesos.
> **Owner de cacaotier:** Amaury Amed
> **Builders de Cacao Colab:** Amaury Amed · Hellen Bareño · Oscar Gamboa
> **Fecha de corte v1:** 2026-06-16
> **Fecha de corte v2 (pivote):** 2026-07-26
> **Rama de trabajo:** `v2-pivot` (worktree aislado, sin merge a `main` todavía)

---

## 0. Pivote v2 — de vitrina de leads a marketplace transaccional

Cacao Colab v1 era una landing de captura de leads HoReCa: sin transacciones, sin app, "no es joint venture legal". El 2026-07-26 el usuario confirmó un **pivote completo de tesis**: Cacao Colab pasa a ser un **marketplace transaccional** que conecta agricultores de cacao con chocolateros/maquiladores/compradores, con:

- **App nativa** (React Native / Expo) además de la web.
- **Dualita** como LMS gamificado real (no solo contenido estático) — MOOC Zurych + microlearning CAÚA, con XP/rachas/insignias/leaderboard portados del prototipo Python `amauryamed-svg/dualita`.
- **Pagos internos** — modelo híbrido: membresía/suscripción por actor + comisión reducida por transacción, vía Stripe Connect Express.
- **CRM propio** sincronizado bidireccionalmente con el HubSpot compartido del ecosistema Caúa.
- **Blog de tendencias** estilo Callebaut/Valrhona.
- **Infraestructura para 10K usuarios en 3 meses.**

Esta pasada (2026-07-26) construye la **fundación completa**: monorepo reestructurado, modelo de datos completo (migraciones SQL escritas, sin proyecto Supabase vivo todavía), scaffolding de las 3 apps, y toda la documentación Spec-Driven. No implementa el feature-set completo (listings reales, checkout funcional, contenido real del LMS) — eso es trabajo de semanas para Oscar (backend) y Hellen (frontend), con Amaury liderando marketing/ventas.

**Hallazgo crítico corregido en esta pasada:** `cacao-colab.vercel.app` (el proyecto Vercel original, ligado a `main`) devolvía un 308 ciego hacia `caua.cloud/colab/*` desde el commit `chore: redirigir dominio standalone a caua.cloud/colab` — es decir, el repo real (activo, con commits hasta el 2026-07-23) no servía nada en producción; todo el tráfico caía en una copia pegada a mano dentro de `Caua-Corp/caua-io/app/colab/` sin tocar desde 2026-07-07. La rama `v2-pivot` quita ese redirect y despliega en proyectos Vercel nuevos y limpios (`cacao-colab-web`, `cacao-colab-api`). El proyecto viejo (`cacao-colab.vercel.app`, atado a `main`) sigue con el redirect hasta que este pivote se mergee — es intencional, no un descuido (ver `05-ROADMAP.md`).

**Requerimiento agregado durante la ejecución (2026-07-26):** portal interno `/equipo` con login real (Supabase Auth, magic link) para Oscar y Hellen, con bienvenida personalizada y un panel de datos reales de HubSpot CRM debajo. Ver `14-CRM-INTERNO.md` para el detalle completo — incluye un hallazgo nuevo: Oscar Gamboa (`amadooscarito@gmail.com`) no tiene contacto en HubSpot todavía, a diferencia de Hellen (`hellenandba@gmail.com`), que sí.

### Ownership, builders y círculo abierto

| Actor | Rol | Alcance |
|-------|-----|---------|
| **Amaury Amed** | Founder y owner de cacaotier | Master Cacaotier, Master Chocolatier, bioprocesos, producto y visión |
| **Hellen Bareño** | Builder de Cacao Colab | Chocolatería y experiencia |
| **Oscar Gamboa** | Builder de Cacao Colab | Desarrollo y operación |

El círculo de nodos permanece abierto. Las marcas regionales conservan su identidad y propiedad; participar en Cacao Colab no transfiere ownership de marca ni convierte automáticamente a un nodo en socio legal de la plataforma.

| Nodo | Territorio |
|------|------------|
| Zurych | Landázuri, Santander |
| La Querencia | Arbeláez, Cundinamarca |
| La Lomita | Paicol, Huila |
| Quara Cacao | Tame, Arauca |
| Chocolover | Guamal, Meta |
| cacaotier | Bogotá D.C. · epicentro educativo |

### North Star v2

**GMV transaccionado** (volumen de órdenes en el marketplace) y **take rate** (comisión + membresías) como métricas primarias de negocio, con **MRR** de membresías y **retención de learners** (Dualita) como métricas de salud de producto. El North Star de v1 (contactos HoReCa calificados) pasa a ser una métrica de entrada del funnel, no la métrica final — ver `11-PRD.md` §Métricas de éxito para el detalle completo.

---

## 1. Tesis estratégica

> **Cacao Colab es un marketplace transaccional del ecosistema de cacao colombiano — agricultores, chocolateros y maquiladores conectados directamente, con aprendizaje gamificado y CRM propio — con impacto social y ambiental verificable.**

Deja de ser "no un joint venture legal, solo una plataforma compartida de marca" (tesis v1) y pasa a ser una plataforma que **sí transacciona** dinero real entre actores reales, bajo el mismo espíritu de "amplificar sin diluir identidad individual" pero con infraestructura de pagos, cuentas y roles real detrás.

### Propósito del Colab v2

1. **Marketplace transaccional** — listings reales, órdenes, pagos vía Stripe Connect, comisión de plataforma.
2. **Dualita** — LMS gamificado real: MOOC largo (Zurych) + microlearning (CAÚA Academy) + XP/rachas/insignias/leaderboard + companion IA.
3. **Co-branding** — se mantiene igual que v1 (ej. NIBS CAÚA × Zurych × Lust).
4. **CRM propio** — sincronizado con HubSpot, con panel interno para el equipo (`/equipo`).
5. **Blog de tendencias** — contenido educativo estilo Callebaut/Valrhona, sin competir con el flujo de conversión (ver memoria de founder: "producto sobre blogging").
6. **App nativa** — mismo marketplace y Dualita, en Expo/React Native.

---

## 2. Decisiones cerradas

> Las decisiones D1–D10 son de **Spec v1**. Se marcan **vigente** (siguen aplicando) o **superseded** (reemplazadas por una decisión v2) — nunca se borran, es historial de decisiones.

| # | Decisión | Valor | Estado |
|---|----------|-------|--------|
| D1 | Identidad del Colab | Iniciativa colaborativa, no alianza de marca | **superseded por D11** — ahora sí hay transacciones reales entre actores. |
| D2 | Plataforma técnica | Next.js 16 App Router + Tailwind v4 + Vercel | **vigente**, expandida por D12 (monorepo). |
| D3 | CRM | HubSpot | **vigente**, expandida por D13 (CRM propio + sync). |
| D4 | Onboarding de entrada | Gate fullscreen en primera visita | **vigente** — sigue viviendo en `apps/web`, sin cambios funcionales. |
| D5 | MOOC | Pertenece a Zurych · en proceso | **vigente** — sin fecha de lanzamiento confirmada aún. |
| D6 | Cupón Alimentec | ALIMENTEC10 · tienda CAÚA · cauacolombia.co | **vigente**, fuera del alcance del marketplace v2. |
| D7 | Emails HubSpot | Body-only HTML sin DOCTYPE | **vigente**, sin cambios. |
| D8 | Paleta visual | Dark bg (#1A2E10 forest) | **vigente** — portada a `packages/ui-tokens` como fuente única. |
| D9 | Tipografía plataforma | Georgia serif (display) + Arial (UI) | **vigente**. |
| D10 | WhatsApp contacto | +57 310 222 7848 | **vigente**. |
| D11 | Identidad del Colab v2 | **Marketplace transaccional real**, no solo vitrina de marca | Reemplaza D1. Ver §1. |
| D12 | Arquitectura de repo | **Monorepo pnpm + Turborepo** — `apps/{web,api,mobile}` + `packages/*` | Ver `06-ARQUITECTURA.md`. Repo sigue siendo `amauryamed-svg/cacao-colab`, reestructurado en rama `v2-pivot`. |
| D13 | CRM v2 | **CRM propio (Postgres) sincronizado bidireccionalmente con HubSpot** | Ver `14-CRM-INTERNO.md`. Anti-loop por hash de payload. |
| D14 | Modelo de negocio | **Híbrido: membresía/suscripción por actor + comisión reducida por transacción** | Stripe Connect Express, destination charges. Ver `08-PAGOS.md`. |
| D15 | Base de datos | **Supabase (Postgres gestionado)** | Proyecto real pendiente de `supabase login` (interactivo, lo corre el usuario). Migraciones escritas y revisadas. Ver `07-MODELO-DATOS.md`. |
| D16 | Visibilidad del repo | **Sigue público** hasta que el usuario confirme que el contenido de `v2-pivot` está listo para privatizar | Reversible al instante — no se cambia en esta pasada. |
| D17 | Dominio propio | **Pendiente de decisión** (`cacaocolab.co` u otro) | Mientras tanto, deploy sirviendo directo en `*.vercel.app` (`cacao-colab-web.vercel.app`, `cacao-colab-api.vercel.app`). Redirect ciego a `caua.cloud/colab/*` retirado de `next.config.ts` en `apps/web`. |
| D18 | Portal interno /equipo | **Login real (Supabase Auth, magic link) para Oscar y Hellen**, con panel de datos reales de HubSpot debajo del nombre | Agregado 2026-07-26 durante la ejecución. Ver `14-CRM-INTERNO.md`. Oscar (`amadooscarito@gmail.com`) sin contacto en HubSpot todavía — panel vacío explícito para él, no simulado. |
| D19 | Marca educativa | **cacaotier** (siempre en minúsculas), proyecto de Amaury Amed | Identidad profesional sobre el motor pedagógico Dualita; Cacao Fine-Flavor es el núcleo y Cacao Colab la capa de mercado. |
| D20 | Oferta formativa | **Master Cacaotier + Master Chocolatier** | Dos rutas pagas conectadas por microlearning abierto, misiones, XP, rangos, bitácora y proyecto verificable. |
| D21 | Rigor científico | Cada dato educativo se clasifica como **publicado, observado, propuesto o calculado** | La línea híbrida en tanque adaptado se presenta como piloto, no como resultado de AGROSAVIA. Ver `15-CACAOTIER-MASTER-SCHOOL.md`. |
| D22 | Ownership cacaotier | **Amaury Amed** es founder y owner de la marca educativa y sus Masterclasses | Hellen Bareño y Oscar Gamboa son builders de Cacao Colab; no se presenta a las marcas regionales como copropietarias. |
| D23 | Red regional | **Cinco nodos territoriales + Bogotá como epicentro** | Landázuri, Arbeláez, Paicol, Tame, Guamal y Bogotá. El círculo permanece abierto. |
| D24 | Cacao Gotchi | Laboratorio virtual de siembra/cosecha con decisiones, estado, XP y progresión | La simulación es pedagógica; no reemplaza asistencia agronómica. Progreso web local en alpha. |
| D25 | Arquitectura pedagógica | **MOOC Zurych = contexto e historia; Microlearning CAÚA = cacao funcional y hábitos; cacaotier = Masterclasses profesionales** | Dualita guía las tres velocidades y los nodos aportan retos/evidencia territorial. |
| D26 | Campus registrado | Google, Apple o magic link para learners; magic link separado para los tres builders | `/campus/*` y `/juega` requieren sesión. OAuth exige habilitar providers y redirect URLs en Supabase. |
| D27 | Progreso sincronizado | `campus_progress` y `gotchi_runs`, con RLS por `auth.uid()` y respaldo local | La migración `20260729190012_campus_registered_progress.sql` debe aplicarse al proyecto Supabase. |
| D28 | Entrada unificada | `/cuenta/entrar` es la única puerta para learners y builders | `claim_team_membership()` reconoce los tres emails internos y los dirige al dashboard superadmin sin fusionar `profiles` y `team_members`. |
| D29 | CRM de conversión | Eventos first-party + contactos locales + snapshot agregado de HubSpot | Mide visitas, registros, onboarding y clics hacia Microlearning CAÚA / MOOC Zurych. No equipara clic con compra. |
| D30 | Privacidad analytics | IDs pseudónimos de visitante/sesión; sin IP en `analytics_events` | CRM y analytics solo se consultan con `service_role` tras validar superadmin. |
| D31 | Fidelidad | **Mazorcas Doradas** como puntos canjeables separados del XP | Ledger append-only, sin valor en efectivo y sin recompensas por reclutamiento. |
| D32 | Rangos comunitarios | Semilla → Brote → Labrador → Guardián → Maestro → Legado | Se asciende por actividad propia verificable; nunca por tamaño de red. |
| D33 | Ecommerce de beneficios | Adaptadores por marca, inactivos por defecto | No se publica un canje como activo sin acuerdo, credenciales, stock, términos y prueba de fulfillment. |
| D34 | Montos de MD declarados | Las recompensas viven en `mazorcaRewards`, no se calculan desde el XP | 40 MD por módulo de microlearning, 30 por misión, 120 por curso, 5 por cuidado (tope 50/día) y 60 por cosecha fermentada. |
| D35 | Microlearning registrado | Completar un módulo escribe `campus_progress` (`microlearning-caua`) y acredita MD | Sin sesión el módulo funciona igual, pero la pantalla final avisa que el avance es local y no acredita puntos. |
| D36 | Progreso visible con su origen | `/aprende` y `/cuenta` muestran el progreso de la cuenta cuando hay sesión y declaran cuándo es solo local | Ninguna superficie muestra ceros como si el learner no hubiera avanzado: si la base no responde, cae al progreso local y lo dice. |
| D37 | Base de conocimiento | `/conocimiento` integra regulación, genética, calidad internacional y producto | Cada ficha declara nivel de evidencia; no inventa DO registrada ni alianzas firmadas. |
| D38 | Ecoyuma | Catálogo externo de plántulas (FEAR 5, TCS 19, TCS 06) | Stock/precio viven en tienda.ecoyuma.com.co; el Colab enlaza y rastrea clics. |
| D39 | Benevolo Cacao | Barra leche + marañón + FEAR 5 como salida práctica de cacaotier | Preventa por WhatsApp mientras no haya checkout/stock confirmado. |

---

## 3. Requerimientos funcionales

> RF-1 a RF-5 son la línea base de **Spec v1**, documentados abajo tal cual (siguen vigentes, viven ahora en `apps/web`). La numeración **continúa sin reiniciar** en `12-SRS.md` (RF-6 en adelante) para todo el alcance nuevo del marketplace, Dualita gamificado, pagos, mobile y CRM interno — ver ese documento para el detalle completo.

### RF-1 — Plataforma web (hoy `apps/web`, antes raíz del repo)

- **Landing page** (`/`): Hero + Marketplace + Dualita + CTA Únete + CTA Marcas.
- **Marketplace** (`/marketplace`): galería de marcas del Colab con BrandCard (evoluciona a listings reales — ver RF-9 en `12-SRS.md`).
- **Aprende** (`/aprende`): hub Dualita — MOOC track + Microlearning track.
- **Únete** (`/unete`): página standalone del onboarding (accesible también directamente).

### RF-2 — Onboarding gate

- Aparece en primera visita a cualquier ruta de la webapp.
- 5 pasos: tipo de operación → nombre + operación → motivación → ciudad → contacto (email + WA).
- Al hacer submit: `POST /api/onboarding` → HubSpot + `Set-Cookie: colab_onboarded=done`.
- Al saltar: `POST /api/onboarding/skip` → `Set-Cookie: colab_onboarded=skipped`.
- Cookie dura 1 año. Gate no vuelve a aparecer en visitas posteriores.
- El formulario es tolerante a fallos de HubSpot — falla silenciosamente, no bloquea al usuario.

### RF-3 — Integración HubSpot CRM

- Variable de entorno estandarizada: **`HUBSPOT_ACCESS_TOKEN`** (antes `HUBSPOT_TOKEN` — ver D-legacy en `03-HUBSPOT.md`; el cliente generalizado en `packages/hubspot-client` acepta ambas con warning de deprecación).
- Propiedades mapeadas: sin cambios respecto a v1 (ver `03-HUBSPOT.md`).
- Upsert: si el email ya existe (409) → PATCH por ID. Lógica ahora vive en `packages/hubspot-client`, reusada por el onboarding y por el panel de `/equipo`.

### RF-4 — Email seguimiento Alimentec

- Sin cambios respecto a v1. Archivo `colab-seguimiento-hubspot.html`, fuera del repo de código (vive en `~/Documents/Caua/Alimentec/emails/`).

### RF-5 — HoReCa landing (cauacolombia.co/pages/horeca)

- Sin cambios respecto a v1. Fuera del alcance de este repo.

---

## 4. Estado actual (2026-07-26, post-pivote)

| Componente | Estado | Notas |
|------------|--------|-------|
| Landing `/` (`apps/web`) | ✅ Live | `cacao-colab-web.vercel.app` — proyecto Vercel nuevo, sin el redirect de Spec v1 |
| API headless (`apps/api`) | ✅ Live (stubs) | `cacao-colab-api.vercel.app` — `/api/v1/{listings,orders,memberships,dualita,webhooks}` responden con contratos validados, sin persistencia real (sin Supabase vivo) |
| App móvil (`apps/mobile`) | ✅ Scaffold | Expo Router, 3 tabs placeholder (marketplace/aprende/perfil). Sin publicar a stores. |
| Monorepo (pnpm + Turborepo) | ✅ Build + lint en verde | `apps/web`, `apps/api`, `apps/mobile` + 6 packages compartidos |
| Modelo de datos (Supabase) | ✅ Migraciones escritas | 11 archivos SQL en `supabase/migrations/`, sin aplicar (sin proyecto real) |
| Portal interno `/equipo` | ✅ Código completo, ⚠️ no operable en vivo | Login Supabase Auth + panel HubSpot — depende del proyecto Supabase real |
| Stripe Connect | ⚠️ Stub sin credenciales | `packages/stripe-client` — sin cuenta ni datos legales de la entidad |
| Sentry | ✅ SDK instalado en las 3 apps | Sin DSN todavía (no-op hasta crear el proyecto) |
| Onboarding gate + HubSpot | ✅ Vigente sin cambios | Mismo comportamiento de v1 |
| cacaotier / Master Cacaotier | ✅ Primera experiencia implementada | Campus, curso FEAR 5, laboratorio comparativo y base visual móvil. Persistencia LMS pendiente. |
| cacao-colab.vercel.app (proyecto viejo, `main`) | ⚠️ Sigue con el 308 a caua.cloud/colab | Intencional — se corrige al mergear `v2-pivot` a `main` |

---

## 5. Pendientes abiertos

| # | Tarea | Prioridad | Owner |
|---|-------|-----------|-------|
| P1 | `supabase login` + crear proyecto real | 🔴 Alta | Amaury (interactivo, no delegable) |
| P2 | Usernames/emails de GitHub de Oscar y Hellen para invitarlos al repo | 🔴 Alta | Amaury |
| P3 | Decisión de dominio propio (`cacaocolab.co` u otro) | 🟡 Media | Amaury |
| P4 | Cuenta Stripe Connect (KYC/entidad legal de la plataforma) | 🔴 Alta | Amaury |
| P5 | Confirmar si el contacto de Oscar Gamboa se da de alta en HubSpot | 🟡 Media | Amaury |
| P6 | Revisar y mergear `v2-pivot` → `main` cuando el contenido esté validado | 🟡 Media | Amaury |
| P7 | Confirmar si `cacaofrutabrutal` (otro proyecto Vercel) es parte de este ecosistema | 🟢 Baja | Amaury |
| P8 | Activar MOOC Zurych cuando esté listo | 🟢 Baja | Zurych |

---

*Este Spec se actualiza con cada cambio de rumbo. Ver `05-ROADMAP.md` para detalle de fases y `06-ARQUITECTURA.md`–`14-CRM-INTERNO.md` para el detalle técnico completo del pivote v2.*
