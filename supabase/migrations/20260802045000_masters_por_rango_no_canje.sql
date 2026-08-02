-- Masters se abren por rango (MD históricas), no por canjear «aceleración».
-- 1) Retira sinks course_unlock.
-- 2) Devuelve MD de canjes ya hechos (solo saldo; no infla lifetime/rango).
-- 3) Categoría refund en ledger.

alter table public.mazorca_ledger
  drop constraint if exists mazorca_ledger_category_check;

alter table public.mazorca_ledger
  add constraint mazorca_ledger_category_check check (category in (
    'learning', 'care', 'community', 'verified_purchase',
    'redemption', 'adjustment', 'pack_purchase', 'scorecard_bonus', 'refund'
  ));

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

  -- Rango = productividad. Packs, compras verificadas y refunds no suben lifetime.
  lifetime_delta := case
    when new.amount > 0 and new.category not in ('pack_purchase', 'verified_purchase', 'refund')
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
  'Aplica crédito/débito al wallet. pack_purchase, verified_purchase y refund no suben lifetime_earned.';

-- Retirar sinks que vendían acceso a Masters
update public.benefit_catalog_items
set
  status = 'retired',
  description = 'Retirado: los Masters se abren por rango (MD históricas ganadas en Sembrar y Dualita), no por canje de saldo.',
  terms = 'Este beneficio ya no se canjea. Arquitecto = rango Brote+. Chocolatier y Benevolo = Labrador+. El saldo sirve para mentoría y sinks reales.',
  metadata = coalesce(metadata, '{}'::jsonb) || jsonb_build_object(
    'retired_reason', 'masters_by_rank',
    'retired_at', now()
  )
where brand_key = 'cacaotier'
  and slug in (
    'aceleracion-arquitecto',
    'preview-master-chocolatier',
    'ruta-benevolo'
  );

-- Devolver MD de canjes course_unlock (idempotente por redemption id)
insert into public.mazorca_ledger (
  profile_id, amount, category, reason_code, idempotency_key,
  source_type, source_id, metadata
)
select
  r.profile_id,
  r.cost_md,
  'refund',
  'course_unlock_refund',
  'refund:course-unlock:' || r.id::text,
  'benefit_redemption',
  r.id::text,
  jsonb_build_object(
    'title', c.title,
    'slug', c.slug,
    'note', 'Devolución: Masters se abren por rango, no por canje de aceleración'
  )
from public.benefit_redemptions r
join public.benefit_catalog_items c on c.id = r.catalog_item_id
where c.brand_key = 'cacaotier'
  and c.slug in (
    'aceleracion-arquitecto',
    'preview-master-chocolatier',
    'ruta-benevolo'
  )
  and r.status in ('pending', 'issued', 'fulfilled')
on conflict (profile_id, idempotency_key) do nothing;

update public.benefit_redemptions r
set
  status = 'cancelled',
  fulfillment_payload = coalesce(r.fulfillment_payload, '{}'::jsonb) || jsonb_build_object(
    'cancelled_reason', 'masters_by_rank_refund',
    'refunded', true,
    'refunded_at', now()
  ),
  updated_at = now()
from public.benefit_catalog_items c
where c.id = r.catalog_item_id
  and c.brand_key = 'cacaotier'
  and c.slug in (
    'aceleracion-arquitecto',
    'preview-master-chocolatier',
    'ruta-benevolo'
  )
  and r.status in ('pending', 'issued', 'fulfilled');
