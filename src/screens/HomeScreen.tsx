import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ChevronRight, Search } from 'lucide-react-native'
import { CategoryCard, categoryGridStyles } from '../components/common/CategoryCard'
import { ScreenHeader } from '../components/common/ScreenHeader'
import { HeroBanner } from '../components/home/HeroBanner'
import { CATEGORIES, NEARBY_ARTISANS } from '../data/sampleData'
import { useProfile } from '../profile/ProfileContext'
import { useTheme } from '../theme/ThemeContext'
import { typography } from '../theme/typography'

type Props = {
  onPostJob: () => void
}

export function HomeScreen({ onPostJob }: Props) {
  const { colors } = useTheme()
  const { profile } = useProfile()
  const firstName = profile?.fullName.split(' ')[0] ?? 'there'

  return (
    <View>
      <ScreenHeader eyebrow="TUESDAY, OCTOBER 9" />

      <View style={styles.welcome}>
        <View>
          <Text style={[styles.greeting, { color: colors.ink }]}>Good morning,</Text>
          <Text style={[styles.name, { color: colors.ink }]}>{firstName}</Text>
        </View>
        <View style={[styles.weather, { backgroundColor: colors.soft }]}>
          <Text style={{ color: colors.ink }}>24°</Text>
        </View>
      </View>

      <Pressable
        onPress={onPostJob}
        style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.line }]}
      >
        <Search size={19} color={colors.muted} />
        <Text style={[styles.searchText, { color: colors.muted }]}>
          What do you need help with?
        </Text>
      </Pressable>

      <HeroBanner onPostJob={onPostJob} />

      <Text style={[typography.eyebrow, styles.sectionEyebrow, { color: colors.muted }]}>
        QUICK START
      </Text>
      <View style={styles.sectionHead}>
        <Text style={[styles.sectionTitle, { color: colors.ink }]}>What do you need?</Text>
        <Pressable onPress={onPostJob} style={styles.link}>
          <Text style={[styles.linkText, { color: colors.accent }]}>See all</Text>
          <ChevronRight size={16} color={colors.accent} />
        </Pressable>
      </View>
      <View style={categoryGridStyles.tiles}>
        {CATEGORIES.slice(0, 4).map((item) => (
          <CategoryCard key={item} category={item} variant="tile" onPress={onPostJob} />
        ))}
      </View>

      <Text
        style={[typography.eyebrow, styles.sectionEyebrow, styles.spaced, { color: colors.muted }]}
      >
        RECOMMENDED FOR YOU
      </Text>
      <Text style={[styles.sectionTitle, { color: colors.ink }]}>Top near you</Text>
      {NEARBY_ARTISANS.map((artisan) => (
        <View
          key={artisan.name}
          style={[styles.person, { backgroundColor: colors.surface, borderColor: colors.line }]}
        >
          <View style={[styles.avatar, { backgroundColor: colors.soft }]}>
            <Text style={{ color: colors.accent }}>{artisan.name[0]}</Text>
          </View>
          <View style={styles.personInfo}>
            <Text style={[typography.itemTitle, { color: colors.ink }]}>{artisan.name}</Text>
            <Text style={[typography.meta, { color: colors.muted }]}>
              {artisan.rating} rating · {artisan.distanceKm} km away
            </Text>
          </View>
          <ChevronRight size={18} color={colors.muted} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  welcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: { fontSize: 25, fontWeight: '600', letterSpacing: -1 },
  name: { fontSize: 29, fontWeight: '800', letterSpacing: -1.5 },
  weather: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  searchText: { fontSize: 13 },
  sectionEyebrow: { fontSize: 11, letterSpacing: 2 },
  spaced: { marginTop: 32 },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 22, fontWeight: '600', letterSpacing: -0.6 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  linkText: { fontSize: 14, fontWeight: '600' },
  person: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personInfo: { flex: 1 },
})
