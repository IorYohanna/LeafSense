import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ToxicityInfo } from '../types/plant';
import { COLORS, RADIUS, SPACING, SHADOW } from '../constants/theme';

type Target = {
  key: 'humans' | 'dogs' | 'cats';
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  toxic?: boolean;
  toxicIf?: string;
  parts?: string;
  detail?: string;
};

export default function ToxicityCard({ toxicity }: { toxicity: ToxicityInfo }) {
  const targets: Target[] = [
    {
      key: 'humans',
      label: 'Humains',
      icon: 'account',
      toxic: toxicity.toxicToHumans,
      toxicIf: toxicity.humanToxicIf,
      parts: toxicity.humanToxicParts,
      detail: toxicity.humanToxicityDetail,
    },
    {
      key: 'dogs',
      label: 'Chiens',
      icon: 'dog',
      toxic: toxicity.toxicToDogs,
      toxicIf: toxicity.dogToxicIf,
      parts: toxicity.dogToxicParts,
      detail: toxicity.dogToxicityDetail,
    },
    {
      key: 'cats',
      label: 'Chats',
      icon: 'cat',
      toxic: toxicity.toxicToCats,
      toxicIf: toxicity.catToxicIf,
      parts: toxicity.catToxicParts,
      detail: toxicity.catToxicityDetail,
    },
  ];

  const [selectedKey, setSelectedKey] = useState<Target['key']>('humans');
  const selected = targets.find((t) => t.key === selectedKey)!;

  return (
    <View>
      <View style={styles.selectorRow}>
        {targets.map((t) => {
          const active = t.key === selectedKey;
          const tint = t.toxic ? COLORS.danger : COLORS.accentDim;
          return (
            <TouchableOpacity
              key={t.key}
              style={[styles.selectorCard, active && { borderColor: tint }]}
              onPress={() => setSelectedKey(t.key)}
            >
              <View style={[styles.iconCircle, { backgroundColor: tint + '22' }]}>
                <MaterialCommunityIcons name={t.icon} size={22} color={tint} />
              </View>
              <Text style={[styles.selectorLabel, active && { color: COLORS.text, fontWeight: '700' }]}>
                {t.toxic ? 'Toxique' : 'Non toxique'} pour les {t.label.toLowerCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.detailCard}>
        <View style={styles.detailHeader}>
          <Ionicons
            name={selected.toxic ? 'warning' : 'checkmark-circle'}
            size={16}
            color={selected.toxic ? COLORS.danger : COLORS.accentDim}
          />
          <Text style={styles.detailHeaderText}>{selected.label}</Text>
        </View>

        {selected.toxicIf && (
          <>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Toxique si</Text>
              <Text style={styles.rowValue}>{selected.toxicIf}</Text>
            </View>
            <View style={styles.divider} />
          </>
        )}

        {selected.parts && (
          <>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Parties toxiques</Text>
              <Text style={styles.rowValue}>{selected.parts}</Text>
            </View>
            <View style={styles.divider} />
          </>
        )}

        <Text style={styles.detail}>
          {selected.detail ?? `Aucune information détaillée disponible pour les ${selected.label.toLowerCase()}.`}
        </Text>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          * L'avis sur la toxicité et le danger est donné uniquement à titre indicatif. Nous NE GARANTISSONS PAS
          l'exactitude de cet avis. Par conséquent, vous NE DEVEZ PAS vous fier à cet avis. Il est IMPORTANT DE
          DEMANDER L'AVIS D'UN PROFESSIONNEL à l'avance si nécessaire.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectorRow: { flexDirection: 'row', gap: 8, marginBottom: SPACING.sm },
  selectorCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    ...SHADOW.card,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectorLabel: { color: COLORS.muted, fontSize: 10.5, textAlign: 'center', lineHeight: 14 },
  detailCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOW.card,
  },
  detailHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  detailHeaderText: { color: COLORS.text, fontWeight: '700', fontSize: 13 },
  row: { paddingVertical: 8 },
  rowLabel: { color: COLORS.muted, fontSize: 11 },
  rowValue: { color: COLORS.text, fontSize: 13, fontWeight: '600', marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.border },
  detail: { color: COLORS.text, fontSize: 12.5, lineHeight: 19, marginTop: 8 },
  disclaimer: {
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: COLORS.rowShade,
    borderRadius: RADIUS.md,
  },
  disclaimerText: { color: COLORS.muted, fontSize: 10, lineHeight: 14 },
});