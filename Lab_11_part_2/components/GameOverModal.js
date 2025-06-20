import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const GameOverModal = ({ 
  visible, 
  isWin, 
  score, 
  correctAnswer, 
  onPlayAgain, 
  onNewGame 
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={[
            styles.title,
            isWin ? styles.winTitle : styles.loseTitle
          ]}>
            {isWin ? '🎉 Chúc mừng!' : '⏰ Hết thời gian!'}
          </Text>
          
          <Text style={styles.scoreText}>
            Điểm số: {score}
          </Text>
          
          {!isWin && (
            <Text style={styles.answerText}>
              Đáp án: {correctAnswer}
            </Text>
          )}
          
          <Text style={styles.message}>
            {isWin 
              ? 'Bạn đã đoán đúng! Tiếp tục chơi?' 
              : 'Đừng lo lắng! Hãy thử lại nhé!'
            }
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.playAgainButton]}
              onPress={onPlayAgain}
            >
              <Text style={styles.buttonText}>
                {isWin ? 'Tiếp tục' : 'Thử lại'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.newGameButton]}
              onPress={onNewGame}
            >
              <Text style={styles.buttonText}>Trò chơi mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GameOverModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  winTitle: {
    color: '#27AE60',
  },
  loseTitle: {
    color: '#E74C3C',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  answerText: {
    fontSize: 18,
    color: '#3498DB',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  playAgainButton: {
    backgroundColor: '#3498DB',
  },
  newGameButton: {
    backgroundColor: '#95A5A6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
