import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Clock3, Home, type LucideIcon, UserRound, Wrench } from 'lucide-react-native'
import { useTheme } from '../../theme/ThemeContext'
import { Tab } from '../../types'

const TABS: { name: Tab; icon: LucideIcon }[] = [
  { name: 'Home', icon: Home },
  { name: 'Services', icon: Wrench },
  { name: 'Activity', icon: Clock3 },
  { name: 'Account', icon: UserRound },
]

type Props = {
  activeTab: Tab
  onSelect: (tab: Tab) => void
}

export function BottomNav({ activeTab, onSelect }: Props) {
  const { colors } = useTheme()

  return (
    <View style={[styles.nav, { backgroundColor: colors.nav, borderColor: colors.line }]}>
      {TABS.map(({ name, icon: Icon }) => {
        const active = activeTab === name
        return (
          <Pressable
            key={name}
            accessibilityRole="button"
            onPress={() => onSelect(name)}
            style={styles.item}
          >
            <Icon size={20} color={active ? colors.accent : colors.muted} />
            <Text style={[styles.label, { color: active ? colors.ink : colors.muted }]}>
              {name}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    height: 66,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#101827',
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  item: { alignItems: 'center', gap: 4, minWidth: 60 },
  label: { fontSize: 10, fontWeight: '700' },
})
