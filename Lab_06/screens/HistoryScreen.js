import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const HistoryScreen = () => {
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    loadBookingHistory();
  }, []);

  const loadBookingHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('bookingHistory');
      if (storedHistory) {
        setBookingHistory(JSON.parse(storedHistory));
      } else {
        // Demo data
        const demoHistory = [
          {
            id: '1',
            roomName: 'Phòng Deluxe Ocean View',
            checkIn: '2024-01-15',
            checkOut: '2024-01-18',
            status: 'Hoàn thành',
            totalPrice: '7,500,000 VND',
            nights: 3
          },
          {
            id: '2',
            roomName: 'Phòng Suite Presidential',
            checkIn: '2024-02-20',
            checkOut: '2024-02-22',
            status: 'Đã hủy',
            totalPrice: '10,000,000 VND',
            nights: 2
          },
          {
            id: '3',
            roomName: 'Phòng Standard Garden View',
            checkIn: '2024-03-10',
            checkOut: '2024-03-15',
            status: 'Hoàn thành',
            totalPrice: '6,000,000 VND',
            nights: 5
          },
          {
            id: '4',
            roomName: 'Phòng Deluxe City View',
            checkIn: '2024-04-01',
            checkOut: '2024-04-03',
            status: 'Sắp tới',
            totalPrice: '4,000,000 VND',
            nights: 2
          },
        ];
        setBookingHistory(demoHistory);
        await AsyncStorage.setItem('bookingHistory', JSON.stringify(demoHistory));
      }
    } catch (error) {
      console.error('Error loading booking history:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoàn thành':
        return '#28A745';
      case 'Đã hủy':
        return '#DC3545';
      case 'Sắp tới':
        return '#007BFF';
      default:
        return '#6C757D';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Hoàn thành':
        return 'checkmark-circle';
      case 'Đã hủy':
        return 'close-circle';
      case 'Sắp tới':
        return 'time';
      default:
        return 'help-circle';
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.roomName}>{item.roomName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons name={getStatusIcon(item.status)} size={14} color="white" />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.itemDetails}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar" size={16} color="#666" />
          <Text style={styles.dateText}>
            {item.checkIn} - {item.checkOut} ({item.nights} đêm)
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Ionicons name="card" size={16} color="#666" />
          <Text style={styles.priceText}>{item.totalPrice}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lịch Sử Đặt Phòng</Text>
      </View>
      
      {bookingHistory.length > 0 ? (
        <FlatList
          data={bookingHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Chưa có lịch sử đặt phòng</Text>
          <Text style={styles.emptySubText}>Lịch sử đặt phòng sẽ hiển thị ở đây</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#FFC107',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 15,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  itemDetails: {
    marginTop: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HistoryScreen;
