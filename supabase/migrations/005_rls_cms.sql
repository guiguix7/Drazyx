-- 005_rls_cms.sql — RLS for the tables added in 004.
alter table public.services enable row level security;
alter table public.social_links enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.media enable row level security;
alter table public.activity_log enable row level security;

-- Public read of enabled site content.
create policy "services: public read enabled" on public.services for select to anon, authenticated using (enabled);
create policy "social_links: public read enabled" on public.social_links for select to anon, authenticated using (enabled);
create policy "homepage_sections: public read enabled" on public.homepage_sections for select to anon, authenticated using (enabled);
create policy "site_settings: public read" on public.site_settings for select to anon, authenticated using (true);
create policy "media: public read" on public.media for select to anon, authenticated using (bucket <> 'downloads');

-- Admin full access.
create policy "services: admin all" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "social_links: admin all" on public.social_links for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "homepage_sections: admin all" on public.homepage_sections for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "site_settings: admin all" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "media: admin all" on public.media for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "activity_log: admin read" on public.activity_log for select to authenticated using (public.is_admin());
create policy "activity_log: admin insert" on public.activity_log for insert to authenticated with check (public.is_admin());

-- Contact and newsletter: anonymous may insert only; only admins read, update, delete.
create policy "contact: anon insert" on public.contact_messages for insert to anon, authenticated with check (status = 'UNREAD');
create policy "contact: admin all" on public.contact_messages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "subscribers: anon insert" on public.newsletter_subscribers for insert to anon, authenticated with check (status = 'SUBSCRIBED');
create policy "subscribers: admin all" on public.newsletter_subscribers for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Grants for anon: only what the policies above allow.
revoke all on public.contact_messages, public.newsletter_subscribers, public.activity_log from anon;
grant insert on public.contact_messages, public.newsletter_subscribers to anon;
grant select on public.services, public.social_links, public.homepage_sections, public.site_settings, public.media to anon;
