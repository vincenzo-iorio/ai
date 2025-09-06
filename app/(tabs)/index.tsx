import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../lib/useAuth';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name}</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' },
  welcome: {
    fontSize: 24,
    color: '#00f0ff',
    marginBottom: 20,
    textShadowColor: '#00f0ff',
    textShadowRadius: 5,
  },
  button: {
    borderWidth: 2,
    borderColor: '#ff00ff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ff00ff',
    fontSize: 16,
    textShadowColor: '#ff00ff',
    textShadowRadius: 5,
  },
});
