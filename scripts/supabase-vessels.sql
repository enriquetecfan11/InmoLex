-- Supabase migration: vessels table + RLS
-- Náutica: catálogo de embarcaciones paralelo a properties.

create table if not exists public.vessels (
  id text primary key,
  created_at timestamptz not null default now(),
  title text not null,
  price numeric not null,
  description text not null,
  type text not null,
  operation text not null,
  status text not null default 'disponible',
  length_meters numeric not null default 0,
  year integer not null default 0,
  cabins integer not null default 0,
  bathrooms integer not null default 0,
  capacity integer not null default 0,
  engine text,
  manufacturer text,
  location text not null,
  features text[] not null default '{}',
  images text[] not null default '{}',
  videos text[] not null default '{}',
  badge text,
  coordinates jsonb
);

alter table public.vessels enable row level security;

create policy "Public read vessels"
  on public.vessels for select
  to anon, authenticated
  using (true);

create policy "Authenticated insert vessels"
  on public.vessels for insert
  to authenticated
  with check (true);

create policy "Authenticated update vessels"
  on public.vessels for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated delete vessels"
  on public.vessels for delete
  to authenticated
  using (true);

create index if not exists vessels_type_idx on public.vessels (type);
create index if not exists vessels_status_idx on public.vessels (status);
create index if not exists vessels_operation_idx on public.vessels (operation);
create index if not exists vessels_location_idx on public.vessels (location);

grant select on table public.vessels to anon, authenticated;
grant insert, update, delete on table public.vessels to authenticated;
