import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LetterButton = ({ letter, onPress, isSelected, isCorrect, isWrong }) => {
  return (
    <TouchableOpacity
      style={[
        styles.letterButton,
        isSelected && styles.selectedButton,
        isCorrect && styles.correctButton,
        isWrong && styles.wrongButton
      ]}
      onPress={() => onPress(letter)}
      disabled={isSelected}
    >
      <Text style={[
        styles.letterText,
        isSelected && styles.selectedText
      ]}>
        {letter}
      </Text>
    </TouchableOpacity>
  );
};

export default LetterButton;

const styles = StyleSheet.create({
  letterButton: {
    width: 45,
    height: 45,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedButton: {
    backgroundColor: '#95A5A6',
  },
  correctButton: {
    backgroundColor: '#2ECC71',
  },
  wrongButton: {
    backgroundColor: '#E74C3C',
  },
  letterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  selectedText: {
    color: '#BDC3C7',
  },
});
