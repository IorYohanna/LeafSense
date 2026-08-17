import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ToxicityInfo } from '../types/plant';
import { COLORS, RADIUS, SPACING, SHADOW } from '../constants/theme';

export default function ToxicityCard({ toxicity }: { toxicity: ToxicityInfo }) {
  const items = [
    { label: 'Humains', toxic: toxicity.toxicToHumans },
    { label: 'Chiens', toxic: toxicity.toxicToDogs },
    { label: 'Chats', toxic: toxicity.toxicToCats },
  ];

  return (
    <View>
      <View style={styles.row}>
        {items.map((item) => (
          <View key={item.label} style={styles.badge}>
            <View style={[styles.iconChip, { backgroundColor: item.toxic ? '#F7E3DD' : COLORS.iconChip }]}>
              <Ionicons
                name={item.toxic ? 'warning-outline' : 'checkmark-circle-outline'}
                size={16}
                color={item.toxic ? COLORS.danger : COLORS.accentDim}
              />
            </View>
            <Text style={styles.badgeLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {toxicity.toxicParts && (
        <View style={styles.partsRow}>
          <Ionicons name="alert-circle-outline" size={14} color={COLORS.danger} style={{ marginTop: 1 }} />
          <Text style={styles.partsText}>
            <Text style={styles.partsLabel}>Parties toxiques : </Text>
            {toxicity.toxicParts}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  badge: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    alignItems: 'center',
    ...SHADOW.card,
  },
  iconChip: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  badgeLabel: { color: COLORS.text, fontSize: 11, fontWeight: '600' },
  partsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: 12,
    marginTop: SPACING.sm,
    ...SHADOW.card,
  },
  partsText: { flex: 1, color: COLORS.text, fontSize: 12, lineHeight: 17 },
  partsLabel: { fontWeight: '700', color: COLORS.danger },
});