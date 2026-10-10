import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { CATEGORY_STYLES } from '../../data/categoryStyles'
import { useTheme } from '../../theme/ThemeContext'
import { Category } from '../../types'

type Props = {
  category: Category
  onPress: () => void
  variant: 'tile' | 'row'
}

export function CategoryCard({ category, onPress, variant }: Props) {
  const { colors } = useTheme()
  const { icon: Icon, tint } = CATEGORY_STYLES[category]
  const isTile = variant === 'tile'

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        isTile ? styles.tile : styles.row,
        { borderColor: colors.line, backgroundColor: colors.surface },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[styles.iconWrap, isTile && styles.iconWrapLarge, { backgroundColor: `${tint}22` }]}
      >
        <Icon size={isTile ? 24 : 18} color={tint} strokeWidth={1.8} />
      </View>
      <Text
        numberOfLines={1}
        style={[isTile ? styles.tileLabel : styles.rowLabel, { color: colors.ink }]}
      >
        {category}
      </Text>
      {isTile ? null : <ChevronRight size={16} color={colors.muted} />}
    </Pressable>
  )
}

export const categoryGridStyles = StyleSheet.create({
  tiles: { flexDirection: 'row', gap: 8 },
  rows: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
})

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    gap: 10,
  },
  row: {
    width: '48%',
    minHeight: 64,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pressed: { opacity: 0.7, transform: [{ scale: 0.97 }] },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapLarge: { width: 48, height: 48, borderRadius: 14 },
  tileLabel: { fontSize: 11, fontWeight: '600' },
  rowLabel: { flex: 1, fontSize: 12, fontWeight: '700' },
})
