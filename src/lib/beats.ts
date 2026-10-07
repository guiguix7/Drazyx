import { supabase } from './supabase';
import { humanError } from './errors';
import { publicUrl } from './storage';
import type { Beat, BeatLicense, ContentStatus } from '../types/database';

export type BeatWithLicenses = Beat & { licenses: BeatLicense[] };

export type DataResult<T> = { data: T | null; error: string | null };

const BEAT_COLUMNS = '*, licenses:beat_licenses(*)';

function sortLicenses(beat: BeatWithLicenses): BeatWithLicenses {
  return { ...beat, licenses: [...(beat.licenses ?? [])].sort((a, b) => a.sort_order - b.sort_order) };
}

// Public: only published beats, only enabled licenses. RLS enforces this too.
export async function listPublicBeats(): Promise<DataResult<BeatWithLicenses[]>> {
  const { data, error } = await supabase
    .from('beats')
    .select(BEAT_COLUMNS)
    .eq('status', 'PUBLISHED')
    .order('featured', { ascending: false })
    .order('title');
  if (error) return { data: null, error: humanError(error, 'Could not load beats.') };
  return { data: ((data ?? []) as BeatWithLicenses[]).map(sortLicenses), error: null };
}

// Admin: all statuses, optional search and status filter.
export async function listAdminBeats(opts: { search?: string; status?: ContentStatus | 'ALL' }): Promise<DataResult<BeatWithLicenses[]>> {
  let q = supabase.from('beats').select(BEAT_COLUMNS).order('updated_at', { ascending: false });
  if (opts.status && opts.status !== 'ALL') q = q.eq('status', opts.status);
  if (opts.search?.trim()) q = q.ilike('title', `%${opts.search.trim()}%`);
  const { data, error } = await q;
  if (error) return { data: null, error: humanError(error, 'Could not load beats.') };
  return { data: ((data ?? []) as BeatWithLicenses[]).map(sortLicenses), error: null };
}

export async function getAdminBeat(id: string): Promise<DataResult<BeatWithLicenses>> {
  const { data, error } = await supabase.from('beats').select(BEAT_COLUMNS).eq('id', id).maybeSingle();
  if (error) return { data: null, error: humanError(error, 'Could not load this beat.') };
  if (!data) return { data: null, error: 'This beat does not exist or was deleted.' };
  return { data: sortLicenses(data as BeatWithLicenses), error: null };
}

export type BeatInput = {
  title: string;
  slug: string;
  description: string | null;
  bpm: number | null;
  musical_key: string | null;
  genre: string | null;
  mood: string | null;
  purchase_url: string | null;
  inquiry_url: string | null;
  featured: boolean;
  status: ContentStatus;
};

export async function saveBeat(id: string | null, input: BeatInput): Promise<DataResult<Beat>> {
  const payload = {
    ...input,
    published_at: input.status === 'PUBLISHED' ? new Date().toISOString() : null,
  };
  const query = id
    ? supabase.from('beats').update(payload).eq('id', id).select().single()
    : supabase.from('beats').insert(payload).select().single();
  const { data, error } = await query;
  if (error) return { data: null, error: humanError(error, 'Could not save the beat.') };
  return { data: data as Beat, error: null };
}

export async function setBeatStatus(id: string, status: ContentStatus): Promise<DataResult<null>> {
  const { error } = await supabase
    .from('beats')
    .update({ status, published_at: status === 'PUBLISHED' ? new Date().toISOString() : null })
    .eq('id', id);
  if (error) return { data: null, error: humanError(error, 'Could not change the status.') };
  return { data: null, error: null };
}

export async function deleteBeat(id: string): Promise<DataResult<null>> {
  const { error } = await supabase.from('beats').delete().eq('id', id);
  if (error) return { data: null, error: humanError(error, 'Could not delete the beat.') };
  return { data: null, error: null };
}

export type LicenseInput = {
  license_key: string;
  name: string;
  description: string | null;
  price: number | null;
  purchase_url: string | null;
  enabled: boolean;
  sort_order: number;
};

// Replaces the license set for one beat. Licenses removed in the editor are deleted.
export async function saveLicenses(beatId: string, licenses: LicenseInput[]): Promise<DataResult<null>> {
  const keep = licenses.map((l) => l.license_key);
  const rows = licenses.map((l) => ({ ...l, beat_id: beatId }));
  if (rows.length) {
    const { error } = await supabase.from('beat_licenses').upsert(rows, { onConflict: 'beat_id,license_key' });
    if (error) return { data: null, error: humanError(error, 'Could not save the prices.') };
  }
  const { error: delError } = await supabase
    .from('beat_licenses')
    .delete()
    .eq('beat_id', beatId)
    .not('license_key', 'in', `(${keep.map((k) => `"${k}"`).join(',') || '""'})`);
  if (delError) return { data: null, error: humanError(delError, 'Could not remove a license.') };
  return { data: null, error: null };
}

export async function setBeatPreview(beatId: string, previewPath: string | null): Promise<DataResult<null>> {
  const { error } = await supabase.from('beats').update({ preview_path: previewPath }).eq('id', beatId);
  if (error) return { data: null, error: humanError(error, 'Could not attach the preview.') };
  return { data: null, error: null };
}

export function beatPreviewUrl(beat: Beat): string | null {
  return publicUrl('audio-previews', beat.preview_path);
}

export function beatArtworkUrl(beat: Beat): string | null {
  return publicUrl('artwork', beat.artwork_path);
}

// Public price display. Returns null when the license has no price, so the UI can hide it.
export function formatPrice(price: number | null): string | null {
  if (price === null || price === undefined) return null;
  return `R$ ${Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
