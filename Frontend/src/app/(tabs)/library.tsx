import React, { useCallback, useRef, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Alert, Animated } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { getSavedPlants, searchSavedPlants, deleteSavedPlant, clearSavedPlants } from '../../services/localStorage';
import { SavedPlant } from '../../types/scan';
import { COLORS, RADIUS, SPACING, SHADOW } from '../../constants/theme';

// Distance (px) qu'il faut swiper vers la gauche avant que le relâchement
// n'ouvre directement le modal de confirmation.
const SWIPE_DELETE_THRESHOLD = 100;

export default function LibraryScreen() {
  const [plants, setPlants] = useState<SavedPlant[]>([]);
  const [query, setQuery] = useState('');
  const swipeableRefs = useRef<Record<string, Swipeable | null>>({});

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

  // Déclenché quand le swipe a été relâché au-delà du seuil (Swipeable "s'ouvre").
  const handleSwipeOpen = (item: SavedPlant) => {
    const close = () => swipeableRefs.current[item.scientificName]?.close();
    Alert.alert('Confirmer', `Supprimer ${item.commonName} de vos plantes ?`, [
      { text: 'Annuler', style: 'cancel', onPress: close },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => deleteSavedPlant(item.scientificName).then(load),
      },
    ]);
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.deleteAction}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={20} color={COLORS.white} />
        </Animated.View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: SavedPlant }) => (
    <Swipeable
      ref={(ref) => { swipeableRefs.current[item.scientificName] = ref; }}
      renderRightActions={renderRightActions}
      rightThreshold={SWIPE_DELETE_THRESHOLD}
      overshootRight={false}
      onSwipeableOpen={() => handleSwipeOpen(item)}
    >
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
        <View style={styles.iconChip}>
          <Ionicons name="chevron-forward" size={15} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </Swipeable>
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

      <TouchableOpacity
        style={styles.historyFab}
        onPress={() => router.push('/(tabs)/history')}
        accessibilityLabel="Voir l'historique"
      >
        <Ionicons name="time-outline" size={22} color={COLORS.white} />
      </TouchableOpacity>
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
  iconChip: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteAction: {
    width: 70,
    marginBottom: 10,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { color: COLORS.muted, textAlign: 'center', marginTop: 40, fontSize: 13 },
  historyFab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.card,
  },
});