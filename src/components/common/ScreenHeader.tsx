import React from 'react'
import { Text } from 'react-native'
import { useTheme } from '../../theme/ThemeContext'
import { typography } from '../../theme/typography'

type Props = {
  eyebrow: string
  title?: string
}

export function ScreenHeader({ eyebrow, title }: Props) {
  const { colors } = useTheme()

  return (
    <>
      <Text style={[typography.eyebrow, { color: colors.accent }]}>{eyebrow}</Text>
      {title ? <Text style={[typography.pageTitle, { color: colors.ink }]}>{title}</Text> : null}
    </>
  )
}
