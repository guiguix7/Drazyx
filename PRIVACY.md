# Privacy notice

This notice describes what personal data the Drazyx website actually handles today, why,
and for how long. It is written for transparency and reflects the current implementation —
it is a starting point, not a substitute for legal review. The site is operated from
Brazil and is intended to follow the Lei Geral de Proteção de Dados (LGPD, Lei nº
13.709/2018).

This notice should be revised whenever a new service, form, or integration is activated
(for example, if the contact form or newsletter sign-up is connected to a backend).

## Who is responsible

Drazyx (the artist) is the data controller. Contact for privacy questions and requests:
**drazyxmusic@gmail.com**.

## Data handled

| Who | What | Why | Where it is stored |
|---|---|---|---|
| Visitors who use the contact form | Name, email, subject, message | Prepares a draft in the visitor's own email app (`mailto:`) | **Not stored by the website.** The message is only sent if the visitor's email app and provider send it; the site itself never saves or sees it. |
| Visitors who look for a newsletter sign-up | — | The sign-up form is shown but is a disabled placeholder; no provider is connected yet | Nothing is collected |
| The administrator | Email, login session | To authenticate and operate the admin dashboard | Supabase Auth |
| Administrator actions | Which record was changed and when | Security and troubleshooting | `activity_log` table (Supabase/PostgreSQL), admin-only access |
| All visitors who allow analytics | Anonymous page-view analytics | Understanding aggregate site usage | Vercel Analytics |

No data is sold or shared for advertising, and the site does not use advertising cookies
or trackers. The site does not collect payment information — beat purchases, when
available, happen on third-party platforms (e.g. Bandcamp or a checkout provider), which
have their own privacy policies.

## Cookies and local storage

The site uses local storage to remember the visitor's privacy choice. Vercel Analytics
loads only after the visitor chooses “Allow analytics”; choosing “Essential only”
prevents the analytics component from loading. The admin area may use browser storage
(via Supabase Auth) to keep an administrator's session active — this only applies to
logged-in administrators, not to public visitors. No advertising cookies or trackers are
used.

## Legal basis

- **Contact form:** not applicable for website storage, since no message data is
  retained by the site. Whatever is then sent through the visitor's own email provider is
  governed by that provider's policy and the visitor's own action.
- **Administrator data:** legitimate interest in operating and securing the site.
- **Analytics:** optional consent, given through the privacy notice and changeable through
  Privacy settings.

## Retention

- **Contact messages:** none kept — the website does not store them at all.
- **Newsletter:** not applicable — no sign-up is active yet.
- **Administrator sessions:** kept per Supabase Auth's session configuration.

## Your rights

Under the LGPD you may ask to confirm whether your data is processed, access it, correct
it, request anonymisation, blocking or deletion, obtain a copy, and withdraw consent where
applicable. Send your request to **drazyxmusic@gmail.com**.

## Security

Access to administrative data and functionality is restricted through database-level
access policies (Row Level Security): anonymous visitors cannot read administrator data,
activity logs, or any draft/unpublished content. No electronic system can guarantee
absolute security. To report a vulnerability, see [SECURITY.md](SECURITY.md).

## Changes

This notice will be updated whenever the implementation or the services the site uses
change — in particular if the contact form or a newsletter provider is connected. The date
below reflects the latest revision.

_Last updated: 2026-10-09. This text describes the current implementation and does not
replace professional legal review before production use._