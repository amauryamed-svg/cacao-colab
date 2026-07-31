# Cacao Colab — Plug and play

> Empaquetado para que Hellen (Frontend), Oscar (Backend) y Amaury (PM) bajen el repo y tengan el Colab corriendo en minutos.  
> Última actualización: 2026-07-31

---

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js | ≥ 20 |
| pnpm | 11.17.0 (ver `packageManager` en `package.json`) |
| Git | cualquiera reciente |
| (Opcional móvil) | Expo Go en iOS/Android |

```bash
corepack enable
corepack prepare pnpm@11.17.0 --activate
```

---

## Bootstrap en un comando

Desde la raíz del monorepo:

```bash
./scripts/bootstrap.sh
```

El script:

1. Verifica Node ≥ 20 y pnpm  
2. Corre `pnpm install`  
3. Imprime los comandos de arranque por rol  

Arranque manual equivalente:

```bash
git clone https://github.com/amauryamed-svg/cacao-colab.git
cd cacao-colab
pnpm install
pnpm dev:web          # Hellen — http://localhost:3000
# en otra terminal:
pnpm dev:api          # Oscar  — API headless
pnpm --filter @cacao-colab/mobile start   # móvil Expo
```

---

## Stack y lenguaje

| Capa | Tecnología | Lenguaje |
|------|------------|----------|
| Web | Next.js 16 App Router, React 19, Tailwind v4 | **TypeScript** |
| API | Next.js 16 headless (`apps/api`) | **TypeScript** |
| Móvil | Expo 57 + expo-router + React Native 0.86 | **TypeScript** |
| Datos | Supabase (Postgres + Auth + RLS) | SQL + TS |
| Contratos | Zod en `packages/types` | TypeScript |
| CRM | HubSpot API v3 (`packages/hubspot-client`) | TypeScript |
| Pagos | Stripe Connect (stub → real) | TypeScript |
| Deploy web/API | Vercel | — |
| Deploy móvil | EAS Build → App Store / Google Play | ver `21-APP-STORES.md` |
| Monorepo | pnpm workspaces + Turborepo | — |

Producto live: [https://cacao-colab.vercel.app](https://cacao-colab.vercel.app)

---

## Guía por builder

### Hellen — Frontend

```bash
pnpm dev:web
# UI: apps/web/app · components · lib
# Tokens: packages/ui-tokens
# Móvil: pnpm --filter @cacao-colab/mobile start
```

Lee primero: `02-PLATFORM.md`, `13-MOBILE.md`, pantallazos en `docs/assets/screenshots/`.

### Oscar — Backend

```bash
pnpm dev:api
# Rutas: apps/api
# Schema: supabase/migrations · packages/types
# Auth equipo: docs/14-CRM-INTERNO.md
```

Lee primero: `06-ARQUITECTURA.md`, `07-MODELO-DATOS.md`.  
Aplicar migraciones requiere proyecto Supabase real (`supabase login` — Amaury).

### Amaury — Product Manager

- Spec y prioridades: `00-SPEC.md`, `05-ROADMAP.md`, `11-PRD.md`
- Validar prod en Vercel y aceptar invites de collaborators
- Aprobar checklist de stores (`21-APP-STORES.md`)

---

## Variables de entorno (mínimo local)

Copia de referencia (no commitear secretos):

```bash
# apps/web (.env.local)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
HUBSPOT_ACCESS_TOKEN=
```

Sin Supabase, marketing + Dualita estática siguen sirviendo; login `/equipo` y CRM requieren las keys.

---

## Verificación rápida

```bash
pnpm typecheck
pnpm --filter @cacao-colab/web lint
pnpm --filter @cacao-colab/mobile typecheck
```

---

## Invitar a alguien al Colab (producto)

1. Abrir [cacao-colab.vercel.app](https://cacao-colab.vercel.app)  
2. CTA **Unirme** / onboarding purpose-led  
3. WhatsApp del site para nodos y marcas  
4. Developers: este repo + `./scripts/bootstrap.sh`
