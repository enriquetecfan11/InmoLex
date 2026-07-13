-- Supabase migration: properties table + RLS
-- Ejecutar en Supabase SQL Editor antes de usar el panel admin.

create table if not exists public.properties (
  id text primary key,
  created_at timestamptz not null default now(),
  title text not null,
  price numeric not null,
  description text not null,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  sqm numeric not null default 0,
  orientation text not null default 'sur',
  terrace boolean not null default false,
  balcony boolean not null default false,
  garage boolean not null default false,
  storage boolean not null default false,
  elevator boolean not null default false,
  elevator_count integer,
  pmr_accessible boolean not null default false,
  district text not null,
  approximate_address text not null,
  location text not null,
  features text[] not null default '{}',
  status text not null default 'disponible',
  type text not null,
  operation text not null,
  images text[] not null default '{}',
  plan2d text,
  plan3d text,
  videos text[] not null default '{}',
  badge text,
  energy_certificate jsonb,
  coordinates jsonb
);

alter table public.properties enable row level security;

create policy "Public read properties"
  on public.properties for select
  to anon, authenticated
  using (true);

create policy "Authenticated insert properties"
  on public.properties for insert
  to authenticated
  with check (true);

create policy "Authenticated update properties"
  on public.properties for update
  to authenticated
  using (true);

create policy "Authenticated delete properties"
  on public.properties for delete
  to authenticated
  using (true);

create index if not exists properties_district_idx on public.properties (district);
create index if not exists properties_type_idx on public.properties (type);
create index if not exists properties_status_idx on public.properties (status);
create index if not exists properties_operation_idx on public.properties (operation);
