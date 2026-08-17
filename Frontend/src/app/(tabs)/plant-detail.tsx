import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PlantApi } from '../../services/api';
import { deleteSavedPlant } from '../../services/localStorage';
import { PlantDTO } from '../../types/plant';
import PlantTabs from '../../components/PlantTabs';
import { COLORS, SPACING } from '../../constants/theme';
import { cancelWateringReminder, hasReminder, scheduleWateringReminder } from '@/services/notifications';

const HERO_FALLBACK = require('../../../assets/images/scan-backdrop.jpg');

export default function PlantDetailScreen() {
  const { scientificName, imageUri } = useLocalSearchParams<{ scientificName: string; imageUri?: string }>();
  const [plant, setPlant] = useState<PlantDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reminderOn, setReminderOn] = useState(false);

  useEffect(() => {
    if (!scientificName) return;
    PlantApi.getByScientificName(scientificName)
      .then(setPlant)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [scientificName]);

  useEffect(() => {
    if (scientificName) {
      hasReminder(scientificName).then(setReminderOn);
    }
  }, [scientificName]);

  const toggleReminder = async () => {
    if (!plant || !scientificName) return;
    try {
      if (reminderOn) {
        await cancelWateringReminder(scientificName);
        setReminderOn(false);
      } else {
        await scheduleWateringReminder(scientificName, plant.commonName, plant.careInstruction?.wateringFrequency);
        setReminderOn(true);
        Alert.alert(
          'Rappel activé',
          plant.careInstruction?.wateringFrequency
            ? `Vous recevrez une notification pour l'arrosage : ${plant.careInstruction.wateringFrequency}.`
            : "Vous recevrez une notification pour l'arrosage de cette plante."
        );
      }
    } catch (e: any) {
      Alert.alert('Erreur', e.message);
    }
  };

  const handleDelete = () => {
    if (!scientificName) return;
    Alert.alert('Confirmer', `Supprimer ${plant?.commonName ?? 'cette plante'} de votre bibliothèque ?`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          await deleteSavedPlant(scientificName);
          router.back();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (error || !plant) {
    return (
      <View style={styles.center}>
        <TouchableOpacity style={styles.backFloating} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.danger }}>{error ?? 'Plante introuvable'}</Text>
      </View>
    );
  }

  const heroSource = imageUri ? { uri: imageUri } : HERO_FALLBACK;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View>
        <Image source={heroSource} style={styles.hero} />
        <TouchableOpacity style={styles.backFloating} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.reminderFloating} onPress={toggleReminder}>
          <Ionicons
            name={reminderOn ? 'notifications' : 'notifications-outline'}
            size={18}
            color={reminderOn ? COLORS.accent : COLORS.text}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteFloating} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>{plant.commonName}</Text>
        <Text style={styles.scientific}>{plant.scientificName}</Text>
        <PlantTabs plant={plant} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bg },
  hero: { width: '100%', height: 240 },
  backFloating: {
    position: 'absolute',
    top: 54,
    left: SPACING.lg,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderFloating: {
    position: 'absolute',
    top: 54,
    right: SPACING.lg + 40,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteFloating: {
    position: 'absolute',
    top: 54,
    right: SPACING.lg,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.bg,
    marginTop: -SPACING.lg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  name: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  scientific: { fontSize: 12, color: COLORS.muted, fontStyle: 'italic', marginTop: 2, marginBottom: SPACING.sm },
});