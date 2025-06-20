import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('unknown');
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    // Lấy trạng thái mạng hiện tại
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
      setIsInternetReachable(state.isInternetReachable);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return {
    isConnected,
    connectionType,
    isInternetReachable,
    hasInternetConnection: isConnected && isInternetReachable
  };
};
