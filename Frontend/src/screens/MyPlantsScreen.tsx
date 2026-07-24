// Frontend/src/screens/MyPlantsScreen.tsx
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScanRecord } from '@/types';
import { colors, spacing, typography, radius } from '@/theme/theme';
import { localDb } from '@/services/localDb';
import { trySyncPendingScans } from '@/services/syncService';
import { useAuth } from '@/context/AuthContext';

export function MyPlantsScreen({ navigation }: any) {
  const { isLoggedIn } = useAuth();
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadScans = useCallback(async () => {
    const all = await localDb.getAllScans();
    setScans(all);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadScans();
    }, [loadScans])
  );

  async function handleRefresh() {
    setRefreshing(true);
    await trySyncPendingScans();
    await loadScans();
    setRefreshing(false);
  }

  if (scans.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🌱</Text>
        <Text style={styles.emptyTitle}>Aucune plante identifiée pour l'instant</Text>
        <Text style={typography.bodySecondary}>
          Va dans l'onglet « Scan » et vise une plante avec ton appareil photo.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.flex}
      contentContainerStyle={styles.list}
      data={scans}
      keyExtractor={(item) => item.localUuid}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.forest} />
      }
      renderItem={({ item }) => {
        // En mode invité, on distingue donc explicitement "Local uniquement".
        const badgeLabel = item.synced ? 'Synchronisé' : isLoggedIn ? 'En attente' : 'Local uniquement';
        const badgeColor = item.synced ? colors.success : isLoggedIn ? colors.warning : colors.moss;

        return (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation
                .getParent()
                ?.navigate('PlantDetail', { scientificName: item.scientificName })
            }
          >
            {item.photoUri ? (
              <Image source={{ uri: item.photoUri }} style={styles.thumbnail} />
            ) : (
              <View style={[styles.thumbnail, styles.thumbnailPlaceholder]} />
            )}

            <View style={styles.cardBody}>
              <Text style={styles.scientificName}>{item.scientificName}</Text>
              <Text style={styles.commonName}>{item.commonName}</Text>
              <Text style={styles.date}>
                {new Date(item.scannedAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </Text>
            </View>

            <View style={[styles.syncBadge, { backgroundColor: badgeColor }]}>
              <Text style={styles.syncBadgeText}>{badgeLabel}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.xs,
    backgroundColor: colors.background,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    ...typography.h2,
    fontSize: 18,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    padding: spacing.sm,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceMuted,
  },
  thumbnailPlaceholder: {},
  cardBody: {
    flex: 1,
  },
  scientificName: {
    fontFamily: typography.scientificName.fontFamily,
    fontSize: 15,
    color: colors.moss,
  },
  commonName: {
    ...typography.bodySecondary,
  },
  date: {
    ...typography.bodySecondary,
    fontSize: 12,
    marginTop: 2,
  },
  syncBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  syncBadgeText: {
    fontFamily: typography.label.fontFamily,
    fontSize: 10,
    color: colors.textOnDark,
  },
});
