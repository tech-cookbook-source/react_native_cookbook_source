import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Cấu hình notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const notificationService = {
  async requestPermissions() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Notification permissions not granted');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  },

  async sendLocalNotification(title, body, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  },

  async sendNetworkStatusNotification(isConnected) {
    const title = isConnected ? 'Kết nối mạng' : 'Mất kết nối mạng';
    const body = isConnected 
      ? 'Kết nối internet đã được khôi phục' 
      : 'Không thể kết nối internet. Vui lòng kiểm tra kết nối mạng.';
    
    await this.sendLocalNotification(title, body, { type: 'network_status', isConnected });
  },

  async sendWeatherUpdateNotification(location, temperature, condition) {
    const title = `Thời tiết ${location}`;
    const body = `${temperature}°C - ${condition}`;
    
    await this.sendLocalNotification(title, body, { 
      type: 'weather_update', 
      location, 
      temperature, 
      condition 
    });
  },

  async sendErrorNotification(message) {
    await this.sendLocalNotification(
      'Lỗi ứng dụng thời tiết', 
      message, 
      { type: 'error' }
    );
  }
};
