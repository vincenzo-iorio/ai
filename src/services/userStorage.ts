// src/services/userStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUserData(principal: string, data: any) {
  const key = `user_data_${principal}`;
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function loadUserData<T = any>(principal: string): Promise<T | null> {
  const key = `user_data_${principal}`;
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : null;
}

export async function clearUserData(principal: string) {
  const key = `user_data_${principal}`;
  await AsyncStorage.removeItem(key);
}
