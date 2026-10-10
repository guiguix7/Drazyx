# Drazyx — official site

The home of Drazyx: an independent artist and producer who builds small worlds out of
late nights, nostalgia and the internet. Music first, business second.

This repository holds the public site and the private tools behind it — not something
meant to be run by anyone outside the project.

## About Drazyx

Drazyx is an independent Brazilian producer and artist who blends Jersey Club, Hip Hop,
Trap and electronic music. The sound moves between emotive melodies, atmospheric
textures and energetic rhythms, drawing on games, stories, other songs and personal
experience — Trap, Electronic, Lo-fi, Phonk, Jersey Club.

- Spotify: https://open.spotify.com/intl-pt/artist/71gVcrLVY10LjtZWvUWLQU
- SoundCloud: https://soundcloud.com/drazyxmusic
- YouTube: https://www.youtube.com/@drazyxmusic
- Instagram: https://www.instagram.com/drazyxmusic/
- TikTok: https://www.tiktok.com/@drazyxmusic
- Bandcamp: https://drazyx.bandcamp.com/

## What this is

A React single-page site with a few connected pieces:

- **Public site** — Home, Music, individual Release pages, Beats, The Room, About,
  Services, Contact and Support. Dark, nocturnal, minimal; purple is used as a light
  source, never a large fill.
- **Catalog data** — most content (releases, bio, services) still lives as static data
  in the project; beats are the first piece to be managed live, through Supabase.
- **A private admin panel** (`/admin`) — lets the artist manage beats directly, without
  touching code. The rest of the content (releases, Room posts, messages) is being
  migrated there over time.

## Built with

React, Vite, Tailwind, React Router and Supabase (database, auth, storage), deployed on
Vercel.

## Project structure

```
src/
  components/    Shared UI
  pages/         Public pages
  data/          Static content still used by most public pages
  lib/           Supabase client and helpers
  admin/         Admin-only screens
  styles/        Design tokens and utilities
supabase/
  migrations/    Database schema and security policies
```

## Content rules

Nothing on the site is invented. Where real information (a bio line, a release credit, a
price) isn't available yet, it stays empty rather than being faked, and the interface is
built to hide or soften a gap instead of showing a placeholder.

## More

- [SECURITY.md](SECURITY.md) — how access control works and how to report a vulnerability.
- [PRIVACY.md](PRIVACY.md) — what personal data the site handles.
- [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Not yet defined. Until a license file is added, all rights are reserved by the author.