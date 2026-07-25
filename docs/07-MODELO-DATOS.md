# Cacao Colab — Modelo de datos

> Mapa de dominios/tablas/relaciones. Para el DDL completo ver `supabase/migrations/0001-0008`.
> Para los tipos TypeScript equivalentes ver `packages/types/src/*`.

---

## 1. Identidad (`0001_identity.sql`)

```
territories ──┐
              ├─< organizations (role: owner | colaborador)
              │         │
              │         └─< profiles (organization_id nullable)
              │                   │
              └───────────────────┴─< actor_roles (N:N: profile ↔ farmer/chocolatier/maquilador/buyer)
```

`organizations` = nivel de gobernanza (Owner/Colaborador, ver `04-ACTORES.md`). `profiles`/
`actor_roles` = nivel de cuenta transaccional. Independientes — ver D19 en `00-SPEC.md`.

`profiles.id` **comparte el mismo UUID que `auth.users.id`** (no una FK separada) — patrón estándar
de Supabase Auth.

---

## 2. Marketplace (`0002_marketplace.sql`)

```
listings (organization_id nullable, profile_id nullable, territory_id)
    └─< listing_media
```

`listings` requiere `organization_id` **o** `profile_id` (constraint `listing_owner_check`) — un
listing siempre tiene un dueño, sea organización o cuenta individual.

---

## 3. Pagos (`0003_payments.sql`)

```
orders (buyer_profile_id, seller_organization_id | seller_profile_id)
    └─< order_items (listing_id, quantity, unit_price_cents)
    └─< commission_ledger (append-only — nunca UPDATE del monto, solo status)

commission_rules (actor_type, membership_tier, rate_bps, effective_from)
membership_plans ──< memberships (profile_id | organization_id)
connected_accounts (profile_id | organization_id, stripe_account_id)
```

Ver `08-PAGOS.md` para el flujo completo. `commission_ledger` es append-only por diseño — es el
rastro de auditoría que sostiene la narrativa "enterprise-grade" para licenciamiento futuro.

---

## 4. LMS — Dualita (`0004_lms.sql`)

```
courses (track: mooc_zurych | micro_caua)
    └─< modules
          └─< lessons
                └─< quizzes
                      └─< quiz_attempts (profile_id)
```

Reemplaza `apps/web/lib/dualita.ts` y `lib/lessons.ts` (arrays hardcodeados en v1) por datos reales.

---

## 5. Gamificación (`0005_gamification.sql`)

```
learner_progress (profile_id, lesson_id, status)
xp_ledger (profile_id, amount, reason, ref_id)      ← append-only, total = SUM(amount)
streaks (profile_id, current_streak, longest_streak)
badges ──< profile_badges (profile_id, badge_id)
leaderboard_weekly                                    ← vista materializada, refresh por pg_cron
```

**`xp_ledger` es append-only por diseño** — el XP total de un profile nunca es un contador mutable,
es `SUM(amount)`. Evita race conditions cuando dos eventos otorgan XP casi simultáneamente (ej.
completar una lección y que se dispare un streak bonus el mismo segundo). Ver `09-GAMIFICACION.md`
para el mapeo desde el prototipo Python `amauryamed-svg/dualita`.

---

## 6. Companion Dualita IA (`0006_companion.sql`)

```
companion_conversations (profile_id, channel: mobile | web)
    └─< companion_messages (role: user | assistant | tool)

companion_memory (profile_id, key, value jsonb)         ← key-value por profile
```

Postgres real — **no** el hack de HubSpot-deal-como-KV que usa Emily hoy en `caua-io`. Ver
`10-DUALITA-IA.md`.

---

## 7. CMS — blog (`0007_cms.sql`)

```
posts (author_profile_id, published_at)
    └─< post_tags >─┐
                     └─ tags
```

---

## 8. CRM interno (`0008_crm.sql`)

```
crm_contacts (hubspot_contact_id nullable, profile_id nullable, owner_profile_id)
    └─< crm_activities (type: note | call | email | whatsapp | meeting)

hubspot_sync_log (entity_type, local_id, hubspot_id, direction, payload_hash, status)
```

`hubspot_sync_log` es el mecanismo anti-loop: antes de empujar a HubSpot se compara el hash del
payload contra el último sync exitoso; si un webhook entrante de HubSpot ya escribió el mismo
estado (`direction='from_hubspot'`), el siguiente pase saliente ve el hash sin cambios y no
reenvía. Ver `14-CRM-INTERNO.md`.

---

## 9. RLS — políticas por tabla (resumen)

Regla general: **contenido publicado es público** (`organizations.status='active'`,
`listings.status='published'`, `courses.published=true`, `posts.published_at is not null`); **datos
propios son visibles solo por su dueño** (`auth.uid() = profile_id`); **tablas financieras
(`commission_ledger`, `commission_rules`, `crm_contacts`, `hubspot_sync_log`) no tienen policy de
select para `authenticated`** — solo se leen vía `createServiceClient()` desde `apps/api`/admin,
nunca desde el browser client. Ver el DDL completo en cada migración para las policies exactas.

---

## 10. Naming convention

Tablas y columnas en `snake_case` (convención Postgres/Supabase). `packages/types` expone los
mismos campos en `camelCase` (convención TS) — la traducción sucede en la capa de acceso a datos
(`packages/supabase-client` / queries de `apps/api`), no en el schema.
