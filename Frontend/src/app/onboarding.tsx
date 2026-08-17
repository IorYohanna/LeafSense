import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { setHasOnboarded } from '../services/localStorage';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Identifiez vos\nplantes',
    subtitle: "Prenez une photo et découvrez instantanément l'espèce de votre plante.",
    image: require('../../assets/images/onboarding1.jpg'),
  },
  {
    id: '2',
    title: 'Prenez-en\nsoin',
    subtitle: 'Arrosage, lumière, toxicité — tous les conseils pour chaque espèce.',
    image: require('../../assets/images/onboarding2.jpg'),
  },
  {
    id: '3',
    title: 'Votre jardin\ndans votre poche',
    subtitle: 'Retrouvez toutes vos plantes identifiées, même hors ligne.',
    image: require('../../assets/images/onboarding3.jpg'),
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const isLast = index === slides.length - 1;

  const finishOnboarding = async () => {
    await setHasOnboarded(true);
    router.replace('/(auth)/login' as any);
  };

  const goNext = () => {
    if (!isLast) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      finishOnboarding();
    }
  };

  const skip = () => finishOnboarding();

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(newIndex);
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageBackground source={item.image} style={styles.slide} resizeMode="cover">
            <View style={styles.overlay} />

            <View style={styles.topBar}>
              <Text style={styles.logo}>🌿 LEAFSENSE</Text>
              <TouchableOpacity onPress={skip}>
                <Text style={styles.skip}>Passer</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              <View style={styles.footerRow}>
                <View style={styles.dots}>
                  {slides.map((_, i) => (
                    <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
                  ))}
                </View>

                <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
                  <Text style={styles.nextBtnText}>{isLast ? 'Commencer' : 'Suivant'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D120E' },
  slide: { width, height, justifyContent: 'space-between' },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(10,20,10,0.35)' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SPACING.xl, paddingTop: 60 },
  logo: { color: '#fff', fontSize: 13, letterSpacing: 2, fontWeight: '700' },
  skip: { color: '#eee', fontSize: 14 },
  bottomContent: { paddingHorizontal: SPACING.xl, paddingBottom: 50 },
  title: { color: '#fff', fontSize: 30, fontWeight: '700', marginBottom: SPACING.md, lineHeight: 36 },
  subtitle: { color: '#d8ded9', fontSize: 14, lineHeight: 20, maxWidth: '85%' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.xl },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: COLORS.accent, width: 20 },
  nextBtn: { height: 48, paddingHorizontal: 22, borderRadius: RADIUS.pill, backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center' },
  nextBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});