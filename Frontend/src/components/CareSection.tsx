import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CareInstruction } from '../types/plant';
import { COLORS, RADIUS, SPACING, SHADOW } from '../constants/theme';

export default function CareSection({ care }: { care?: CareInstruction }) {
  if (!care) return <Text style={styles.empty}>Pas de fiche de soins disponible.</Text>;

  const rows: { icon: keyof typeof Ionicons.glyphMap; label: string; value?: string }[] = [
    { icon: 'water-outline', label: 'Arrosage', value: care.wateringFrequency },
    { icon: 'sunny-outline', label: 'Lumière', value: care.sunlightNeeds },
    { icon: 'layers-outline', label: 'Sol', value: care.soilType },
    { icon: 'cut-outline', label: 'Taille', value: care.pruningSeason },
    { icon: 'flower-outline', label: 'Rempotage', value: care.repottingSeason },
  ];

  return (
    <View>
      {rows.map((r) =>
        r.value ? (
          <View key={r.label} style={styles.row}>
            <View style={styles.iconChip}>
              <Ionicons name={r.icon} size={16} color={COLORS.accentDim} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>{r.label}</Text>
              <Text style={styles.value}>{r.value}</Text>
            </View>
          </View>
        ) : null
      )}
      {care.wateringTips && (
        <View style={styles.tipRow}>
          <Ionicons name="bulb-outline" size={14} color={COLORS.accentDim} />
          <Text style={styles.tip}>{care.wateringTips}</Text>
        </View>
      )}
      {care.advantages && care.advantages.length > 0 && (
        <View style={styles.advantagesWrap}>
          <Text style={styles.advantagesTitle}>Avantages</Text>
          <View style={styles.advantagesRow}>
            {care.advantages.map((adv, idx) => (
              <View key={idx} style={styles.advantageChip}>
                <Text style={styles.advantageText}>✓ {adv}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 8,
    ...SHADOW.card,
  },
  iconChip: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.iconChip,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  label: { color: COLORS.muted, fontSize: 11 },
  value: { color: COLORS.text, fontSize: 13, fontWeight: '600', marginTop: 1 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 8 },
  tip: { flex: 1, color: COLORS.muted, fontSize: 12, fontStyle: 'italic' },
  empty: { color: COLORS.muted, fontSize: 13 },
  advantagesWrap: { marginTop: 12 },
  advantagesTitle: { color: COLORS.text, fontSize: 13, fontWeight: '700', marginBottom: 8 },
  advantagesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  advantageChip: { backgroundColor: COLORS.accentSoft, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12 },
  advantageText: { color: COLORS.accentDim, fontSize: 11, fontWeight: '600' },
});