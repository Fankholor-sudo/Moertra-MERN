import { supabase } from '../lib/supabase'
import { Profile } from '../types'

const AVATAR_BUCKET = 'avatars'
const MAX_AVATAR_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

type ProfileRow = {
  full_name: string
  location: string
  member_since: number
  is_verified: boolean
  avatar_url: string | null
}

function toProfile(row: ProfileRow): Profile {
  return {
    fullName: row.full_name,
    location: row.location,
    memberSince: row.member_since,
    isVerified: row.is_verified,
    avatarUrl: row.avatar_url,
  }
}

export async function fetchProfile(): Promise<Profile> {
  const { data, error } = await supabase
    .from('profile')
    .select('full_name, location, member_since, is_verified, avatar_url')
    .eq('id', 1)
    .maybeSingle()

  if (error) throw error
  if (!data) throw new Error('Profile not found')
  return toProfile(data)
}

export class AvatarValidationError extends Error {}

export async function uploadAvatar(fileUri: string, mimeType?: string | null): Promise<string> {
  const blob = await (await fetch(fileUri)).blob()
  const contentType = mimeType || blob.type
  const extension = ALLOWED_TYPES[contentType]

  if (!extension) throw new AvatarValidationError('Please choose a JPG, PNG or WEBP image.')
  if (blob.size > MAX_AVATAR_BYTES) throw new AvatarValidationError('Image must be under 5 MB.')

  const path = `profile/${Date.now()}.${extension}`
  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, blob, { contentType })
  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path)

  const { error: updateError } = await supabase
    .from('profile')
    .update({ avatar_url: data.publicUrl, updated_at: new Date().toISOString() })
    .eq('id', 1)
  if (updateError) throw updateError

  return data.publicUrl
}
