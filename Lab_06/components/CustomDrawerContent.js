import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const { state, navigation } = props;  const menuItems = [
    {
      name: 'Home',
      label: 'Trang Chủ',
      icon: 'home',
      color: '#007bff',
    },
    {
      name: 'Favorites',
      label: 'Danh Sách Ưa Thích',
      icon: 'heart',
      color: '#DC3545',
    },
    {
      name: 'History',
      label: 'Lịch Sử Đặt Phòng',
      icon: 'time',
      color: '#FFC107',
    },
    {
      name: 'Cartoon',
      label: 'Cartoon Collection',
      icon: 'film',
      color: '#6C5CE7',
    },
    {
      name: 'Flexbox',
      label: 'Flexbox Practice',
      icon: 'cube',
      color: '#28A745',
    },
    {
      name: 'Logout',
      label: 'Đăng Xuất',
      icon: 'log-out',
      color: '#6C757D',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="white" />
          </View>
          <Text style={styles.userName}>Nguyễn Văn A</Text>
          <Text style={styles.userEmail}>nguyenvana@example.com</Text>
        </View>
      </View>
      
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const isActive = state.index === index;
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.menuItem,
                  isActive && styles.activeMenuItem,
                  { borderLeftColor: item.color }
                ]}
                onPress={() => navigation.navigate(item.name)}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <Ionicons 
                    name={item.icon} 
                    size={20} 
                    color="white"
                  />
                </View>
                <Text style={[
                  styles.menuText,
                  isActive && styles.activeMenuText
                ]}>
                  {item.label}
                </Text>
                {isActive && (
                  <View style={styles.activeIndicator}>
                    <Ionicons name="chevron-forward" size={16} color={item.color} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Hotel Booking App</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50', // Dark blue-gray background
  },
  header: {
    backgroundColor: '#34495E', // Slightly lighter header
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#BDC3C7',
  },
  scrollContent: {
    flexGrow: 1,
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  activeMenuItem: {
    backgroundColor: '#34495E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#ECF0F1',
    flex: 1,
  },
  activeMenuText: {
    color: 'white',
    fontWeight: '600',
  },
  activeIndicator: {
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#34495E',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#BDC3C7',
    fontWeight: '600',
  },
  versionText: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 5,
  },
});

export default CustomDrawerContent;
