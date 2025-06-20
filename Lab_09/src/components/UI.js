import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../styles/theme';

export const GradientCard = ({ children, colors = theme.colors.gradient.primary, style = {} }) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientCard, style]}
    >
      {children}
    </LinearGradient>
  );
};

export const Card = ({ children, style = {}, elevated = false }) => {
  return (
    <View style={[
      styles.card, 
      elevated && theme.shadows.lg,
      style
    ]}>
      {children}
    </View>
  );
};

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  style = {},
  textStyle = {},
  icon = null,
  gradient = false
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${size}`]];
    
    if (disabled) {
      baseStyle.push(styles.buttonDisabled);
    } else {
      baseStyle.push(styles[`button_${variant}`]);
    }
    
    return [...baseStyle, style];
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText, styles[`buttonText_${size}`]];
    
    if (disabled) {
      baseStyle.push(styles.buttonTextDisabled);
    } else {
      baseStyle.push(styles[`buttonText_${variant}`]);
    }
    
    return [...baseStyle, textStyle];
  };

  if (gradient && !disabled) {
    return (
      <LinearGradient
        colors={theme.colors.gradient.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, styles[`button_${size}`], style]}
      >
        <Text style={[styles.buttonText, styles[`buttonText_${size}`], styles.buttonText_gradient, textStyle]}>
          {icon && <Text style={styles.buttonIcon}>{icon} </Text>}
          {title}
        </Text>
      </LinearGradient>
    );
  }

  return (
    <View style={getButtonStyle()}>
      <Text style={getTextStyle()}>
        {icon && <Text style={styles.buttonIcon}>{icon} </Text>}
        {title}
      </Text>
    </View>
  );
};

export const Badge = ({ text, variant = 'primary', style = {} }) => {
  return (
    <View style={[styles.badge, styles[`badge_${variant}`], style]}>
      <Text style={[styles.badgeText, styles[`badgeText_${variant}`]]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
  
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  
  // Button styles
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
  },
  
  button_sm: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 36,
  },
  
  button_md: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 44,
  },
  
  button_lg: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    minHeight: 52,
  },
  
  button_primary: {
    backgroundColor: theme.colors.primary,
  },
  
  button_secondary: {
    backgroundColor: theme.colors.secondary,
  },
  
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  
  button_ghost: {
    backgroundColor: 'transparent',
  },
  
  buttonDisabled: {
    backgroundColor: theme.colors.border,
  },
  
  // Button text styles
  buttonText: {
    fontWeight: theme.typography.weights.semibold,
    textAlign: 'center',
  },
  
  buttonText_sm: {
    fontSize: theme.typography.sizes.sm,
  },
  
  buttonText_md: {
    fontSize: theme.typography.sizes.md,
  },
  
  buttonText_lg: {
    fontSize: theme.typography.sizes.lg,
  },
  
  buttonText_primary: {
    color: theme.colors.text.inverse,
  },
  
  buttonText_secondary: {
    color: theme.colors.text.inverse,
  },
  
  buttonText_outline: {
    color: theme.colors.primary,
  },
  
  buttonText_ghost: {
    color: theme.colors.primary,
  },
  
  buttonText_gradient: {
    color: theme.colors.text.inverse,
  },
  
  buttonTextDisabled: {
    color: theme.colors.text.tertiary,
  },
  
  buttonIcon: {
    marginRight: theme.spacing.xs,
  },
  
  // Badge styles
  badge: {
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  badge_primary: {
    backgroundColor: theme.colors.primary,
  },
  
  badge_secondary: {
    backgroundColor: theme.colors.secondary,
  },
  
  badge_warning: {
    backgroundColor: theme.colors.warning,
  },
  
  badge_error: {
    backgroundColor: theme.colors.error,
  },
  
  badgeText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
  },
  
  badgeText_primary: {
    color: theme.colors.text.inverse,
  },
  
  badgeText_secondary: {
    color: theme.colors.text.inverse,
  },
  
  badgeText_warning: {
    color: theme.colors.text.inverse,
  },
  
  badgeText_error: {
    color: theme.colors.text.inverse,
  },
});
