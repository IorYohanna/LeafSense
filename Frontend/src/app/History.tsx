import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getAllScans, deleteScan, deleteAllScans } from '../services/localStorage';
import { SavedScan } from '../types/scan';

export default function HistoryScreen() {
  const [scans, setScans] = useState<SavedScan[]>([]);

  const loadScans = async () => {
    const data = await getAllScans();
    setScans(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadScans();
    }, [])
  );

  const handleDelete = async (id: string) => {
    await deleteScan(id);
    loadScans();
  };

  const handleDeleteAll = () => {
    Alert.alert('Confirmer', 'Supprimer tout l\'historique ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: async () => {
        await deleteAllScans();
        loadScans();
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes plantes ({scans.length})</Text>
        {scans.length > 0 && (
          <TouchableOpacity onPress={handleDeleteAll}>
            <Text style={styles.deleteAll}>Tout supprimer</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={scans}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.empty}>Aucun scan enregistré.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.commonName}</Text>
              <Text style={styles.cardSub}>{item.scientificName}</Text>
              <Text style={styles.cardConfidence}>{(item.confidence * 100).toFixed(0)}%</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteBtn}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  deleteAll: { color: '#c0392b', fontSize: 13 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#f4f4f4', borderRadius: 10, padding: 10, marginBottom: 10 },
  thumbnail: { width: 50, height: 50, borderRadius: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 15 },
  cardSub: { color: '#666', fontSize: 12 },
  cardConfidence: { color: '#2f8f5b', fontSize: 12, marginTop: 2 },
  deleteBtn: { color: '#c0392b', fontSize: 12 },
});