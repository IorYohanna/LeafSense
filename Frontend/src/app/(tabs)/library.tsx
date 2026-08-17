import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getSavedPlants, searchSavedPlants, clearSavedPlants } from '../../services/localStorage';
import { SavedPlant } from '../../types/scan';
import { COLORS, RADIUS, SPACING, SHADOW } from '../../constants/theme';

type SortKey = 'recent' | 'name' | 'difficulty';

const DIFFICULTY_ORDER: Record<string, number> = { Facile: 0, Modéré: 1, Difficile: 2 };
const DIFFICULTY_COLOR: Record<string, string> = {
  Facile: COLORS.accent,
  Modéré: '#E0A93D',
  Difficile: COLORS.danger,
};

export default function LibraryScreen() {
  const [plants, setPlants] = useState<SavedPlant[]>([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('recent');

  const load = async () => setPlants(await getSavedPlants());

  useFocusEffect(useCallback(() => { load(); setQuery(''); }, []));

  const handleSearch = async (text: string) => {
    setQuery(text);
    setPlants(await searchSavedPlants(text));
  };

  const handleClearAll = () => {
    Alert.alert('Confirmer', 'Supprimer toutes vos plantes enregistrées ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: async () => { await clearSavedPlants(); load(); } },
    ]);
  };

  const sorted = useMemo(() => {
    const copy = [...plants];
    if (sortKey === 'name') {
      copy.sort((a, b) => a.commonName.localeCompare(b.commonName));
    } else if (sortKey === 'difficulty') {
      copy.sort(
        (a, b) =>
          (DIFFICULTY_ORDER[a.plantInfo.difficultyLevel ?? ''] ?? 99) -
          (DIFFICULTY_ORDER[b.plantInfo.difficultyLevel ?? ''] ?? 99)
      );
    } else {
      copy.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
    }
    return copy;
  }, [plants, sortKey]);

  const renderItem = ({ item }: { item: SavedPlant }) => {
    const isToxic = item.plantInfo.toxicityInfo?.toxicToCats || item.plantInfo.toxicityInfo?.toxicToDogs;
    const difficulty = item.plantInfo.difficultyLevel;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/plant-detail',
            params: { scientificName: item.scientificName, imageUri: item.imageUri },
          })
        }
      >
        <View style={styles.thumbWrap}>
          <Image source={{ uri: item.imageUri }} style={styles.thumb} />
          {isToxic && (
            <View style={styles.toxicBadge}>
              <Ionicons name="warning" size={11} color={COLORS.white} />
            </View>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.commonName}</Text>
          <Text style={styles.cardSub} numberOfLines={1}>{item.scientificName}</Text>

          {difficulty && (
            <View style={[styles.diffChip, { backgroundColor: (DIFFICULTY_COLOR[difficulty] ?? COLORS.muted) + '22' }]}>
              <View style={[styles.diffDot, { backgroundColor: DIFFICULTY_COLOR[difficulty] ?? COLORS.muted }]} />
              <Text style={[styles.diffText, { color: DIFFICULTY_COLOR[difficulty] ?? COLORS.muted }]}>{difficulty}</Text>
            </View>
          )}
        </View>

        <View style={styles.iconChip}>
          <Ionicons name="chevron-forward" size={15} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mes plantes</Text>
          <Text style={styles.subtitle}>{plants.length} plante{plants.length > 1 ? 's' : ''} enregistrée{plants.length > 1 ? 's' : ''}</Text>
        </View>
        {plants.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
            <Ionicons name="trash-outline" size={14} color={COLORS.danger} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color={COLORS.muted} style={{ marginRight: SPACING.sm }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une plante..."
          placeholderTextColor={COLORS.muted}
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.sortRow}>
        {([
          { key: 'recent', label: 'Récent', icon: 'time-outline' },
          { key: 'name', label: 'Nom', icon: 'text-outline' },
          { key: 'difficulty', label: 'Difficulté', icon: 'ribbon-outline' },
        ] as { key: SortKey; label: string; icon: keyof typeof Ionicons.glyphMap }[]).map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.sortChip, sortKey === opt.key && styles.sortChipActive]}
            onPress={() => setSortKey(opt.key)}
          >
            <Ionicons name={opt.icon} size={13} color={sortKey === opt.key ? COLORS.white : COLORS.muted} />
            <Text style={[styles.sortChipText, sortKey === opt.key && styles.sortChipTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(i) => i.scientificName}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="leaf-outline" size={36} color={COLORS.border} />
            <Text style={styles.empty}>{query ? 'Aucun résultat.' : 'Aucune plante enregistrée pour l\'instant.'}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 55 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  clearBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.danger + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.rowShade,
    borderRadius: RADIUS.pill,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: { flex: 1, paddingVertical: 12, color: COLORS.text, fontSize: 14 },
  sortRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 14 },
  sortChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sortChipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  sortChipText: { fontSize: 11, color: COLORS.muted, fontWeight: '600' },
  sortChipTextActive: { color: COLORS.white },
  list: { paddingHorizontal: 20, paddingBottom: SPACING.xl },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 10,
    marginBottom: 10,
    ...SHADOW.card,
  },
  thumbWrap: { position: 'relative' },
  thumb: { width: 56, height: 56, borderRadius: RADIUS.md },
  toxicBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.danger,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.card,
  },
  cardTitle: { color: COLORS.text, fontWeight: '700', fontSize: 14 },
  cardSub: { color: COLORS.muted, fontSize: 11, fontStyle: 'italic', marginTop: 1 },
  diffChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.pill,
    marginTop: 6,
  },
  diffDot: { width: 6, height: 6, borderRadius: 3 },
  diffText: { fontSize: 10, fontWeight: '700' },
  iconChip: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrap: { alignItems: 'center', marginTop: 60, gap: 10 },
  empty: { color: COLORS.muted, textAlign: 'center', fontSize: 13 },
});