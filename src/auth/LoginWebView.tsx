// src/auth/LoginWebView.tsx
import React, { useMemo } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuth } from './AuthContext';

export default function LoginWebView() {
  const { showLogin, hideLogin, setIdentityFromJSON } = useAuth();

  // HTML inline: carica auth-client da unpkg e fa login
  const html = useMemo(
    () => `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>II Login</title>
</head>
<body>
<script type="module">
  import { AuthClient } from 'https://unpkg.com/@dfinity/auth-client@2.0.0/dist/esm/auth-client.js';

  // Storage in-memory per la sessione (la persistenza avviene nativamente lato app)
  const memoryStorage = {
    get: async (k) => window._mem?.[k] ?? null,
    set: async (k, v) => { window._mem = window._mem || {}; window._mem[k] = v; },
    remove: async (k) => { if (window._mem) delete window._mem[k]; }
  };

  const authClient = await AuthClient.create({ storage: memoryStorage });

  authClient.login({
    identityProvider: 'https://identity.ic0.app',
    maxTimeToLive: 24n * 60n * 60n * 1_000_000_000n, // 24h in ns
    onSuccess: async () => {
      try {
        const identity = authClient.getIdentity();
        const json = identity.toJSON(); // DelegationIdentity JSON
        window.ReactNativeWebView.postMessage(JSON.stringify({ ok: true, json }));
      } catch (e) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ ok: false, error: String(e) }));
      }
    },
    onError: (err) => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ ok: false, error: String(err) }));
    }
  });
</script>
<p>Opening Internet Identity...</p>
</body>
</html>`,
    []
  );

  return (
    <Modal visible={showLogin} animationType="slide" onRequestClose={hideLogin}>
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{ html }}
          onMessage={async (event) => {
            try {
              const payload = JSON.parse(event.nativeEvent.data);
              if (payload.ok && payload.json) {
                await setIdentityFromJSON(payload.json);
              } else {
                console.warn('II login error:', payload.error);
              }
            } catch (e) {
              console.warn('Invalid message from WebView:', e);
            } finally {
              hideLogin();
            }
          }}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#00f0ff" />
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
