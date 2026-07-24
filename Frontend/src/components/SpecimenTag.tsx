// Frontend/src/components/SpecimenTag.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, fonts } from '@/theme/theme';

type Tone = 'neutral' | 'success' | 'danger';

interface SpecimenTagProps {
  label: string;
  value: string;
  tone?: Tone;
}

const toneStyles: Record<Tone, { bg: string; text: string }> = {
  neutral: { bg: colors.surfaceMuted, text: colors.moss },
  success: { bg: '#E4EFE3', text: colors.success },
  danger: { bg: '#F4E1DE', text: colors.danger },
};

export function SpecimenTag({ label, value, tone = 'neutral' }: SpecimenTagProps) {
  const { bg, text } = toneStyles[tone];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
      <Text style={[styles.value, { color: text }]} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  value: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
  },
});
