create extension if not exists "pgcrypto";

create table if not exists public.portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.portfolio_categories(id) on delete restrict,
  title text not null,
  slug text unique,
  summary text,
  description text not null,
  project_url text,
  source_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  media_type text not null check (media_type in ('image', 'video')),
  bucket_id text not null default 'project-media',
  path text not null,
  public_url text not null,
  alt_text text,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_categories_order_idx
  on public.portfolio_categories (display_order asc, name asc);

create index if not exists portfolio_projects_category_idx
  on public.portfolio_projects (category_id);

create index if not exists portfolio_projects_status_order_idx
  on public.portfolio_projects (status, sort_order asc, created_at desc);

create index if not exists portfolio_project_media_project_order_idx
  on public.portfolio_project_media (project_id, sort_order asc);

alter table public.portfolio_categories enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_project_media enable row level security;

drop policy if exists "Public portfolio categories are readable" on public.portfolio_categories;
create policy "Public portfolio categories are readable"
  on public.portfolio_categories
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Public portfolio projects are readable" on public.portfolio_projects;
create policy "Public portfolio projects are readable"
  on public.portfolio_projects
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Public portfolio media is readable" on public.portfolio_project_media;
create policy "Public portfolio media is readable"
  on public.portfolio_project_media
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.portfolio_projects project
      where project.id = portfolio_project_media.project_id
        and project.status = 'published'
    )
  );

insert into public.portfolio_categories (name, slug, display_order)
values
  ('WebSite', 'website', 10),
  ('Mobile App', 'mobile-app', 20),
  ('Automation', 'automation', 30)
on conflict (slug) do update
set
  name = excluded.name,
  display_order = excluded.display_order,
  is_active = true;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'project-media',
  'project-media',
  true,
  52428800,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Project media is publicly readable" on storage.objects;
create policy "Project media is publicly readable"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'project-media');
