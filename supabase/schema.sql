create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (
    category in (
      'WebSite',
      'Mobile App',
      'AI Bot / Automation / Workflow'
    )
  ),
  media_urls text[] not null default '{}',
  project_url text,
  created_at timestamptz not null default now()
);

create index if not exists projects_created_at_idx
  on public.projects (created_at desc);

create index if not exists projects_category_idx
  on public.projects (category);

alter table public.projects enable row level security;

drop policy if exists "Public projects are readable" on public.projects;
create policy "Public projects are readable"
  on public.projects
  for select
  to anon, authenticated
  using (true);

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Project media is publicly readable" on storage.objects;
create policy "Project media is publicly readable"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'project-media');
