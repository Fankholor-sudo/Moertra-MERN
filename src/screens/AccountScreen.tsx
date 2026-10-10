import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ChevronRight, Moon, Sun, UserRound } from 'lucide-react-native'
import { ScreenHeader } from '../components/common/ScreenHeader'
import { useTheme } from '../theme/ThemeContext'
import { typography } from '../theme/typography'

export function AccountScreen() {
  const { colors, isDark, toggleTheme } = useTheme()
  const rowStyle = [styles.row, { backgroundColor: colors.surface, borderColor: colors.line }]

  return (
    <View>
      <ScreenHeader eyebrow="YOUR ACCOUNT" title="Jordan Miller" />

      <View style={rowStyle}>
        <UserRound size={22} color={colors.accent} />
        <Text style={[typography.itemTitle, { color: colors.ink }]}>Personal profile</Text>
        <ChevronRight size={17} color={colors.muted} />
      </View>

      <Pressable onPress={toggleTheme} style={rowStyle}>
        {isDark ? (
          <Sun size={22} color={colors.accent} />
        ) : (
          <Moon size={22} color={colors.accent} />
        )}
        <Text style={[typography.itemTitle, styles.grow, { color: colors.ink }]}>
          {isDark ? 'Light mode' : 'Dark mode'}
        </Text>
        <Text style={{ color: colors.muted }}>Toggle</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  grow: { flex: 1 },
})
