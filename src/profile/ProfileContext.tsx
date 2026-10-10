import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import * as ImagePicker from 'expo-image-picker'
import { AvatarValidationError, fetchProfile, uploadAvatar } from '../services/profileService'
import { Profile } from '../types'

type ProfileValue = {
  profile: Profile | null
  loading: boolean
  loadError: string | null
  uploading: boolean
  uploadError: string | null
  reload: () => void
  changePhoto: () => Promise<void>
}

const ProfileContext = createContext<ProfileValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const reload = useCallback(() => {
    setLoading(true)
    setLoadError(null)
    fetchProfile()
      .then(setProfile)
      .catch((cause) => {
        console.error('profile load failed', cause)
        setLoadError('We could not load your profile.')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(reload, [reload])

  const changePhoto = useCallback(async () => {
    setUploadError(null)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })
    if (result.canceled || !result.assets?.length) return

    const asset = result.assets[0]
    setUploading(true)
    try {
      const avatarUrl = await uploadAvatar(asset.uri, asset.mimeType)
      setProfile((current) => (current ? { ...current, avatarUrl } : current))
    } catch (cause) {
      console.error('avatar upload failed', cause)
      setUploadError(
        cause instanceof AvatarValidationError
          ? cause.message
          : 'Could not upload your photo. Please try again.',
      )
    } finally {
      setUploading(false)
    }
  }, [])

  return (
    <ProfileContext.Provider
      value={{ profile, loading, loadError, uploading, uploadError, reload, changePhoto }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const value = useContext(ProfileContext)
  if (!value) throw new Error('useProfile must be used inside ProfileProvider')
  return value
}
