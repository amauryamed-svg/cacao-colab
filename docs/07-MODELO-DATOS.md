# Cacao Colab — Modelo de datos (v2)

> Nuevo en v2. Última actualización: 2026-07-26.
> Fuente de verdad del schema: `supabase/migrations/*.sql`. Fuente de verdad de tipos de aplicación: `packages/types/src/*.ts` (Zod). Ambos deben mantenerse consistentes a mano hasta que exista el proyecto Supabase real y se pueda correr `supabase gen types`.

---

## 0. Por qué Zod *y* SQL en paralelo

`packages/types` (Zod) es el contrato que usan `apps/web`, `apps/api` y `apps/mobile` para pasarse datos entre sí (ej. el body de un `POST /api/v1/listings`). Las migraciones SQL son el shape real de Postgres, con constraints, RLS y relaciones que Zod no puede expresar (foreign keys, RLS policies, triggers). Son complementarios, no redundantes — cuando exista el proyecto Supabase, `supabase gen types` genera `packages/supabase-client/src/database.types.ts` (hoy escrito a mano, solo para `team_members`) y ese archivo pasa a ser la fuente de verdad del shape de Postgres; Zod sigue siendo el contrato de API/validación de input.

---

## 1. Dominios y tablas

| Dominio | Tablas | Migración | Reemplaza (Spec v1) |
|---------|--------|-----------|----------------------|
| Organizaciones y territorio | `organizations`, `territories` | `0001_organizations_territories.sql` | `lib/brands.ts`, `lib/territories.ts` |
| Cuentas de marketplace | `profiles`, `actor_roles` | `0002_profiles_actor_roles.sql` | (nuevo — v1 no tenía cuentas) |
| Listings | `listings`, `listing_media` | `0003_listings.sql` | (nuevo) |
| Órdenes y comisión | `orders`, `order_items`, `commission_ledger`, `commission_rules` | `0004_orders_commission.sql` | (nuevo) |
| Membresías y pagos | `membership_plans`, `memberships`, `connected_accounts` | `0005_memberships_connected_accounts.sql` | (nuevo) |
| LMS Dualita | `courses`, `modules`, `lessons`, `quizzes` | `0006_lms_dualita.sql` | `lib/dualita.ts`, `lib/lessons.ts` |
| Gamificación | `learner_progress`, `xp_ledger`, `streaks`, `badges`, `profile_badges`, `leaderboard_weekly` (vista) | `0007_gamification.sql` | (nuevo — prototipo Python `dualita`, ver `09-GAMIFICACION.md`) |
| Companion IA | `companion_conversations`, `companion_messages`, `companion_memory` | `0008_companion.sql` | (nuevo) |
| Blog | `posts`, `tags`, `post_tags` | `0009_blog.sql` | (nuevo) |
| CRM interno | `crm_contacts`, `crm_activities`, `hubspot_sync_log` | `0010_crm.sql` | (nuevo) |
| Portal interno /equipo | `team_members` | `0011_team_auth.sql` | (nuevo, agregado 2026-07-26 durante la ejecución) |
| Campus registrado | `campus_progress`, `gotchi_runs` | `0012_campus_registered_progress.sql` | Progreso local |
| CRM funnel | `analytics_events` + superadmin | `0013_unified_admin_crm_funnel.sql` | Analytics disperso |
| Edutainment loyalty | `mazorca_wallets`, `mazorca_ledger`, `community_ranks`, `benefit_*`, `brand_commerce_adapters` | `0014_mazorcas_doradas_loyalty.sql` | XP no canjeable 1:1 |
| Economía MD scorecard | `mazorca_pack_intents`, `mazorca_scorecard_settlements` + sinks Colab | `20260801120000_economia_md_scorecard.sql` | Packs no suben rango; BSC anti-MLM |

---

## 2. Diagrama de relaciones (simplificado)

```
organizations ──┬── listings ── listing_media
                ├── memberships ── membership_plans
                ├── connected_accounts
                └── territories (FK opcional en listings)

profiles ──┬── actor_roles
           ├── orders (buyer_profile_id)
           ├── learner_progress ── lessons ── modules ── courses
           ├── xp_ledger, streaks, profile_badges ── badges
           ├── companion_conversations ── companion_messages
           ├── companion_memory
           └── posts (author_profile_id)

orders ──┬── order_items ── listings
         └── commission_ledger ── commission_rules

crm_contacts ──┬── crm_activities
               └── hubspot_sync_log

team_members ── (user_id → auth.users, sin relación con profiles ni organizations)
```

`team_members` está deliberadamente aislada — ver `06-ARQUITECTURA.md` §6 para por qué no comparte tabla con `profiles`.

---

## 3. Convenciones

- **IDs:** `uuid primary key default gen_random_uuid()` en todas las tablas (requiere `pgcrypto`, habilitada en la primera migración).
- **Dinero:** siempre en centavos (`_cents`, `integer`), nunca `numeric`/`float` — evita errores de redondeo. Moneda fija `COP` por ahora (`currency = 'COP'` check constraint) — multi-moneda es una decisión futura, no de esta fundación.
- **Append-only:** `commission_ledger` y `xp_ledger` nunca reciben `UPDATE` — correcciones son un nuevo `INSERT` con `reversal_of_ledger_id` apuntando al asiento original. Auditable por diseño.
- **Timestamps:** `created_at`/`updated_at` en `timestamptz`, con trigger genérico `set_updated_at()` (definido una vez en la primera migración, reusado en todas las tablas mutables).
- **Enums vía `check` constraint**, no `create type enum` — más fácil de alterar sin migraciones de tipo (Postgres no permite `ALTER TYPE ... DROP VALUE`, los checks sí se pueden reemplazar).

---

## 4. Tablas de solo lectura pública vs. protegidas

Ver `06-ARQUITECTURA.md` §5 para el resumen de patrones de RLS. Regla general: si un dato aparece en una página SSG/marketing (organizations, listings activos, lessons, posts publicados), es de lectura pública. Todo lo que implica dinero, actividad de un usuario específico, o CRM interno, está scoped o restringido a `service_role`.

---

## 5. Seed (`supabase/seed.sql`)

Contiene el pre-registro de `team_members` (Oscar y Hellen, con sus emails reales confirmados 2026-07-26) — ver `14-CRM-INTERNO.md`. No siembra datos de `organizations`/`listings`/etc. todavía: esos siguen viviendo como arrays hardcodeados en `apps/web/lib/*.ts` hasta que Oscar migre el contenido real al Supabase real (Fase 1-2, ver `05-ROADMAP.md`).

---

## 6. Cómo aplicar las migraciones (cuando exista el proyecto)

```bash
supabase login                      # interactivo — lo corre Amaury, no un agente
supabase link --project-ref <ref>
supabase db push                    # aplica las 11 migraciones en orden
supabase db seed                    # o: psql < supabase/seed.sql
supabase gen types typescript --project-id <ref> > packages/supabase-client/src/database.types.ts
```

Ninguno de estos comandos se corrió en esta pasada — las migraciones están escritas y revisadas, no aplicadas.
