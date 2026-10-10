export type Palette = {
  canvas: string
  surface: string
  ink: string
  navy: string
  muted: string
  line: string
  soft: string
  accent: string
  nav: string
}

export const palettes: { light: Palette; dark: Palette } = {
  light: {
    canvas: '#f5f7fa',
    surface: '#ffffff',
    ink: '#111827',
    navy: '#152844',
    muted: '#8993a2',
    line: '#e6eaf0',
    soft: '#eef3fa',
    accent: '#2d6de8',
    nav: '#fffffff2',
  },
  dark: {
    canvas: '#0b1320',
    surface: '#111b2b',
    ink: '#f4f7fb',
    navy: '#27436d',
    muted: '#a8b4c6',
    line: '#29364a',
    soft: '#1b2a40',
    accent: '#78a7ff',
    nav: '#172438f2',
  },
}
