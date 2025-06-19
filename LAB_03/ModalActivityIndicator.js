import React, { useState, useEffect } from 'react'; // Nhập React để sử dụng, useState, useEffect
import { View, Text, Button, Modal, ActivityIndicator, StyleSheet, Alert, BackHandler } from 'react-native';
// Nhập các thành phần cần thiết từ React Native

const ModalActivityIndicator = () => {
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái cho modal
  const [loading, setLoading] = useState(false); // Trạng thái cho ActivityIndicator

  const handleActivityIndicator = () => {
    setLoading(true); // Hiển thị
    setModalVisible(true); // Hiển thị modal
  };

  const setTimeOut = () => {
    setLoading(false); // Ẩn thì tải
    // Thông đóng modal khi đóng
    Alert.alert(
      "Thông báo", // Tiêu đề thông báo
      "Đây là modal hiển thị sau 3 giây",
      [
        {
          text: "OK",
          onPress: hideModal, // Đóng modal sau khi nhấn OK
        },
      ]
    );
  };

  const hideModal = () => {
    setModalVisible(false); // Ẩn modal
  };

  // Hiến sử dụng useEffect để back
  const handleBackPress = () => {
    if (modalVisible) {
      hideModal(); // Đóng modal khi nhấn nút back
      return true; // Chặn hành động back mặc định
    }
    return false; // Cho phép back mặc định nếu không có modal
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress); // Lắng nghe sự kiện back
    return () => backHandler.remove(); // Gỡ bỏ lắng nghe khi component unmount
  }, []);

  // hiển hoạt động bất đồng bộ với timeout 3 giây
  useEffect(() => {
    if (loading) {
      const timeOut = setTimeout(() => {
        setTimeOut(); // Gọi hàm hideModal sau 3 giây
      }, 3000); // 3000ms = 3 giây
      return () => clearTimeout(timeOut); // Gỡ bỏ timeout khi component unmount
    }
  }, [loading]);  return (
    <View style={styles.container}>
      <Button title="Mở Modal" onPress={handleActivityIndicator} />
      
      <Modal
        animationType="slide" // Kiểu hoạt ảnh khi mở modal
        transparent={true} // Để modal có nền trong suốt
        visible={modalVisible} // Hiển thị hiện thị modal
        onRequestClose={hideModal} // Đóng modal khi nhấn nút quay lại (Android)
      >
        <View style={styles.modalView}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" /> // Hiển thị ActivityIndicator
          ) : (
            <Text style={styles.modalText}>Modal đã hiển thị sau 3 giây!</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

//Các kiểu dáng cho thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiến toàn bộ không gian
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  modalView: {
    flex: 1, // Chiến toàn bộ không gian modal
    justifyContent: 'center', // Căn giữa nội dung modal
    alignItems: 'center', // Căn giữa nội dung modal
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền tối với độ trong suốt
  },
  modalText: {
    fontSize: 18, // Kích thước font
    color: 'white', // Màu chữ trắng
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Nền đen với độ trong suốt
    padding: 20, // Khoảng cách nội dung
    borderRadius: 10, // Bo góc
  },
});

// Xuất thành phần chính
export default ModalActivityIndicator;
