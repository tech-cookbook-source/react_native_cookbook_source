import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import TodoScreen from './TodoScreen';
import AppointmentScreen from './AppointmentScreen'
// Tạo tab navigator
const Tab = createBottomTabNavigator();

// Màn hình Home hiện tại Navigation - Lên xuống hay xoáy vặn hoặc bật tắt cho màn hình được hiện lên
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Quản lý Công Việc" component={TodoScreen} />
        <Tab.Screen name="Lịch Hẹn" component={AppointmentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
