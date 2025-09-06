import { useContext, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderHeightContext } from './_layout';
import { sendChat } from '../../src/services/icp/chatService'; // usa il tuo service

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'bot';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Welcome to NEON Q&A — ask me anything…', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const headerHeight = useContext(HeaderHeightContext);
  const insets = useSafeAreaInsets();

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Messaggio utente
    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'me',
    };
    setMessages(prev => [userMsg, ...prev]);
    setInput('');

    // Placeholder "Thinking..."
    const thinkingId = `${Date.now()}-thinking`;
    setMessages(prev => [
      { id: thinkingId, text: 'Thinking...', sender: 'bot' },
      ...prev,
    ]);

    try {
      // Chiamata al canister
      const answer = await sendChat([{ role: 'user', content: userMsg.text }]);

      // Rimuovi placeholder e aggiungi risposta
      setMessages(prev => [
        { id: Date.now().toString(), text: answer, sender: 'bot' },
        ...prev.filter(m => m.id !== thinkingId),
      ]);
    } catch (err) {
      console.error('Errore chiamando il canister:', err);
      setMessages(prev => [
        { id: Date.now().toString(), text: 'Errore di connessione', sender: 'bot' },
        ...prev.filter(m => m.id !== thinkingId),
      ]);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.chatContainer}
              inverted
              showsVerticalScrollIndicator={false}
            />

            <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
              <TextInput
                style={styles.input}
                placeholder="Type your question..."
                placeholderTextColor="#ff00ff"
                value={input}
                onChangeText={setInput}
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Text style={styles.sendText}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0a0a0a' },
  chatContainer: { padding: 10 },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#00f0ff22',
    borderWidth: 1,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff00ff22',
    borderWidth: 1,
    borderColor: '#ff00ff',
    shadowColor: '#ff00ff',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#222',
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ff00ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    color: '#fff',
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#00f0ff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00f0ff',
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  sendText: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
