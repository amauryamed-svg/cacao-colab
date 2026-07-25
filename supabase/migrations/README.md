# Migraciones — orden de aplicación

`0001_identity.sql` → `0002_marketplace.sql` → `0003_payments.sql` → `0004_lms.sql` →
`0005_gamification.sql` → `0006_companion.sql` → `0007_cms.sql` → `0008_crm.sql`

Numeradas por dependencia de FK (identity primero, todo lo demás referencia `profiles`/`organizations`).

## Sin proyecto Supabase todavía

Estas migraciones no se han aplicado contra un proyecto real — no existe `SUPABASE_URL` ni login.
Para activarlo:

```bash
supabase login          # interactivo, requiere el founder
supabase link --project-ref <ref-del-proyecto-nuevo>
supabase db push
```

Después de aplicar, agregar el pooler de Supavisor (puerto 6543, modo "transaction") como
`DATABASE_URL` en `apps/api`/`apps/web` — **nunca** la conexión directa (5432) fuera de este CLI.
Ver `docs/06-ARQUITECTURA.md`.
