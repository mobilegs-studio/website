-- Fase 2 — datamodel voor betaalde content.
-- Draai dit eenmalig in de Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- Het is idempotent: opnieuw draaien is veilig.

-- 1. Producten (de catalogus) -------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  kind text not null check (kind in ('one_time', 'subscription')),
  stripe_price_id text,
  file_path text,                       -- pad in de 'downloads' bucket; null voor pagina-content
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2. Losse aankopen (eenmalig) ------------------------------------------------
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  stripe_checkout_session_id text,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- 3. Abonnementen (membership) ------------------------------------------------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stripe_subscription_id text unique,
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists purchases_user_idx on public.purchases (user_id);
create index if not exists subscriptions_user_idx on public.subscriptions (user_id);

-- 4. Toegangscheck: heeft de huidige gebruiker toegang tot product X? ----------
-- one_time -> moet gekocht zijn; subscription -> actief abonnement vereist.
create or replace function public.has_access(p_product_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from products p
    where p.id = p_product_id
      and (
        (p.kind = 'one_time' and exists (
          select 1 from purchases pu
          where pu.product_id = p.id and pu.user_id = auth.uid()
        ))
        or
        (p.kind = 'subscription' and exists (
          select 1 from subscriptions s
          where s.user_id = auth.uid() and s.status = 'active'
        ))
      )
  );
$$;

-- 5. Row Level Security -------------------------------------------------------
alter table public.products enable row level security;
alter table public.purchases enable row level security;
alter table public.subscriptions enable row level security;

drop policy if exists "products viewable by everyone" on public.products;
create policy "products viewable by everyone"
  on public.products for select
  using (true);

drop policy if exists "users view own purchases" on public.purchases;
create policy "users view own purchases"
  on public.purchases for select
  using (auth.uid() = user_id);

drop policy if exists "users view own subscription" on public.subscriptions;
create policy "users view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Geen insert/update/delete policies: schrijven gebeurt alleen via de
-- Stripe-webhook met de service_role key, die RLS omzeilt.

-- 6. Prive Storage-bucket voor downloads --------------------------------------
insert into storage.buckets (id, name, public)
values ('downloads', 'downloads', false)
on conflict (id) do nothing;
