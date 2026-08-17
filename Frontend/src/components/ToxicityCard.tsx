import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ToxicityInfo } from '../types/plant';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

export default function ToxicityCard({ toxicity }: { toxicity: ToxicityInfo }) {
  const targets = [
    { label: 'Humains', icon: 'person' as const, toxic: toxicity.toxicToHumans, toxicIf: toxicity.humanToxicIf, parts: toxicity.humanToxicParts, detail: toxicity.humanToxicityDetail },
    { label: 'Chiens', icon: 'paw' as const, toxic: toxicity.toxicToDogs, toxicIf: toxicity.dogToxicIf, parts: toxicity.dogToxicParts, detail: toxicity.dogToxicityDetail },
    { label: 'Chats', icon: 'paw' as const, toxic: toxicity.toxicToCats, toxicIf: toxicity.catToxicIf, parts: toxicity.catToxicParts, detail: toxicity.catToxicityDetail },
  ];

  return (
    <View>
      {targets.map((t) => (
        <View key={t.label} style={[styles.block, { borderLeftColor: t.toxic ? COLORS.danger : COLORS.accent }]}>
          <View style={styles.blockHeader}>
            <Ionicons name={t.toxic ? 'warning' : 'checkmark-circle'} size={16} color={t.toxic ? COLORS.danger : COLORS.accent} />
            <Text style={styles.blockTitle}>{t.label}</Text>
            <Text style={[styles.blockStatus, { color: t.toxic ? COLORS.danger : COLORS.accent }]}>
              {t.toxic ? 'Toxique' : 'Non toxique'}
            </Text>
          </View>

          {t.toxic && (
            <>
              {t.toxicIf && (
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Toxique si</Text>
                  <Text style={styles.rowValue}>{t.toxicIf}</Text>
                </View>
              )}
              {t.parts && (
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Parties toxiques</Text>
                  <Text style={styles.rowValue}>{t.parts}</Text>
                </View>
              )}
            </>
          )}
          {t.detail && <Text style={styles.detail}>{t.detail}</Text>}
        </View>
      ))}

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
  block: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderLeftWidth: 3,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  blockHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  blockTitle: { color: COLORS.text, fontWeight: '700', fontSize: 13, flex: 1 },
  blockStatus: { fontSize: 11, fontWeight: '700' },
  row: { flexDirection: 'row', marginTop: 4 },
  rowLabel: { color: COLORS.muted, fontSize: 11, width: 110 },
  rowValue: { color: COLORS.text, fontSize: 11, flex: 1, fontWeight: '600' },
  detail: { color: COLORS.muted, fontSize: 11, marginTop: 6, lineHeight: 16 },
  disclaimer: {
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: COLORS.rowShade,
    borderRadius: RADIUS.md,
  },
  disclaimerText: { color: COLORS.muted, fontSize: 10, lineHeight: 14 },
});