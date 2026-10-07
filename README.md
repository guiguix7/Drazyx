# Drazyx — official site

The home of Drazyx: an independent artist and producer who builds small worlds out of
late nights, nostalgia and the internet. Music first, business second.

Public site (React) plus a private admin panel (`/admin`) backed by Supabase. The admin
lets the artist manage content without editing source code.

## Status

| Area | State |
|---|---|
| Public pages (Home, Music, Release, Beats, Room, About, Services, Contact, Support) | Built. Beats read from Supabase; the rest still read from `src/data/`. |
| Admin login, logout, protected routes | Built |
| Admin dashboard (real counts only) | Built |
| Admin: Beats (list, editor, prices, preview upload) | Built |
| Admin: Releases, Tracks, The Room, Services, Messages, Subscribers, Media, Homepage, Settings, SEO | Not built yet (menu links lead to "not found") |
| Contact form and newsletter writing to the database | Not wired yet |
| Database migrations and RLS | Written in `supabase/migrations/`. Not yet run against every environment. |

Items marked "not built" are listed in the roadmap so nobody assumes they work.

## Requirements

- Node.js 20 or newer
- npm
- A Supabase project (free tier is enough for now)
- A Vercel account for deployment (optional, for production)

## Quick start

```bash
git clone https://github.com/guiguix7/Drazyx.git
cd Drazyx
npm install
cp .env.example .env     # then fill in the values (see below)
npm run dev              # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build into dist/
npm run lint       # ESLint
npx tsc --noEmit   # type-check the TypeScript parts (admin, lib, types, contexts)
npm run preview    # serve the production build locally
```

## Environment variables

| Name | Required | Where it is used |
|---|---|---|
| `VITE_SUPABASE_URL` | yes | Supabase client (public) |
| `VITE_SUPABASE_ANON_KEY` | yes | Supabase client (public, publishable/anon key) |
| `VITE_SITE_URL` | recommended | Canonical URLs, Open Graph, sitemap (defaults to `https://drazyx.com`) |

Rules:

- Only the **anon / publishable** key goes in the frontend. Everything with `VITE_` is
  visible to anyone who loads the site, so it must never hold a secret.
- Never add the Supabase **service_role** key, database passwords or private API keys
  anywhere in this repository or in any `VITE_` variable.
- `.env` is git-ignored. Only `.env.example` (placeholders) is committed.
- On Vercel, set the same variables in **Project → Settings → Environment Variables**,
  then redeploy. Vite embeds them at build time, so changing them requires a new build.

If a `VITE_SUPABASE_*` variable is missing, the app throws a clear error at startup.

## Supabase setup

1. Create a project at https://supabase.com.
2. Open **SQL Editor** and run the files in `supabase/migrations/` **in order, one at a time**:

   | File | What it does |
   |---|---|
   | `001_schema.sql` | Admin allowlist, `is_admin()`, releases, tracks, release links, beats, beat licenses, Room posts |
   | `002_rls.sql` | Row Level Security for the tables above |
   | `003_storage.sql` | Storage buckets with size and MIME limits, and storage policies |
   | `004_cms_tables.sql` | Services, social links, homepage sections, settings, contact messages, subscribers, media, activity log |
   | `005_rls_cms.sql` | Row Level Security for the tables above |
   | `006_seed_real_content.sql` | Seeds the five existing beats, their prices, social links and services (only information already in the repo) |

   The migrations use `create table if not exists`. If your project already has tables
   from an older schema, do not run them blindly: check the existing columns first.
   `supabase/legacy_20231024_initial_schema.sql.bak` is the old schema, kept for reference only.

3. Confirm the buckets exist under **Storage**: `artwork`, `audio-previews`,
   `audio-public`, `room-media`, `downloads`. `downloads` is private.

## Creating the first admin

The admin area is restricted to users listed in `public.admin_users`. Being signed in is
not enough.

1. In **Authentication → Users**, click **Add user** and create an account with an email
   and password.
2. Copy that user's **UID**.
3. In **SQL Editor**, run:

   ```sql
   insert into public.admin_users (user_id) values ('PASTE-THE-UID-HERE');
   ```

4. In **Authentication → Sign In / Providers**, turn off public sign-ups so nobody else
   can create an account.

To add another admin later, repeat steps 1–3. To remove one, delete their row from
`admin_users`.

## Using the admin

Go to `/admin/login` and sign in.

- **Dashboard:** real counts of releases, beats and Room posts, plus shortcuts to create
  content. It shows no visitor, stream or revenue numbers, because no analytics source
  is connected to it.
- **Beats:** search, filter by status, publish, unpublish, archive or delete. The editor
  sets the metadata, the prices for MP3, WAV and Exclusive (each can be disabled), the
  purchase and inquiry links, and the preview audio. Save the beat before uploading a
  preview. A draft or archived beat does not appear on the public Beats page.
- **Logout:** in the sidebar.

Accepted preview formats: MP3, WAV, FLAC, up to 50 MB.

## Project structure

```
src/
  admin/         Admin screens (TypeScript): beats/, shared/
  components/    Shared UI (JSX). components/admin/ProtectedRoute.tsx guards the admin.
  contexts/      AuthContext.tsx (Supabase session)
  data/          Static content still used by most public pages
  lib/           supabase.ts (client), beats.ts, storage.ts, activity.ts, errors.ts, slug.ts
  pages/         Public pages (JSX). pages/admin/ holds Login, Layout and Dashboard (TSX).
  styles/        global.css (design tokens and utilities)
  types/         database.ts (types for the tables)
supabase/
  migrations/    Numbered SQL migrations (run in order)
```

TypeScript is used for the admin, `lib/`, `types/` and `contexts/`. The public site stays
in JavaScript/JSX.

### Regenerating database types

`src/types/database.ts` is maintained by hand. When the Supabase CLI is available:

```bash
npx supabase gen types typescript --project-id YOUR-PROJECT-ID > src/types/database.gen.ts
```

Keep the two in sync with the migrations.

## Design system

Palette: `#070810` background, `#11101A` and `#18131D` surfaces, `#F2EDF5` and `#A99EAE`
text, `#B84DFF` accent. Purple is a light source (links, active states, player, small
highlights), never a large fill. Motion is limited to subtle fades and respects
`prefers-reduced-motion`. The admin is deliberately plainer than the public site.

## Content rules

Nothing is invented. Missing information stays empty, or as `[ADD ...]` / `TODO` in the
static files, and the UI hides or softens it rather than showing raw placeholders.
Search for `TODO` and `[ADD` to find what still needs real input.

## Still needs real input

| What | Where |
|---|---|
| Release titles, years, covers, descriptions, tracklists, credits | `src/data/Releases.js`, or the Releases admin once built |
| Bio, influences, story | `src/data/About.js` |
| Beat previews, artwork, checkout links | Beats admin |
| Service details (what is included) | `src/data/Services.js` |
| Support links (Ko-fi, Buy Me a Coffee, Pix) | `src/data/Sociallinks.js` → `supportLinks` |
| Contact form backend | `src/pages/Contact.jsx` → `sendContactMessage()` |
| Newsletter provider | `src/components/Newsletterform.jsx` → `subscribeToNewsletter()` |
| Final domain | `VITE_SITE_URL`, `index.html`, `public/sitemap.xml`, `public/robots.txt` |

## Deployment (Vercel)

1. Import the GitHub repository in Vercel.
2. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Environment Variables.
4. Deploy. Every push to `main` redeploys automatically.

`vercel.json` contains the rewrite rules needed for client-side routes such as `/admin`.

## Troubleshooting

- **Blank white page:** open the browser console (F12). Usually a missing `.env` value.
  Restart `npm run dev` after editing `.env`.
- **"Missing Supabase environment variables":** `.env` is missing or misnamed. The file
  must be named exactly `.env` in the project root.
- **Login works but saving fails with "You don't have permission":** the user is not in
  `admin_users`. Run the insert in the Creating the first admin section.
- **"That slug is already in use":** slugs are unique per table. Change the slug.
- **Preview upload fails:** check the file type (MP3, WAV, FLAC) and size (50 MB max).
- **Public Beats page is empty:** the beats are drafts, archived, or have no enabled
  license. Publish them in the admin.

## Security

See [SECURITY.md](SECURITY.md) for how to report a vulnerability and how access control
works. See [PRIVACY.md](PRIVACY.md) for what personal data the site handles.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Not yet defined. Until a license file is added, all rights are reserved by the author.
