import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SQLite from 'expo-sqlite';

// Initialize database with the new API
const db = SQLite.openDatabaseSync('bookings.db');

// Initialize database
export const initializeDatabase = createAsyncThunk(
  'bookings/initializeDatabase',
  async () => {
    try {
      // Drop the table if it exists and recreate it to ensure proper schema
      await db.execAsync(`DROP TABLE IF EXISTS bookings;`);
      
      await db.execAsync(`
        CREATE TABLE bookings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          date TEXT NOT NULL,
          time TEXT NOT NULL,
          location TEXT NOT NULL,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Database initialized successfully');
      console.log('Kết nối thành công!'); // Connection success message for database
      return { success: true };
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }
);

// Load bookings from SQLite
export const loadBookings = createAsyncThunk(
  'bookings/loadBookings',
  async () => {
    try {
      // First check if table exists
      const tableExists = await db.getFirstAsync(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='bookings'"
      );
      
      if (!tableExists) {
        console.log('Table does not exist, returning empty array');
        return [];
      }

      // Check table structure for debugging
      const tableInfo = await db.getAllAsync("PRAGMA table_info(bookings)");
      console.log('Table structure:', tableInfo);

      const result = await db.getAllAsync('SELECT * FROM bookings ORDER BY created_at DESC');
      console.log('Loaded bookings:', result);
      return result || [];
    } catch (error) {
      console.error('Error loading bookings:', error);
      // If there's still an error, try to reinitialize the database
      return [];
    }
  }
);

// Add booking to SQLite
export const addBookingToDb = createAsyncThunk(
  'bookings/addBookingToDb',
  async (booking) => {
    try {
      const result = await db.runAsync(
        'INSERT INTO bookings (title, date, time, location, description) VALUES (?, ?, ?, ?, ?)',
        [booking.title, booking.date, booking.time, booking.location, booking.description]
      );
      return { id: result.lastInsertRowId, ...booking };
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  }
);

// Delete booking from SQLite
export const deleteBookingFromDb = createAsyncThunk(
  'bookings/deleteBookingFromDb',
  async (id) => {
    try {
      await db.runAsync('DELETE FROM bookings WHERE id = ?', [id]);
      return id;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
);

// Reset database (for debugging purposes)
export const resetDatabase = createAsyncThunk(
  'bookings/resetDatabase',
  async () => {
    try {
      await db.execAsync(`DROP TABLE IF EXISTS bookings;`);
      console.log('Database reset successfully');
      return { success: true };
    } catch (error) {
      console.error('Database reset error:', error);
      throw error;
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },  extraReducers: (builder) => {
    builder
      .addCase(initializeDatabase.fulfilled, (state) => {
        console.log('Database ready');
      })
      .addCase(resetDatabase.fulfilled, (state) => {
        console.log('Database reset');
        state.items = [];
      })
      .addCase(loadBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBookingToDb.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteBookingFromDb.fulfilled, (state, action) => {
        state.items = state.items.filter(booking => booking.id !== action.payload);
      });
  },
});

export const { clearError } = bookingSlice.actions;
export default bookingSlice.reducer;
