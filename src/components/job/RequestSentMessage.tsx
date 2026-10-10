import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CircleDollarSign } from 'lucide-react-native'
import { useTheme } from '../../theme/ThemeContext'
import { typography } from '../../theme/typography'

export function RequestSentMessage() {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <CircleDollarSign size={42} color={colors.accent} />
      <Text style={[typography.sheetTitle, { color: colors.ink }]}>Your request is live</Text>
      <Text style={[typography.copy, { color: colors.muted }]}>
        Up to 3 nearby artisans can bid. If nobody accepts within 7 days, the request closes
        automatically.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 12, paddingVertical: 35 },
})
