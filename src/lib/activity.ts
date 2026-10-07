import { supabase } from './supabase';
import type { ActivityAction } from '../types/database';

// Writes an audit entry. Never pass passwords, tokens or secrets in metadata.
export async function logActivity(
  action: ActivityAction,
  entityType: string,
  entityId: string | null,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from('activity_log').insert({
    admin_user_id: user?.id ?? null,
    entity_type: entityType,
    entity_id: entityId,
    action,
    metadata,
  });
  // Logging must not block the user's save, but failures are reported to the console.
  if (error) console.warn('activity log failed', error.code);
}
