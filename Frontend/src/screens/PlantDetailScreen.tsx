// Frontend/src/screens/PlantDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, PlantDetail } from '@/types';
import { colors, spacing, typography } from '@/theme/theme';
import { PlantFiche } from '@/components/PlantFiche';
import { api, extractApiErrorMessage } from '@/services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantDetail'>;

export function PlantDetailScreen({ route }: Props) {
  const { scientificName } = route.params;

  const [plant, setPlant] = useState<PlantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .searchPlant(scientificName)
      .then((detail) => {
        if (!cancelled) setPlant(detail);
      })
      .catch((error) => {
        if (!cancelled) {
          setErrorMessage(
            extractApiErrorMessage(error, "Impossible de récupérer la fiche de cette plante.")
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [scientificName]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.forest} />
      </View>
    );
  }

  if (errorMessage || !plant) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{errorMessage ?? 'Fiche introuvable.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.scientificName}>{plant.scientificName}</Text>
        <Text style={styles.commonName}>{plant.commonName}</Text>
      </View>
      <PlantFiche plant={plant} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  error: {
    ...typography.body,
    color: colors.danger,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  scientificName: {
    ...typography.scientificName,
    fontSize: 24,
  },
  commonName: {
    ...typography.bodySecondary,
    marginTop: 2,
  },
});
