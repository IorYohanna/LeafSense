import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

interface PasswordFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function PasswordField({ value, onChangeText, placeholder = 'Mot de passe' }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.field}>
      <Ionicons name="lock-closed-outline" size={18} color={COLORS.muted} style={styles.fieldIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!visible}
      />
      <TouchableOpacity onPress={() => setVisible(!visible)} hitSlop={8}>
        <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={18} color={COLORS.muted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { flexDirection: 'row', alignItems: 'center' },
  fieldIcon: { marginRight: SPACING.sm },
  input: { flex: 1, paddingVertical: 8, color: COLORS.text, fontSize: 14 },
});