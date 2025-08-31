import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Greeting, sum } from '@ai/shared';

export default function App() {
  return (
    <View style={styles.container}>
      <Greeting name="Vincenzo" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
