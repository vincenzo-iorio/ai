// src/auth/loginWithRedirect.ts
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

export async function loginWithRedirect(): Promise<string> {
  const redirectUri = Linking.createURL('auth'); // ai://auth
  const identityProvider = 'https://identity.ic0.app';

  const loginUrl = `${identityProvider}?redirect_uri=${encodeURIComponent(redirectUri)}`;

  const result = await WebBrowser.openAuthSessionAsync(loginUrl, redirectUri);

  if (result.type === 'success' && result.url) {
    return result.url; // contiene i dati di ritorno
  } else {
    throw new Error('Login cancelled or failed');
  }
}
