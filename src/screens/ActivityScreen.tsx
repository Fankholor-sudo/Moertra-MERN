import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScreenHeader } from '../components/common/ScreenHeader'
import { MY_JOBS } from '../data/sampleData'
import { useTheme } from '../theme/ThemeContext'
import { typography } from '../theme/typography'

export function ActivityScreen() {
  const { colors } = useTheme()

  return (
    <View>
      <ScreenHeader eyebrow="YOUR ACTIVITY" title="My jobs" />
      {MY_JOBS.map((job) => (
        <View
          key={job.title}
          style={[styles.job, { backgroundColor: colors.surface, borderColor: colors.line }]}
        >
          <View style={styles.info}>
            <Text style={[typography.itemTitle, { color: colors.ink }]}>{job.title}</Text>
            <Text style={[typography.meta, { color: colors.muted }]}>{job.status}</Text>
          </View>
          <Text style={[styles.price, { color: colors.accent }]}>{job.price}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  job: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: { flex: 1 },
  price: { fontSize: 13, fontWeight: '800' },
})
