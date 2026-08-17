import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getSession } from '../../services/localStorage';
import { changePasswordRequest } from '../../services/api';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import PasswordField from '@/components/PasswordField';

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Champs manquants', 'Merci de remplir tous les champs.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Mot de passe trop court', 'Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    setSaving(true);
    try {
      const session = await getSession();
      if (!session) {
        Alert.alert('Erreur', 'Utilisateur non connecté.');
        return;
      }
      await changePasswordRequest(session.id, oldPassword, newPassword);
      Alert.alert('Succès', 'Votre mot de passe a été mis à jour.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (err: any) {
      Alert.alert('Erreur', err?.message ?? "Impossible de modifier le mot de passe.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} accessibilityLabel="Retour">
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Modifier le mot de passe</Text>
        <View style={styles.backBtnPlaceholder} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Mot de passe actuel</Text>
        <View style={{ marginTop: SPACING.lg }}>
          <PasswordField value={oldPassword} onChangeText={setOldPassword} placeholder="Ancien mot de passe" />
        </View>

        <Text style={styles.label}>Nouveau mot de passe</Text>
        <View style={{ marginTop: SPACING.lg }}>
          <PasswordField value={newPassword} onChangeText={setNewPassword} placeholder="Nouveau mot de passe" />
        </View>

        <Text style={styles.label}>Confirmer le nouveau mot de passe</Text>
        <View style={{ marginTop: SPACING.lg }}>
          <PasswordField value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirmer le nouveau mot de passe" />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
          <Text style={styles.saveBtnText}>{saving ? 'Enregistrement...' : 'Enregistrer'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 55 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20, gap: 10 },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.rowShade,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnPlaceholder: { width: 34 },
  title: { flex: 1, fontSize: 18, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  form: { paddingHorizontal: 20 },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.muted, marginBottom: 6, marginTop: SPACING.md },
  input: {
    backgroundColor: COLORS.rowShade,
    borderRadius: RADIUS.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.text,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  saveBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
});