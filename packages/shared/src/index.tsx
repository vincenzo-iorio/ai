import React from 'react';
import { Text } from 'react-native';

export const Greeting = ({ name }: { name: string }) => (
  <Text>Hello, {name} 👋</Text>
);
