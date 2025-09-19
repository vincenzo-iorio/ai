import { useContext, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderHeightContext } from '../../app/chat/_layout';
import { useChat, Message } from '../../hooks/useChat';

export default function ChatPage() {
  const { messages, sendMessage, loading } = useChat();
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const headerHeight = useContext(HeaderHeightContext);
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  const renderItem = ({ item }: { item: Message }) => {
    const time = new Date(item.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View
        style={[
          styles.messageBubble,
          item.sender === 'me' ? styles.myMessage : styles.botMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{time}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight + insets.top}
    >
      <SafeAreaView style={styles.safeArea}>
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
              onSubmitEditing={handleSend}
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={loading}
            >
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  timestamp: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 4,
    alignSelf: 'flex-end',
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
