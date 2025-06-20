// TodoScreen là file chính React
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const TodoScreen = () => {
    const [todos, setTodos] = useState([]); // State để lưu trữ danh sách todo
    const [newTodo, setNewTodo] = useState(''); // State để lưu trữ todo mới

    useEffect(() => {
        const initialTodos = [
            { id: 1, text: 'Học React Native', completed: false },
            { id: 2, text: 'Xây dựng ứng dụng Todo List', completed: false },
        ];
        setTodos(initialTodos);
    }, []);

    // Hàm để thêm todo mới vào danh sách
    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const newTodoItem = {
                id: todos.length + 1, text: newTodo, completed: false
            };
            setTodos([...todos, newTodoItem]); // Cập nhật danh sách todo với todo mới
            setNewTodo(''); // Xóa nội dung ô input
        }
    };

    // Hàm để chuyển đổi trạng thái hoàn thành của todo
    const toggleTodoComplete = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo // Cập nhật trạng thái completed
        );
        setTodos(updatedTodos); // Cập nhật danh sách todo với trạng thái mới
    };

    // Hàm để xóa todo khỏi danh sách
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id); // Lọc các todo có id khác với id cần xóa
        setTodos(updatedTodos); // Cập nhật danh sách todo sau khi xóa
    };    return (
        <View style={styles.containeer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newTodo}
                    onChangeText={setNewTodo}
                    placeholder="Nhập công việc mới"
                />
                <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                    <Text style={styles.addButtonText}>Thêm</Text>
                </TouchableOpacity>
            </View>            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity onPress={() => toggleTodoComplete(item.id)}>
                            <Text style={[styles.todoText, item.completed && styles.completedText]}>
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                            <Text style={styles.deleteButton}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    todoText: {
        fontSize: 16,
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    deleteButton: {
        color: '#ff0000',
        fontWeight: 'bold',
    },
});

export default TodoScreen;
