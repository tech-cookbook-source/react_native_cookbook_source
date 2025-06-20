import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CONTACTS_STORAGE_KEY = '@contacts';

// Async thunk để load contacts từ AsyncStorage
export const loadContacts = createAsyncThunk(
  'contacts/loadContacts',
  async () => {
    try {
      const contacts = await AsyncStorage.getItem(CONTACTS_STORAGE_KEY);
      return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
      console.error('Error loading contacts:', error);
      return [];
    }
  }
);

// Async thunk để save contacts vào AsyncStorage
export const saveContacts = createAsyncThunk(
  'contacts/saveContacts',
  async (contacts) => {
    try {
      await AsyncStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
      return contacts;
    } catch (error) {
      console.error('Error saving contacts:', error);
      throw error;
    }
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      const newContact = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newContact);
    },
    updateContact: (state, action) => {
      const index = state.items.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(contact => contact.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addContact, updateContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
