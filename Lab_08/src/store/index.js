import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import contactReducer from './slices/contactSlice';
import bookingReducer from './slices/bookingSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    contacts: contactReducer,
    bookings: bookingReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
