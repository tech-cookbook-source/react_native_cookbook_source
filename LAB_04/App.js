import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StyleSheetSpinner from './StyleSheetSpinner'
import StatusBarRefresh from './StatusBarRefresh'
import LoginScreen from './LoginScreen';

import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Bai1" component={StyleSheetSpinner} />
        <Tab.Screen name="Bai2" component={StatusBarRefresh} />
        <Tab.Screen name="Bai3" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
