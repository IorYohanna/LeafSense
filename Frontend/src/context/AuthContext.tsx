// Frontend/src/context/AuthContext.tsx
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authStorage } from '@/services/authStorage';

interface AuthContextValue {
  /** true une fois l'etat initial (token present ou non) charge depuis le stockage securise */
  isReady: boolean;
  isLoggedIn: boolean;
  email: string | null;
  /** A appeler juste apres authStorage.saveSession(...) pour propager l'etat a toute l'app */
  refresh: () => Promise<void>;
  /** Efface la session et notifie immediatement tous les ecrans abonnes */
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const loggedIn = await authStorage.isLoggedIn();
    const storedEmail = loggedIn ? await authStorage.getEmail() : null;
    setIsLoggedIn(loggedIn);
    setEmail(storedEmail);
  }, []);

  const logout = useCallback(async () => {
    await authStorage.clearSession();
    setIsLoggedIn(false);
    setEmail(null);
  }, []);

  useEffect(() => {
    refresh().finally(() => setIsReady(true));
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ isReady, isLoggedIn, email, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth doit etre utilise a l\'interieur de <AuthProvider>.');
  }
  return ctx;
}
