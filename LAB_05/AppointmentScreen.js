// Các thư viện xuất hiện ở trên đầu trang và các thư viện kiến trúc chính
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import TodoScreen from './TodoScreen';
import AppointmentLogic from './AppointmentLogic';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react'

const AppointmentScreen = () => {
    const {
        appointments,
        date,
        isDatePickerVisible,
        handleConfirm,
        showDatePicker,
        appointmentText,
        setAppointmentText,
        editAppointment,
        deleteAppointment,
        setDatePickerVisibility
    } = AppointmentLogic();
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch Hẹn</Text>

            <TextInput
                style={styles.input}
                value={appointmentText}
                onChangeText={setAppointmentText}
                placeholder='Nội dung lịch hẹn'
            />

            <Button title='Chọn ngày/giờ' onPress={() => setDatePickerVisibility(true)} />

            <DateTimePickerModal 
                isVisible={isDatePickerVisible}
                mode='datetime'
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />

            <Text style={styles.dateText}>Ngày/giờ đã chọn: {date.toString()}</Text>
            
            <FlatList 
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.appointmentItem}>
                        <Text>{item.date.toString()}: {item.text}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title='Sửa' style={styles.button} onPress={() => editAppointment(item)}/>
                            <Button title='Xóa' style={styles.button} onPress={() => deleteAppointment(item.id)}/>
                        </View>
                    </View>
                )}
            />
            
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    dateText: {
        marginTop: 20,
        fontSize: 16
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        padding: 10
    },
    appointmentItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9c2ff',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    button: {
        backgroundColor: 'red'
    }

})

export default AppointmentScreen;