import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme/theme';

type Tone = 'neutral' | 'danger' | 'success' | 'warning';

interface SpecimenTagProps {
  label: string;
  value: string;
  tone?: Tone;
}

const toneColors: Record<Tone, string> = {
  neutral: colors.moss,
  danger: colors.danger,
  success: colors.success,
  warning: colors.warning,
};

/**
 * Element signature de l'app : reprend le style d'une etiquette de planche
 * botanique (libelle en petites capitales + valeur), utilise pour la toxicite,
 * la difficulte et le score de confiance. Un seul style, reutilise partout,
 * plutot qu'invente a chaque ecran.
 */
export function SpecimenTag({ label, value, tone = 'neutral' }: SpecimenTagProps) {
  const accent = toneColors[tone];

  return (
    <View style={[styles.container, { borderColor: accent }]}>
      <Text style={[typography.label, { color: accent }]}>{label.toUpperCase()}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    minWidth: 90,
  },
  value: {
    fontFamily: typography.body.fontFamily,
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 2,
  },
});
