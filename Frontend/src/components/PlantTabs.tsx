import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlantDTO } from '../types/plant';
import { COLORS, RADIUS, SPACING, SECTION_COLORS } from '../constants/theme';

import CareSection from './CareSection';
import CommonProblemCard from './CommonProblemCard';
import ToxicityCard from './ToxicityCard';

type TabKey = 'apercu' | 'entretien' | 'explorer';

const INFO_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Difficulté: 'speedometer-outline',
  'Hauteur max': 'resize-outline',
  Étalement: 'expand-outline',
  'Type de feuille': 'leaf-outline',
  'Période de plantation': 'calendar-outline',
  Résistance: 'shield-checkmark-outline',
  Entretien: 'construct-outline',
  Température: 'thermometer-outline',
  'Zone de rusticité': 'earth-outline',
};


function Section({
  title,
  colorIndex,
  onMenuPress,
  children,
}: {
  title: string;
  colorIndex: number;
  onMenuPress?: () => void;
  children: React.ReactNode;
}) {
  const color = SECTION_COLORS[colorIndex % SECTION_COLORS.length];
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <View style={[styles.sectionBar, { backgroundColor: color }]} />
          <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

export default function PlantTabs({ plant }: { plant: PlantDTO }) {
  const [tab, setTab] = useState<TabKey>('apercu');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabBar}>
        {(['apercu', 'entretien', 'explorer'] as TabKey[]).map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => setTab(key)}
            style={[styles.tabBtn, tab === key && styles.tabBtnActive]}
          >
            <Text style={[styles.tabLabel, tab === key && styles.tabLabelActive]}>
              {key === 'apercu' ? 'Aperçu' : key === 'entretien' ? 'Entretien' : 'Explorer'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: -SPACING.lg }}
      >
        {tab === 'apercu' && (
          <>
            <Section title="Informations générales" colorIndex={0}>
              <InfoRow label="Difficulté" value={plant.difficultyLevel} />
              <InfoRow label="Hauteur max" value={plant.heightRange} />
              <InfoRow label="Étalement" value={plant.spreadRange} />
              <InfoRow label="Type de feuille" value={plant.leafType} />
              <InfoRow label="Période de plantation" value={plant.plantingSeason} />
              <InfoRow label="Résistance" value={plant.resistanceLevel} />
              <InfoRow label="Entretien" value={plant.maintenanceLevel} />
            </Section>

            {plant.toxicityInfo && (
              <Section title="Toxicité" colorIndex={1}>
                <ToxicityCard toxicity={plant.toxicityInfo} />
              </Section>
            )}
          </>
        )}

        {tab === 'entretien' && (
          <>
            <Section title="Fiche de soins" colorIndex={0}>
              <CareSection care={plant.careInstruction} />
            </Section>

            {plant.commonProblems && plant.commonProblems.length > 0 && (
              <Section title="Problèmes courants" colorIndex={1}>
                <View style={styles.problemsGrid}>
                  {plant.commonProblems.map((p, idx) => (
                    <CommonProblemCard key={idx} problem={p} />
                  ))}
                </View>
              </Section>
            )}
          </>
        )}

        {tab === 'explorer' && (
          <>
            <Section title="Description" colorIndex={0}>
              <Text style={styles.paragraph}>{plant.description || 'Pas de description disponible.'}</Text>
            </Section>

            {plant.usages && (
              <Section title="Utilisations" colorIndex={1}>
                <Text style={styles.paragraph}>{plant.usages}</Text>
              </Section>
            )}

            {plant.adaptationStrategies && (
              <Section title="Stratégies d'adaptation" colorIndex={2}>
                <Text style={styles.paragraph}>{plant.adaptationStrategies}</Text>
              </Section>
            )}

            {plant.historyLegend && (
              <Section title="Histoire et légendes" colorIndex={3}>
                <Text style={styles.paragraph}>{plant.historyLegend}</Text>
              </Section>
            )}

            {plant.nameHistory && (
              <Section title="Histoire du nom" colorIndex={4}>
                <Text style={styles.paragraph}>{plant.nameHistory}</Text>
              </Section>
            )}

            {plant.symbolism && (
              <Section title="Symbolique" colorIndex={0}>
                <Text style={styles.paragraph}>{plant.symbolism}</Text>
              </Section>
            )}

            <Section title="Climat" colorIndex={1}>
              <InfoRow label="Température" value={plant.temperatureRange} />
              <InfoRow label="Zone de rusticité" value={plant.hardinessZone} />
            </Section>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconChip}>
        <Ionicons name={INFO_ICONS[label] ?? 'information-circle-outline'} size={16} color={COLORS.accentDim} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.rowShade,
    borderRadius: RADIUS.pill,
    padding: 4,
    marginBottom: SPACING.md,
  },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: RADIUS.pill },
  tabBtnActive: { backgroundColor: COLORS.accent },
  tabLabel: { color: COLORS.muted, fontSize: 13, fontWeight: '600' },
  tabLabelActive: { color: COLORS.white },
  section: {
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  sectionBar: { width: 4, height: 16, borderRadius: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '700' },
  sectionMenuBtn: { padding: 4 },

  paragraph: { color: COLORS.text, fontSize: 13, lineHeight: 20 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.rowShade,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 8,
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
  infoLabel: { color: COLORS.muted, fontSize: 11 },
  infoValue: { color: COLORS.text, fontSize: 13, fontWeight: '600', marginTop: 1 },
  problemsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});