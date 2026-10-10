import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Bell, Moon, Sun } from 'lucide-react-native'
import { useTheme } from '../../theme/ThemeContext'

export function TopBar() {
  const { colors, isDark, toggleTheme } = useTheme()
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
  actions: { flexDirection: 'row', gap: 8 },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
