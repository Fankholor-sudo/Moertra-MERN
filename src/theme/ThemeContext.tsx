import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { Palette, palettes } from './colors'

type ThemeValue = {
  colors: Palette
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  const value = useMemo(
    () => ({
      colors: isDark ? palettes.dark : palettes.light,
      isDark,
      toggleTheme: () => setIsDark((current) => !current),
    }),
    [isDark],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const theme = useContext(ThemeContext)
  if (!theme) throw new Error('useTheme must be used inside ThemeProvider')
  return theme
}
