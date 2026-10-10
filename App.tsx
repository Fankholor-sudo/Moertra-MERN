import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppShell } from './src/AppShell'
import { ProfileProvider } from './src/profile/ProfileContext'
import { ThemeProvider } from './src/theme/ThemeContext'

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProfileProvider>
          <AppShell />
        </ProfileProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
