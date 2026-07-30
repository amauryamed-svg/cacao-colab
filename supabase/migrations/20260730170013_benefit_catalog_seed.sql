-- Catálogo inicial de beneficios Mazorcas Doradas.
-- Todo entra como 'planned': ninguna marca tiene acuerdo firmado, conector
-- probado ni inventario comprometido. Activar exige cambiar status a mano.

insert into public.benefit_catalog_items (
  brand_key, slug, title, description, cost_md, fulfillment_type,
  min_rank_slug, stock_qty, per_user_limit, status, terms, metadata
)
values
  (
    'cacaotier', 'reto-arquitecto-avanzado',
    'Reto avanzado de Arquitecto',
    'Misión digital adicional con Dualita sobre control de temperatura y punto de corte.',
    250, 'colab_digital', 'brote', null, 1, 'planned',
    'Contenido y evaluación pendientes de publicación. No sustituye una Masterclass paga.',
    '{"brand":"cacaotier","node":"Bogotá"}'::jsonb
  ),
  (
    'zurych', 'beneficio-ecommerce-zurych',
    'Beneficio en ecommerce Zurych',
    'Canje por acordar con la marca sobre su propia tienda.',
    500, 'external_handoff', 'guardian', null, 1, 'planned',
    'No existe cupón, inventario ni integración activa. Requiere acuerdo escrito con Zurych.',
    '{"brand":"Zurych","node":"Landázuri"}'::jsonb
  ),
  (
    'la-querencia', 'experiencia-arbelaez',
    'Experiencia del nodo Arbeláez',
    'Visita guiada de fermentación y cata en la finca del nodo.',
    450, 'manual_coupon', 'labrador', null, 1, 'planned',
    'Disponibilidad, aforo y fechas dependen del nodo. Sin confirmación no es una oferta exigible.',
    '{"brand":"La Querencia","node":"Arbeláez"}'::jsonb
  ),
  (
    'la-lomita', 'reto-labranza-paicol',
    'Reto de labranza Paicol',
    'Reto comunitario de cuidado de labranza acompañado por el nodo.',
    350, 'manual_coupon', 'labrador', null, 1, 'planned',
    'Sujeto a acuerdo y capacidad real de acompañamiento técnico.',
    '{"brand":"La Lomita","node":"Paicol"}'::jsonb
  ),
  (
    'quara', 'ruta-origen-tame',
    'Ruta de origen Tame',
    'Recorrido de origen en Arauca con lectura de lote y secado.',
    450, 'external_handoff', 'guardian', null, 1, 'planned',
    'Beneficio propuesto. No representa inventario, cupo ni promesa comercial.',
    '{"brand":"Quara Cacao","node":"Tame"}'::jsonb
  ),
  (
    'chocolover', 'experiencia-chocolate-meta',
    'Experiencia de chocolate Meta',
    'Taller de producto terminado con el nodo Guamal.',
    400, 'external_handoff', 'labrador', null, 1, 'planned',
    'Activación futura; términos y precios pendientes de aprobación de la marca.',
    '{"brand":"Chocolover","node":"Guamal"}'::jsonb
  )
on conflict (brand_key, slug) do update set
  title = excluded.title,
  description = excluded.description,
  cost_md = excluded.cost_md,
  terms = excluded.terms,
  metadata = excluded.metadata;

insert into public.brand_commerce_adapters (brand_key, adapter_type, status, public_config)
values
  ('cacaotier', 'colab_native', 'inactive', '{"note":"Beneficio digital propio; falta contenido publicado."}'::jsonb),
  ('zurych', 'none', 'inactive', '{"note":"Sin acuerdo ni credenciales."}'::jsonb),
  ('la-querencia', 'manual_coupon', 'inactive', '{"note":"Fulfillment manual por confirmar con el nodo."}'::jsonb),
  ('la-lomita', 'manual_coupon', 'inactive', '{"note":"Fulfillment manual por confirmar con el nodo."}'::jsonb),
  ('quara', 'none', 'inactive', '{"note":"Sin acuerdo ni credenciales."}'::jsonb),
  ('chocolover', 'none', 'inactive', '{"note":"Sin acuerdo ni credenciales."}'::jsonb)
on conflict (brand_key) do update set
  adapter_type = excluded.adapter_type,
  public_config = excluded.public_config;

comment on table public.benefit_catalog_items is
  'Catálogo de beneficios. status=planned significa intención documentada, no oferta vigente.';
