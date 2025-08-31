import React, { useState, useRef } from 'react';
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Slot } from 'expo-router';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const widthAnim = useRef(new Animated.Value(0)).current; // start closed

  const toggleMenu = () => {
    Animated.timing(widthAnim, {
      toValue: menuOpen ? 0 : 250, // animate width
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuOpen(!menuOpen));
  };

  // 🌐 WEB VERSION
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={28} color="#00ff00" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat</Text>
          <Ionicons name="person-circle-outline" size={28} color="#00ff00" />
        </View>

        {/* MAIN ROW: MENU + CONTENT */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* MENU that pushes content */}
          <Animated.View style={[styles.menu, { width: widthAnim, overflow: 'hidden' }]}>
            {/* Channels title */}
            <Text style={[styles.sectionTitle, { paddingHorizontal: 20, paddingTop: 16 }]}>
              Channels
            </Text>

            {/* Scrollable channel list */}
            <ScrollView style={styles.channelList}>
              <Text style={styles.menuItem}>#general</Text>
            </ScrollView>

            {/* Fixed bottom actions */}
            <View style={styles.bottomActions}>
              <TouchableOpacity>
                <Text style={styles.menuItem}>⚙️ Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.menuItem}>🚪 Log off</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* PAGE CONTENT */}
          <View style={{ flex: 1 }}>
            <Slot />
          </View>
        </View>
      </View>
    );
  }

  // 📱 MOBILE VERSION
  const { Stack } = require('expo-router');

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#00ff00',
      }}
    >
      {/* Login is the first screen */}
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: false, // hide header for login
        }}
      />
      {/* Chat screen */}
      <Stack.Screen
        name="home"
        options={{
          title: 'Chat',
          headerRight: () => (
            <Ionicons
              name="person-circle-outline"
              size={28}
              color="#00ff00"
              style={{ marginRight: 15 }}
            />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#00ff00',
  },
  headerTitle: {
    color: '#00ff00',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: '#111',
    borderRightWidth: 1,
    borderRightColor: '#00ff00',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  channelList: {
    flexGrow: 0,
    paddingHorizontal: 20,
  },
  menuItem: {
    color: '#00ff00',
    fontSize: 16,
    marginVertical: 8,
  },
  bottomActions: {
    borderTopWidth: 1,
    borderTopColor: '#00ff00',
    padding: 20,
  },
});
