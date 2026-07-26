# Cacao Colab — Plataforma técnica (apps/web)

> Estado: v2 — `apps/web` dentro del monorepo. Para la arquitectura completa (apps/api, apps/mobile, packages/*), ver `06-ARQUITECTURA.md`.
> Última actualización: 2026-07-26 (pivote v2)

---

## 1. Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js App Router | 16.2.9 |
| Estilos | Tailwind CSS | v4 (`@theme` tokens, ahora alimentados desde `packages/ui-tokens`) |
| Lenguaje | TypeScript | — |
| Deploy | Vercel | Proyecto `cacao-colab-web` (nuevo, root directory `apps/web`) |
| CRM | HubSpot API v3 | Vía `packages/hubspot-client` |
| Auth | Supabase Auth (magic link) | Solo para `/equipo` — ver §8 |
| Observabilidad | Sentry (`@sentry/nextjs`) | Instalado, sin DSN todavía |
| Repo | github.com/amauryamed-svg/cacao-colab | branch: `v2-pivot` (worktree), monorepo desde la raíz |

**Qué cambió respecto a v1:** este código vivía en la raíz del repo; ahora vive en `apps/web/`. El redirect 308 ciego hacia `caua.cloud/colab/*` se retiró de `next.config.ts` (ver D17 en `00-SPEC.md`). El proyecto Vercel también es nuevo (`cacao-colab-web`, no el `cacao-colab` original que sigue atado a `main`).

---

## 2. Tokens de marca

Fuente única ahora: `packages/ui-tokens/src/index.ts` (`colabColors`, `colabFonts`). `apps/web/app/globals.css` los vuelca al `@theme` de Tailwind v4 igual que antes — el valor no cambió, solo dejó de estar hardcodeado en un solo archivo:

```css
@theme {
  --color-colab-yellow:  #F2C830;   /* primario */
  --color-colab-amber:   #C8A010;   /* hover */
  --color-colab-green:   #3D7A2C;   /* secundario */
  --color-colab-forest:  #1A2E10;   /* dark bg */
  --color-colab-cream:   #F7F1EE;   /* Heirloom White */
  --color-colab-pod:     #87AA27;   /* Pod Green */
  --color-colab-ink:     #1C3B26;   /* forest claro */
  --color-colab-mist:    #E8E0DA;

  --font-display: Georgia, "Times New Roman", serif;
  --font-ui:      Arial, Helvetica, sans-serif;
}
```

Keyframes globales: `squirrelBob` (ardilla flotante) · `fadeUp` (reveal de pasos).

---

## 3. Árbol de rutas

```
/                    → Landing (hero + marketplace + dualita + CTAs)
/marketplace         → Galería de marcas expandida
/aprende             → Hub Dualita completo
/aprende/[slug]      → Lección individual
/unete               → Onboarding standalone (también accesible directo)

/equipo              → Portal interno (protegido, Supabase Auth) — nuevo en v2
/equipo/login        → Login magic link — nuevo en v2
/auth/callback       → Callback de Supabase Auth (exchange code→session) — nuevo en v2

/api/onboarding      POST → HubSpot create/upsert + Set-Cookie
/api/onboarding/skip POST → solo Set-Cookie (sin HubSpot)
```

La API transaccional (`/api/v1/*`) vive aparte, en `apps/api` — ver `06-ARQUITECTURA.md` para la razón de la separación.

---

## 4. Árbol de componentes (dentro de `apps/web/`)

```
app/
  layout.tsx            ← Navbar + OnboardingGate (server) + Footer
  global-error.tsx       ← boundary de Sentry — nuevo en v2
  page.tsx              ← Landing
  marketplace/page.tsx
  aprende/page.tsx
  aprende/[slug]/page.tsx
  unete/page.tsx
  equipo/                ← portal interno — nuevo en v2
    page.tsx              ← protegido, bienvenida + panel HubSpot
    actions.ts            ← sign out
    login/
      page.tsx
      actions.ts          ← requestMagicLink (Supabase Auth)
  auth/callback/route.ts  ← nuevo en v2
  globals.css
  api/
    onboarding/
      route.ts
      skip/route.ts

components/
  nav/Navbar.tsx
  brand/
    SquirrelSVG.tsx
    CacaoColabWordmark.tsx
  marketplace/
    BrandCard.tsx, BrandNetwork.tsx, ComingSoonSlot.tsx, DirectoryCard.tsx, TerritoryDetail.tsx
  dualita/
    DualitaHero.tsx, MOOCTrack.tsx, MicroTrack.tsx, ModuleCard.tsx
  aprende/
    DualitaCompanion.tsx, LessonCard.tsx, LessonComplete.tsx, LessonPlayer.tsx, ProgressStrip.tsx, QuizCard.tsx
  onboarding/
    OnboardingGate.tsx, OnboardingGateClient.tsx, OnboardingFlow.tsx
  team/                  ← nuevo en v2
    LoginForm.tsx, TeamWelcome.tsx, TeamHubspotPanel.tsx
  ui/
    Button.tsx, SectionKicker.tsx

lib/
  brands.ts             ← seed/fallback de `organizations` (Supabase) — ver 07-MODELO-DATOS.md
  territories.ts        ← seed/fallback de `territories`
  dualita.ts            ← seed/fallback de `courses`/`modules`
  lessons.ts            ← seed/fallback de `lessons`/`quizzes`
  directory-candidates.ts
  hooks/useColabProgress.ts

middleware.ts           ← nuevo en v2 — refresca sesión Supabase, scoped a /equipo y /auth
instrumentation.ts      ← Sentry server — nuevo en v2
instrumentation-client.ts ← Sentry browser — nuevo en v2
```

---

## 5. Onboarding gate — flujo técnico (sin cambios desde v1)

```
Usuario llega a cualquier ruta
    ↓
layout.tsx → OnboardingGate (server)
    ↓
cookies().get('colab_onboarded') ?
    ├── SÍ → renderiza children directo (sin gate)
    └── NO → OnboardingGateClient muestra overlay fullscreen

OnboardingFlow completa paso 5
    ↓
fetch POST /api/onboarding { tipo, nombre, operacion, interes, ciudad, email, whatsapp }
    ↓
API → HubSpot CRM (create o upsert por email, ahora vía packages/hubspot-client)
    ↓
Response headers: Set-Cookie: colab_onboarded=done; Max-Age=31536000
    ↓
dismiss() → fade out overlay → unmount
```

---

## 6. Login del portal /equipo — flujo técnico (nuevo en v2)

```
/equipo/login → LoginForm (client) → requestMagicLink(email) [server action]
    ↓
supabase.auth.signInWithOtp({ email, emailRedirectTo: '/auth/callback?next=/equipo' })
    ↓
Usuario recibe email, hace click
    ↓
/auth/callback?code=... → exchangeCodeForSession(code) → Set-Cookie de sesión
    ↓
redirect /equipo
    ↓
/equipo (server component) → supabase.auth.getUser() → lee team_members por email
    ↓
Si existe fila → TeamWelcome ("Hola {nombre}") + TeamHubspotPanel (datos reales de HubSpot si hay hubspot_contact_email)
Si no existe fila → mensaje explícito, no error
```

Ver `14-CRM-INTERNO.md` para el detalle completo, incluyendo por qué Oscar no tiene panel de HubSpot con datos todavía.

---

## 7. Variables de entorno

| Variable | Dónde | Descripción |
|----------|-------|-------------|
| `HUBSPOT_ACCESS_TOKEN` | Vercel env vars | Private App token HubSpot. Reemplaza `HUBSPOT_TOKEN` (ver `03-HUBSPOT.md`) |
| `HUBSPOT_TOKEN` | Vercel env vars | Legacy — sigue funcionando vía fallback en `packages/hubspot-client`, con warning |
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel env vars | URL del proyecto Supabase — pendiente de que exista el proyecto |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel env vars | Anon key del proyecto Supabase |
| `NEXT_PUBLIC_SITE_URL` | Vercel env vars | Usado para el `emailRedirectTo` del magic link |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | Vercel env vars | Pendiente de crear el proyecto Sentry |
| `ANTHROPIC_API_KEY` | Vercel env vars | Para `packages/ai-companion` (Dualita IA) |

Archivo local: `.env.local` (en `.gitignore`, no commitear).

---

## 8. Deploy

Proyecto Vercel: **`cacao-colab-web`** (nuevo, creado 2026-07-25/26 bajo `amauryamed-1073s-projects`), Root Directory = `apps/web`, Framework = Next.js.

URL: `https://cacao-colab-web.vercel.app` — sin redirect, sirviendo directo.

El proyecto original `cacao-colab` (atado a `main`, `https://cacao-colab.vercel.app`) sigue con el 308 hacia `caua.cloud/colab/*` — se corrige cuando `v2-pivot` se mergee a `main` (o se apunte ese proyecto viejo a la rama nueva, decisión de Amaury).
