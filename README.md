# Cacao Colab

Marketplace transaccional + app nativa que conecta agricultores de cacao colombiano con
chocolateros y maquiladores, con aprendizaje gamificado (**Dualita** — MOOC Zurych + microlearning
CAÚA Academy). Iniciativa fundada por CAÚA Colombia × Chocolate Zurych.

**Método: Spec-Driven.** `docs/00-SPEC.md` es la fuente de verdad. Cualquier cambio de rumbo se
escribe ahí *antes* de tocar código. Empieza por `docs/00-SPEC.md` → `docs/11-PRD.md` →
`docs/12-SRS.md` si es tu primera vez en el repo.

## Estructura

```
apps/
  web/     Next.js — marketing, blog, marketplace (browse), admin. cacaocolab.co
  api/     Next.js headless — /api/v1/*, lógica de negocio (listings, orders, pagos, LMS, Dualita IA)
  mobile/  Expo (React Native) — app nativa iOS/Android
packages/
  types/            Zod schemas → tipos TS compartidos
  ui-tokens/        Paleta y tipografía de marca (única fuente de verdad, web + mobile)
  supabase-client/  Cliente Postgres/Supabase tipado
  hubspot-client/   Sync con el HubSpot compartido de Caúa
  stripe-client/    Stripe Connect (Express) — pagos del marketplace
  ai-companion/     Dualita con IA real, patrón portado de Emily (caua-io)
supabase/
  migrations/       Esquema SQL
docs/                Spec-Driven — PRD, SRS, arquitectura, modelo de datos, pagos, gamificación, etc.
```

## Setup

```bash
pnpm install
pnpm dev            # todas las apps
pnpm dev:web         # solo apps/web
pnpm dev:api         # solo apps/api
pnpm dev:mobile      # solo apps/mobile (Expo)
```

Requiere `.env.local` en cada app — ver `docs/06-ARQUITECTURA.md` § variables de entorno. Ninguna
credencial real está commiteada.

## Equipo

- **Oscar** — Backend (`apps/api`, `packages/*-client`, `supabase/migrations`)
- **Hellen** — Frontend (`apps/web`, `apps/mobile`, `packages/ui-tokens`)
- **Amaury** — Marketing/Ventas, CTO, dueño del Spec

## Documentación completa

Ver `docs/00-SPEC.md` para el índice completo de decisiones, PRD, SRS y arquitectura.
