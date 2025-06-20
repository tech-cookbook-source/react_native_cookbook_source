import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const WeatherDisplay = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Đang tải thông tin thời tiết...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
        <Text style={styles.errorSubText}>
          Vui lòng kiểm tra kết nối mạng và thử lại
        </Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDataText}>Không có dữ liệu thời tiết</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header thông tin chính */}
      <View style={styles.mainInfo}>
        <Text style={styles.locationText}>
          {weatherData.location}, {weatherData.country}
        </Text>
        <View style={styles.tempContainer}>
          <Text style={styles.temperature}>{Math.round(weatherData.temperature)}°</Text>
          <Image 
            source={{ uri: `https:${weatherData.icon}` }}
            style={styles.weatherIcon}
          />
        </View>
        <Text style={styles.condition}>{weatherData.condition}</Text>
        <Text style={styles.feelsLike}>
          Cảm giác như {Math.round(weatherData.feelsLike)}°C
        </Text>
      </View>

      {/* Thông tin chi tiết */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Chi tiết thời tiết</Text>
        
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>💧 Độ ẩm</Text>
            <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>💨 Tốc độ gió</Text>
            <Text style={styles.detailValue}>{weatherData.windSpeed} km/h</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>☀️ Chỉ số UV</Text>
            <Text style={styles.detailValue}>{weatherData.uv}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>👁️ Tầm nhìn</Text>
            <Text style={styles.detailValue}>{weatherData.visibility} km</Text>
          </View>
        </View>
      </View>

      {/* Thời gian cập nhật */}
      <View style={styles.updateInfo}>
        <Text style={styles.updateText}>
          Cập nhật lần cuối: {new Date(weatherData.lastUpdated).toLocaleString('vi-VN')}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ff6b6b',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorSubText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
  },
  noDataText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: '#ffffff',
    marginRight: 10,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  condition: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  feelsLike: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  updateInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  updateText: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.6,
  },
});

export default WeatherDisplay;
