-- Fase 3 — content portaal: bewerkbare site-content + admin-toegang.
-- Draai dit eenmalig in de Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- Idempotent: opnieuw draaien is veilig.

-- 1. Admins -------------------------------------------------------------------
-- Wie toegang heeft tot /admin. Voeg jezelf toe nadat je een keer bent ingelogd
-- (zie onderaan dit bestand).
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- 2. Site-content -------------------------------------------------------------
-- Per sectie (bijv. 'cases', 'home', 'faq', 'legal') en taal een JSON-blob.
-- De publieke site leest deze overrides en valt terug op de code-defaults als
-- er nog geen rij is.
create table if not exists public.site_content (
  section text not null,
  locale text not null check (locale in ('nl', 'en', 'de')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id),
  primary key (section, locale)
);

create index if not exists site_content_section_idx on public.site_content (section);

-- 3. Row Level Security -------------------------------------------------------
alter table public.admins enable row level security;
alter table public.site_content enable row level security;

-- Helper: is de huidige gebruiker een admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a where a.user_id = auth.uid()
  );
$$;

-- admins: een ingelogde gebruiker mag alleen zien of hij zelf admin is.
drop policy if exists "admins_select_self" on public.admins;
create policy "admins_select_self" on public.admins
  for select using (user_id = auth.uid());

-- site_content: iedereen mag lezen (het is publieke website-content).
drop policy if exists "site_content_read_all" on public.site_content;
create policy "site_content_read_all" on public.site_content
  for select using (true);

-- site_content: alleen admins mogen schrijven.
drop policy if exists "site_content_write_admin" on public.site_content;
create policy "site_content_write_admin" on public.site_content
  for all using (public.is_admin()) with check (public.is_admin());

-- 4. Jezelf als admin toevoegen ----------------------------------------------
-- Log eerst een keer in op de site (magic link of Google). Draai daarna:
--
--   insert into public.admins (user_id, email)
--   select id, email from auth.users where email = 'jouw@email.nl'
--   on conflict (user_id) do nothing;
--
-- Vervang het e-mailadres door dat van jou.
