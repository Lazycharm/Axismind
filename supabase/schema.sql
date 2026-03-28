-- AxisMind Supabase schema
-- Run in Supabase SQL Editor

create extension if not exists pgcrypto;

create table if not exists "Portfolio" (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  image_url text,
  project_url text,
  technologies text[] default '{}',
  featured boolean not null default false,
  highlight_line1 text,
  highlight_line2 text,
  highlight_line3 text,
  created_at timestamptz not null default now()
);

create table if not exists "Testimonial" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  image_url text,
  rating int not null default 5 check (rating between 1 and 5),
  text text not null,
  project text,
  date text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists "Team" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  photo_url text,
  bio text,
  linkedin_url text,
  email text,
  "order" int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists "Contact" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  service_interest text,
  created_at timestamptz not null default now()
);

create table if not exists "SiteSettings" (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  label text not null,
  section text,
  created_at timestamptz not null default now()
);

-- Profile table expected by frontend role checks
create table if not exists "User" (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- Optional app navigation logs used by NavigationTracker
create table if not exists app_logs (
  id bigint generated always as identity primary key,
  page_name text not null,
  created_at timestamptz not null default now()
);

-- Storage bucket for uploaded images
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

-- Row Level Security
alter table "Portfolio" enable row level security;
alter table "Testimonial" enable row level security;
alter table "Team" enable row level security;
alter table "Contact" enable row level security;
alter table "SiteSettings" enable row level security;
alter table "User" enable row level security;
alter table app_logs enable row level security;

-- Public read policies
do $$ begin
  create policy "public_read_portfolio" on "Portfolio" for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "public_read_testimonial" on "Testimonial" for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "public_read_team" on "Team" for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "public_read_site_settings" on "SiteSettings" for select using (true);
exception when duplicate_object then null; end $$;

-- Public contact form submit
do $$ begin
  create policy "public_insert_contact" on "Contact" for insert with check (true);
exception when duplicate_object then null; end $$;

-- Admin write policies based on User.role
do $$ begin
  create policy "admin_write_portfolio" on "Portfolio"
    for all using (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    ) with check (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "admin_write_testimonial" on "Testimonial"
    for all using (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    ) with check (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "admin_write_team" on "Team"
    for all using (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    ) with check (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "admin_write_site_settings" on "SiteSettings"
    for all using (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    ) with check (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "admin_read_write_contact" on "Contact"
    for all using (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    ) with check (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "self_read_user" on "User"
    for select using (id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "admin_read_user" on "User"
    for select using (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "admin_write_user" on "User"
    for all using (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    ) with check (
      exists (
        select 1 from "User" u
        where u.id = auth.uid() and u.role = 'admin'
      )
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "authenticated_insert_app_logs" on app_logs
    for insert to authenticated
    with check (true);
exception when duplicate_object then null; end $$;

-- Storage policies for uploads bucket
do $$ begin
  create policy "public_read_uploads" on storage.objects
    for select using (bucket_id = 'uploads');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "authenticated_uploads_write" on storage.objects
    for insert to authenticated
    with check (bucket_id = 'uploads');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "authenticated_uploads_update" on storage.objects
    for update to authenticated
    using (bucket_id = 'uploads')
    with check (bucket_id = 'uploads');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "authenticated_uploads_delete" on storage.objects
    for delete to authenticated
    using (bucket_id = 'uploads');
exception when duplicate_object then null; end $$;
