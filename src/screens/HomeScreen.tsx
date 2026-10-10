import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ChevronRight, Search } from 'lucide-react-native'
import { CategoryCard, categoryGridStyle } from '../components/common/CategoryCard'
import { ScreenHeader } from '../components/common/ScreenHeader'
import { CATEGORIES, NEARBY_ARTISANS } from '../data/sampleData'
import { useTheme } from '../theme/ThemeContext'
import { typography } from '../theme/typography'

type Props = {
  onPostJob: () => void
}

export function HomeScreen({ onPostJob }: Props) {
  const { colors } = useTheme()

  return (
    <View>
      <ScreenHeader eyebrow="TUESDAY, OCTOBER 9" />

      <View style={styles.welcome}>
        <View>
          <Text style={[styles.greeting, { color: colors.ink }]}>Good morning,</Text>
          <Text style={[styles.name, { color: colors.ink }]}>Jordan</Text>
        </View>
        <View style={[styles.weather, { backgroundColor: colors.soft }]}>
          <Text>24°</Text>
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

      <View style={styles.sectionHead}>
        <Text style={[typography.sectionTitle, { color: colors.ink }]}>Get it fixed.</Text>
        <Pressable onPress={onPostJob}>
          <Text style={[styles.link, { color: colors.accent }]}>See all</Text>
        </Pressable>
      </View>

      <View style={categoryGridStyle}>
        {CATEGORIES.slice(0, 4).map((item) => (
          <CategoryCard key={item} category={item} onPress={onPostJob} />
        ))}
      </View>

      <View style={[styles.banner, { backgroundColor: colors.navy }]}>
        <Text style={styles.bannerEyebrow}>LOCAL HELP, WITHOUT THE HASSLE</Text>
        <Text style={styles.bannerTitle}>Skilled people, right nearby.</Text>
        <Pressable onPress={onPostJob} style={styles.bannerButton}>
          <Text>Post a job</Text>
          <ChevronRight size={16} />
        </Pressable>
      </View>

      <Text style={[typography.sectionTitle, styles.artisansTitle, { color: colors.ink }]}>
        Trusted artisans near you
      </Text>
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
    marginBottom: 26,
  },
  searchText: { fontSize: 13 },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  link: { fontSize: 12, fontWeight: '700' },
  banner: { borderRadius: 18, padding: 18, marginTop: 20 },
  bannerEyebrow: { color: '#a9c4ff', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  bannerTitle: { color: '#fff', fontSize: 23, fontWeight: '800', marginTop: 8, marginBottom: 16 },
  bannerButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  artisansTitle: { marginTop: 28 },
  person: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
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
