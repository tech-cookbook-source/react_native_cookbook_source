import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  IconButton,
  Dialog,
  Portal,
  TextInput,
  ActivityIndicator,
  Snackbar,
  Surface,
  Chip,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeDatabase,
  loadBookings,
  addBookingToDb,
  deleteBookingFromDb,
  resetDatabase,
} from '../store/slices/bookingSlice';

export default function BookingScreen() {
  const dispatch = useDispatch();
  const { items: bookings, loading, error } = useSelector(state => state.bookings);
  
  const [dialogVisible, setDialogVisible] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  useEffect(() => {
    // Initialize database and load bookings with error handling
    const initializeAndLoad = async () => {
      try {
        await dispatch(initializeDatabase()).unwrap();
        await dispatch(loadBookings()).unwrap();
      } catch (error) {
        console.error('Failed to initialize database:', error);
        showSnackbar('Lỗi khởi tạo database: ' + error.message);
        
        // Try to reset and reinitialize
        try {
          await dispatch(resetDatabase()).unwrap();
          await dispatch(initializeDatabase()).unwrap();
          await dispatch(loadBookings()).unwrap();
          showSnackbar('Đã khởi tạo lại database thành công!');
        } catch (resetError) {
          console.error('Failed to reset database:', resetError);
          showSnackbar('Không thể khởi tạo database');
        }
      }
    };

    initializeAndLoad();
  }, [dispatch]);

  const resetForm = () => {
    setBookingForm({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
    });
  };

  const handleAddBooking = () => {
    if (bookingForm.title.trim() && bookingForm.date.trim() && 
        bookingForm.time.trim() && bookingForm.location.trim()) {
      
      const newBooking = {
        ...bookingForm,
        title: bookingForm.title.trim(),
        location: bookingForm.location.trim(),
        description: bookingForm.description.trim(),
      };

      dispatch(addBookingToDb(newBooking))
        .then(() => {
          showSnackbar('Đã thêm lịch hẹn mới!');
          resetForm();
          setDialogVisible(false);
        })
        .catch((error) => {
          showSnackbar('Lỗi: ' + error.message);
        });
    } else {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc');
    }
  };

  const handleDeleteBooking = (id) => {
    Alert.alert(
      'Xóa lịch hẹn',
      'Bạn có chắc chắn muốn xóa lịch hẹn này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteBookingFromDb(id))
              .then(() => {
                showSnackbar('Đã xóa lịch hẹn!');
              })
              .catch((error) => {
                showSnackbar('Lỗi: ' + error.message);
              });
          },
        },
      ]
    );
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString;
  };

  const isUpcoming = (date, time) => {
    const bookingDateTime = new Date(`${date}T${time}`);
    return bookingDateTime > new Date();
  };

  const renderBookingItem = ({ item }) => {
    const upcoming = isUpcoming(item.date, item.time);
    
    return (
      <Card style={[
        styles.bookingCard,
        upcoming ? styles.upcomingCard : styles.pastCard
      ]} elevation={2}>
        <Card.Content>
          <View style={styles.bookingHeader}>
            <View style={styles.bookingInfo}>
              <Title style={styles.bookingTitle}>{item.title}</Title>
              <View style={styles.bookingDetails}>
                <Chip 
                  style={[styles.statusChip, upcoming ? styles.upcomingChip : styles.pastChip]}
                  textStyle={styles.statusChipText}
                  icon={upcoming ? "clock" : "check"}
                >
                  {upcoming ? 'Sắp tới' : 'Đã qua'}
                </Chip>
              </View>
            </View>
            <IconButton
              icon="delete"
              size={24}
              iconColor="#e53e3e"
              onPress={() => handleDeleteBooking(item.id)}
            />
          </View>
          
          <View style={styles.bookingMeta}>
            <View style={styles.metaRow}>
              <IconButton icon="calendar" size={20} iconColor="#666" />
              <Paragraph style={styles.metaText}>
                {formatDate(item.date)}
              </Paragraph>
            </View>
            <View style={styles.metaRow}>
              <IconButton icon="clock" size={20} iconColor="#666" />
              <Paragraph style={styles.metaText}>
                {formatTime(item.time)}
              </Paragraph>
            </View>
            <View style={styles.metaRow}>
              <IconButton icon="map-marker" size={20} iconColor="#666" />
              <Paragraph style={styles.metaText}>
                {item.location}
              </Paragraph>
            </View>
          </View>

          {item.description && (
            <View style={styles.descriptionContainer}>
              <Paragraph style={styles.description}>
                {item.description}
              </Paragraph>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Paragraph style={styles.loadingText}>Đang tải lịch hẹn...</Paragraph>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={1}>
        <Title style={styles.headerTitle}>
          Quản lý lịch hẹn ({bookings.length})
        </Title>
        <Button
          mode="outlined"
          onPress={() => dispatch(loadBookings())}
          icon="refresh"
          style={styles.refreshButton}
        >
          Tải lại
        </Button>
      </Surface>

      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Paragraph style={styles.emptyText}>
            Chưa có lịch hẹn nào. Thêm lịch hẹn đầu tiên!
          </Paragraph>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          resetForm();
          setDialogVisible(true);
        }}
        label="Đặt lịch"
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Thêm lịch hẹn mới</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={styles.dialogContent}>
              <TextInput
                label="Tiêu đề *"
                value={bookingForm.title}
                onChangeText={(text) => setBookingForm({...bookingForm, title: text})}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Ngày (YYYY-MM-DD) *"
                value={bookingForm.date}
                onChangeText={(text) => setBookingForm({...bookingForm, date: text})}
                mode="outlined"
                placeholder="2024-12-25"
                style={styles.input}
              />
              <TextInput
                label="Thời gian (HH:MM) *"
                value={bookingForm.time}
                onChangeText={(text) => setBookingForm({...bookingForm, time: text})}
                mode="outlined"
                placeholder="14:30"
                style={styles.input}
              />
              <TextInput
                label="Địa điểm *"
                value={bookingForm.location}
                onChangeText={(text) => setBookingForm({...bookingForm, location: text})}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Mô tả"
                value={bookingForm.description}
                onChangeText={(text) => setBookingForm({...bookingForm, description: text})}
                mode="outlined"
                multiline
                numberOfLines={3}
                style={styles.input}
              />
            </ScrollView>
          </Dialog.Content>          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>
              <Text>Hủy</Text>
            </Button>
            <Button mode="contained" onPress={handleAddBooking}>
              <Text>Thêm</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  refreshButton: {
    borderColor: '#6200ee',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  bookingCard: {
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  upcomingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  pastCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#9e9e9e',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  upcomingChip: {
    backgroundColor: '#e8f5e8',
  },
  pastChip: {
    backgroundColor: '#f5f5f5',
  },
  statusChipText: {
    fontSize: 12,
    color: '#666',
  },
  bookingMeta: {
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  descriptionContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
  dialogContent: {
    maxHeight: 400,
  },
  input: {
    marginBottom: 12,
  },
});
