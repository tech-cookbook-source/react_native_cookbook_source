import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../styles/theme';
import { Card, GradientCard } from '../components/UI';

const { width } = Dimensions.get('window');

export default function CountdownScreen() {
  const [timers, setTimers] = useState([]);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [nextId, setNextId] = useState(1);
  const intervalRefs = useRef({});

  useEffect(() => {
    // Cleanup intervals when component unmounts
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, []);
  const addTimer = () => {
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    const totalSeconds = minutes * 60 + seconds;
    
    if (totalSeconds <= 0) {
      Alert.alert('⚠️ Lỗi', 'Vui lòng nhập thời gian hợp lệ (> 0 giây)');
      return;
    }

    const newTimer = {
      id: nextId,
      initialSeconds: totalSeconds,
      remainingSeconds: totalSeconds,
      isRunning: false,
      isCompleted: false,
      createdAt: new Date().toLocaleTimeString(),
    };

    setTimers(prev => [...prev, newTimer]);
    setNextId(prev => prev + 1);
    setInputMinutes('');
    setInputSeconds('');

    // Start the timer immediately
    startTimer(newTimer.id);
  };

  const startTimer = (timerId) => {
    setTimers(prev => 
      prev.map(timer => 
        timer.id === timerId 
          ? { ...timer, isRunning: true, isCompleted: false }
          : timer
      )
    );

    // Create interval for this timer
    intervalRefs.current[timerId] = setInterval(() => {
      setTimers(prev => 
        prev.map(timer => {
          if (timer.id === timerId && timer.isRunning && timer.remainingSeconds > 0) {
            const newRemaining = timer.remainingSeconds - 1;
            if (newRemaining === 0) {
              // Timer completed
              clearInterval(intervalRefs.current[timerId]);
              delete intervalRefs.current[timerId];
                // Show completion notification
              setTimeout(() => {
                Alert.alert(
                  '🎉 Hoàn thành!',
                  `Timer #${timerId} đã kết thúc!\n\nThời gian: ${formatTime(timer.initialSeconds)}`,
                  [
                    { text: 'OK', style: 'default' },
                    { text: '🔄 Khởi động lại', onPress: () => resetTimer(timerId) }
                  ]
                );
              }, 100);

              return {
                ...timer,
                remainingSeconds: 0,
                isRunning: false,
                isCompleted: true,
              };
            }
            return { ...timer, remainingSeconds: newRemaining };
          }
          return timer;
        })
      );
    }, 1000);
  };

  const pauseTimer = (timerId) => {
    setTimers(prev => 
      prev.map(timer => 
        timer.id === timerId 
          ? { ...timer, isRunning: false }
          : timer
      )
    );

    if (intervalRefs.current[timerId]) {
      clearInterval(intervalRefs.current[timerId]);
      delete intervalRefs.current[timerId];
    }
  };

  const resetTimer = (timerId) => {
    // Clear existing interval
    if (intervalRefs.current[timerId]) {
      clearInterval(intervalRefs.current[timerId]);
      delete intervalRefs.current[timerId];
    }

    setTimers(prev => 
      prev.map(timer => 
        timer.id === timerId 
          ? { 
              ...timer, 
              remainingSeconds: timer.initialSeconds,
              isRunning: false,
              isCompleted: false 
            }
          : timer
      )
    );
  };

  const deleteTimer = (timerId) => {
    // Clear interval if exists
    if (intervalRefs.current[timerId]) {
      clearInterval(intervalRefs.current[timerId]);
      delete intervalRefs.current[timerId];
    }

    setTimers(prev => prev.filter(timer => timer.id !== timerId));
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const getTimerGradient = (timer) => {
    if (timer.isCompleted) {
      return theme.colors.gradient.secondary;
    }
    if (timer.isRunning) {
      return theme.colors.gradient.primary;
    }
    return [theme.colors.text.tertiary, theme.colors.text.secondary];
  };

  const getProgressPercentage = (timer) => {
    return ((timer.initialSeconds - timer.remainingSeconds) / timer.initialSeconds) * 100;
  };

  const renderTimer = ({ item, index }) => (
    <Card style={[styles.timerCard, { marginTop: index === 0 ? 0 : theme.spacing.md }]} elevated>
      <View style={styles.timerHeader}>
        <View style={styles.timerTitleContainer}>
          <LinearGradient
            colors={getTimerGradient(item)}
            style={styles.timerIcon}
          >
            <Ionicons 
              name={item.isCompleted ? "checkmark" : "timer"} 
              size={20} 
              color="white" 
            />
          </LinearGradient>
          <View style={styles.timerTitleText}>
            <Text style={styles.timerTitle}>Timer #{item.id}</Text>
            <Text style={styles.timerSubtitle}>Created at {item.createdAt}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTimer(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <LinearGradient
            colors={getTimerGradient(item)}
            style={[styles.progressFill, { width: `${getProgressPercentage(item)}%` }]}
          />
        </View>
      </View>
      
      {/* Timer Display */}
      <GradientCard colors={getTimerGradient(item)} style={styles.timerDisplayCard}>
        <Text style={styles.timerDisplayText}>
          {formatTime(item.remainingSeconds)}
        </Text>
        <Text style={styles.timerDisplayLabel}>
          {item.isCompleted ? '✅ Completed' : item.isRunning ? '🔄 Running' : '⏸️ Paused'}
        </Text>
      </GradientCard>
      
      <View style={styles.timerInfo}>
        <View style={styles.timerInfoItem}>
          <Ionicons name="time-outline" size={16} color={theme.colors.text.secondary} />
          <Text style={styles.timerInfoText}>Duration: {formatTime(item.initialSeconds)}</Text>
        </View>
        <View style={styles.timerInfoItem}>
          <Ionicons name="hourglass-outline" size={16} color={theme.colors.text.secondary} />
          <Text style={styles.timerInfoText}>Remaining: {formatTime(item.remainingSeconds)}</Text>
        </View>
      </View>

      {item.isCompleted && (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>🎉 Timer Completed!</Text>
        </View>
      )}

      <View style={styles.timerControls}>
        {!item.isCompleted && (
          <>
            <TouchableOpacity
              style={[
                styles.controlButton,
                styles.primaryControlButton,
                item.isRunning && styles.pauseControlButton
              ]}
              onPress={() => 
                item.isRunning ? pauseTimer(item.id) : startTimer(item.id)
              }
              activeOpacity={0.8}
            >
              <Ionicons 
                name={item.isRunning ? "pause" : "play"} 
                size={18} 
                color="white" 
              />
              <Text style={styles.controlButtonText}>
                {item.isRunning ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.controlButton, styles.secondaryControlButton]}
              onPress={() => resetTimer(item.id)}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={18} color={theme.colors.primary} />
              <Text style={[styles.controlButtonText, styles.secondaryControlButtonText]}>
                Reset
              </Text>
            </TouchableOpacity>
          </>
        )}
        
        {item.isCompleted && (
          <TouchableOpacity
            style={[styles.controlButton, styles.primaryControlButton, styles.fullWidthButton]}
            onPress={() => resetTimer(item.id)}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={18} color="white" />
            <Text style={styles.controlButtonText}>Start Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <GradientCard style={styles.headerCard}>
        <View style={styles.headerContent}>
          <Ionicons name="timer" size={40} color="white" />
          <Text style={styles.headerTitle}>Multi-Timer</Text>
          <Text style={styles.headerSubtitle}>Create and manage multiple countdown timers</Text>
        </View>
      </GradientCard>
      
      {/* Add Timer Input */}
      <Card style={styles.inputCard} elevated>
        <Text style={styles.sectionTitle}>⏰ Add New Timer</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Minutes</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              value={inputMinutes}
              onChangeText={setInputMinutes}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
          <View style={styles.inputSeparator}>
            <Text style={styles.inputSeparatorText}>:</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Seconds</Text>
            <TextInput
              style={styles.input}
              placeholder="30"
              value={inputSeconds}
              onChangeText={setInputSeconds}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTimer}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={theme.colors.gradient.primary}
            style={styles.addButtonGradient}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.addButtonText}>Create Timer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Card>

      {/* Timers Stats */}
      {timers.length > 0 && (
        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>📊 Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsItem}>
              <Text style={styles.statsNumber}>{timers.length}</Text>
              <Text style={styles.statsLabel}>Total</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={[styles.statsNumber, { color: theme.colors.primary }]}>
                {timers.filter(t => t.isRunning).length}
              </Text>
              <Text style={styles.statsLabel}>Running</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={[styles.statsNumber, { color: theme.colors.secondary }]}>
                {timers.filter(t => t.isCompleted).length}
              </Text>
              <Text style={styles.statsLabel}>Completed</Text>
            </View>
          </View>
        </Card>
      )}

      {/* Timers List */}
      <View style={styles.timersSection}>
        {timers.length === 0 ? (
          <Card style={styles.emptyCard}>
            <View style={styles.emptyContent}>
              <Ionicons name="timer-outline" size={48} color={theme.colors.text.tertiary} />
              <Text style={styles.emptyTitle}>No Timers Yet</Text>
              <Text style={styles.emptyText}>
                Create your first timer to get started!
              </Text>
            </View>
          </Card>
        ) : (
          timers.map((item, index) => (
            <View key={item.id.toString()}>
              {renderTimer({ item, index })}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  headerCard: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  
  headerContent: {
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.inverse,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  
  headerSubtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.inverse,
    opacity: 0.9,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  
  inputCard: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  
  inputGroup: {
    flex: 1,
  },
  
  inputLabel: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  
  input: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    color: theme.colors.text.primary,
  },
  
  inputSeparator: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  
  inputSeparatorText: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.secondary,
  },
  
  addButton: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  
  addButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    marginLeft: theme.spacing.sm,
  },
  
  statsCard: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  statsItem: {
    alignItems: 'center',
  },
  
  statsNumber: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
  },
  
  statsLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  
  timersSection: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xxl,
  },
  
  emptyCard: {
    padding: theme.spacing.xl,
  },
  
  emptyContent: {
    alignItems: 'center',
  },
  
  emptyTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  
  emptyText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Timer Card Styles
  timerCard: {
    marginBottom: 0,
  },
  
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  
  timerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  timerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  
  timerTitleText: {
    flex: 1,
  },
  
  timerTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
  },
  
  timerSubtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  
  deleteButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.borderLight,
  },
  
  progressContainer: {
    marginBottom: theme.spacing.md,
  },
  
  progressBackground: {
    height: 6,
    backgroundColor: theme.colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  
  timerDisplayCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  
  timerDisplayText: {
    fontSize: 36,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.inverse,
  },
  
  timerDisplayLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.inverse,
    opacity: 0.9,
    marginTop: theme.spacing.xs,
  },
  
  timerInfo: {
    marginBottom: theme.spacing.md,
  },
  
  timerInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  
  timerInfoText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
  },
  
  completedContainer: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  
  completedText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.inverse,
  },
  
  timerControls: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  
  primaryControlButton: {
    backgroundColor: theme.colors.primary,
  },
  
  pauseControlButton: {
    backgroundColor: theme.colors.warning,
  },
  
  secondaryControlButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  
  fullWidthButton: {
    flex: 1,
  },
  
  controlButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    marginLeft: theme.spacing.xs,
  },
  
  secondaryControlButtonText: {
    color: theme.colors.primary,
  },
});
