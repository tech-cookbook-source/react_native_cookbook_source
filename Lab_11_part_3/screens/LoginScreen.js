import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const logo = require('../assets/icon.png'); // Use your logo or icon

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  
  const { login } = useAuth();
  const fillAdminCredentials = () => {
    setEmail('admin@admin.com');
    setPassword('admin123');
  };

  const fillUserCredentials = () => {
    setEmail('user@example.com');
    setPassword('user123');
  };

  const fillExampleData = () => {
    setName('Nguyen Van A');
    setEmail('example@gmail.com');
    setPassword('123456');
  };

  const handleLogin = async () => {    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      await login(response.data.token, response.data.user);
    } catch (error) {
      console.log('Login error:', error);
      let errorMessage = 'Email hoặc mật khẩu không chính xác';
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = 'Email hoặc mật khẩu không chính xác';
        } else if (error.response.status === 500) {
          errorMessage = 'Lỗi server, vui lòng thử lại sau';
        }
      } else if (error.request) {
        errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng';
      }
      
      Alert.alert('Lỗi đăng nhập', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    setLoading(true);
    try {
      const response = await authAPI.register(name, email, password);
      await login(response.data.token, response.data.user);
    } catch (error) {
      console.log('Register error:', error);
      console.log('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        request: error.request ? 'Request made but no response' : 'No request made'
      });
      
      let errorMessage = 'Có lỗi xảy ra khi đăng ký';
        if (error.response) {
        console.log('Server error response:', error.response.data);
        if (error.response.status === 400) {
          errorMessage = error.response.data?.error || 'Email đã được sử dụng';
        } else if (error.response.status === 500) {
          errorMessage = 'Lỗi server, vui lòng thử lại sau';
        } else {
          const statusCode = String(error.response.status || '');
          const errorText = String(error.response.data?.error || 'Không xác định');
          errorMessage = 'Lỗi server (' + statusCode + '): ' + errorText;
        }      } else if (error.request) {
        console.log('Network error - no response received');
        errorMessage = 'Không thể kết nối đến server.\n\nVui lòng kiểm tra:\n- API server đã chạy chưa?\n- Kết nối mạng\n- URL API có đúng không?';
      } else {
        console.log('Other error:', error.message);
        const errorText = String(error.message || 'Không xác định');
        errorMessage = 'Lỗi không xác định: ' + errorText;
      }
      
      Alert.alert('Lỗi đăng ký', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const buttonScale = new Animated.Value(1);
  const animateIn = () => Animated.spring(buttonScale, { toValue: 0.96, useNativeDriver: true }).start();
  const animateOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <LinearGradient
      colors={['#6dd5ed', '#2193b0']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>
              {isRegister ? 'Đăng Ký' : 'Đăng Nhập'}
            </Text>
            <Text style={styles.subtitle}>
              Hệ thống quản lý bài viết
            </Text>
            {isRegister && (
              <TextInput
                style={styles.input}
                placeholder="Họ và tên"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholderTextColor="#aaa"
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#aaa"
            />
            {!isRegister && (
              <View style={styles.quickFillRow}>
                <TouchableOpacity
                  style={styles.quickFillButton}
                  onPress={fillAdminCredentials}
                >
                  <Text style={styles.quickFillText}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickFillButton}
                  onPress={fillUserCredentials}
                >
                  <Text style={styles.quickFillText}>User</Text>
                </TouchableOpacity>
              </View>
            )}
            {isRegister && (
              <View style={styles.quickFillRow}>
                <TouchableOpacity
                  style={styles.quickFillButton}
                  onPress={fillExampleData}
                >
                  <Text style={styles.quickFillText}>Điền dữ liệu mẫu</Text>
                </TouchableOpacity>
              </View>
            )}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={isRegister ? handleRegister : handleLogin}
                disabled={loading}
                activeOpacity={0.8}
                onPressIn={animateIn}
                onPressOut={animateOut}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Đang xử lý...' : (isRegister ? 'Đăng Ký' : 'Đăng Nhập')}
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsRegister(!isRegister)}
            >
              <Text style={styles.switchText}>
                {isRegister ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
              </Text>
            </TouchableOpacity>
            <View style={styles.demoInfoCard}>
              <Text style={styles.demoTextTitle}>Tài khoản demo:</Text>
              <Text style={styles.demoText}>Admin: admin@admin.com / admin123</Text>
              <Text style={styles.demoText}>User: user@example.com / 123456</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    margin: 20,
    padding: 30,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f7fbfc',
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#2193b0',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#2193b0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#b0bec5',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  switchButton: {
    marginTop: 20,
    padding: 10,
  },
  switchText: {
    color: '#2193b0',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  quickFillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quickFillButton: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#90caf9',
    marginHorizontal: 5,
    flex: 1,
  },
  quickFillText: {
    color: '#1976d2',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  demoInfoCard: {
    marginTop: 30,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  demoTextTitle: {
    fontWeight: 'bold',
    color: '#2193b0',
    fontSize: 15,
    marginBottom: 6,
  },
  demoText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 5,
    fontSize: 14,
  },
});

export default LoginScreen;
