// src/components/StyleSheetSpinner.js
import React, { useState } from 'react'; // Nếu hàm React để tạo state
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native'; // import các thành phần từ native library

// Danh sách các màu sắc cho spinner
const StyleSheetSpinner = () => {
    const [showSpinner, setShowSpinner] = useState(false); // Hook để lấy state cho show spinner
    const [selectedColor, setSelectedColor] = useState('blue'); // Hook để lấy state cho màu sắc

    const fruits = ['apple', 'banana', 'orange', 'mango', 'pineapple', 'grapes', 'strawberry', 'blueberry']; // Tôi để cho FlatList hiển thị

    // Ham no la dieu tri cho show spinner
    const handleSearch = (text) => {
        setShowSpinner(true);
        setTimeout(() => {
            const filtered = fruits.filter((fruit) => 
                fruit.toLowerCase().includes(text.toLowerCase())
            );
            setShowSpinner(false);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fruit Selector</Text>
              <View>
                <Text>Choose a color to style the Spinner!</Text>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedColor('red');
                        handleSearch('');
                    }} 
                    style={[styles.colorButton, { backgroundColor: 'red' }]}
                >
                    <Text style={styles.colorText}>Red</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        setSelectedColor('green');
                        handleSearch('');
                    }}
                    style={[styles.colorButton, { backgroundColor: 'green' }]}
                >
                    <Text style={styles.colorText}>Green</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        setSelectedColor('blue');
                        handleSearch('');
                    }}
                    style={[styles.colorButton, { backgroundColor: 'blue' }]}
                >
                    <Text style={styles.colorText}>Blue</Text>
                </TouchableOpacity>
            </View>

            {/* Hiển thị activity indicator khi đang loading */}
            {showSpinner && (
                <ActivityIndicator 
                    size="large" 
                    color={selectedColor}
                    style={styles.spinner}
                />
            )}

            <FlatList
                data={fruits}
                keyExtractor={(item) => item} // Ở đây để tới key từ fruit
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item}</Text>
                )}
                numColumns={2} // Ở đây để hiển thị listing với 2 cột
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
    spinner: {
        marginTop: 20,
    },
    gridItem: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: '#f9c2ff',
        alignItems: 'center',
    },
});

export default StyleSheetSpinner;
