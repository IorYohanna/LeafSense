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
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthApi } from '../../services/api';
import { saveSession } from '../../services/localStorage';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import PasswordField from '@/components/PasswordField';

const HERO_IMAGE = require('../../../assets/images/signup.jpg');

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Champs manquants', 'Tous les champs sont requis.');
      return;
    }
    setLoading(true);
    try {
      const user = await AuthApi.register(username, email, password);
      await saveSession(user);
      router.replace('/(tabs)/scan' as any);
    } catch (e: any) {
      Alert.alert('Inscription échouée', e.message);
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
          <Text style={styles.title}>Inscription</Text>

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

          <View style={[styles.field, { marginTop: SPACING.lg }]}>
            <Ionicons name="mail-outline" size={18} color={COLORS.muted} style={styles.fieldIcon} />
            <TextInput
              style={styles.input}
              placeholder="user@gmail.com"
              placeholderTextColor={COLORS.muted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.underline} />

          <View style={{ marginTop: SPACING.lg }}>
            <PasswordField value={password} onChangeText={setPassword} placeholder="mot de passe" />
          </View>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister} disabled={loading}>
            <Text style={styles.primaryBtnText}>{loading ? 'Création...' : 'S\'inscrire'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.link}>
              Vous avez déjà un compte? <Text style={styles.linkAccent}>Connexion</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.card },
  hero: { height: 260, justifyContent: 'flex-start' },
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