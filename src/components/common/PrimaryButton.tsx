import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { useTheme } from '../../theme/ThemeContext'

type Props = {
  label: string
  onPress: () => void
}

export function PrimaryButton({ label, onPress }: Props) {
  const { colors } = useTheme()

  return (
    <Pressable onPress={onPress} style={[styles.button, { backgroundColor: colors.navy }]}>
      <Text style={styles.text}>{label}</Text>
      <ChevronRight size={17} color="#fff" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 13,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  text: { color: '#fff', fontSize: 13, fontWeight: '800' },
})
