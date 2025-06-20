import { API_CONFIG } from '../constants';

export const validateApiKey = () => {
  if (!API_CONFIG.WEATHER_API_KEY) {
    return {
      isValid: false,
      message: 'API key is not configured. Please set EXPO_PUBLIC_WEATHER_API_KEY in your .env file.'
    };
  }

  if (API_CONFIG.WEATHER_API_KEY === 'your_api_key_here') {
    return {
      isValid: false,
      message: 'Please replace the placeholder API key with your actual WeatherAPI key in the .env file.'
    };
  }

  // Basic format validation (WeatherAPI keys are typically 32 characters)
  if (API_CONFIG.WEATHER_API_KEY.length < 10) {
    return {
      isValid: false,
      message: 'API key appears to be too short. Please check your WeatherAPI key.'
    };
  }

  return {
    isValid: true,
    message: 'API key is configured correctly.'
  };
};

export const formatTemperature = (temp, unit = 'C') => {
  if (temp === null || temp === undefined) return 'N/A';
  return `${Math.round(temp)}°${unit}`;
};

export const formatDateTime = (dateTimeString) => {
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateTimeString;
  }
};

export const getWeatherIcon = (condition, isDay) => {
  const conditionLower = condition?.toLowerCase() || '';
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return isDay ? '☀️' : '🌙';
  } else if (conditionLower.includes('cloud')) {
    return '☁️';
  } else if (conditionLower.includes('rain')) {
    return '🌧️';
  } else if (conditionLower.includes('snow')) {
    return '❄️';
  } else if (conditionLower.includes('thunder')) {
    return '⛈️';
  } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return '🌫️';
  }
  
  return '🌤️'; // default
};

export const getAirQualityColor = (uvIndex) => {
  if (uvIndex <= 2) return '#4CAF50'; // Green - Low
  if (uvIndex <= 5) return '#FFEB3B'; // Yellow - Moderate
  if (uvIndex <= 7) return '#FF9800'; // Orange - High
  if (uvIndex <= 10) return '#F44336'; // Red - Very High
  return '#9C27B0'; // Purple - Extreme
};

export const getWindDirection = (degrees) => {
  const directions = [
    'Bắc', 'Đông Bắc', 'Đông', 'Đông Nam',
    'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'
  ];
  
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};
