import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useTheme } from '../../theme/ThemeContext'

type Props = {
  label: string
  value: string
  onChangeText: (value: string) => void
  placeholder: string
  multiline?: boolean
}

export function FormField({ label, value, onChangeText, placeholder, multiline = false }: Props) {
  const { colors } = useTheme()

  return (
    <View>
      <Text style={[styles.label, { color: colors.muted }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        multiline={multiline}
        style={[
          styles.input,
          { color: colors.ink, borderColor: colors.line, backgroundColor: colors.soft },
          multiline && styles.multiline,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: { fontSize: 11, fontWeight: '800', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 11,
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 13,
  },
  multiline: { minHeight: 90, textAlignVertical: 'top' },
})
