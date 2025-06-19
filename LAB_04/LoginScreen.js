// src/components/LoginScreen.js
import React, { useState } from 'react'; // Nhập React và useState
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Button } from 'react-native'; // Nhập các thành phần cần thiết từ React Native

const LoginScreen = () => {
    const [username, setUsername] = useState(''); // Trạng thái cho tên email
    const [password, setPassword] = useState(''); // Trạng thái cho mật khẩu
    const [showPassword, setShowPassword] = useState(false); // Trạng thái cho việc hiển thị mật khẩu

    const handleLogin = () => {
        // Ở đây kiểm tra
        alert(`Tên đăng nhập: ${username}\nMật khẩu: ${password}`);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.header}>Đăng Nhập</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={username}
                onChangeText={setUsername} // Cập nhật trạng thái khi có input mới
            />
            
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword} // Cập nhật trạng thái khi có input mới
                secureTextEntry={!showPassword} // Ẩn/hiện mật khẩu theo khi có input mới
            />
            
            <Button title={showPassword ? "Ẩn Mật Khẩu" : "Hiện Mật Khẩu"} onPress={() => setShowPassword(!showPassword)} />
            <Button title="Đăng Nhập" onPress={handleLogin} /> 
        </KeyboardAvoidingView>
    );
};

// Các kiểu dáng cho thành phần
const styles = StyleSheet.create({
    container: {
        flex: 1, // Chiếm toàn bộ không gian
        justifyContent: 'center', // Căn giữa theo chiều dọc
        padding: 20, // Khoảng cách bên trong cho container
    },
    header: {
        fontSize: 24, // Kích thước chữ cho tiêu đề
        marginBottom: 20, // Khoảng cách bên dưới cho tiêu đề
    },
    input: {
        borderWidth: 1, // Đường viền cho TextInput
        borderColor: '#ccc', // Màu đường viền
        borderRadius: 5, // Bo viền goc
        padding: 10, // Khoảng cách trong cho TextInput
        marginBottom: 10, // Khoảng cách dưới cho TextInput
        fontSize: 16, // Kích thước chữ trong TextInput
    },
});

// Xuất thành phần chính
export default LoginScreen;
