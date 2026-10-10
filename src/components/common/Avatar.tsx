import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/ThemeContext'

type Props = {
  name: string
  imageUrl: string | null
  size: number
  radius: number
}

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function Avatar({ name, imageUrl, size, radius }: Props) {
  const { colors } = useTheme()
  const frame = { width: size, height: size, borderRadius: radius }

  if (imageUrl) {
    return <Image source={{ uri: imageUrl }} style={[frame, { backgroundColor: colors.soft }]} />
  }

  return (
    <View style={[styles.fallback, frame, { backgroundColor: colors.avatar }]}>
      <Text style={[styles.initials, { color: colors.avatarInk, fontSize: size * 0.32 }]}>
        {initialsOf(name)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontWeight: '800' },
})
