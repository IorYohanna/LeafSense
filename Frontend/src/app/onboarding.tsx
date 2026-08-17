import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Trouvez vos\nvendeurs",
    subtitle: "Gérez facilement tous les vendeurs de votre marché.",
    image: require("../../assets/images/profile-hero.jpg"),
  },
  {
    id: "2",
    title: "Gérez\nOù que vous soyez",
    subtitle: "Ajoutez, modifiez et suivez vos vendeurs en temps réel.",
    image: require("../../assets/images/profile-hero.jpg"),
  },
  {
    id: "3",
    title: "Un marché\nbien organisé",
    subtitle: "Statistiques, filtres et recherche instantanée.",
    image: require("../../assets/images/profile-hero.jpg"),
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goNext = () => {
    if (index < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      router.replace("/login" as any);
    }
  };

  const skip = () => router.replace("/login" as any);

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
              <Text style={styles.logo}>MARCHÉCONNECT</Text>
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
                    <View
                      key={i}
                      style={[styles.dot, i === index && styles.dotActive]}
                    />
                  ))}
                </View>

                <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
                  <Text style={styles.arrow}>{index === slides.length - 1 ? "✓" : "→"}</Text>
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
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  slide: { width, height, justifyContent: "space-between" },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logo: { color: "#fff", fontSize: 14, letterSpacing: 3, fontWeight: "600" },
  skip: { color: "#eee", fontSize: 14 },
  bottomContent: { paddingHorizontal: 28, paddingBottom: 50 },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 36,
  },
  subtitle: { color: "#d8d8d8", fontSize: 14, lineHeight: 20, maxWidth: "85%" },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  dots: { flexDirection: "row", gap: 6 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: { backgroundColor: "#fff", width: 20 },
  nextBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: { fontSize: 20, fontWeight: "700" },
});