-- 004_cms_tables.sql — remaining CMS tables. Additive only: nothing from 001 is altered.
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  subtitle text,
  short_description text,
  description text,
  for_who text,
  included text[] not null default '{}',
  starting_price numeric(10,2) check (starting_price >= 0),
  cta_label text,
  cta_url text,
  enabled boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null unique,      -- spotify, soundcloud, youtube, instagram, tiktok, bandcamp, ...
  label text not null,
  url text not null check (url ~ '^https?://'),
  icon text,
  enabled boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_type text not null unique check (section_type in (
    'hero','featured_release','selected_music','artist_intro','room','featured_beat','socials','support')),
  enabled boolean not null default true,
  sort_order int not null default 0,
  config jsonb not null default '{}'::jsonb,   -- ids and options only, never HTML or CSS
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,               -- e.g. site_name, default_seo_title
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  subject text check (char_length(subject) <= 300),
  message_type text,
  message text not null check (char_length(message) between 1 and 5000),
  status text not null default 'UNREAD' check (status in ('UNREAD','READ','REPLIED','ARCHIVED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (char_length(email) between 3 and 320),
  source text,
  status text not null default 'SUBSCRIBED' check (status in ('SUBSCRIBED','UNSUBSCRIBED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  bucket text not null check (bucket in ('artwork','audio-previews','audio-public','room-media','downloads')),
  path text not null,
  filename text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  category text not null check (category in ('Artwork','Audio','Video','Downloads','Other')),
  alt_text text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

create table if not exists public.activity_log (
  id bigint generated always as identity primary key,
  admin_user_id uuid references auth.users(id) on delete set null,
  entity_type text not null,
  entity_id text,
  action text not null check (action in ('CREATE','UPDATE','PUBLISH','UNPUBLISH','ARCHIVE','DELETE','UPLOAD')),
  metadata jsonb not null default '{}'::jsonb,   -- never passwords, tokens or secrets
  created_at timestamptz not null default now()
);

-- Indexes for the queries the admin and public site actually run.
create index if not exists services_order_idx on public.services (enabled, sort_order);
create index if not exists social_links_order_idx on public.social_links (enabled, sort_order);
create index if not exists contact_status_idx on public.contact_messages (status, created_at desc);
create index if not exists subscribers_status_idx on public.newsletter_subscribers (status, created_at desc);
create index if not exists media_bucket_idx on public.media (bucket, created_at desc);
create index if not exists activity_created_idx on public.activity_log (created_at desc);
create index if not exists tracks_release_order_idx on public.tracks (release_id, track_number);
create index if not exists room_posts_pub_idx on public.room_posts (status, published_at desc);
create index if not exists beats_pub_idx on public.beats (status, featured);

create trigger services_updated before update on public.services for each row execute function public.set_updated_at();
create trigger social_links_updated before update on public.social_links for each row execute function public.set_updated_at();
create trigger homepage_sections_updated before update on public.homepage_sections for each row execute function public.set_updated_at();
create trigger site_settings_updated before update on public.site_settings for each row execute function public.set_updated_at();
create trigger contact_updated before update on public.contact_messages for each row execute function public.set_updated_at();
create trigger subscribers_updated before update on public.newsletter_subscribers for each row execute function public.set_updated_at();
