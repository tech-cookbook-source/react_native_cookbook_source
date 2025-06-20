// Constants for the Weather App
export const API_CONFIG = {
  WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY || 'your_api_key_here',
  BASE_URL: 'https://api.weatherapi.com/v1',
  TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT) || 10000, // 10 seconds timeout
};

export const APP_CONFIG = {
  DEFAULT_CITY: {
    id: '1',
    name: 'Hà Nội',
    value: process.env.EXPO_PUBLIC_DEFAULT_CITY || 'Hanoi'
  },
  REFRESH_INTERVAL: parseInt(process.env.EXPO_PUBLIC_REFRESH_INTERVAL) || 300000, // 5 minutes in milliseconds
  NOTIFICATION_DELAY: 1000, // 1 second delay for notifications
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME || 'Ứng Dụng Thời Tiết',
  DEBUG_MODE: process.env.EXPO_PUBLIC_DEBUG_MODE === 'true',
};

export const COLORS = {
  PRIMARY_GRADIENT: ['#4c669f', '#3b5998', '#192f6a'],
  SECONDARY_GRADIENT: ['#667eea', '#764ba2'],
  WHITE: '#ffffff',
  BLACK: '#000000',
  TRANSPARENT_WHITE: 'rgba(255, 255, 255, 0.1)',
  TRANSPARENT_WHITE_LIGHT: 'rgba(255, 255, 255, 0.2)',
  TRANSPARENT_WHITE_DARK: 'rgba(255, 255, 255, 0.3)',
  ERROR: '#ff6b6b',
  SUCCESS: '#51cf66',
  WARNING: '#ffd43b',
};

export const VIETNAMESE_CITIES = [
  { id: '1', name: 'Hà Nội', value: 'Hanoi' },
  { id: '2', name: 'TP. Hồ Chí Minh', value: 'Ho Chi Minh City' },
  { id: '3', name: 'Đà Nẵng', value: 'Da Nang' },
  { id: '4', name: 'Hải Phòng', value: 'Hai Phong' },
  { id: '5', name: 'Cần Thơ', value: 'Can Tho' },
  { id: '6', name: 'Nha Trang', value: 'Nha Trang' },
  { id: '7', name: 'Huế', value: 'Hue' },
  { id: '8', name: 'Vũng Tàu', value: 'Vung Tau' },
  { id: '9', name: 'Quy Nhon', value: 'Quy Nhon' },
  { id: '10', name: 'Đà Lạt', value: 'Dalat' },
  { id: '11', name: 'Biên Hòa', value: 'Bien Hoa' },
  { id: '12', name: 'Thủ Dầu Một', value: 'Thu Dau Mot' },
  { id: '13', name: 'Long Xuyên', value: 'Long Xuyen' },
  { id: '14', name: 'Tuy Hòa', value: 'Tuy Hoa' },
  { id: '15', name: 'Pleiku', value: 'Pleiku' },
];

export const NOTIFICATION_TYPES = {
  NETWORK_STATUS: 'network_status',
  WEATHER_UPDATE: 'weather_update',
  ERROR: 'error',
  GENERAL: 'general',
};

export const NETWORK_TYPES = {
  WIFI: 'wifi',
  CELLULAR: 'cellular',
  ETHERNET: 'ethernet',
  BLUETOOTH: 'bluetooth',
  NONE: 'none',
  UNKNOWN: 'unknown',
};

export const ERROR_MESSAGES = {
  NO_INTERNET: 'Không có kết nối internet',
  API_ERROR: 'Lỗi khi gọi API thời tiết',
  TIMEOUT: 'Quá thời gian chờ phản hồi',
  UNKNOWN: 'Lỗi không xác định',
  PERMISSION_DENIED: 'Không có quyền truy cập',
  INVALID_API_KEY: 'API key không hợp lệ',
  CITY_NOT_FOUND: 'Không tìm thấy thành phố',
};
