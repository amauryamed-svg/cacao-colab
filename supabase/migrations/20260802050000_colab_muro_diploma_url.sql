-- Muro Colab: guardar enlace al diploma digital en avances de maestría
alter table public.colab_forum_posts
  add column if not exists diploma_url text;

comment on column public.colab_forum_posts.diploma_url is
  'URL pública del diploma digital (/credencial/...) para compartir en el muro.';
