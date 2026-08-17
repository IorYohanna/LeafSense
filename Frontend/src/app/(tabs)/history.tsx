import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getScanLog, getTodayLog, deleteLogEntry, clearScanLog } from '../../services/localStorage';
import { ScanLogEntry } from '../../types/scan';
import { COLORS, RADIUS, SPACING, SHADOW } from '../../constants/theme';

export default function HistoryScreen() {
  const [today, setToday] = useState<ScanLogEntry[]>([]);
  const [all, setAll] = useState<ScanLogEntry[]>([]);

  const load = async () => {
    setToday(await getTodayLog());
    setAll(await getScanLog());
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  const handleClear = () => {
    Alert.alert('Confirmer', "Vider tout l'historique ?", [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Vider', style: 'destructive', onPress: async () => { await clearScanLog(); load(); } },
    ]);
  };

  const renderItem = ({ item }: { item: ScanLogEntry }) => (
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
        <Text style={styles.cardSub}>
          {new Date(item.scannedAt).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <TouchableOpacity style={styles.iconChip} onPress={() => deleteLogEntry(item.id).then(load)}>
        <Ionicons name="trash-outline" size={15} color={COLORS.danger} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} accessibilityLabel="Retour">
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Historique</Text>
        {all.length > 0 ? (
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearAll}>Tout effacer</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.clearAllPlaceholder} />
        )}
      </View>

      {today.length > 0 ? (
        <>
          <Text style={styles.sectionLabel}>Aujourd'hui</Text>
          <FlatList
            data={today}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </>
      ) : (
        <Text style={styles.empty}>Aucun scan aujourd'hui.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 55 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 6, gap: 10 },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.rowShade,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, fontSize: 22, fontWeight: '700', color: COLORS.text },
  clearAll: { color: COLORS.danger, fontSize: 12, fontWeight: '600' },
  clearAllPlaceholder: { width: 34 },
  sectionLabel: { color: COLORS.muted, fontSize: 12, textTransform: 'uppercase', paddingHorizontal: 20, marginTop: 14, marginBottom: 6 },
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
  cardSub: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  iconChip: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.rowShade,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { color: COLORS.muted, textAlign: 'center', marginTop: 40, fontSize: 13 },
});