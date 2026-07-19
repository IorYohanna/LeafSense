import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlantDetail } from '@/types';
import { colors, spacing, typography, fonts } from '@/theme/theme';
import { SpecimenTag } from './SpecimenTag';

function toxicityTone(value: string | null): 'success' | 'danger' {
  return value?.toLowerCase().includes('non') ? 'success' : 'danger';
}

export function PlantFiche({ plant }: { plant: PlantDetail }) {
  return (
    <>
      <View style={styles.tagsRow}>
        <SpecimenTag label="Difficulté" value={plant.difficultyLevel} tone="neutral" />
        <SpecimenTag
          label="Toxicité humains"
          value={plant.toxicityHumans ?? 'Non renseigné'}
          tone={toxicityTone(plant.toxicityHumans)}
        />
      </View>
      <View style={styles.tagsRow}>
        <SpecimenTag
          label="Chiens"
          value={plant.toxicityDogs ?? 'Non renseigné'}
          tone={toxicityTone(plant.toxicityDogs)}
        />
        <SpecimenTag
          label="Chats"
          value={plant.toxicityCats ?? 'Non renseigné'}
          tone={toxicityTone(plant.toxicityCats)}
        />
      </View>

      <Section title="Aperçu">
        <InfoRow label="Hauteur max." value={plant.maxHeightCm ? `${plant.maxHeightCm} cm` : '—'} />
        <InfoRow label="Type de feuille" value={plant.leafType ?? '—'} />
        <InfoRow label="Période de plantation" value={plant.plantingPeriod ?? '—'} />
      </Section>

      <Section title="Entretien">
        <InfoRow label="Arrosage" value={plant.wateringInfo ?? '—'} multiline />
        <InfoRow label="Lumière" value={plant.lightRequirement ?? '—'} />
        <InfoRow label="Climat" value={plant.climateInfo ?? '—'} multiline />
      </Section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function InfoRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <View style={[styles.infoRow, multiline && styles.infoRowMultiline]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, multiline && styles.infoValueMultiline]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    fontSize: 20,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoRowMultiline: {
    flexDirection: 'column',
    gap: 4,
  },
  infoLabel: {
    ...typography.bodySecondary,
    fontFamily: fonts.bodyMedium,
  },
  infoValue: {
    ...typography.body,
    flexShrink: 1,
    textAlign: 'right',
    maxWidth: '60%',
  },
  infoValueMultiline: {
    textAlign: 'left',
    maxWidth: '100%',
  },
});
