// Frontend/src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { colors, spacing, typography, radius, fonts } from '@/theme/theme';
import { PrimaryButton } from '@/components/PrimaryButton';
import { api, extractApiErrorMessage } from '@/services/api';
import { authStorage } from '@/services/authStorage';
import { useAuth } from '@/context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { refresh } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isRegister = mode === 'register';
  // Si on peut revenir en arriere, c'est qu'on a ete ouvert depuis l'onglet Profil
  // (utilisateur deja en mode invite) : l'acces invite n'a alors plus de sens ici.
  const openedFromProfile = navigation.canGoBack();

  function handleGuestAccess() {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  }

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Merci de renseigner un email et un mot de passe.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = isRegister
        ? await api.register(email.trim(), password)
        : await api.login(email.trim(), password);

      await authStorage.saveSession(response.token, response.email);
      // Propage immediatement le nouvel etat de connexion a tout le reste de l'app
      // (onglet Profil, badges de synchronisation, etc.).
      await refresh();
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (error) {
      setErrorMessage(
        extractApiErrorMessage(
          error,
          isRegister
            ? "L'inscription a échoué. Cet email est peut-être déjà utilisé."
            : 'Connexion impossible. Vérifie ton email et ton mot de passe.'
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {openedFromProfile && (
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={12}>
            <Text style={styles.backButtonText}>‹ Retour</Text>
          </Pressable>
        )}

        <Text style={styles.eyebrow}>PLANT SCANNER</Text>
        <Text style={styles.title}>
          {isRegister ? 'Crée ton carnet de terrain' : 'Content de te revoir'}
        </Text>
        <Text style={typography.bodySecondary}>
          {isRegister
            ? "Un compte pour retrouver l'historique de tes identifications, sur tous tes appareils."
            : 'Connecte-toi pour retrouver tes plantes identifiées.'}
        </Text>

        <View style={styles.card}>
          <View style={styles.segmentedControl}>
            <Pressable
              onPress={() => {
                setErrorMessage(null);
                setMode('login');
              }}
              style={[styles.segment, !isRegister && styles.segmentActive]}
            >
              <Text style={[styles.segmentText, !isRegister && styles.segmentTextActive]}>
                Se connecter
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setErrorMessage(null);
                setMode('register');
              }}
              style={[styles.segment, isRegister && styles.segmentActive]}
            >
              <Text style={[styles.segmentText, isRegister && styles.segmentTextActive]}>
                S'inscrire
              </Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

          <PrimaryButton
            label={isRegister ? "S'inscrire" : 'Se connecter'}
            onPress={handleSubmit}
            loading={loading}
            style={{ marginTop: spacing.md }}
          />
        </View>

        {!openedFromProfile && (
          <Pressable onPress={handleGuestAccess} style={styles.guestButton}>
            <Text style={styles.guestButtonText}>Continuer sans compte</Text>
            <Text style={styles.guestButtonSubtext}>
              L'historique restera uniquement sur cet appareil, sans synchronisation.
            </Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.lg,
  },
  backButtonText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.forest,
  },
  eyebrow: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  card: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    padding: 4,
    marginBottom: spacing.lg,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: colors.forest,
  },
  segmentText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.textOnDark,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    fontFamily: typography.body.fontFamily,
    fontSize: 15,
    color: colors.textPrimary,
  },
  error: {
    color: colors.danger,
    fontFamily: typography.body.fontFamily,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  guestButton: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  guestButtonText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.moss,
  },
  guestButtonSubtext: {
    ...typography.bodySecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});
