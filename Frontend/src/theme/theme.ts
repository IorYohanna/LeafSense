// Direction artistique : carnet de terrain de botaniste — pas le duo cream/terracotta
// generique. Palette inspiree du sous-bois (vert profond, mousse) avec un accent
// "etiquette de specimen" dore/moutarde, sur un fond papier legerement verdi plutot
// qu'un blanc casse neutre.

export const colors = {
  background: '#F7F5EF', // papier naturel, legerement verdi
  surface: '#FFFFFF',
  surfaceMuted: '#EFEBDF',

  forest: '#14532D', // vert profond — couleur de marque, headers, CTA
  moss: '#3F4B3E', // texte secondaire, icones
  sage: '#7C9473', // accents doux, bordures actives

  gold: '#B8860B', // accent "etiquette de specimen", scores de confiance eleves
  clay: '#8C5A3C', // accent chaud secondaire (badges de difficulte)

  textPrimary: '#1C231D',
  textSecondary: '#5B6459',
  textOnDark: '#F7F5EF',

  danger: '#A6362B', // toxicite / erreurs
  success: '#2E6B3E', // non toxique / synchronise
  warning: '#B8860B', // en attente de synchronisation

  border: '#DCD6C6',
  overlay: 'rgba(20, 83, 45, 0.55)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

// Deux roles : une display serif characteristique pour les titres et noms
// scientifiques (registre "planche botanique"), une sans-serif discrete pour
// le corps de texte et l'UI. Chargees via @expo-google-fonts, voir useAppFonts.
export const fonts = {
  display: 'PlayfairDisplay_700Bold',
  displayItalic: 'PlayfairDisplay_600SemiBold_Italic',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
} as const;

export const typography = {
  h1: { fontFamily: fonts.display, fontSize: 32, lineHeight: 38, color: colors.textPrimary },
  h2: { fontFamily: fonts.display, fontSize: 24, lineHeight: 30, color: colors.textPrimary },
  scientificName: {
    fontFamily: fonts.displayItalic,
    fontSize: 18,
    lineHeight: 24,
    color: colors.moss,
  },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.textPrimary },
  bodySecondary: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.textSecondary },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.moss,
    letterSpacing: 0.6,
  },
  button: { fontFamily: fonts.bodySemiBold, fontSize: 15, lineHeight: 20, color: colors.textOnDark },
} as const;
