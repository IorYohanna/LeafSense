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

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isRegister = mode === 'register';

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
        <Text style={styles.eyebrow}>PLANT SCANNER</Text>
        <Text style={styles.title}>
          {isRegister ? 'Crée ton carnet de terrain' : 'Content de te revoir'}
        </Text>
        <Text style={typography.bodySecondary}>
          {isRegister
            ? 'Un compte pour retrouver l\'historique de tes identifications, sur tous tes appareils.'
            : 'Connecte-toi pour retrouver tes plantes identifiées.'}
        </Text>

        <View style={styles.form}>
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

          <Pressable
            onPress={() => {
              setErrorMessage(null);
              setMode(isRegister ? 'login' : 'register');
            }}
            style={styles.switchModeButton}
          >
            <Text style={styles.switchModeText}>
              {isRegister
                ? 'Déjà un compte ? Se connecter'
                : "Pas encore de compte ? S'inscrire"}
            </Text>
          </Pressable>
        </View>
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
  eyebrow: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  form: {
    marginTop: spacing.xl,
  },
  input: {
    backgroundColor: colors.surface,
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
  switchModeButton: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  switchModeText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.forest,
  },
});
