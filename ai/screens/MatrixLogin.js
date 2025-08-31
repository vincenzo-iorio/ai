import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function MatrixLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Qui potresti aggiungere la logica di validazione
    router.push('/home'); // Vai alla chat
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>LOGIN</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#00ff00aa"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#00ff00aa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 24,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  title: {
    fontSize: 32,
    color: '#00ff00',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00ff00',
    color: '#00ff00',
    padding: 12,
    marginBottom: 15,
    borderRadius: 4,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
    width: '100%',
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
  },
  button: {
    backgroundColor: '#00ff00',
    padding: 14,
    borderRadius: 4,
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
});
