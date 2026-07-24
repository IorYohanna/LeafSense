// Frontend/src/navigation/AppNavigator.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { colors } from '@/theme/theme';
import { useAuth } from '@/context/AuthContext';
import { subscribeToConnectivityChanges, trySyncPendingScans } from '@/services/syncService';
import { LoginScreen } from '@/screens/LoginScreen';
import { ResultScreen } from '@/screens/ResultScreen';
import { PlantDetailScreen } from '@/screens/PlantDetailScreen';
import { MainTabs } from './MainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  // isReady/isLoggedIn viennent du AuthProvider : contrairement a l'ancienne
  // verification locale au montage, l'etat est desormais partage et se met a jour
  // immediatement partout dans l'app des qu'un logout/login est declenche.
  const { isReady, isLoggedIn } = useAuth();

  useEffect(() => {
    // Tente une synchronisation au demarrage, puis a chaque changement de connectivite.
    trySyncPendingScans();
    const unsubscribe = subscribeToConnectivityChanges();
    return unsubscribe;
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.forest} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Main' : 'Login'}
        screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.textPrimary }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Résultat' }} />
        <Stack.Screen
          name="PlantDetail"
          component={PlantDetailScreen}
          options={{ title: 'Fiche plante' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
