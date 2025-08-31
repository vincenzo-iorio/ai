import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [messages, setMessages] = useState([
    { id: '1', from: 'bot', text: 'Ciao Vincenzo 🟢 Come posso aiutarti oggi?' }
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

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

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        {/* Lista messaggi */}
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
          contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
        />

        {/* Input fluttuante */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputRow}>
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
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
  // remove maxWidth here if you want full-width text wrapping
},

userMsg: {
  backgroundColor: '#000',
  borderWidth: 1,
  borderColor: '#00ff00',
  alignSelf: 'flex-end',
  maxWidth: '80%', // keep for user so bubbles don't span entire width
},

botMsg: {
  backgroundColor: '#003300',
  alignSelf: 'flex-start',
  maxWidth: '80%', // optional: remove if you want them to stretch more
  marginLeft: 0,   // ensure no extra left margin
},

  msgText: {
    color: '#fff',
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 15,
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
