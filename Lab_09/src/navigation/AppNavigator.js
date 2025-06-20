import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AnimationScreen from '../screens/AnimationScreen';
import PostsScreen from '../screens/PostsScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import FriendsScreen from '../screens/FriendsScreen';
import CountdownScreen from '../screens/CountdownScreen';
import theme from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Posts
function PostsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.borderLight,
        },
        headerTitleStyle: {
          fontSize: theme.typography.sizes.lg,
          fontWeight: theme.typography.weights.semibold,
          color: theme.colors.text.primary,
        },
        headerTintColor: theme.colors.primary,
      }}
    >
      <Stack.Screen 
        name="PostsList" 
        component={PostsScreen} 
        options={{ 
          title: '📝 Bài viết',
          headerLeft: null,
        }} 
      />
      <Stack.Screen 
        name="PostDetail" 
        component={PostDetailScreen} 
        options={{ 
          title: '📖 Chi tiết bài viết',
        }} 
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Friends
function FriendsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.borderLight,
        },
        headerTitleStyle: {
          fontSize: theme.typography.sizes.lg,
          fontWeight: theme.typography.weights.semibold,
          color: theme.colors.text.primary,
        },
        headerTintColor: theme.colors.primary,
      }}
    >
      <Stack.Screen 
        name="FriendsList" 
        component={FriendsScreen} 
        options={{ 
          title: '👥 Danh sách bạn bè',
          headerLeft: null,
        }} 
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize = focused ? 28 : 24;

            if (route.name === 'Animation') {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
            } else if (route.name === 'Posts') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'Friends') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Countdown') {
              iconName = focused ? 'timer' : 'timer-outline';
            }

            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopWidth: 1,
            borderTopColor: theme.colors.borderLight,
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
            ...theme.shadows.lg,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text.tertiary,
          tabBarLabelStyle: {
            fontSize: theme.typography.sizes.xs,
            fontWeight: theme.typography.weights.medium,
            marginTop: 4,
          },
          headerStyle: {
            backgroundColor: theme.colors.surface,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.borderLight,
          },
          headerTitleStyle: {
            fontSize: theme.typography.sizes.lg,
            fontWeight: theme.typography.weights.semibold,
            color: theme.colors.text.primary,
          },
        })}
      >
        <Tab.Screen 
          name="Animation" 
          component={AnimationScreen} 
          options={{ 
            title: '✨ Animation',
            tabBarLabel: 'Animation'
          }} 
        />
        <Tab.Screen 
          name="Posts" 
          component={PostsStack} 
          options={{ 
            title: '📝 Bài viết',
            tabBarLabel: 'Bài viết',
            headerShown: false
          }} 
        />
        <Tab.Screen 
          name="Friends" 
          component={FriendsStack} 
          options={{ 
            title: '👥 Bạn bè',
            tabBarLabel: 'Bạn bè',
            headerShown: false
          }} 
        />
        <Tab.Screen 
          name="Countdown" 
          component={CountdownScreen} 
          options={{ 
            title: '⏰ Đếm ngược',
            tabBarLabel: 'Đếm ngược'
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
