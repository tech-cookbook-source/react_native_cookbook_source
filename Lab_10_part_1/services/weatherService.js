import { API_CONFIG, ERROR_MESSAGES, APP_CONFIG } from '../constants';

const logDebug = (message, data = null) => {
  if (APP_CONFIG.DEBUG_MODE) {
    console.log(`[WeatherService] ${message}`, data || '');
  }
};

const logError = (message, error = null) => {
  console.error(`[WeatherService] ${message}`, error || '');
};

export const weatherService = {
  async getCurrentWeather(city) {
    try {
      logDebug('Fetching current weather for:', city);
      
      if (!API_CONFIG.WEATHER_API_KEY || API_CONFIG.WEATHER_API_KEY === 'your_api_key_here') {
        throw new Error('Weather API key not configured. Please set EXPO_PUBLIC_WEATHER_API_KEY in .env file');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const url = `${API_CONFIG.BASE_URL}/current.json?key=${API_CONFIG.WEATHER_API_KEY}&q=${city}&aqi=no`;
      logDebug('API URL:', url.replace(API_CONFIG.WEATHER_API_KEY, '***'));

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(ERROR_MESSAGES.INVALID_API_KEY);
        } else if (response.status === 400) {
          throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
        } else {
          throw new Error(`${ERROR_MESSAGES.API_ERROR}: ${response.status}`);
        }
      }
      
      const data = await response.json();
      logDebug('Weather data received:', data.location?.name);
      
      return {
        success: true,
        data: {
          location: data.location.name,
          country: data.location.country,
          region: data.location.region,
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          windDirection: data.current.wind_dir,
          feelsLike: data.current.feelslike_c,
          uv: data.current.uv,
          visibility: data.current.vis_km,
          pressure: data.current.pressure_mb,
          cloudCover: data.current.cloud,
          lastUpdated: data.current.last_updated,
          isDay: data.current.is_day === 1,
        }
      };
    } catch (error) {
      logError('Weather API Error:', error);
      
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: ERROR_MESSAGES.TIMEOUT
        };
      }
      
      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNKNOWN
      };
    }
  },
  async getForecast(city, days = 5) {
    try {
      logDebug('Fetching forecast for:', `${city} (${days} days)`);
      
      if (!API_CONFIG.WEATHER_API_KEY || API_CONFIG.WEATHER_API_KEY === 'your_api_key_here') {
        throw new Error('Weather API key not configured. Please set EXPO_PUBLIC_WEATHER_API_KEY in .env file');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const url = `${API_CONFIG.BASE_URL}/forecast.json?key=${API_CONFIG.WEATHER_API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`;
      logDebug('Forecast API URL:', url.replace(API_CONFIG.WEATHER_API_KEY, '***'));

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(ERROR_MESSAGES.INVALID_API_KEY);
        } else if (response.status === 400) {
          throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
        } else {
          throw new Error(`${ERROR_MESSAGES.API_ERROR}: ${response.status}`);
        }
      }
      
      const data = await response.json();
      logDebug('Forecast data received for:', data.location?.name);
      
      return {
        success: true,
        data: data.forecast.forecastday.map(day => ({
          date: day.date,
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          avgTemp: day.day.avgtemp_c,
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
          chanceOfRain: day.day.daily_chance_of_rain,
          humidity: day.day.avghumidity,
          windSpeed: day.day.maxwind_kph,
          uv: day.day.uv,
        }))
      };
    } catch (error) {
      logError('Forecast API Error:', error);
      
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: ERROR_MESSAGES.TIMEOUT
        };
      }
      
      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNKNOWN
      };
    }
  }
};
