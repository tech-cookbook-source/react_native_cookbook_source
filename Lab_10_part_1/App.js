import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  RefreshControl, 
  ScrollView,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';

import NetworkStatus from './components/NetworkStatus';
import WeatherDisplay from './components/WeatherDisplay';
import CitySelector from './components/CitySelector';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import { weatherService } from './services/weatherService';
import { notificationService } from './services/notificationService';
import { APP_CONFIG, COLORS } from './constants';
import { validateApiKey } from './utils';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(APP_CONFIG.DEFAULT_CITY);
  const [refreshing, setRefreshing] = useState(false);
  
  const { hasInternetConnection, isConnected } = useNetworkStatus();
  const previousConnectionStatus = useRef(hasInternetConnection);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Auto refresh hook
  const { startAutoRefresh, stopAutoRefresh } = useAutoRefresh(() => {
    if (hasInternetConnection && selectedCity) {
      loadWeatherData();
    }
  });

  // Khởi tạo notifications và validate API key
  useEffect(() => {
    const initializeApp = async () => {
      // Validate API key
      const apiValidation = validateApiKey();
      if (!apiValidation.isValid) {
        setError(apiValidation.message);
        Alert.alert(
          'Cấu hình API Key',
          apiValidation.message + '\n\nVui lòng kiểm tra file .env và khởi động lại ứng dụng.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Initialize notifications
      await notificationService.requestPermissions();
    };
    
    initializeApp();

    // Listener cho notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Theo dõi thay đổi kết nối mạng
  useEffect(() => {
    if (previousConnectionStatus.current !== hasInternetConnection) {
      if (!hasInternetConnection && previousConnectionStatus.current) {
        // Mất kết nối
        notificationService.sendNetworkStatusNotification(false);
        setError('Mất kết nối internet. Vui lòng kiểm tra kết nối mạng.');
      } else if (hasInternetConnection && !previousConnectionStatus.current) {
        // Khôi phục kết nối
        notificationService.sendNetworkStatusNotification(true);
        setError(null);
        // Tự động tải lại dữ liệu khi có kết nối
        loadWeatherData();
      }
      previousConnectionStatus.current = hasInternetConnection;
    }
  }, [hasInternetConnection]);

  // Tải dữ liệu thời tiết khi khởi động và khi thay đổi thành phố
  useEffect(() => {
    if (selectedCity && hasInternetConnection) {
      loadWeatherData();
      startAutoRefresh();
    } else {
      stopAutoRefresh();
    }
  }, [selectedCity, hasInternetConnection]);

  const loadWeatherData = async () => {
    if (!hasInternetConnection) {
      setError('Không có kết nối internet');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await weatherService.getCurrentWeather(selectedCity.value);
      
      if (result.success) {
        setWeatherData(result.data);
        // Gửi notification cập nhật thời tiết
        await notificationService.sendWeatherUpdateNotification(
          result.data.location,
          result.data.temperature,
          result.data.condition
        );
      } else {
        const errorMessage = `Không thể tải dữ liệu thời tiết: ${result.error}`;
        setError(errorMessage);
        await notificationService.sendErrorNotification(errorMessage);
      }
    } catch (err) {
      const errorMessage = `Lỗi không xác định: ${err.message}`;
      setError(errorMessage);
      await notificationService.sendErrorNotification(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeatherData();
    setRefreshing(false);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleRetry = () => {
    if (!hasInternetConnection) {
      Alert.alert(
        'Không có kết nối internet',
        'Vui lòng kiểm tra kết nối mạng và thử lại.',
        [{ text: 'OK' }]
      );
      return;
    }
    loadWeatherData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={COLORS.PRIMARY_GRADIENT}
        style={styles.gradient}
      >
        <NetworkStatus />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#ffffff"
              colors={['#ffffff']}
            />
          }
        >
          <View style={styles.header}>
            <Text style={styles.appTitle}>🌤️ Thời Tiết Hôm Nay</Text>
            <CitySelector 
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />
          </View>

          <WeatherDisplay
            weatherData={weatherData}
            loading={loading}
            error={error}
          />

          {error && (
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>🔄 Thử lại</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
