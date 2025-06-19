import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import screens
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import HistoryScreen from './screens/HistoryScreen';
import LogoutScreen from './screens/LogoutScreen';
import CartoonScreen from './screens/CartoonScreen';
import FlexboxScreen from './screens/FlexboxScreen';

// Import custom drawer content
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2C3E50',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            drawerType: 'slide',
            overlayColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <Drawer.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Trang Chủ',
            }}
          />
          <Drawer.Screen 
            name="Favorites" 
            component={FavoritesScreen}
            options={{
              title: 'Danh Sách Ưa Thích',
            }}
          />
          <Drawer.Screen 
            name="History" 
            component={HistoryScreen}
            options={{
              title: 'Lịch Sử Đặt Phòng',
            }}
          />
          <Drawer.Screen 
            name="Cartoon" 
            component={CartoonScreen}
            options={{
              title: 'Cartoon Collection',
            }}
          />
          <Drawer.Screen 
            name="Flexbox" 
            component={FlexboxScreen}
            options={{
              title: 'Flexbox Practice',
            }}
          />
          <Drawer.Screen 
            name="Logout" 
            component={LogoutScreen}
            options={{
              title: 'Đăng Xuất',
            }}
          />
        </Drawer.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
