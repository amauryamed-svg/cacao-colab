-- Vincula el nodo fundador Cacaotier a la cuenta amaury@cauaculture.co
-- (bio pública existía; Mi cuenta no la veía por email distinto / sin profile_id).

update public.node_bios nb
set
  profile_id = p.id,
  email = lower(trim(p.email))
from public.profiles p
where nb.slug = 'cacaotier-bogota-0ecm'
  and lower(trim(p.email)) = 'amaury@cauaculture.co'
  and (nb.profile_id is null or nb.profile_id = p.id);
