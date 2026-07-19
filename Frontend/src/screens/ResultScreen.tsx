import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';
import { RootStackParamList, PlantDetail } from '@/types';
import { colors, spacing, typography } from '@/theme/theme';
import { PrimaryButton } from '@/components/PrimaryButton';
import { PlantFiche } from '@/components/PlantFiche';
import { api, extractApiErrorMessage } from '@/services/api';
import { localDb } from '@/services/localDb';
import { trySyncPendingScans } from '@/services/syncService';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export function ResultScreen({ route, navigation }: Props) {
  const { photoUri, scientificName, confidence } = route.params;

  const [plant, setPlant] = useState<PlantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlantAndSave() {
      setLoading(true);
      setErrorMessage(null);

      try {
        const detail = await api.searchPlant(scientificName);
        if (cancelled) return;
        setPlant(detail);

        // Ecriture locale immediate, avant meme de savoir
        // si la synchronisation reussira.
        await localDb.insertScan({
          localUuid: uuid.v4() as string,
          scientificName: detail.scientificName,
          commonName: detail.commonName,
          confidence,
          scannedAt: new Date().toISOString(),
          photoUri,
        });
        setSaved(true);

        // Tentative de sync differee si connecte + en ligne , en tache de fond.
        trySyncPendingScans();
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            extractApiErrorMessage(
              error,
              'Fiche introuvable pour cette espèce. Vérifie que le backend est démarré et accessible.'
            )
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlantAndSave();
    return () => {
      cancelled = true;
    };
  }, [scientificName]);

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Image source={{ uri: photoUri }} style={styles.photo} />

      <View style={styles.header}>
        <Text style={typography.label}>{Math.round(confidence * 100)}% DE CONFIANCE</Text>
        <Text style={styles.scientificName}>{scientificName}</Text>
        {plant && <Text style={styles.commonName}>{plant.commonName}</Text>}
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.forest} />
          <Text style={typography.bodySecondary}>Récupération de la fiche…</Text>
        </View>
      )}

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      {plant && <PlantFiche plant={plant} />}

      {saved && <Text style={styles.savedNotice}>✓ Scan enregistré dans « Mes Plantes »</Text>}

      <PrimaryButton
        label="Retour au scan"
        variant="outline"
        onPress={() => navigation.goBack()}
        style={{ marginTop: spacing.lg, marginHorizontal: spacing.lg }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },
  photo: { width: '100%', height: 320, backgroundColor: colors.surfaceMuted },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  scientificName: {
    ...typography.scientificName,
    fontSize: 24,
    marginTop: spacing.xs,
  },
  commonName: {
    ...typography.bodySecondary,
    marginTop: 2,
  },
  center: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  error: {
    ...typography.body,
    color: colors.danger,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  savedNotice: {
    ...typography.bodySecondary,
    color: colors.success,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
