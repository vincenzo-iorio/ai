// src/hooks/useChat.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendChat } from '../src/services/icp/chatService';

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'bot';
  timestamp: number; // ms
}

const STORAGE_KEY = 'chat_messages_v2'; // bump key to avoid old bad data

function normalizeMessages(raw: any[]): Message[] {
  return (raw ?? []).map((m, idx) => {
    const numericTs =
      typeof m?.timestamp === 'number'
        ? m.timestamp
        : Number(m?.timestamp) || // handle string timestamps
          (Number(m?.id) || Date.now()) - idx; // try id as ts, fallback to now
    return {
      id: String(m?.id ?? Date.now() + '-' + idx),
      text: String(m?.text ?? ''),
      sender: m?.sender === 'me' ? 'me' : 'bot',
      timestamp: numericTs,
    };
  });
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const parsed = JSON.parse(json);
          const normalized = normalizeMessages(parsed);
          setMessages(
            normalized.length
              ? normalized
              : [
                  {
                    id: 'welcome',
                    text: 'Welcome to Shinkai, I am AI — ask me anything…',
                    sender: 'bot',
                    timestamp: Date.now(),
                  },
                ]
          );
        } else {
          setMessages([
            {
              id: 'welcome',
              text: 'Welcome to Shinkai, I am AI — ask me anything…',
              sender: 'bot',
              timestamp: Date.now(),
            },
          ]);
        }
      } catch (err) {
        console.warn('Failed to load messages:', err);
        setMessages([
          {
            id: 'welcome',
            text: 'Welcome to Shinkai, I am AI — ask me anything…',
            sender: 'bot',
            timestamp: Date.now(),
          },
        ]);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages)).catch(err =>
      console.warn('Failed to save messages:', err)
    );
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const now = Date.now();
    const userMsg: Message = { id: String(now), text, sender: 'me', timestamp: now };
    const thinkingId = `${now}-thinking`;
    const thinkingMsg: Message = { id: thinkingId, text: 'Thinking...', sender: 'bot', timestamp: now };

    setMessages(prev => [thinkingMsg, userMsg, ...prev]);
    setLoading(true);

    try {
      const answer = await sendChat([{ role: 'user', content: text }]);
      const botMsg: Message = { id: String(Date.now()), text: answer, sender: 'bot', timestamp: Date.now() };
      setMessages(prev => [botMsg, ...prev.filter(m => m.id !== thinkingId)]);
    } catch (err) {
      console.error('Canister error:', err);
      setMessages(prev => [
        { id: String(Date.now()), text: 'Errore di connessione', sender: 'bot', timestamp: Date.now() },
        ...prev.filter(m => m.id !== thinkingId),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setMessages([
        {
          id: 'welcome',
          text: 'Welcome to Shinkai, I am AI — ask me anything…',
          sender: 'bot',
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.warn('Failed to clear messages:', err);
    }
  };

  return { messages, sendMessage, clearMessages, loading };
}
