-- 003_storage.sql — buckets and access. Public buckets serve images/audio by URL;
-- writes are admin-only. Preview audio and downloads are separate buckets on purpose.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('artwork', 'artwork', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif']),
  ('audio-previews', 'audio-previews', true, 52428800, array['audio/mpeg','audio/wav','audio/x-wav','audio/flac']),
  ('audio-public', 'audio-public', true, 209715200, array['audio/mpeg','audio/wav','audio/x-wav','audio/flac']),
  ('room-media', 'room-media', true, 52428800, array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','audio/mpeg','audio/wav']),
  ('downloads', 'downloads', false, 524288000, array['application/pdf','application/zip','text/plain','audio/wav','audio/flac','image/png','image/jpeg'])
on conflict (id) do nothing;

-- Public buckets: anyone can read objects by URL.
create policy "storage public read" on storage.objects for select to anon, authenticated
  using (bucket_id in ('artwork','audio-previews','audio-public','room-media'));
-- Admin-only writes to every bucket.
create policy "storage admin write" on storage.objects for all to authenticated
  using (public.is_admin() and bucket_id in ('artwork','audio-previews','audio-public','room-media','downloads'))
  with check (public.is_admin() and bucket_id in ('artwork','audio-previews','audio-public','room-media','downloads'));
-- downloads bucket is private: read only through signed URLs issued to admins or purchasers (handled in phase 2).
create policy "storage admin read downloads" on storage.objects for select to authenticated
  using (public.is_admin() and bucket_id = 'downloads');
