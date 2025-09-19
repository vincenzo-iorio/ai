import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/auth/AuthContext';
import LoginWebView from '../../src/auth/LoginWebView';

export default function Login() {
  const { login, isAuthenticated, principal } = useAuth();
  const router = useRouter();

  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(shimmerAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('../chat');
    }
  }, [isAuthenticated]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <View style={styles.background}>
      <LinearGradient
        colors={['#0a0a0a', '#1a0033', '#0a0a0a']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: '#00f0ff', opacity: shimmerOpacity },
        ]}
      />

      <View style={styles.container}>
        <Text style={styles.title}>NEON Q&A</Text>

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login with Internet Identity</Text>
        </TouchableOpacity>

        {principal && (
          <Text style={styles.principal} numberOfLines={1}>
            {principal}
          </Text>
        )}
      </View>

      {/* WebView per il login II */}
      <LoginWebView />
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#0a0a0a' },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 32,
    color: '#00f0ff',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: '#00f0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00f0ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#00f0ff',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#00f0ff',
    fontSize: 18,
    textShadowColor: '#00f0ff',
    textShadowRadius: 5,
    letterSpacing: 1,
  },
  principal: {
    color: '#ff00ff',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});
