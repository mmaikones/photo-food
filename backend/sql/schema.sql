-- Supabase schema for FoodPhoto Studio
-- Run this in the Supabase SQL editor

create extension if not exists "pgcrypto";

-- Enums
create type plan_enum as enum ('FREE', 'PRO', 'BUSINESS');
create type credit_transaction_type as enum ('GRANT_FREE', 'PURCHASE', 'SPEND_GENERATION', 'BONUS', 'REFUND');
create type generation_status as enum ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- Profiles (User)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  avatar_url text,
  credits_balance integer not null default 0,
  plan plan_enum not null default 'FREE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Credit transactions
create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type credit_transaction_type not null,
  amount integer not null,
  description text not null,
  created_at timestamptz not null default now()
);

-- Photo templates
create table if not exists public.photo_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null,
  category text not null,
  aspect_ratio text not null,
  platform_suggestions text[] not null default '{}',
  internal_prompt text not null,
  example_image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Generation jobs
create table if not exists public.generation_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  template_id uuid not null references public.photo_templates(id),
  original_image_url text not null,
  business_type text not null,
  platform_target text not null,
  quantity_requested integer not null,
  additional_notes text,
  status generation_status not null default 'PENDING',
  credits_used integer not null,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Generated images
create table if not exists public.generated_images (
  id uuid primary key default gen_random_uuid(),
  generation_job_id uuid not null references public.generation_jobs(id) on delete cascade,
  image_url text not null,
  width integer not null,
  height integer not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_credit_transactions_user_id on public.credit_transactions(user_id);
create index if not exists idx_generation_jobs_user_id on public.generation_jobs(user_id);
create index if not exists idx_generation_jobs_created_at on public.generation_jobs(created_at desc);
create index if not exists idx_generated_images_job_id on public.generated_images(generation_job_id);
create index if not exists idx_photo_templates_active on public.photo_templates(is_active);

-- Updated at trigger
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_photo_templates_updated_at
  before update on public.photo_templates
  for each row execute function public.set_updated_at();

create trigger set_generation_jobs_updated_at
  before update on public.generation_jobs
  for each row execute function public.set_updated_at();

-- Create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, credits_balance)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''), new.email, 100);
  insert into public.credit_transactions (user_id, type, amount, description)
  values (new.id, 'GRANT_FREE', 100, 'Creditos iniciais gratis');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.photo_templates enable row level security;
alter table public.generation_jobs enable row level security;
alter table public.generated_images enable row level security;

-- Policies
create policy "Profiles are viewable by owner" on public.profiles
  for select using (auth.uid() = id);

create policy "Profiles are updatable by owner" on public.profiles
  for update using (auth.uid() = id);

create policy "Credit transactions viewable by owner" on public.credit_transactions
  for select using (auth.uid() = user_id);

create policy "Generation jobs viewable by owner" on public.generation_jobs
  for select using (auth.uid() = user_id);

create policy "Generation jobs insertable by owner" on public.generation_jobs
  for insert with check (auth.uid() = user_id);

create policy "Generated images viewable by owner" on public.generated_images
  for select using (
    exists (
      select 1 from public.generation_jobs
      where public.generation_jobs.id = public.generated_images.generation_job_id
      and public.generation_jobs.user_id = auth.uid()
    )
  );

create policy "Templates are readable by all" on public.photo_templates
  for select using (true);
