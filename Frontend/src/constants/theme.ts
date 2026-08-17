// src/constants/theme.ts
export const COLORS = {
  bg: '#F4F9F0',
  card: '#FFFFFF',
  border: '#E3EEDD',
  text: '#1F2A1C',
  muted: '#8B9A85',
  accent: '#9AAD7C',       // sage-green pill buttons (sampled from reference)
  accentSoft: '#DCEBD4',
  accentDim: '#7D9463',    // pressed / darker state
  danger: '#D9694F',
  white: '#FFFFFF',
  inputLine: '#D8DED3',    // underline under text fields
  googleBtnBg: '#EDEFE8',  // "Login with Google" pill background
  overlay: 'rgba(0,0,0,0.35)',
  rowShade: '#F3F4EF',     // alternate row background (profile menu, lists)
  iconChip: '#EAF0E3',     // circular icon background on detail rows
};

export const SHADOW = {
  card: {
    shadowColor: '#1F2A1C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
  hero: 46, // curved bottom-left/right of the hero image
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};