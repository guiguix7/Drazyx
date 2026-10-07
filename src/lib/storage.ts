import { supabase } from './supabase';
import type { MediaBucket, MediaCategory } from '../types/database';
import { humanError } from './errors';

export const MAX_AUDIO_BYTES = 50 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export const AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/flac'];
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const EXT_BY_TYPE: Record<string, string> = {
  'audio/mpeg': 'mp3', 'audio/wav': 'wav', 'audio/x-wav': 'wav', 'audio/flac': 'flac',
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
};

// Client-side check for good UX only. The bucket limits and RLS are the real enforcement.
export function validateFile(file: File, allowed: string[], maxBytes: number): string | null {
  if (!allowed.includes(file.type)) return 'This file type is not allowed here.';
  if (file.size > maxBytes) return `File is too large. Maximum is ${Math.round(maxBytes / 1048576)} MB.`;
  if (file.size === 0) return 'This file is empty.';
  return null;
}

export type UploadResult = { path: string; error: null } | { path: null; error: string };

export async function uploadFile(
  bucket: MediaBucket,
  folder: string,
  file: File,
  category: MediaCategory,
): Promise<UploadResult> {
  const ext = EXT_BY_TYPE[file.type] ?? 'bin';
  const safeFolder = folder.replace(/[^a-z0-9/_-]/gi, '');
  const path = `${safeFolder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    cacheControl: '3600',
    upsert: false,
  });
  if (error) return { path: null, error: humanError(error, 'Upload failed. Please try again.') };

  // Record the file in the media library. A failure here does not undo the upload.
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('media').insert({
    bucket,
    path,
    filename: file.name.slice(0, 200),
    mime_type: file.type,
    size_bytes: file.size,
    category,
    created_by: user?.id ?? null,
  });

  return { path, error: null };
}

export function publicUrl(bucket: MediaBucket, path: string | null | undefined): string | null {
  if (!path) return null;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
