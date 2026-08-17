import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthApi } from '../../services/api';
import { saveSession } from '../../services/localStorage';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import PasswordField from '@/components/PasswordField';


const HERO_IMAGE = require('../../../assets/images/login.jpg');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Champs manquants', 'Renseignez vos identifiants.');
      return;
    }
    setLoading(true);
    try {
      const user = await AuthApi.login(username, password);
      await saveSession(user);
      router.replace('/(tabs)/scan' as any);
    } catch (e: any) {
      Alert.alert('Connexion échouée', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={HERO_IMAGE} style={styles.hero} imageStyle={styles.heroImage} />

      <KeyboardAvoidingView
        style={styles.sheet}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.sheetContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Connexion</Text>

          <View style={styles.field}>
            <Ionicons name="person-outline" size={18} color={COLORS.muted} style={styles.fieldIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              placeholderTextColor={COLORS.muted}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.underline} />

          <View style={{ marginTop: SPACING.lg }}>
            <PasswordField value={password} onChangeText={setPassword} placeholder="mot de passe" />
          </View>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} disabled={loading}>
            <Text style={styles.primaryBtnText}>{loading ? 'Connexion...' : 'Connexion'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
            <Text style={styles.link}>
              Vous n'avez pas de compte? <Text style={styles.linkAccent}>S'inscrire</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.card },
  hero: {
    height: 260,
    justifyContent: 'flex-start',
  },
  heroImage: {
    borderBottomLeftRadius: RADIUS.hero,
    borderBottomRightRadius: RADIUS.hero,
  },
  backBtn: {
    marginTop: Platform.OS === 'ios' ? 54 : 36,
    marginLeft: SPACING.lg,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    flex: 1,
    marginTop: -RADIUS.hero,
    backgroundColor: COLORS.card,
    borderTopLeftRadius: RADIUS.hero,
    borderTopRightRadius: RADIUS.hero,
  },
  sheetContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  title: { fontSize: 28, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.lg },
  field: { flexDirection: 'row', alignItems: 'center' },
  fieldIcon: { marginRight: SPACING.sm },
  input: { flex: 1, paddingVertical: 8, color: COLORS.text, fontSize: 14 },
  underline: { height: 1, backgroundColor: COLORS.inputLine, marginTop: 2 },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.muted,
    marginRight: SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  rememberText: { fontSize: 12, color: COLORS.muted },
  forgotText: { fontSize: 12, color: COLORS.muted, fontWeight: '600' },
  primaryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  primaryBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
  link: { color: COLORS.muted, textAlign: 'center', marginTop: SPACING.lg, fontSize: 13 },
  linkAccent: { color: COLORS.accentDim, fontWeight: '700' },
});