import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  SafeAreaView,
  Keyboard,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([
    { id: '1', from: 'bot', text: 'Ciao Vincenzo 🟢 Come posso aiutarti oggi?' }
  ]);
  const [input, setInput] = useState('');
  const [inputBarHeight, setInputBarHeight] = useState(60);
  const flatListRef = useRef(null);

  // Animated bottom offset for the floating input
  const bottomAnim = useRef(new Animated.Value(15 + insets.bottom)).current;

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          from: 'bot',
          text: `Hai chiesto: "${input}". Risposta generata qui...`
        }
      ]);
    }, 600);

    setInput('');
  };

  // Always scroll to bottom on new messages
  useEffect(() => {
    requestAnimationFrame(() =>
      flatListRef.current?.scrollToEnd({ animated: true })
    );
  }, [messages]);

  // Keyboard listeners with platform-specific events and animation
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, e => {
      const kb = e?.endCoordinates?.height ?? 0;
      const duration = Platform.OS === 'ios' ? e?.duration ?? 250 : 250;

      Animated.timing(bottomAnim, {
        toValue: kb + 8 + insets.bottom,
        duration,
        useNativeDriver: false,
      }).start();

      // ensure we see the last message as the keyboard opens
      requestAnimationFrame(() =>
        flatListRef.current?.scrollToEnd({ animated: true })
      );
    });

    const hideSub = Keyboard.addListener(hideEvent, e => {
      const duration = Platform.OS === 'ios' ? e?.duration ?? 250 : 250;

      Animated.timing(bottomAnim, {
        toValue: 15 + insets.bottom,
        duration,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [bottomAnim, insets.bottom]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Messages */}
      <FlatList
        ref={flatListRef}
        style={styles.list}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.from === 'user' ? styles.userMsg : styles.botMsg
            ]}
          >
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        )}
        // add padding so last bubble doesn't hide behind the floating input
        contentContainerStyle={{ padding: 10, paddingBottom: inputBarHeight + 40 }}
        keyboardShouldPersistTaps="handled"
      />

      {/* Floating input that animates above the keyboard */}
      <Animated.View style={[styles.inputWrapper, { bottom: bottomAnim }]}>
        <View
          style={styles.inputRow}
          onLayout={e => setInputBarHeight(e.nativeEvent.layout.height)}
        >
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Scrivi la tua domanda..."
            placeholderTextColor="#00ff00aa"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  list: {
    flex: 1,
  },
  message: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 6,
  },
  userMsg: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#00ff00',
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  botMsg: {
    backgroundColor: '#003300',
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  msgText: {
    color: '#fff',
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  inputWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    width: '94%',
    maxWidth: 800,
  },
  inputRow: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#00ff00',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    flex: 1,
    color: '#00ff00',
    paddingHorizontal: 10,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  sendBtn: {
    backgroundColor: '#00ff00',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
