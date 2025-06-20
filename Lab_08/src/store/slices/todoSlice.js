import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk để fetch todos từ JSONPlaceholder API
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    console.log('Kết nối thành công!');
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const data = await response.json();
    return data;
  }
);

// Async thunk để thêm todo mới
export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (todoData) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    const data = await response.json();
    return data;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        ...action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
