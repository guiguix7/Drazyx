# Drazyx — official site

The home of Drazyx: an independent artist/producer who builds small worlds out of
late nights, nostalgia and the internet. Music first, business second.

## Run

```bash
npm install
npm run dev      # local
npm run build    # production build -> dist/
npm run lint
```

Stack: React 19 + React Router 7 + Tailwind 4 (Vite). JavaScript/JSX (not TypeScript).
No dependencies were added in the redesign.

## Structure

```
src/
  components/  Navbar, Footer, Artwork, ReleaseCard, ListenButtons, SocialLinks,
               SectionHeader, RoomEntry, RoomPreview, NewsletterForm, SupportCard,
               BeatRow, AudioPlayer (+ MiniPlayer), NightClock, Seo, Reveal
  pages/       Home, Music, Release, TheRoom, About, Beats, Production,
               Licensing, Contact, Support, NotFound   (all but Home are lazy-loaded)
  data/        Releases, Beats, Room, About, Services, Sociallinks, Contact,
               Bandcampcatalog, Site          <- all editable content lives here
  lib/         helpers.js (placeholder detection, meta formatting)
  styles/      global.css (design tokens + utilities)
```

## Design system (global.css)

Palette from the Bandcamp page: `#070810` background, `#11101A` / `#18131D` surfaces,
`#F2EDF5` / `#A99EAE` text, `#B84DFF` accent. Purple is a light source (links, active
states, player, small highlights), never a large fill. One warm "lamp" tone
(`--color-lamp`) is reserved for atmosphere. Motion is limited to subtle fades and
respects `prefers-reduced-motion`.

## Content rules

Nothing is invented. Missing data stays as `[ADD ...]` / `// TODO` in `src/data/`,
and the UI hides or softens it (`lib/helpers.js` → `isTodo`) instead of showing raw
placeholders. Search for `TODO` and `[ADD` to find everything that needs input.

## Still needs real input

| What | Where |
|---|---|
| Release titles, years, covers, descriptions, tracklists, credits (match Spotify albums ↔ Bandcamp titles) | `data/Releases.js` |
| Latest release (currently `releases[0]`) | `data/Releases.js` |
| Bio, influences, story, "currently" | `data/About.js` |
| Room entries (shape documented in the file) | `data/Room.js` |
| Beat previews, covers, checkout links, optional `atmosphere` line | `data/Beats.js` |
| Service details | `data/Services.js` |
| Support links (Buy Me a Coffee / Ko-fi / Pix) | `data/Sociallinks.js` → `supportLinks` |
| Contact form backend | `pages/Contact.jsx` → `sendContactMessage()` |
| Newsletter provider | `components/Newsletterform.jsx` → `subscribeToNewsletter()` |
| Final domain (set `VITE_SITE_URL`, also `index.html`, `public/sitemap.xml`, `public/robots.txt`) | `data/Site.js` |
| OG image 1200×630 | `public/og-image.jpg` |
| A real contact email (`contact@drazyx.com` is a placeholder) | `data/Sociallinks.js` |

## Notes

- `vercel.json` rewrites unknown paths to `index.html`, so deep links like `/music/x` work on refresh.
- SEO tags are updated client-side. Link previews on Discord/WhatsApp/X don't run JS,
  so per-release previews need prerendering or an edge function later.
- Future admin/database: data files already mirror the planned tables
  (`releases`, `tracks`, `beats`, `room_posts`, `services`, ...).
