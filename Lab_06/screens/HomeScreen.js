import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const quickActions = [
    {
      id: 1,
      title: 'Danh sách yêu thích',
      subtitle: 'Xem phòng đã lưu',
      icon: 'heart',
      color: '#DC3545',
      screen: 'Favorites'
    },
    {
      id: 2,
      title: 'Lịch sử đặt phòng',
      subtitle: 'Xem các booking đã thực hiện',
      icon: 'time',
      color: '#FFC107',
      screen: 'History'
    },
    {
      id: 3,
      title: 'Cartoon Collection',
      subtitle: 'Bộ sưu tập phim hoạt hình',
      icon: 'film',
      color: '#6C5CE7',
      screen: 'Cartoon'
    },
    {
      id: 4,
      title: 'Flexbox Practice',
      subtitle: 'Thực hành các thuộc tính Flexbox',
      icon: 'cube',
      color: '#28A745',
      screen: 'Flexbox'
    }
  ];

  const renderQuickAction = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.actionCard, { borderLeftColor: item.color }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={[styles.actionIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color="white" />
      </View>
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{item.title}</Text>
        <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trang Chủ</Text>
        <Text style={styles.headerSubtext}>Hotel Booking App</Text>
      </View>
      
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeCard}>
          <Ionicons name="home" size={40} color="#007bff" />
          <Text style={styles.welcomeText}>Chào mừng đến với Hotel Booking App!</Text>
          <Text style={styles.descText}>
            Khám phá các tính năng quản lý đặt phòng, danh sách yêu thích, 
            và trải nghiệm ứng dụng với giao diện hiện đại.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Truy cập nhanh</Text>
        <View style={styles.actionsContainer}>
          {quickActions.map(renderQuickAction)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tính năng nổi bật</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Ionicons name="phone-portrait" size={30} color="#007bff" />
            <Text style={styles.featureTitle}>Responsive Design</Text>
            <Text style={styles.featureDesc}>Giao diện thích ứng mọi thiết bị</Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="save" size={30} color="#28A745" />
            <Text style={styles.featureTitle}>AsyncStorage</Text>
            <Text style={styles.featureDesc}>Lưu trữ dữ liệu cục bộ an toàn</Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="menu" size={30} color="#6C5CE7" />
            <Text style={styles.featureTitle}>Drawer Navigation</Text>
            <Text style={styles.featureDesc}>Điều hướng dễ dàng và trực quan</Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="heart" size={30} color="#DC3545" />
            <Text style={styles.featureTitle}>Favorites System</Text>
            <Text style={styles.featureDesc}>Quản lý danh sách yêu thích</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Thông tin ứng dụng</Text>
          <Text style={styles.infoText}>• Được xây dựng với React Native và Expo</Text>
          <Text style={styles.infoText}>• Sử dụng AsyncStorage để lưu trữ dữ liệu</Text>
          <Text style={styles.infoText}>• Responsive design với Flexbox</Text>
          <Text style={styles.infoText}>• Drawer navigation với custom styling</Text>
          <Text style={styles.infoText}>• Icons từ Expo Vector Icons</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtext: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 5,
  },
  welcomeSection: {
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 6,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  descText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  actionsContainer: {
    gap: 10,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: (width - 60) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default HomeScreen;
