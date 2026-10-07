-- 001_schema.sql — core CMS schema (phase 1: releases, tracks, links, beats, licenses, room posts)
create extension if not exists "pgcrypto";

-- Admin allowlist. Only user_ids listed here are administrators.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create table if not exists public.releases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  type text not null check (type in ('Single','EP','Album','Remix','Compilation','Instrumental','Other')),
  release_date date,
  description text,
  short_description text,
  genre text,
  tags text[] not null default '{}',
  artwork_path text,            -- storage path in bucket 'artwork'
  artwork_alt text,
  featured boolean not null default false,
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED','ARCHIVED')),
  seo_title text,
  seo_description text,
  og_image_path text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger releases_updated before update on public.releases
  for each row execute function public.set_updated_at();
create index if not exists releases_status_date_idx on public.releases (status, release_date desc);

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null references public.releases(id) on delete cascade,
  track_number int not null check (track_number > 0),
  slug text not null,
  title text not null,
  duration_seconds int check (duration_seconds >= 0),
  bpm int check (bpm between 1 and 400),
  musical_key text,
  genre text,
  description text,
  lyrics text,
  credits jsonb not null default '{}'::jsonb,
  explicit boolean not null default false,
  featured boolean not null default false,
  audio_path text,              -- bucket 'audio-public' (or 'audio-previews')
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (release_id, track_number),
  unique (release_id, slug)
);
create trigger tracks_updated before update on public.tracks
  for each row execute function public.set_updated_at();

create table if not exists public.release_links (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null references public.releases(id) on delete cascade,
  platform text not null,       -- Spotify, SoundCloud, YouTube, Bandcamp, Apple Music, Amazon Music, Other
  url text not null check (url ~ '^https?://'),
  sort_order int not null default 0,
  unique (release_id, platform)
);

create table if not exists public.beats (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  description text,
  bpm int check (bpm between 1 and 400),
  musical_key text,
  genre text,
  mood text,
  artwork_path text,
  preview_path text,            -- bucket 'audio-previews' only
  purchase_url text,
  inquiry_url text,
  featured boolean not null default false,
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED','ARCHIVED')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger beats_updated before update on public.beats
  for each row execute function public.set_updated_at();

-- License types are data, so new ones can be added without a migration.
create table if not exists public.beat_licenses (
  id uuid primary key default gen_random_uuid(),
  beat_id uuid not null references public.beats(id) on delete cascade,
  license_key text not null,    -- MP3, WAV, EXCLUSIVE, ...
  name text not null,
  description text,
  price numeric(10,2) check (price >= 0),
  purchase_url text,
  enabled boolean not null default true,
  sort_order int not null default 0,
  unique (beat_id, license_key)
);

create table if not exists public.room_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  room_type text not null,      -- Demo, Unreleased, Experiment, Note, Download, ...
  short_description text,
  content jsonb,                -- structured rich text, no raw HTML
  cover_path text,
  audio_path text,
  video_url text,
  related_release_id uuid references public.releases(id) on delete set null,
  related_beat_id uuid references public.beats(id) on delete set null,
  tags text[] not null default '{}',
  featured boolean not null default false,
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED','ARCHIVED')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger room_posts_updated before update on public.room_posts
  for each row execute function public.set_updated_at();
