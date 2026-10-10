/*
# Profile and profile photo storage

1. New Tables
- `profile` (single row, the app has no sign-in yet)
  - `id` (smallint, primary key, always 1)
  - `full_name` (text)
  - `location` (text)
  - `member_since` (int, year)
  - `is_verified` (boolean, identity verification state)
  - `avatar_url` (text, public URL of the uploaded photo, nullable)
  - `updated_at` (timestamptz)
2. Storage
- Public bucket `avatars`, limited to 5 MB and JPEG/PNG/WEBP images.
3. Security
- RLS enabled on `profile`. The app has no login, so anon + authenticated may read it.
- Clients may only UPDATE the `avatar_url` column (column-level grant). Name, location,
  membership and verification cannot be changed from the app. No client INSERT/DELETE.
- Storage: anon + authenticated may read and upload into the `avatars` bucket under the
  `profile/` folder only. No update or delete from the client.
4. Notes
1. A single seeded row (id = 1) represents the current user until accounts are added.
*/

CREATE TABLE IF NOT EXISTS profile (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  full_name text NOT NULL,
  location text NOT NULL DEFAULT '',
  member_since int NOT NULL,
  is_verified boolean NOT NULL DEFAULT false,
  avatar_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

INSERT INTO profile (id, full_name, location, member_since, is_verified)
VALUES (1, 'Jordan Davis', 'Lagos, Nigeria', 2024, true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Anyone can read the profile" ON profile;
CREATE POLICY "Anyone can read the profile" ON profile FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Anyone can update the profile photo" ON profile;
CREATE POLICY "Anyone can update the profile photo" ON profile FOR UPDATE
  TO anon, authenticated USING (id = 1) WITH CHECK (id = 1);

REVOKE INSERT, UPDATE, DELETE ON profile FROM anon, authenticated;
GRANT UPDATE (avatar_url, updated_at) ON profile TO anon, authenticated;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Anyone can read avatars" ON storage.objects;
CREATE POLICY "Anyone can read avatars" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Anyone can upload a profile avatar" ON storage.objects;
CREATE POLICY "Anyone can upload a profile avatar" ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = 'profile');
