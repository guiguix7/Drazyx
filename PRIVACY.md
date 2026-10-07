# Privacy notice

This notice describes what personal data the Drazyx website handles, why, and for how
long. It is written for transparency and is a starting point, not a substitute for legal
review. The site is operated from Brazil and is intended to follow the Lei Geral de
Proteção de Dados (LGPD, Lei nº 13.709/2018).

## Who is responsible

Drazyx (the artist) is the data controller. Contact: **contact@drazyx.com**.

## Data handled

| Who | What | Why | Where it is stored |
|---|---|---|---|
| Visitors who send a contact message | Name, email, subject, message | To reply to the message | Supabase (PostgreSQL) |
| Visitors who subscribe to the newsletter | Email, sign-up date, source page | To send the newsletter they asked for | Supabase (PostgreSQL) |
| The administrator | Email, login session | To operate the admin panel | Supabase Auth |
| Administrator actions | Which record was changed and when | Security and troubleshooting | `activity_log` table |
| All visitors | Anonymous page-view analytics (Vercel Analytics) | Understanding how the site is used in aggregate | Vercel |

No data is sold or shared for advertising. The site does not use advertising cookies.

The site does not collect payment information. Beat purchases, when available, happen on
third-party platforms (for example Bandcamp or a checkout provider), which have their own
privacy policies.

## Legal basis

- Contact messages: legitimate interest and the request made by the visitor.
- Newsletter: consent, given by the visitor when subscribing, and withdrawable at any time.
- Administrator data: legitimate interest in operating the site.
- Analytics: legitimate interest in understanding aggregate traffic.

## Retention

- Contact messages: kept while the conversation is active, then archived or deleted on request.
- Newsletter subscribers: kept until the person unsubscribes or asks for deletion.
- Activity log: kept for security purposes and reviewed periodically.

## Your rights

Under the LGPD you may ask to confirm that your data is processed, access it, correct it,
request anonymisation, blocking or deletion, obtain a copy, and withdraw consent. Send
your request to **contact@drazyx.com**. We will reply within 15 days.

## Cookies and local storage

The site uses only what is needed to run: the Supabase session for the administrator
(stored in the browser), and a small amount of local storage for the audio player and
interface preferences. No third-party advertising trackers are used.

## Security

Access to personal data is restricted by database policies: visitors cannot read messages
or subscriber lists. See [SECURITY.md](SECURITY.md).

## Changes

This notice may be updated. The date of the latest change is shown in the repository
history.

_Last updated: 2026-10-07. Pending review by a qualified professional before production use._
