-- Vincula bios de nodo a la cuenta (profiles) para que Mi cuenta encuentre
-- la bio aunque el email del formulario y el de sesión diferían en casing,
-- o para reclamar bios creadas antes del login.

alter table public.node_bios
  add column if not exists profile_id uuid references public.profiles(id) on delete set null;

comment on column public.node_bios.profile_id is
  'Dueño de la bio (auth/profiles). Preferido sobre email para cargar en /cuenta.';

create index if not exists node_bios_profile_id_idx
  on public.node_bios (profile_id);

-- Una bio activa por perfil (cuando ya está vinculada)
create unique index if not exists node_bios_profile_id_uidx
  on public.node_bios (profile_id)
  where profile_id is not null;

-- Normalizar emails para match exacto desde la app
update public.node_bios
set email = lower(trim(email))
where email is distinct from lower(trim(email));

-- Backfill: una bio (la más reciente) por email coincidente con profiles
update public.node_bios nb
set profile_id = matched.profile_id
from (
  select distinct on (lower(trim(p.email)))
    nb2.id as bio_id,
    p.id as profile_id
  from public.profiles p
  join public.node_bios nb2
    on lower(trim(nb2.email)) = lower(trim(p.email))
  where nb2.profile_id is null
  order by lower(trim(p.email)), nb2.created_at desc
) matched
where nb.id = matched.bio_id;
