-- Add slug column to photo_templates and backfill
alter table public.photo_templates
  add column if not exists slug text;

-- Backfill slug using a simple transliteration for Portuguese characters
update public.photo_templates
set slug = regexp_replace(
  translate(lower(name), 'ãáàâäéêíóôõúüçÃÁÀÂÄÉÊÍÓÔÕÚÜÇ', 'aaaaaeeiooouucaaaaaeeiooouuc'),
  '[^a-z0-9]+',
  '-',
  'g'
)
where slug is null or slug = '';

update public.photo_templates
set slug = trim(both '-' from slug)
where slug is not null;

alter table public.photo_templates
  alter column slug set not null;

create unique index if not exists photo_templates_slug_key
  on public.photo_templates (slug);
