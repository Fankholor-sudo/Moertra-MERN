import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { JobRequestSheet } from './components/job/JobRequestSheet'
import { BottomNav } from './components/layout/BottomNav'
import { TopBar } from './components/layout/TopBar'
import { useJobRequest } from './hooks/useJobRequest'
import { AccountScreen } from './screens/AccountScreen'
import { ActivityScreen } from './screens/ActivityScreen'
import { HomeScreen } from './screens/HomeScreen'
import { ServicesScreen } from './screens/ServicesScreen'
import { useTheme } from './theme/ThemeContext'
import { Tab } from './types'

export function AppShell() {
  const { colors, isDark } = useTheme()
  const [tab, setTab] = useState<Tab>('Home')
  const jobRequest = useJobRequest()

  const renderScreen = () => {
    switch (tab) {
      case 'Home':
        return <HomeScreen onPostJob={jobRequest.open} />
      case 'Services':
        return <ServicesScreen onPostJob={jobRequest.open} />
      case 'Activity':
        return <ActivityScreen />
      case 'Account':
        return <AccountScreen />
    }
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.canvas }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.app}>
        <TopBar onOpenAccount={() => setTab('Account')} />
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {renderScreen()}
        </ScrollView>
        <BottomNav activeTab={tab} onSelect={setTab} />
        <JobRequestSheet request={jobRequest} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  app: { flex: 1 },
  scroll: { padding: 22, paddingBottom: 120 },
})
