import React from 'react'
import { Text, View } from 'react-native'
import { PrimaryButton } from '../components/common/PrimaryButton'
import { ScreenHeader } from '../components/common/ScreenHeader'
import { useTheme } from '../theme/ThemeContext'
import { typography } from '../theme/typography'

type Props = {
  onPostJob: () => void
}

export function ServicesScreen({ onPostJob }: Props) {
  const { colors } = useTheme()

  return (
    <View>
      <ScreenHeader eyebrow="MEORTRA SERVICES" title="Find the right help." />
      <Text style={[typography.copy, { color: colors.muted }]}>
        Choose a category and post a clear request for nearby artisans.
      </Text>
      <PrimaryButton label="Post a job" onPress={onPostJob} />
    </View>
  )
}
