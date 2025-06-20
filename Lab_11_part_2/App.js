import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import InstructionScreen from './components/InstructionScreen';
import GuessTheImageGame from './components/GuessTheImageGame';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'instructions', 'game'

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleViewInstructions = () => {
    setCurrentScreen('instructions');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onStartGame={handleStartGame}
            onViewInstructions={handleViewInstructions}
          />
        );
      case 'instructions':
        return (
          <InstructionScreen
            onBack={handleBackToWelcome}
          />
        );
      case 'game':
        return (
          <GuessTheImageGame
            onBackToMenu={handleBackToWelcome}
          />
        );
      default:
        return (
          <WelcomeScreen
            onStartGame={handleStartGame}
            onViewInstructions={handleViewInstructions}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
