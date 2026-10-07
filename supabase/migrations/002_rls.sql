-- 002_rls.sql — row level security. Public reads only published rows; admins manage everything.
alter table public.admin_users enable row level security;
alter table public.releases enable row level security;
alter table public.tracks enable row level security;
alter table public.release_links enable row level security;
alter table public.beats enable row level security;
alter table public.beat_licenses enable row level security;
alter table public.room_posts enable row level security;

-- admin_users: an admin can see the allowlist; nobody can write it from the client.
create policy "admin_users: admins read" on public.admin_users
  for select to authenticated using (public.is_admin());

-- releases
create policy "releases: public read published" on public.releases
  for select to anon, authenticated using (status = 'PUBLISHED');
create policy "releases: admin full access" on public.releases
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- tracks: visible only when parent release is published
create policy "tracks: public read published" on public.tracks
  for select to anon, authenticated using (
    exists (select 1 from public.releases r where r.id = tracks.release_id and r.status = 'PUBLISHED'));
create policy "tracks: admin full access" on public.tracks
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "release_links: public read published" on public.release_links
  for select to anon, authenticated using (
    exists (select 1 from public.releases r where r.id = release_links.release_id and r.status = 'PUBLISHED'));
create policy "release_links: admin full access" on public.release_links
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- beats
create policy "beats: public read published" on public.beats
  for select to anon, authenticated using (status = 'PUBLISHED');
create policy "beats: admin full access" on public.beats
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "beat_licenses: public read enabled on published beat" on public.beat_licenses
  for select to anon, authenticated using (
    enabled and exists (select 1 from public.beats b where b.id = beat_licenses.beat_id and b.status = 'PUBLISHED'));
create policy "beat_licenses: admin full access" on public.beat_licenses
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- room posts
create policy "room_posts: public read published" on public.room_posts
  for select to anon, authenticated using (status = 'PUBLISHED');
create policy "room_posts: admin full access" on public.room_posts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Grants: anon gets SELECT only through RLS above; no table-level write for anon.
revoke all on public.admin_users from anon;
grant select on public.releases, public.tracks, public.release_links,
  public.beats, public.beat_licenses, public.room_posts to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
