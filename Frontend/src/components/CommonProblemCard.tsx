import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommonProblem } from '../types/plant';
import { COLORS, RADIUS, SPACING, SHADOW } from '../constants/theme';

export default function CommonProblemCard({ problem }: { problem: CommonProblem }) {
  return (
    <View style={styles.card}>
      {problem.imageUrl ? (
        <Image source={{ uri: problem.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Ionicons name="leaf-outline" size={22} color={COLORS.accentDim} />
        </View>
      )}
      <Text style={styles.title} numberOfLines={1}>{problem.title}</Text>
      {problem.description && (
        <Text style={styles.desc} numberOfLines={2}>{problem.description}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: 8,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  image: { width: '100%', height: 90, borderRadius: RADIUS.sm, marginBottom: 6 },
  placeholder: { backgroundColor: COLORS.iconChip, justifyContent: 'center', alignItems: 'center' },
  title: { color: COLORS.text, fontWeight: '600', fontSize: 12 },
  desc: { color: COLORS.muted, fontSize: 10, marginTop: 2 },
});