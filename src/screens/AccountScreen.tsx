import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import {
  CalendarDays,
  ChevronRight,
  type LucideIcon,
  MessageCircle,
  UserRound,
} from 'lucide-react-native'
import { ProfileHeader } from '../components/account/ProfileHeader'
import { VerifiedCard } from '../components/account/VerifiedCard'
import { useProfile } from '../profile/ProfileContext'
import { useTheme } from '../theme/ThemeContext'

const MENU_ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: 'Switch to artisan mode', icon: UserRound },
  { label: 'Help & support', icon: MessageCircle },
  { label: 'Payment methods', icon: CalendarDays },
]

export function AccountScreen() {
  const { colors } = useTheme()
  const { profile, loading, loadError, reload } = useProfile()

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} />
      </View>
    )
  }

  if (loadError || !profile) {
    return (
      <View style={styles.centered}>
        <Text style={[styles.errorText, { color: colors.danger }]}>
          {loadError ?? 'We could not load your profile.'}
        </Text>
        <Pressable onPress={reload} style={[styles.retry, { borderColor: colors.line }]}>
          <Text style={[styles.retryText, { color: colors.ink }]}>Try again</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ProfileHeader profile={profile} />
      {profile.isVerified ? <VerifiedCard /> : null}

      <View style={[styles.menu, { borderTopColor: colors.line }]}>
        {MENU_ITEMS.map(({ label, icon: Icon }) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.menuRow,
              { borderBottomColor: colors.line },
              pressed && { backgroundColor: colors.soft },
            ]}
          >
            <Icon size={24} color={colors.ink} strokeWidth={1.8} />
            <Text style={[styles.menuLabel, { color: colors.ink }]}>{label}</Text>
            <ChevronRight size={20} color={colors.muted} />
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.signOut,
          { borderColor: colors.dangerLine },
          pressed && { backgroundColor: colors.soft },
        ]}
      >
        <Text style={[styles.signOutText, { color: colors.danger }]}>Sign out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingTop: 8 },
  centered: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80, gap: 16 },
  errorText: { fontSize: 14, lineHeight: 21, textAlign: 'center' },
  retry: { borderWidth: 1, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 20 },
  retryText: { fontSize: 14, fontWeight: '600' },
  menu: { marginTop: 32, borderTopWidth: 1 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 24,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  menuLabel: { flex: 1, fontSize: 16, lineHeight: 24 },
  signOut: {
    marginTop: 48,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  signOutText: { fontSize: 16, fontWeight: '500' },
})
