import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getSession, clearSession, getSavedPlants, clearSavedPlants } from '../../services/localStorage';
import { User } from '../../types/user';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

const HERO_IMAGE = require('../../../assets/images/profile-hero.jpg');

type MenuItem = { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void; danger?: boolean };

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [scanCount, setScanCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getSession().then(setUser);
      getSavedPlants().then((plants) => setScanCount(plants.length));
    }, [])
  );

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Voulez-vous vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        style: 'destructive',
        onPress: async () => {
          await clearSession();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const handleClearHistory = () => {
    Alert.alert("Vider l'historique", 'Supprimer toutes les plantes scannées ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          await clearSavedPlants();
          setScanCount(0);
        },
      },
    ]);
  };

  const menuItems: MenuItem[] = [
    { icon: 'notifications-outline', label: 'Notifications', onPress: () => router.push('/(tabs)/notifications' as any) },
    { icon: 'stats-chart-outline', label: 'Statistiques', onPress: () => router.push('/(tabs)/statistics' as any) },
    { icon: 'settings-outline', label: 'Paramètres', onPress: () => router.push('/(tabs)/change-password' as any) },
    { icon: 'trash-outline', label: "Vider l'historique local", onPress: handleClearHistory },
    { icon: 'log-out-outline', label: 'Déconnexion', onPress: handleLogout, danger: true },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Image source={HERO_IMAGE} style={styles.heroImage} />
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.username?.[0]?.toUpperCase() ?? '?'}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.username}>{user?.username ?? 'Invité'}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.menu}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuItem, { backgroundColor: idx % 2 === 0 ? COLORS.rowShade : COLORS.card }]}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={18} color={item.danger ? COLORS.danger : COLORS.text} />
            <Text style={[styles.menuText, item.danger && { color: COLORS.danger }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.muted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center' },
  hero: { width: '100%', height: 170 },
  heroImage: { width: '100%', height: '100%', borderBottomLeftRadius: RADIUS.hero, borderBottomRightRadius: RADIUS.hero },
  avatarWrap: { position: 'absolute', bottom: -30, alignSelf: 'center' },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.card,
    borderWidth: 3,
    borderColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 26, color: COLORS.accentDim, fontWeight: '700' },
  username: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginTop: 40 },
  email: { fontSize: 12, color: COLORS.muted, marginBottom: SPACING.lg },
  menu: { width: '100%', paddingHorizontal: 20 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    marginBottom: 10,
  },
  menuText: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
});