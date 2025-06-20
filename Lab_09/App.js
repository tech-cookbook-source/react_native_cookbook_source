import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';
import theme from './src/styles/theme';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppNavigator />
      <StatusBar style="dark" backgroundColor={theme.colors.surface} />
    </View>
  );
}
