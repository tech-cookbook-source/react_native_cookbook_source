import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';
import { GradientCard, Card, Button } from '../components/UI';

const { width } = Dimensions.get('window');

export default function AnimationScreen() {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Animation functions
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const resetFade = () => {
    fadeAnim.setValue(0);
  };

  const scaleUp = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.5,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const resetScale = () => {
    scaleAnim.setValue(1);
  };

  const translateRight = () => {
    Animated.timing(translateAnim, {
      toValue: width - 200, // Move to right edge minus square width
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const resetTranslate = () => {
    translateAnim.setValue(0);
  };

  const rotate = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const runAllAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetAll = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(1);
    translateAnim.setValue(0);
    rotateAnim.setValue(0);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <GradientCard style={styles.headerCard}>
        <View style={styles.headerContent}>
          <Ionicons name="play-circle" size={40} color="white" />
          <Text style={styles.headerTitle}>Animation Playground</Text>
          <Text style={styles.headerSubtitle}>Explore smooth animations and transitions</Text>
        </View>
      </GradientCard>
      
      {/* Animation Demo Area */}
      <Card style={styles.animationCard} elevated>
        <Text style={styles.sectionTitle}>🎭 Animation Demo</Text>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.animatedShape,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateX: translateAnim },
                  { rotate: spin },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={theme.colors.gradient.accent}
              style={styles.gradientShape}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="star" size={30} color="white" />
            </LinearGradient>
          </Animated.View>
        </View>
      </Card>

      {/* Control Buttons */}
      <Card style={styles.controlsCard}>
        <Text style={styles.sectionTitle}>🎮 Animation Controls</Text>
        
        {/* Individual Controls */}
        <View style={styles.controlSection}>
          <Text style={styles.controlGroupTitle}>Individual Animations</Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.controlButton, styles.fadeButton]} onPress={fadeIn}>
              <Ionicons name="eye" size={18} color="white" />
              <Text style={styles.buttonText}>Fade In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetFade}>
              <Ionicons name="refresh" size={18} color="white" />
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.controlButton, styles.scaleButton]} onPress={scaleUp}>
              <Ionicons name="expand" size={18} color="white" />
              <Text style={styles.buttonText}>Scale Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetScale}>
              <Ionicons name="refresh" size={18} color="white" />
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.controlButton, styles.translateButton]} onPress={translateRight}>
              <Ionicons name="arrow-forward" size={18} color="white" />
              <Text style={styles.buttonText}>Move Right</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetTranslate}>
              <Ionicons name="refresh" size={18} color="white" />
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.controlButton, styles.rotateButton]} onPress={rotate}>
              <Ionicons name="sync" size={18} color="white" />
              <Text style={styles.buttonText}>Rotate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetAll}>
              <Ionicons name="refresh-circle" size={18} color="white" />
              <Text style={styles.buttonText}>Reset All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Combined Controls */}
        <View style={styles.controlSection}>
          <Text style={styles.controlGroupTitle}>Combined Animations</Text>
          <TouchableOpacity style={[styles.controlButton, styles.combinedButton, styles.fullWidth]} onPress={runAllAnimations}>
            <Ionicons name="play" size={20} color="white" />
            <Text style={styles.buttonText}>🚀 Run All Animations</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  
  animationCard: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  
  animationContainer: {
    height: 200,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  
  animatedShape: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
  },
  
  gradientShape: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  controlsCard: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xxl,
  },
  
  controlSection: {
    marginBottom: theme.spacing.lg,
  },
  
  controlGroupTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  
  controlButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  
  fullWidth: {
    flex: 1,
  },
  
  fadeButton: {
    backgroundColor: theme.colors.info,
  },
  
  scaleButton: {
    backgroundColor: theme.colors.secondary,
  },
  
  translateButton: {
    backgroundColor: theme.colors.accent,
  },
  
  rotateButton: {
    backgroundColor: theme.colors.primary,
  },
  
  resetButton: {
    backgroundColor: theme.colors.text.tertiary,
  },
  
  combinedButton: {
    backgroundColor: theme.colors.primaryDark,
    paddingVertical: theme.spacing.lg,
  },
  
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    marginLeft: theme.spacing.xs,
  },
});
