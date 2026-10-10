import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Bell, Moon, Sun } from 'lucide-react-native'
import { useProfile } from '../../profile/ProfileContext'
import { useTheme } from '../../theme/ThemeContext'
import { Avatar } from '../common/Avatar'

type Props = {
  onOpenAccount: () => void
}

export function TopBar({ onOpenAccount }: Props) {
  const { colors, isDark, toggleTheme } = useTheme()
  const { profile } = useProfile()
  const iconButtonStyle = [styles.iconButton, { backgroundColor: colors.soft }]

  return (
    <View style={[styles.bar, { backgroundColor: colors.surface, borderBottomColor: colors.line }]}>
      <Text style={[styles.brand, { color: colors.ink }]}>meortra</Text>
      <View style={styles.actions}>
        <Pressable
          accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onPress={toggleTheme}
          style={iconButtonStyle}
        >
          {isDark ? <Sun size={18} color="#e7b94d" /> : <Moon size={18} color={colors.navy} />}
        </Pressable>
        <Pressable accessibilityLabel="Notifications" style={iconButtonStyle}>
          <Bell size={18} color={colors.navy} />
          <View style={[styles.dot, { backgroundColor: colors.alert, borderColor: colors.soft }]} />
        </Pressable>
        <Pressable accessibilityLabel="Open account" onPress={onOpenAccount}>
          <Avatar
            name={profile?.fullName ?? ''}
            imageUrl={profile?.avatarUrl ?? null}
            size={38}
            radius={19}
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    height: 68,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { fontSize: 22, fontWeight: '800', letterSpacing: -1 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },
})
