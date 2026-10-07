# Contributing

Thank you for looking at the code. Drazyx is a personal artist site, so contributions
are reviewed carefully and may be declined if they do not fit the project's direction.

## Before you start

- Read the [README](README.md), especially **Content rules** and **Design system**.
- For bugs and small fixes, open an issue first describing the problem and how to reproduce it.
- For new features, open an issue to discuss the idea before writing code.

## Development workflow

```bash
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

All four should pass before you open a pull request.

## Guidelines

**Language rules**

- Follow the existing split: TypeScript for `src/admin`, `src/lib`, `src/types` and
  `src/contexts`; JavaScript/JSX for the public site.
- Avoid `any`. Add or update types in `src/types/database.ts` when the schema changes.

**Database changes**

- Add a new numbered file in `supabase/migrations/`. Do not edit a migration that may
  already have been applied anywhere.
- Every new table needs RLS enabled and explicit policies, in the same migration.
- Admin access must go through `is_admin()`.

**Content**

- Do not add invented releases, dates, prices, credits, biographies or links. If the
  information is unknown, leave it empty or marked as TODO.

**Security-sensitive changes**

- Never commit secrets or `.env` files.
- Report vulnerabilities privately, as described in [SECURITY.md](SECURITY.md).

**Style**

- Match the existing Tailwind classes and design tokens in `global.css`.
- Keep the public site visually calm. The admin should be clear and functional, not
  decorative.
- Respect `prefers-reduced-motion` and keep interactive elements keyboard-accessible.

## Pull requests

- Keep each pull request focused on one change.
- Describe what changed and why, and how you tested it.
- Include screenshots for visual changes.
- Note any new environment variables or migrations in the description.

## Reporting bugs

Include the page URL, the browser and version, the steps to reproduce, what you expected,
and what happened. Attach the browser console output if there is an error.
