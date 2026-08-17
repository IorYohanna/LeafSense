import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlantDTO } from '../types/plant';
import { COLORS, RADIUS, SPACING, SHADOW } from '../constants/theme';

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

      <ScrollView contentContainerStyle={{ paddingBottom: SPACING.xl }} showsVerticalScrollIndicator={false}>
        {tab === 'apercu' && (
          <>
            <SectionTitle text="Informations générales" />
            <InfoRow label="Difficulté" value={plant.difficultyLevel} />
            <InfoRow label="Hauteur max" value={plant.heightRange} />
            <InfoRow label="Étalement" value={plant.spreadRange} />
            <InfoRow label="Type de feuille" value={plant.leafType} />
            <InfoRow label="Période de plantation" value={plant.plantingSeason} />
            <InfoRow label="Résistance" value={plant.resistanceLevel} />
            <InfoRow label="Entretien" value={plant.maintenanceLevel} />

            {plant.toxicityInfo && (
              <>
                <SectionTitle text="Toxicité" />
                <ToxicityCard toxicity={plant.toxicityInfo} />
              </>
            )}
          </>
        )}

        {tab === 'entretien' && (
          <>
            <SectionTitle text="Fiche de soins" />
            <CareSection care={plant.careInstruction} />

            {plant.commonProblems && plant.commonProblems.length > 0 && (
              <>
                <SectionTitle text="Problèmes courants" />
                <View style={styles.problemsGrid}>
                  {plant.commonProblems.map((p, idx) => (
                    <CommonProblemCard key={idx} problem={p} />
                  ))}
                </View>
              </>
            )}
          </>
        )}

        {tab === 'explorer' && (
          <>
            <SectionTitle text="Description" />
            <Text style={styles.paragraph}>{plant.description || 'Pas de description disponible.'}</Text>

            {plant.usages && (
              <>
                <SectionTitle text="Utilisations" />
                <Text style={styles.paragraph}>{plant.usages}</Text>
              </>
            )}

            {plant.adaptationStrategies && (
              <>
                <SectionTitle text="Stratégies d'adaptation" />
                <Text style={styles.paragraph}>{plant.adaptationStrategies}</Text>
              </>
            )}

            {plant.historyLegend && (
              <>
                <SectionTitle text="Histoire et légendes" />
                <Text style={styles.paragraph}>{plant.historyLegend}</Text>
              </>
            )}

            {plant.nameHistory && (
              <>
                <SectionTitle text="Histoire du nom" />
                <Text style={styles.paragraph}>{plant.nameHistory}</Text>
              </>
            )}

            {plant.symbolism && (
              <>
                <SectionTitle text="Symbolique" />
                <Text style={styles.paragraph}>{plant.symbolism}</Text>
              </>
            )}

            <SectionTitle text="Climat" />
            <InfoRow label="Température" value={plant.temperatureRange} />
            <InfoRow label="Zone de rusticité" value={plant.hardinessZone} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

function SectionTitle({ text }: { text: string }) {
  return <Text style={styles.sectionTitle}>{text}</Text>;
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
  sectionTitle: { color: COLORS.text, fontSize: 15, fontWeight: '700', marginTop: 18, marginBottom: 8 },
  descHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  paragraph: { color: COLORS.text, fontSize: 13, lineHeight: 20 },
  infoRow: {
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
  infoLabel: { color: COLORS.muted, fontSize: 11 },
  infoValue: { color: COLORS.text, fontSize: 13, fontWeight: '600', marginTop: 1 },
  problemsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});