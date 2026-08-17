import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getReminders, cancelWateringReminder, WateringReminder } from '../../services/notifications';
import { COLORS, RADIUS, SPACING, SHADOW } from '../../constants/theme';

export default function NotificationsScreen() {
  const [reminders, setReminders] = useState<WateringReminder[]>([]);

  const load = async () => setReminders(await getReminders());

  useFocusEffect(useCallback(() => { load(); }, []));

  const handleCancel = (r: WateringReminder) => {
    Alert.alert('Désactiver', `Arrêter les rappels pour ${r.commonName} ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Désactiver', style: 'destructive', onPress: async () => { await cancelWateringReminder(r.scientificName); load(); } },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rappels d'arrosage</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={reminders}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="notifications-off-outline" size={36} color={COLORS.border} />
            <Text style={styles.empty}>Aucun rappel actif pour l'instant.</Text>
            <Text style={styles.emptySub}>Activez un rappel depuis la fiche d'une plante.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconWrap}>
              <Ionicons name="water" size={16} color={COLORS.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.commonName}</Text>
              <Text style={styles.cardSub}>Tous les {item.frequencyDays} jours</Text>
            </View>
            <TouchableOpacity onPress={() => handleCancel(item)}>
              <Ionicons name="close-circle-outline" size={20} color={COLORS.danger} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 55, paddingHorizontal: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  list: { padding: 20 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: 14, marginBottom: 10, ...SHADOW.card },
  iconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.accentSoft, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { color: COLORS.text, fontWeight: '700', fontSize: 14 },
  cardSub: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  emptyWrap: { alignItems: 'center', marginTop: 80, gap: 8 },
  empty: { color: COLORS.muted, fontSize: 13, fontWeight: '600' },
  emptySub: { color: COLORS.muted, fontSize: 11 },
});