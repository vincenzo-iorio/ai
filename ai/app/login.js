import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: validazione credenziali
    router.replace('/home'); // vai alla chat dopo login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#00ff00aa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#00ff00aa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTER</Text>
      </TouchableOpacity>

      {/* Link per signup */}
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.signupText}>Non hai un account? Registrati</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center', // centra verticalmente
    alignItems: 'center',     // centra orizzontalmente
    paddingHorizontal: 20,
  },
  title: {
    color: '#00ff00',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%', // larghezza controllata
    borderWidth: 1,
    borderColor: '#00ff00',
    color: '#00ff00',
    padding: 12,
    marginBottom: 15,
    borderRadius: 4,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
  },
  button: {
    width: '80%',
    backgroundColor: '#00ff00',
    padding: 14,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupText: {
    color: '#00ff00',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
