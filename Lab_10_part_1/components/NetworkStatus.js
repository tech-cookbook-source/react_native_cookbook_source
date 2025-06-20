import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const NetworkStatus = () => {
  const { isConnected, connectionType, hasInternetConnection } = useNetworkStatus();

  if (hasInternetConnection) {
    return null; // Không hiển thị gì khi kết nối bình thường
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {!isConnected 
          ? '❌ Không có kết nối mạng' 
          : '⚠️ Kết nối mạng không ổn định'
        }
      </Text>
      <Text style={styles.subText}>
        Loại kết nối: {connectionType}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});

export default NetworkStatus;
