import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear JWT token from AsyncStorage
              await AsyncStorage.removeItem('jwtToken');
              await AsyncStorage.removeItem('userInfo');
              
              Alert.alert('Thành công', 'Đã đăng xuất thành công!');
              // In a real app, you would navigate to login screen
              // navigation.navigate('Login');
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng xuất');
            }
          },
        },
      ]
    );
  };

  const handleClearAllData = async () => {
    Alert.alert(
      'Xóa dữ liệu',
      'Bạn có chắc chắn muốn xóa toàn bộ dữ liệu không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Thành công', 'Đã xóa toàn bộ dữ liệu!');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa dữ liệu');
            }
          },
        },
      ]
    );
  };

  const simulateLogin = async () => {
    try {
      // Simulate JWT token
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const mockUserInfo = {
        id: '123',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        loginTime: new Date().toISOString()
      };

      await AsyncStorage.setItem('jwtToken', mockToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      
      Alert.alert('Thành công', 'Đã mô phỏng đăng nhập thành công!');
    } catch (error) {
      console.error('Error simulating login:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi mô phỏng đăng nhập');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Đăng Xuất</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="log-out-outline" size={80} color="#DC3545" />
        </View>
        
        <Text style={styles.title}>Quản lý phiên đăng nhập</Text>
        <Text style={styles.subtitle}>
          Quản lý thông tin đăng nhập và dữ liệu ứng dụng
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={simulateLogin}>
            <Ionicons name="log-in" size={20} color="white" />
            <Text style={styles.loginButtonText}>Mô phỏng đăng nhập</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="white" />
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAllData}>
            <Ionicons name="trash" size={20} color="white" />
            <Text style={styles.clearButtonText}>Xóa toàn bộ dữ liệu</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Thông tin AsyncStorage:</Text>
          <Text style={styles.infoText}>• JWT Token được lưu trữ an toàn</Text>
          <Text style={styles.infoText}>• Thông tin người dùng được mã hóa</Text>
          <Text style={styles.infoText}>• Dữ liệu được đồng bộ tự động</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#DC3545',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#28A745',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#6C757D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 40,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default LogoutScreen;
