import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getSavedPlants, searchSavedPlants, clearSavedPlants } from '../../services/localStorage';
import { SavedPlant } from '../../types/scan';
import { COLORS, RADIUS, SPACING, SHADOW } from '../../constants/theme';

export default function LibraryScreen() {
  const [plants, setPlants] = useState<SavedPlant[]>([]);
  const [query, setQuery] = useState('');

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

  const renderItem = ({ item }: { item: SavedPlant }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/(tabs)/plant-detail',
          params: { scientificName: item.scientificName, imageUri: item.imageUri },
        })
      }
    >
      <Image source={{ uri: item.imageUri }} style={styles.thumb} />
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.commonName}</Text>
        <Text style={styles.cardSub}>{item.scientificName}</Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.iconChip}>
          <Ionicons name="chevron-forward" size={15} color={COLORS.white} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes plantes</Text>
        {plants.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAll}>Tout supprimer</Text>
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

      <FlatList
        data={plants}
        keyExtractor={(i) => i.scientificName}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>{query ? 'Aucun résultat.' : 'Aucune plante enregistrée.'}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 55 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  clearAll: { color: COLORS.danger, fontSize: 12, fontWeight: '600' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.rowShade,
    borderRadius: RADIUS.pill,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  searchInput: { flex: 1, paddingVertical: 12, color: COLORS.text, fontSize: 14 },
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
  thumb: { width: 50, height: 50, borderRadius: RADIUS.md },
  cardTitle: { color: COLORS.text, fontWeight: '700', fontSize: 14 },
  cardSub: { color: COLORS.muted, fontSize: 11, fontStyle: 'italic', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 8 },
  iconChip: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconChipGhost: { backgroundColor: COLORS.rowShade },
  empty: { color: COLORS.muted, textAlign: 'center', marginTop: 40, fontSize: 13 },
});