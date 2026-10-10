import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { Camera, ChevronRight } from 'lucide-react-native'
import { useProfile } from '../../profile/ProfileContext'
import { useTheme } from '../../theme/ThemeContext'
import { Profile } from '../../types'
import { Avatar } from '../common/Avatar'

type Props = {
  profile: Profile
}

export function ProfileHeader({ profile }: Props) {
  const { colors } = useTheme()
  const { uploading, uploadError, changePhoto } = useProfile()

  return (
    <View>
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Change profile photo"
          disabled={uploading}
          onPress={changePhoto}
          style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}
        >
          <Avatar name={profile.fullName} imageUrl={profile.avatarUrl} size={96} radius={24} />
          {uploading ? (
            <View style={styles.uploadingOverlay}>
              <ActivityIndicator color="#ffffff" />
            </View>
          ) : null}
          <View
            style={[
              styles.cameraBadge,
              { backgroundColor: colors.navy, borderColor: colors.canvas },
            ]}
          >
            <Camera size={14} color="#ffffff" />
          </View>
        </Pressable>

        <View style={styles.info}>
          <Text style={[styles.eyebrow, { color: colors.muted }]}>YOUR ACCOUNT</Text>
          <Text numberOfLines={1} style={[styles.name, { color: colors.ink }]}>
            {profile.fullName}
          </Text>
          <Text style={[styles.meta, { color: colors.muted }]}>
            {profile.location} · Member since {profile.memberSince}
          </Text>
        </View>
        <ChevronRight size={22} color={colors.ink} />
      </View>

      <Text style={[styles.hint, { color: uploadError ? colors.danger : colors.muted }]}>
        {uploadError ?? (uploading ? 'Uploading your photo...' : 'Tap your photo to change it')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  avatarButton: { borderRadius: 24 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  uploadingOverlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: 24,
    backgroundColor: 'rgba(17, 24, 39, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 2.4, marginBottom: 6 },
  name: { fontSize: 30, fontWeight: '500', letterSpacing: -1, lineHeight: 36 },
  meta: { fontSize: 13, lineHeight: 20, marginTop: 6 },
  hint: { fontSize: 12, lineHeight: 18, marginTop: 12 },
})
