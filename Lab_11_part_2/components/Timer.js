import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ timeLeft, totalTime = 15 }) => {
  const percentage = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 5;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.timeText, isUrgent && styles.urgentText]}>
        Thời gian: {timeLeft}s
      </Text>
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar,
            { width: `${percentage}%` },
            isUrgent && styles.urgentProgressBar
          ]} 
        />
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  urgentText: {
    color: '#E74C3C',
    fontSize: 22,
  },
  progressBarContainer: {
    width: 200,
    height: 8,
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498DB',
    borderRadius: 4,
    transition: 'width 0.5s ease',
  },
  urgentProgressBar: {
    backgroundColor: '#E74C3C',
  },
});
