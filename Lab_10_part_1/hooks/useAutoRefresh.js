import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { APP_CONFIG } from '../constants';

export const useAutoRefresh = (refreshCallback, interval = APP_CONFIG.REFRESH_INTERVAL) => {
  const intervalRef = useRef(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App came to foreground, refresh data
        refreshCallback();
      }
      appState.current = nextAppState;
    };

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Set up interval for auto refresh
    const startInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(refreshCallback, interval);
    };

    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Start auto refresh when app is active
    if (AppState.currentState === 'active') {
      startInterval();
    }

    // Cleanup
    return () => {
      subscription?.remove();
      stopInterval();
    };
  }, [refreshCallback, interval]);

  return {
    startAutoRefresh: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(refreshCallback, interval);
    },
    stopAutoRefresh: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };
};
