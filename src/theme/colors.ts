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
  avatar: string
  avatarInk: string
  success: string
  successSoft: string
  danger: string
  dangerLine: string
  alert: string
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
    avatar: '#dfe7fd',
    avatarInk: '#2a4a9a',
    success: '#3d8057',
    successSoft: '#eaf5ee',
    danger: '#c8574f',
    dangerLine: '#efcfcb',
    alert: '#e5533d',
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
    avatar: '#25395c',
    avatarInk: '#b9cdff',
    success: '#7cc89a',
    successSoft: '#163024',
    danger: '#f08f86',
    dangerLine: '#5a2b2a',
    alert: '#ff7a63',
  },
}

export const banner = {
  background: '#1b2a47',
  overlay: 'rgba(22, 36, 64, 0.86)',
  circle: '#2c4570',
  eyebrow: '#b8c6e0',
  highlight: '#a9bcf5',
  body: '#d3dcec',
  buttonBg: '#e8efff',
  buttonInk: '#111d33',
  icon: '#86a7f5',
}
