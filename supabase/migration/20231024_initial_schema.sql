-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Admin Users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RELEASES
CREATE TABLE releases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- 'Single', 'EP', 'Album'
  release_date DATE,
  description TEXT,
  artwork_url TEXT,
  status TEXT DEFAULT 'DRAFT', -- 'DRAFT', 'PUBLISHED', 'ARCHIVED'
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRACKS
CREATE TABLE tracks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  release_id UUID REFERENCES releases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  track_number INT NOT NULL,
  audio_url TEXT,
  duration TEXT,
  bpm INT,
  key TEXT,
  explicit BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BEATS
CREATE TABLE beats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  bpm INT,
  key TEXT,
  genre TEXT,
  mood TEXT,
  artwork_url TEXT,
  audio_preview_url TEXT,
  mp3_price DECIMAL(10,2),
  wav_price DECIMAL(10,2),
  exclusive_price DECIMAL(10,2),
  purchase_url TEXT,
  status TEXT DEFAULT 'DRAFT',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. THE ROOM POSTS
CREATE TABLE room_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- 'Demo', 'Note', 'Behind the Scenes'
  short_description TEXT,
  content TEXT,
  cover_image_url TEXT,
  media_url TEXT,
  status TEXT DEFAULT 'DRAFT',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_posts ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES (Read-only for published content)
CREATE POLICY "Public can view published releases" ON releases FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Public can view tracks for published releases" ON tracks FOR SELECT USING (
  EXISTS (SELECT 1 FROM releases WHERE releases.id = tracks.release_id AND releases.status = 'PUBLISHED')
);
CREATE POLICY "Public can view published beats" ON beats FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Public can view published room posts" ON room_posts FOR SELECT USING (status = 'PUBLISHED');

-- ADMIN POLICIES (Full CRUD access)
CREATE POLICY "Admins have full access to releases" ON releases FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to tracks" ON tracks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to beats" ON beats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to room posts" ON room_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');