// src/services/icp/authStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const IDENTITY_KEY = 'ii_delegation_identity_v1';

export async function saveDelegationIdentityJSON(json: string) {
  await AsyncStorage.setItem(IDENTITY_KEY, json);
}

export async function loadDelegationIdentityJSON(): Promise<string | null> {
  return AsyncStorage.getItem(IDENTITY_KEY);
}

export async function clearDelegationIdentity() {
  await AsyncStorage.removeItem(IDENTITY_KEY);
}
