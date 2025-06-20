import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppTheme } from '../theme/AppTheme';

import TodoScreen from '../screens/TodoScreen';
import ContactScreen from '../screens/ContactScreen';
import ChatScreen from '../screens/ChatScreen';
import BookingScreen from '../screens/BookingScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <PaperProvider theme={AppTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Todos') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'Contacts') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbox' : 'chatbox-outline';
              } else if (route.name === 'Booking') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              elevation: 8,
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: -2 },
              shadowRadius: 4,
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            headerStyle: {
              backgroundColor: '#6200ee',
              elevation: 4,
              shadowOpacity: 0.2,
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          })}
        >
          <Tab.Screen 
            name="Todos" 
            component={TodoScreen} 
            options={{ title: 'Công việc' }}
          />
          <Tab.Screen 
            name="Contacts" 
            component={ContactScreen} 
            options={{ title: 'Danh bạ' }}
          />
          <Tab.Screen 
            name="Chat" 
            component={ChatScreen} 
            options={{ title: 'Chat AI' }}
          />
          <Tab.Screen 
            name="Booking" 
            component={BookingScreen} 
            options={{ title: 'Đặt lịch' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
