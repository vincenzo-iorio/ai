import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DelegationIdentity } from '@dfinity/identity';
import { AuthClient } from '@dfinity/auth-client';
import LoginWebView from './LoginWebView';

type AuthState = {
  isAuthenticated: boolean;
  principal?: string;
  identity?: DelegationIdentity;
  login: () => void;
  logout: () => Promise<void>;
  setIdentityFromJSON: (json: string) => Promise<void>;
  showLogin: boolean;
  hideLogin: () => void;
};

const STORAGE_KEY = 'ii_delegation_identity_v1';
const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [identity, setIdentity] = useState<DelegationIdentity | undefined>(undefined);
  const [showLogin, setShowLogin] = useState(false);

  // Load stored identity on mount
  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        try {
          const revived = DelegationIdentity.fromJSON(json);
          setIdentity(revived);
        } catch (e) {
          console.warn('Invalid stored identity, clearing…');
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
      }
    })();
  }, []);

  const setIdentityFromJSON = async (json: string) => {
    try {
      const revived = DelegationIdentity.fromJSON(json);
      setIdentity(revived);
      await AsyncStorage.setItem(STORAGE_KEY, json);
      setShowLogin(false);
    } catch (e) {
      console.error('Invalid delegation JSON:', e);
    }
  };

  const login = async () => {
    if (Platform.OS === 'web') {
      // Web: direct AuthClient
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: 'https://identity.ic0.app',
        maxTimeToLive: 24n * 60n * 60n * 1_000_000_000n, // 24h in ns
        onSuccess: async () => {
          const id = authClient.getIdentity();
          if (id instanceof DelegationIdentity) {
            setIdentity(id);
            try {
              await AsyncStorage.setItem(STORAGE_KEY, id.toJSON());
            } catch (err) {
              console.warn('Failed to persist identity:', err);
            }
          } else {
            console.warn('Login succeeded but identity is not a DelegationIdentity');
          }
        },
        onError: (err) => {
          console.error('Web login failed:', err);
        },
      });
    } else {
      // Mobile: open WebView
      setShowLogin(true);
    }
  };

  const logout = async () => {
    setIdentity(undefined);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const principal = identity?.getPrincipal().toText();

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated: !!identity,
      principal,
      identity,
      login,
      logout,
      setIdentityFromJSON,
      showLogin,
      hideLogin: () => setShowLogin(false),
    }),
    [identity, principal, showLogin]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Mobile only: WebView login */}
      {Platform.OS !== 'web' && <LoginWebView />}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
