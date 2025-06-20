import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    connected: false,
    connectionStatus: 'disconnected', // disconnected, connecting, connected
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
      state.connected = action.payload === 'connected';
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
  },
});

export const { addMessage, setConnectionStatus, clearMessages, setTyping } = chatSlice.actions;
export default chatSlice.reducer;
