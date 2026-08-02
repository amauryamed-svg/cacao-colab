-- Corrige el link del bio de Cacaotier hecho por 20260802023500: esa
-- migración forzaba profile_id solo si estaba null o ya apuntaba al perfil
-- correcto, pero 20260802023000 (backfill genérico por email) corrió antes
-- y ya lo había vinculado al perfil equivocado (amauryamed@gmail.com, de
-- pruebas de magic link), dejando el guard de la #2 sin efecto.

update public.node_bios nb
set
  profile_id = p.id,
  email = lower(trim(p.email))
from public.profiles p
where nb.slug = 'cacaotier-bogota-0ecm'
  and lower(trim(p.email)) = 'amaury@cauaculture.co';
