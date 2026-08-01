-- Economía MD: packs de compra, scorecard de productividad (BSC) y sinks Colab.
-- Anti-pirámide: pack_purchase no suma a lifetime_earned; scorecard solo actividad propia.

-- 1) Categorías de ledger: pack_purchase + scorecard_bonus
alter table public.mazorca_ledger
  drop constraint if exists mazorca_ledger_category_check;

alter table public.mazorca_ledger
  add constraint mazorca_ledger_category_check check (category in (
    'learning', 'care', 'community', 'verified_purchase',
    'redemption', 'adjustment', 'pack_purchase', 'scorecard_bonus'
  ));

-- 2) lifetime_earned ignora packs comprados (anti pay-to-win de rango)
create or replace function public.apply_mazorca_ledger_entry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  lifetime_delta integer;
begin
  insert into public.mazorca_wallets (profile_id, balance, lifetime_earned)
  values (new.profile_id, 0, 0)
  on conflict (profile_id) do nothing;

  lifetime_delta := case
    when new.amount > 0 and new.category not in ('pack_purchase', 'verified_purchase')
      then new.amount
    else 0
  end;

  update public.mazorca_wallets
     set balance = balance + new.amount,
         lifetime_earned = lifetime_earned + lifetime_delta,
         updated_at = now()
   where profile_id = new.profile_id
     and balance + new.amount >= 0;

  if not found then
    raise exception 'saldo insuficiente de Mazorcas Doradas';
  end if;
  return new;
end;
$$;

comment on function public.apply_mazorca_ledger_entry() is
  'Aplica crédito/débito al wallet. pack_purchase y verified_purchase no suben lifetime_earned (rango = actividad productiva, no pay-to-win).';

-- 3) Intenciones de compra de packs (Stripe futuro)
create table if not exists public.mazorca_pack_intents (
  id               uuid primary key default gen_random_uuid(),
  profile_id       uuid not null references public.profiles(id) on delete cascade,
  pack_slug        text not null,
  md_amount        integer not null check (md_amount > 0),
  price_cop        integer not null check (price_cop > 0),
  status           text not null default 'pending' check (status in (
                     'pending', 'checkout_created', 'paid', 'cancelled', 'expired'
                   )),
  stripe_session_id text,
  ledger_credit_id uuid references public.mazorca_ledger(id),
  metadata         jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger mazorca_pack_intents_set_updated_at
  before update on public.mazorca_pack_intents
  for each row execute function public.set_updated_at();

create index if not exists mazorca_pack_intents_profile_idx
  on public.mazorca_pack_intents (profile_id, created_at desc);

alter table public.mazorca_pack_intents enable row level security;

create policy "learner ve sus pack intents"
  on public.mazorca_pack_intents for select
  using (auth.uid() = profile_id);

-- 4) Liquidaciones scorecard (idempotentes por periodo)
create table if not exists public.mazorca_scorecard_settlements (
  id               uuid primary key default gen_random_uuid(),
  profile_id       uuid not null references public.profiles(id) on delete cascade,
  period_key       text not null, -- YYYY-Www (ISO week UTC)
  role_slug        text not null default 'learner',
  xp_total         integer not null default 0 check (xp_total >= 0),
  xp_leverage      numeric(4,2) not null default 1.00,
  balance_score    numeric(6,4) not null default 0,
  bonus_md         integer not null check (bonus_md >= 0),
  ceiling_md       integer not null check (ceiling_md >= 0),
  perspectives     jsonb not null default '{}'::jsonb,
  ledger_credit_id uuid references public.mazorca_ledger(id),
  created_at       timestamptz not null default now(),
  unique (profile_id, period_key)
);

create index if not exists mazorca_scorecard_settlements_period_idx
  on public.mazorca_scorecard_settlements (period_key);

alter table public.mazorca_scorecard_settlements enable row level security;

create policy "learner ve su scorecard"
  on public.mazorca_scorecard_settlements for select
  using (auth.uid() = profile_id);

comment on table public.mazorca_scorecard_settlements is
  'Bono semanal por productividad propia (BSC). Sin reclutamiento ni downline. XP solo apalanca.';

-- 5) Sinks Colab digitales activos + adaptar conector cacaotier
insert into public.benefit_catalog_items (
  brand_key, slug, title, description, cost_md, fulfillment_type,
  min_rank_slug, stock_qty, per_user_limit, status, terms, metadata
)
values
  (
    'cacaotier', 'aceleracion-arquitecto',
    'Aceleración Arquitecto de Fermentación',
    'Acceso digital a la ruta acelerada de Arquitecto (misiones Dualita + bitácora).',
    300, 'colab_digital', 'brote', null, 1, 'active',
    'Desbloquea contenido digital del Colab. No incluye mentoría presencial ni certificado sin evaluación.',
    '{"brand":"cacaotier","service":"course_unlock","course_slug":"arquitecto-fermentacion"}'::jsonb
  ),
  (
    'cacaotier', 'preview-master-chocolatier',
    'Preview Master Chocolatier',
    'Desbloqueo de misiones iniciales del track Master Chocolatier con Dualita.',
    400, 'colab_digital', 'labrador', null, 1, 'active',
    'Acceso digital parcial. La certificación exige proyecto y evaluación aparte.',
    '{"brand":"cacaotier","service":"course_unlock","course_slug":"maestro-chocolatier"}'::jsonb
  ),
  (
    'cacaotier', 'ruta-benevolo',
    'Ruta Benevolo (capstone)',
    'Track digital del capstone Chocolate Benevolo conectado a Master Chocolatier.',
    350, 'colab_digital', 'labrador', null, 1, 'active',
    'Contenido y preventa Benevolo. No garantiza inventario físico ni medalla COEX.',
    '{"brand":"cacaotier","service":"course_unlock","course_slug":"chocolate-benevolo"}'::jsonb
  ),
  (
    'cacaotier', 'mentoria-dualita-semana',
    'Cupo mentoría Dualita (semana)',
    'Un cupo semanal de acompañamiento Dualita para dudas de fermentación o producto.',
    200, 'colab_digital', 'guardian', null, 2, 'active',
    'Fulfillment por cola interna. Vigencia 7 días desde el canje. Sin promesa de horarios fijos.',
    '{"brand":"cacaotier","service":"mentorship_slot"}'::jsonb
  )
on conflict (brand_key, slug) do update set
  title = excluded.title,
  description = excluded.description,
  cost_md = excluded.cost_md,
  fulfillment_type = excluded.fulfillment_type,
  min_rank_slug = excluded.min_rank_slug,
  per_user_limit = excluded.per_user_limit,
  status = excluded.status,
  terms = excluded.terms,
  metadata = excluded.metadata;

update public.brand_commerce_adapters
   set adapter_type = 'colab_native',
       status = 'active',
       public_config = '{"note":"Canjes digitales Colab (cursos/aceleraciones) activos."}'::jsonb,
       updated_at = now()
 where brand_key = 'cacaotier';

insert into public.brand_commerce_adapters (brand_key, adapter_type, status, public_config)
values ('cacaotier', 'colab_native', 'active', '{"note":"Canjes digitales Colab (cursos/aceleraciones) activos."}'::jsonb)
on conflict (brand_key) do update set
  adapter_type = excluded.adapter_type,
  status = excluded.status,
  public_config = excluded.public_config,
  updated_at = now();
