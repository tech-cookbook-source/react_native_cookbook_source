import React, { useState } from 'react'; // Nhập React và useState
import { View, Text, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native'; // Nhập các thành phần cần thiết từ React Native

const StatusBarRefresh = () => {
    const [refreshing, setRefreshing] = useState(false); // Trạng thái cho refresh action
    const [statusBarColor, setStatusBarColor] = useState('#0000'); // Trạng thái cho màu statusbar

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false); // Kết thúc refresh
            // Thay đổi màu StatusBar
            setStatusBarColor(prevColor => prevColor === '#0000' ? '#ff6347' : '#0000'); // Đổi màu
        }, 2000);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Kết nối RefreshControl
            }
            style={styles.container}
        >
            <StatusBar backgroundColor={statusBarColor} barStyle="light-content" /> 
            <Text style={styles.title}>Kéo xuống để thay đổi màu StatusBar</Text>
            <Text style={styles.paragraph}>Nội dung vị trí...</Text>
        </ScrollView>
    );
};

// Các kiểu dáng cho thành phần
const styles = StyleSheet.create({
    container: {
        flex: 1, // Chiếm toàn bộ không gian
        padding: 20, // Khoảng cách bên trong cho container
    },
    header: {
        fontSize: 24, // Kích thước chữ cho tiêu đề
        marginBottom: 20, // Khoảng cách bên dưới cho tiêu đề
    },
    paragraph: {
        fontSize: 16, // Kích thước chữ cho đoạn văn
    },
});

// Xuất thành phần chính
export default StatusBarRefresh;
