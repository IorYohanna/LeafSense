// Frontend/src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, fonts } from '@/theme/theme';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAuth } from '@/context/AuthContext';

export function ProfileScreen({ navigation }: any) {
  const { isLoggedIn, email, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Login' }] });
    } finally {
      setLoggingOut(false);
    }
  }

  function handleGoToLogin() {
    navigation.getParent()?.navigate('Login');
  }

  const initial = (email ?? 'I').trim().charAt(0).toUpperCase();

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>PROFIL</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <Text style={styles.name}>{isLoggedIn ? email : 'Mode invité'}</Text>

        <Text style={styles.description}>
          {isLoggedIn
            ? 'Ton historique de scans est synchronisé et accessible sur tous tes appareils.'
            : "Tu navigues sans compte : ton historique reste uniquement sur cet appareil et ne sera pas synchronisé."}
        </Text>

        <View style={styles.actions}>
          {isLoggedIn ? (
            <PrimaryButton
              label="Se déconnecter"
              variant="outline"
              onPress={handleLogout}
              loading={loggingOut}
            />
          ) : (
            <PrimaryButton label="Se connecter / Créer un compte" onPress={handleGoToLogin} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  eyebrow: {
    ...typography.label,
  },
  card: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.textOnDark,
  },
  name: {
    ...typography.h2,
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    ...typography.bodySecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  actions: {
    marginTop: spacing.lg,
    alignSelf: 'stretch',
  },
});
