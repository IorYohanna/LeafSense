import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { getSession, getHasOnboarded } from '../services/localStorage';
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexScreen() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    //AsyncStorage.removeItem('hasOnboarded');

    Promise.all([getSession(), getHasOnboarded()]).then(([session, onboarded]) => {
      setLoggedIn(!!session);
      setHasOnboarded(!!onboarded);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bg }}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return loggedIn ? <Redirect href="/(tabs)/scan" /> : <Redirect href="/(auth)/login" />;
}