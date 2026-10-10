import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Check, ShieldCheck } from 'lucide-react-native'
import { useTheme } from '../../theme/ThemeContext'

export function VerifiedCard() {
  const { colors } = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: colors.successSoft }]}>
      <ShieldCheck size={28} color={colors.success} strokeWidth={1.8} />
      <View style={styles.text}>
        <Text style={[styles.title, { color: colors.success }]}>Identity verified</Text>
        <Text style={[styles.body, { color: colors.success }]}>
          Your account is protected and ready to book.
        </Text>
      </View>
      <Check size={20} color={colors.success} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  text: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700' },
  body: { fontSize: 13, lineHeight: 20, marginTop: 6, opacity: 0.9 },
})
