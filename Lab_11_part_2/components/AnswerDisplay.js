import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnswerDisplay = ({ currentGuess, correctAnswer }) => {
  const renderAnswerSlots = () => {
    return correctAnswer.split('').map((letter, index) => {
      const guessedLetter = currentGuess[index] || '';
      const isCorrect = guessedLetter === letter;
      
      return (
        <View 
          key={index} 
          style={[
            styles.letterSlot,
            guessedLetter && styles.filledSlot,
            isCorrect && styles.correctSlot
          ]}
        >
          <Text style={[
            styles.slotText,
            isCorrect && styles.correctText
          ]}>
            {guessedLetter}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Câu trả lời:</Text>
      <View style={styles.answerRow}>
        {renderAnswerSlots()}
      </View>
    </View>
  );
};

export default AnswerDisplay;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  answerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterSlot: {
    width: 35,
    height: 40,
    borderWidth: 2,
    borderColor: '#BDC3C7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    backgroundColor: '#FFFFFF',
  },
  filledSlot: {
    borderColor: '#3498DB',
    backgroundColor: '#EBF4FD',
  },
  correctSlot: {
    borderColor: '#27AE60',
    backgroundColor: '#D5FDDB',
  },
  slotText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  correctText: {
    color: '#27AE60',
  },
});
