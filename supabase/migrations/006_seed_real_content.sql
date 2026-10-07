-- 006_seed_real_content.sql — seeds ONLY information already present in the repository.
-- Idempotent: re-running does not duplicate rows. Nothing invented: unknown fields stay null.
-- Beats are published because they are already shown on the public Beats page.

insert into public.beats (slug, title, bpm, musical_key, mood, status, published_at) values
  ('midnight',    'MIDNIGHT',    140, 'C# minor', 'Melancholic Trap', 'PUBLISHED', now()),
  ('vidro-fosco', 'VIDRO FOSCO', 128, 'F minor',  'Dark Lo-Fi',       'PUBLISHED', now()),
  ('insonia',     'INSÔNIA',     150, 'A minor',  'Atmospheric Trap', 'PUBLISHED', now()),
  ('concreto',    'CONCRETO',    134, 'D minor',  'Moody Boom-Bap',   'PUBLISHED', now()),
  ('ultima-luz',  'ÚLTIMA LUZ',  142, 'G# minor', 'Melancholic Trap', 'PUBLISHED', now())
on conflict (slug) do nothing;

insert into public.beat_licenses (beat_id, license_key, name, price, enabled, sort_order)
select b.id, l.license_key, l.name, l.price, true, l.sort_order
from public.beats b
join (values
  ('midnight',    'MP3', 'MP3', 40.00, 1), ('midnight',    'WAV', 'WAV', 90.00, 2), ('midnight',    'EXCLUSIVE', 'Exclusive', 350.00, 3),
  ('vidro-fosco', 'MP3', 'MP3', 40.00, 1), ('vidro-fosco', 'WAV', 'WAV', 90.00, 2), ('vidro-fosco', 'EXCLUSIVE', 'Exclusive', 350.00, 3),
  ('insonia',     'MP3', 'MP3', 45.00, 1), ('insonia',     'WAV', 'WAV', 95.00, 2), ('insonia',     'EXCLUSIVE', 'Exclusive', 380.00, 3),
  ('concreto',    'MP3', 'MP3', 40.00, 1), ('concreto',    'WAV', 'WAV', 90.00, 2), ('concreto',    'EXCLUSIVE', 'Exclusive', 350.00, 3),
  ('ultima-luz',  'MP3', 'MP3', 45.00, 1), ('ultima-luz',  'WAV', 'WAV', 95.00, 2), ('ultima-luz',  'EXCLUSIVE', 'Exclusive', 380.00, 3)
) as l(beat_slug, license_key, name, price, sort_order) on l.beat_slug = b.slug
on conflict (beat_id, license_key) do nothing;

insert into public.social_links (platform, label, url, sort_order) values
  ('spotify',    'Spotify',    'https://open.spotify.com/intl-pt/artist/71gVcrLVY10LjtZWvUWLQU', 1),
  ('soundcloud', 'SoundCloud', 'https://soundcloud.com/drazyxmusic', 2),
  ('youtube',    'YouTube',    'https://www.youtube.com/@drazyxmusic', 3),
  ('instagram',  'Instagram',  'https://www.instagram.com/drazyxmusic/', 4),
  ('tiktok',     'TikTok',     'https://www.tiktok.com/@drazyxmusic', 5),
  ('bandcamp',   'Bandcamp',   'https://drazyx.bandcamp.com/', 6)
on conflict (platform) do nothing;

-- Services: titles and descriptions from the repo. "included" is left empty because
-- the repo has only TODO placeholders for it.
insert into public.services (slug, title, subtitle, description, for_who, cta_label, sort_order) values
  ('custom-beats', 'Custom Beats', 'Made to order',
   'An instrumental built from scratch around your voice and your story, from the first loop to the final mix.',
   'For artists who want an exclusive beat made for their project.', 'Request a project', 1),
  ('mix-master', 'Mix & Master', 'Mixing & mastering',
   'Technical and tonal finishing so your track holds up everywhere, from cheap earbuds to a club system.',
   'For artists with a recorded track who need the final polish.', 'Request a project', 2),
  ('collaboration', 'Collaboration', 'Working together',
   'Producing and writing with other artists, from the first idea to a finished track.',
   'For artists and producers looking for a creative partner.', 'Request a project', 3)
on conflict (slug) do nothing;
