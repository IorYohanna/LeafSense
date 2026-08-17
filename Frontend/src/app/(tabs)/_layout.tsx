import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOW } from '../../constants/theme';

function TabIcon({ name, focused }: { name: keyof typeof Ionicons.glyphMap; focused: boolean }) {
  return <Ionicons name={name} size={22} color={focused ? COLORS.accent : COLORS.muted} />;
}

function ScanTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.scanBubble, focused && styles.scanBubbleFocused]}>
      <Ionicons name="camera" size={22} color={COLORS.white} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.muted,
      }}
    >
      <Tabs.Screen
        name="library"
        options={{ title: 'Mes plantes', tabBarIcon: ({ focused }) => <TabIcon name="leaf-outline" focused={focused} /> }}
      />
      <Tabs.Screen
        name="scan"
        options={{ title: 'Scanner', tabBarIcon: ({ focused }) => <ScanTabIcon focused={focused} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profil', tabBarIcon: ({ focused }) => <TabIcon name="person-outline" focused={focused} /> }}
      />
      <Tabs.Screen name="history" options={{ href: null }} />
      <Tabs.Screen name="change-password" options={{ href: null }} />
      <Tabs.Screen name="plant-detail" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.card,
    borderTopWidth: 0,
    height: 70,
    paddingTop: 10,
    ...SHADOW.card,
  },
  scanBubble: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accentDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanBubbleFocused: {
    backgroundColor: COLORS.accent,
  },
});
