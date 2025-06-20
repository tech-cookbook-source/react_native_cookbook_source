import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store } from './src/store';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
    </Provider>
  );
}
