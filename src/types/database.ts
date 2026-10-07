// Hand-maintained database types. Regenerate with the Supabase CLI when available:
//   npx supabase gen types typescript --project-id <PROJECT_ID> > src/types/database.gen.ts
// Keep these in sync with supabase/migrations/*.sql.

export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type ReleaseType = 'Single' | 'EP' | 'Album' | 'Remix' | 'Compilation' | 'Instrumental' | 'Other';
export type ContactStatus = 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED';
export type SubscriberStatus = 'SUBSCRIBED' | 'UNSUBSCRIBED';
export type MediaBucket = 'artwork' | 'audio-previews' | 'audio-public' | 'room-media' | 'downloads';
export type MediaCategory = 'Artwork' | 'Audio' | 'Video' | 'Downloads' | 'Other';
export type ActivityAction = 'CREATE' | 'UPDATE' | 'PUBLISH' | 'UNPUBLISH' | 'ARCHIVE' | 'DELETE' | 'UPLOAD';
export type HomepageSectionType =
  | 'hero' | 'featured_release' | 'selected_music' | 'artist_intro'
  | 'room' | 'featured_beat' | 'socials' | 'support';

export interface AdminUser { user_id: string; created_at: string }

export interface Release {
  id: string;
  slug: string;
  title: string;
  type: ReleaseType;
  release_date: string | null;
  description: string | null;
  short_description: string | null;
  genre: string | null;
  tags: string[];
  artwork_path: string | null;
  artwork_alt: string | null;
  featured: boolean;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  og_image_path: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Track {
  id: string;
  release_id: string;
  track_number: number;
  slug: string;
  title: string;
  duration_seconds: number | null;
  bpm: number | null;
  musical_key: string | null;
  genre: string | null;
  description: string | null;
  lyrics: string | null;
  credits: Record<string, string>;
  explicit: boolean;
  featured: boolean;
  audio_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReleaseLink {
  id: string;
  release_id: string;
  platform: string;
  url: string;
  sort_order: number;
}

export interface Beat {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  bpm: number | null;
  musical_key: string | null;
  genre: string | null;
  mood: string | null;
  artwork_path: string | null;
  preview_path: string | null;
  purchase_url: string | null;
  inquiry_url: string | null;
  featured: boolean;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BeatLicense {
  id: string;
  beat_id: string;
  license_key: string;
  name: string;
  description: string | null;
  price: number | null;
  purchase_url: string | null;
  enabled: boolean;
  sort_order: number;
}

export interface RoomPost {
  id: string;
  slug: string;
  title: string;
  room_type: string;
  short_description: string | null;
  content: unknown | null;   // structured rich text document, never raw HTML
  cover_path: string | null;
  audio_path: string | null;
  video_url: string | null;
  related_release_id: string | null;
  related_beat_id: string | null;
  tags: string[];
  featured: boolean;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  for_who: string | null;
  included: string[];
  starting_price: number | null;
  cta_label: string | null;
  cta_url: string | null;
  enabled: boolean;
  sort_order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string | null;
  enabled: boolean;
  sort_order: number;
}

export interface HomepageSection {
  id: string;
  section_type: HomepageSectionType;
  enabled: boolean;
  sort_order: number;
  config: Record<string, unknown>;
}

export interface SiteSetting { key: string; value: unknown }

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message_type: string | null;
  message: string;
  status: ContactStatus;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source: string | null;
  status: SubscriberStatus;
  created_at: string;
}

export interface MediaItem {
  id: string;
  bucket: MediaBucket;
  path: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  category: MediaCategory;
  alt_text: string | null;
  created_at: string;
}

export interface ActivityEntry {
  id: number;
  admin_user_id: string | null;
  entity_type: string;
  entity_id: string | null;
  action: ActivityAction;
  metadata: Record<string, unknown>;
  created_at: string;
}
