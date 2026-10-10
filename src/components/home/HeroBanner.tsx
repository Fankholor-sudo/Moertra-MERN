import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { ArrowRight, ShieldCheck, Wrench } from 'lucide-react-native'
import { banner } from '../../theme/colors'

const BACKGROUND_IMAGE =
  'https://images.pexels.com/photos/5846253/pexels-photo-5846253.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'

type Props = {
  onPostJob: () => void
}

export function HeroBanner({ onPostJob }: Props) {
  return (
    <ImageBackground
      source={{ uri: BACKGROUND_IMAGE }}
      style={styles.card}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <View style={styles.circle}>
        <Wrench size={44} color={banner.icon} strokeWidth={1.8} />
      </View>

      <View style={styles.eyebrowRow}>
        <ShieldCheck size={16} color={banner.eyebrow} />
        <Text style={styles.eyebrow}>SAFE, SKILLED & NEARBY</Text>
      </View>
      <Text style={styles.title}>Get it fixed.</Text>
      <Text style={[styles.title, styles.highlight]}>Get life moving.</Text>
      <Text style={styles.body}>Book a verified professional for your next project.</Text>

      <Pressable
        accessibilityRole="button"
        onPress={onPostJob}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Post a job</Text>
        <ArrowRight size={18} color={banner.buttonInk} />
      </Pressable>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    padding: 24,
    paddingBottom: 28,
    backgroundColor: banner.background,
    marginBottom: 32,
  },
  image: { borderRadius: 24 },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: banner.overlay },
  circle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    right: -64,
    bottom: -72,
    backgroundColor: banner.circle,
    opacity: 0.92,
    borderWidth: 1,
    borderColor: 'rgba(169, 188, 245, 0.25)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 72,
    paddingTop: 64,
  },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  eyebrow: { color: banner.eyebrow, fontSize: 11, fontWeight: '700', letterSpacing: 1.6 },
  title: { color: '#ffffff', fontSize: 32, fontWeight: '600', letterSpacing: -1.2, lineHeight: 38 },
  highlight: { color: banner.highlight },
  body: { color: banner.body, fontSize: 14, lineHeight: 21, marginTop: 12, maxWidth: 260 },
  button: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: banner.buttonBg,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 22,
    marginTop: 24,
  },
  buttonPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  buttonText: { color: banner.buttonInk, fontSize: 15, fontWeight: '700' },
})
