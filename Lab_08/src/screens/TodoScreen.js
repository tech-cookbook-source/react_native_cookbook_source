import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
  Checkbox,
  IconButton,
  Dialog,
  Portal,
  TextInput,
  ActivityIndicator,
  Snackbar,
  Surface,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  addTodoAsync,
} from '../store/slices/todoSlice';

export default function TodoScreen() {
  const dispatch = useDispatch();
  const { items: todos, loading, error } = useSelector(state => state.todos);
  
  const [dialogVisible, setDialogVisible] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (todoTitle.trim()) {
      const newTodo = {
        title: todoTitle.trim(),
        userId: 1,
      };
      
      dispatch(addTodoAsync(newTodo));
      setTodoTitle('');
      setTodoDescription('');
      setDialogVisible(false);
      showSnackbar('Đã thêm công việc mới!');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
    showSnackbar('Đã cập nhật trạng thái!');
  };

  const handleDeleteTodo = (id) => {
    Alert.alert(
      'Xóa công việc',
      'Bạn có chắc chắn muốn xóa công việc này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteTodo(id));
            showSnackbar('Đã xóa công việc!');
          },
        },
      ]
    );
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const onRefresh = () => {
    dispatch(fetchTodos());
  };

  const renderTodoItem = ({ item }) => (
    <Card style={styles.todoCard} elevation={2}>
      <Card.Content>
        <View style={styles.todoRow}>
          <View style={styles.todoContent}>
            <Checkbox
              status={item.completed ? 'checked' : 'unchecked'}
              onPress={() => handleToggleTodo(item.id)}
              color="#6200ee"
            />
            <View style={styles.todoText}>
              <Title 
                style={[
                  styles.todoTitle,
                  item.completed && styles.completedText
                ]}
                numberOfLines={2}
              >
                {item.title}
              </Title>
              <Paragraph style={styles.todoId}>ID: {item.id}</Paragraph>
            </View>
          </View>
          <IconButton
            icon="delete"
            size={24}
            iconColor="#e53e3e"
            onPress={() => handleDeleteTodo(item.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  if (loading && todos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Paragraph style={styles.loadingText}>Đang tải dữ liệu...</Paragraph>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={1}>
        <Title style={styles.headerTitle}>
          Quản lý công việc ({todos.length})
        </Title>
        <Button
          mode="outlined"
          onPress={onRefresh}
          loading={loading}
          icon="refresh"
          style={styles.refreshButton}
        >
          Tải lại
        </Button>
      </Surface>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setDialogVisible(true)}
        label="Thêm"
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Thêm công việc mới</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Tiêu đề công việc"
              value={todoTitle}
              onChangeText={setTodoTitle}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Mô tả (tùy chọn)"
              value={todoDescription}
              onChangeText={setTodoDescription}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </Dialog.Content>          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>
              <Text>Hủy</Text>
            </Button>
            <Button mode="contained" onPress={handleAddTodo}>
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
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  todoCard: {
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    flex: 1,
    marginLeft: 8,
  },
  todoTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  todoId: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
  input: {
    marginBottom: 12,
  },
});
