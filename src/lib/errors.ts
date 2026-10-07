// Turns Supabase/Postgres errors into messages that are safe to show the user.
// Raw database text is never shown.
type MaybeError = { code?: string; message?: string; status?: number } | null | undefined;

export function humanError(err: MaybeError, fallback = 'Something went wrong. Please try again.'): string {
  if (!err) return fallback;
  if (err.code === '23505') return 'That slug is already in use. Choose another one.';
  if (err.code === '42501' || err.status === 403) return "You don't have permission to do this.";
  if (err.code === '23514') return 'One of the values is outside the allowed range.';
  if (err.message && /network|fetch|failed to fetch/i.test(err.message)) {
    return 'Could not reach the server. Check your connection and try again.';
  }
  return fallback;
}
