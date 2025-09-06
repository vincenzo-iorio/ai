import { Stack } from 'expo-router';
import { createContext, useState } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useAuth } from '../../lib/useAuth';

// Context to share header height with chat screen
export const HeaderHeightContext = createContext(0);

export default function ChatLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const slideAnim = useState(new Animated.Value(-300))[0];
  const { logout } = useAuth();

  const channels = ['#general', '#tech', '#gaming', '#random'];

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <HeaderHeightContext.Provider value={headerHeight}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={styles.header}
          onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        >
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Dropdown Overlay */}
        {menuVisible && (
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <Animated.View style={[styles.dropdown, { top: slideAnim }]}>
                  {/* Channel List */}
                  <View style={styles.channelList}>
                    {channels.map((channel) => (
                      <TouchableOpacity
                        key={channel}
                        style={styles.channelItem}
                        onPress={() => {
                          console.log(`Switch to ${channel}`);
                          toggleMenu();
                        }}
                      >
                        <Text style={styles.channelText}>{channel}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Bottom Buttons */}
                  <View style={styles.bottomButtons}>
                    <TouchableOpacity
                      style={styles.bottomButton}
                      onPress={() => {
                        console.log('Go to Settings');
                        toggleMenu();
                      }}
                    >
                      <Text style={styles.bottomButtonText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.bottomButton, { borderColor: '#ff4444' }]}
                      onPress={() => {
                        logout();
                        toggleMenu();
                      }}
                    >
                      <Text style={[styles.bottomButtonText, { color: '#ff4444' }]}>
                        Log Off
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* Chat stack */}
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </HeaderHeightContext.Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#222',
    zIndex: 2,
  },
  headerTitle: {
    color: '#00f0ff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#00f0ff',
    textShadowRadius: 5,
  },
  menuButton: { padding: 6, justifyContent: 'center', alignItems: 'center' },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#ff00ff',
    marginVertical: 2,
  },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#ff00ff',
    borderRadius: 8,
    paddingVertical: 8,
    maxHeight: '80%',
    justifyContent: 'space-between',
  },
  channelList: { paddingHorizontal: 10 },
  channelItem: { paddingVertical: 10 },
  channelText: { color: '#fff', fontSize: 16 },
  bottomButtons: {
    borderTopWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  bottomButton: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#00f0ff',
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  bottomButtonText: { color: '#00f0ff', fontSize: 16 },
});
