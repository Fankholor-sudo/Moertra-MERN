import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { useTheme } from '../../theme/ThemeContext'
import { Category } from '../../types'

type Props = {
  category: Category
  onPress: () => void
  showChevron?: boolean
}

export function CategoryCard({ category, onPress, showChevron = false }: Props) {
  const { colors } = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { borderColor: colors.line, backgroundColor: colors.surface }]}
    >
      <Text style={[styles.letter, { color: colors.accent, backgroundColor: colors.soft }]}>
        {category[0]}
      </Text>
      <Text style={[styles.label, { color: colors.ink }]}>{category}</Text>
      {showChevron ? <ChevronRight size={16} color={colors.muted} /> : null}
    </Pressable>
  )
}

export const categoryGridStyle = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
}).grid

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 70,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  letter: {
    width: 30,
    height: 30,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '800',
  },
  label: { flex: 1, fontSize: 12, fontWeight: '700' },
})
