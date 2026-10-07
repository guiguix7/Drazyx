# Security policy

## Reporting a vulnerability

Please do not open a public issue for security problems.

Email **contact@drazyx.com** with the subject line `SECURITY` and include:

- what you found and where (URL, file, or route);
- steps to reproduce;
- the impact you believe it has.

You can expect an acknowledgement within 7 days. Please give a reasonable time to fix
the issue before publishing details. Good-faith research that avoids privacy violations,
data destruction and service disruption will not lead to legal action from the project.

Do not test against other people's data, do not access or change content you do not own,
and do not use automated scanning that degrades the public site.

## Supported versions

Only the `main` branch, as deployed on the production site, is supported.

## How access is controlled

**Public visitors** can read only published content. Drafts and archived records are
excluded by Row Level Security (RLS) in PostgreSQL, not only by the frontend.

**Administrators** are the users listed in `public.admin_users`. The database function
`is_admin()` checks that table. Being signed in with Supabase Auth is **not** enough to
gain admin rights. Public sign-ups should be disabled in Supabase.

**Anonymous visitors** can insert contact messages and newsletter sign-ups, but cannot
read them.

**Storage:** the artwork, audio-preview, audio-public and Room media buckets are publicly
readable by URL. Only administrators can upload, replace or delete files. The `downloads`
bucket is private and is never exposed through a public URL.

**Browser:** the site embeds only the Supabase URL and the public anon key. Those values
are not secrets; the RLS policies above are what protect the data.

## Secrets

- Never commit `.env`, the Supabase **service_role** key, database passwords or tokens.
  `.gitignore` excludes `.env` files; `.env.example` contains placeholders only.
- If a secret is exposed, rotate it immediately in the provider dashboard (Supabase,
  Vercel) and report it using the process above.
- Do not share project archives (zip files) that contain a `.env` file.

## Input and upload handling

- Form and admin inputs are validated in the browser for usability, and enforced in the
  database through constraints (lengths, status values, slug format, URL format).
- Uploads are checked for MIME type and size on the client, and enforced by the storage
  bucket limits on the server. Executable and unexpected file types are rejected.
- Database errors are translated into short messages; raw SQL or Postgres details are not
  shown to users.
- Rich text in Room posts is stored as structured data, not raw HTML, to avoid script
  injection. Keep it that way when the editor is built.

## Known limitations (planned work)

- Private downloads do not yet have a signed-URL delivery flow. Until one exists, do not
  upload anything to the `downloads` bucket that must stay private from people who have
  the link to the admin.
- Contact and newsletter forms are not yet connected to the database. When they are,
  add rate limiting or a bot check to prevent spam.
- Admin actions are logged to `activity_log`, but there is no review screen for the log yet.
- Dependency audits are not automated. Run `npm audit` before each release.

## Safe practices for contributors

- Use the anon key in the frontend and never anything that bypasses RLS.
- Every new table needs RLS enabled and explicit policies in a migration.
- Do not disable RLS "temporarily" to debug. Use the Supabase SQL editor with the
  appropriate role instead.
- Never use `auth.role() = 'authenticated'` as an admin check. Use `is_admin()`.
