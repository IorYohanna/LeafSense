import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getSavedPlants } from '../../services/localStorage';
import { SavedPlant } from '../../types/scan';
import { LABELS } from '../../constants/labels';
import { COLORS, RADIUS, SPACING, SHADOW } from '../../constants/theme';

export default function StatisticsScreen() {
  const [plants, setPlants] = useState<SavedPlant[]>([]);

  useEffect(() => {
    getSavedPlants().then(setPlants);
  }, []);

  const total = plants.length;
  const diversity = new Set(plants.map((p) => p.scientificName)).size;
  const toxicCount = plants.filter(
    (p) => p.plantInfo.toxicityInfo?.toxicToCats || p.plantInfo.toxicityInfo?.toxicToDogs
  ).length;

  const difficultyCounts: Record<string, number> = {};
  plants.forEach((p) => {
    const d = p.plantInfo.difficultyLevel ?? 'Inconnu';
    difficultyCounts[d] = (difficultyCounts[d] ?? 0) + 1;
  });
  const topDifficulty = Object.entries(difficultyCounts).sort((a, b) => b[1] - a[1])[0];

  const progressPct = LABELS.length > 0 ? Math.round((diversity / LABELS.length) * 100) : 0;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistiques</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          <StatCard icon="leaf" value={total} label="Plantes identifiées" color={COLORS.accent} />
          <StatCard icon="sparkles" value={diversity} label="Espèces différentes" color={COLORS.accentDim} />
          <StatCard icon="warning" value={toxicCount} label="Plantes toxiques" color={COLORS.danger} />
          <StatCard
            icon="ribbon"
            value={topDifficulty ? topDifficulty[0] : '—'}
            label="Difficulté la + fréquente"
            color={COLORS.accent}
            small
          />
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Diversité de votre collection</Text>
          <Text style={styles.progressSubtitle}>
            {diversity} espèces sur {LABELS.length} reconnues par LeafSense
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
          </View>
          <Text style={styles.progressPct}>{progressPct}%</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
  small,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: number | string;
  label: string;
  color: string;
  small?: boolean;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconWrap, { backgroundColor: color + '22' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={[styles.statValue, small && { fontSize: 15 }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  content: { padding: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    ...SHADOW.card,
  },
  statIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.muted, marginTop: 4 },
  progressCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginTop: 16,
    ...SHADOW.card,
  },
  progressTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  progressSubtitle: { fontSize: 11, color: COLORS.muted, marginTop: 2, marginBottom: 12 },
  progressTrack: { height: 8, backgroundColor: COLORS.rowShade, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.accent, borderRadius: 4 },
  progressPct: { fontSize: 11, color: COLORS.accentDim, fontWeight: '700', marginTop: 6, textAlign: 'right' },
});