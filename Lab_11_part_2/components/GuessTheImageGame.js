import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Vibration,
} from 'react-native';

import { gameData, generateLetterPool } from '../data/gameData';
import LetterButton from './LetterButton';
import AnswerDisplay from './AnswerDisplay';
import Timer from './Timer';
import GameOverModal from './GameOverModal';

const GuessTheImageGame = ({ onBackToMenu }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [letterPool, setLetterPool] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const currentQuestion = gameData[currentQuestionIndex];

  // Khởi tạo trò chơi
  useEffect(() => {
    initializeGame();
  }, [currentQuestionIndex]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleGameOver(false);
    }
  }, [timeLeft, gameState]);

  const initializeGame = () => {
    const newLetterPool = generateLetterPool(currentQuestion.answer);
    setLetterPool(newLetterPool);
    setCurrentGuess([]);
    setSelectedLetters([]);
    setTimeLeft(15);
    setGameState('playing');
  };

  const handleLetterPress = (letter) => {
    if (selectedLetters.includes(letter) || gameState !== 'playing') return;

    const newGuess = [...currentGuess, letter];
    const newSelectedLetters = [...selectedLetters, letter];

    setCurrentGuess(newGuess);
    setSelectedLetters(newSelectedLetters);

    // Kiểm tra nếu đã hoàn thành từ
    if (newGuess.length === currentQuestion.answer.length) {
      const guessedWord = newGuess.join('');
      if (guessedWord === currentQuestion.answer) {
        handleGameOver(true);
      } else {
        // Sai rồi, cho phép xóa và thử lại
        setTimeout(() => {
          Vibration.vibrate(200);
          Alert.alert(
            'Sai rồi!', 
            'Hãy thử lại nhé!',
            [
              {
                text: 'OK',
                onPress: () => {
                  setCurrentGuess([]);
                  setSelectedLetters([]);
                }
              }
            ]
          );
        }, 500);
      }
    }
  };

  const handleGameOver = (isWin) => {
    setGameState(isWin ? 'won' : 'lost');
    if (isWin) {
      setScore(score + 10 + timeLeft); // Điểm thưởng dựa trên thời gian còn lại
      Vibration.vibrate([100, 200, 100]);
    } else {
      Vibration.vibrate(500);
    }
    setShowModal(true);
  };

  const handlePlayAgain = () => {
    setShowModal(false);
    if (gameState === 'won' && currentQuestionIndex < gameData.length - 1) {
      // Chuyển sang câu hỏi tiếp theo
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Chơi lại câu hỏi hiện tại
      initializeGame();
    }
  };

  const handleNewGame = () => {
    setShowModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    initializeGame();
  };

  const handleReset = () => {
    setCurrentGuess([]);
    setSelectedLetters([]);
  };

  const handleHint = () => {
    if (score >= 5) {
      setScore(score - 5);
      Alert.alert('Gợi ý', currentQuestion.hint);
    } else {
      Alert.alert('Không đủ điểm', 'Bạn cần ít nhất 5 điểm để sử dụng gợi ý!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Text style={styles.backButtonText}>← Menu</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🎯 Nhìn Hình Đoán Chữ</Text>
        <Text style={styles.scoreText}>Điểm: {score}</Text>
      </View>

      <Timer timeLeft={timeLeft} />

      <View style={styles.imageContainer}>
        <Text style={styles.imageEmoji}>{currentQuestion.image}</Text>
        <Text style={styles.questionNumber}>
          Câu {currentQuestionIndex + 1}/{gameData.length}
        </Text>
      </View>

      <AnswerDisplay 
        currentGuess={currentGuess} 
        correctAnswer={currentQuestion.answer} 
      />

      <View style={styles.letterGrid}>
        {letterPool.map((letter, index) => (
          <LetterButton
            key={`${letter}-${index}`}
            letter={letter}
            onPress={handleLetterPress}
            isSelected={selectedLetters.includes(letter)}
          />
        ))}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleReset}>
          <Text style={styles.actionButtonText}>🔄 Xóa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleHint}>
          <Text style={styles.actionButtonText}>💡 Gợi ý (-5đ)</Text>
        </TouchableOpacity>
      </View>

      <GameOverModal
        visible={showModal}
        isWin={gameState === 'won'}
        score={score}
        correctAnswer={currentQuestion.answer}
        onPlayAgain={handlePlayAgain}
        onNewGame={handleNewGame}
      />
    </SafeAreaView>
  );
};

export default GuessTheImageGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    backgroundColor: '#95A5A6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E67E22',
    backgroundColor: '#FEF9E7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageEmoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  letterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#34495E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
