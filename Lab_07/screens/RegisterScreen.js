import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  HelperText
} from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register, loading } = useAuth();

  // Example data for quick testing
  const exampleData = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    password: '123456',
    confirmPassword: '123456',
    phone: '+1234567890',
    dateOfBirth: '1990-05-15',
    address: '123 Main Street, New York, NY 10001'
  };
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Fill form with example data
  const fillExampleData = () => {
    setFormData(exampleData);
    setErrors({}); // Clear any existing errors
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    const { confirmPassword, ...registrationData } = formData;
    
    // Clean up the data
    const cleanData = {
      fullName: registrationData.fullName.trim(),
      email: registrationData.email.trim().toLowerCase(),
      password: registrationData.password,
      phone: registrationData.phone.trim() || undefined,
      address: registrationData.address.trim() || undefined,
      dateOfBirth: registrationData.dateOfBirth || undefined
    };
    
    const result = await register(cleanData);
    
    if (!result.success) {
      Alert.alert(
        'Registration Failed', 
        result.message,
        [{ text: 'OK' }]
      );
      
      // Set server validation errors if any
      if (result.errors) {
        const serverErrors = {};
        result.errors.forEach(error => {
          if (error.includes('email')) serverErrors.email = error;
          if (error.includes('password')) serverErrors.password = error;
          if (error.includes('name')) serverErrors.fullName = error;
        });
        setErrors(serverErrors);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Create Account</Title>
            <Paragraph style={styles.subtitle}>
              Join us today! Please fill in the details below
            </Paragraph>
            
            {/* Example Data Button */}
            <View style={styles.exampleButtonContainer}>
              <Button
                mode="outlined"
                onPress={fillExampleData}
                style={styles.exampleButton}
                icon="account-plus"
                compact
              >
                Fill Example Data
              </Button>
            </View>
            
            <View style={styles.form}>
              <TextInput
                mode="outlined"
                label="Full Name *"
                value={formData.fullName}
                onChangeText={(value) => updateFormData('fullName', value)}
                autoCapitalize="words"
                autoComplete="name"
                error={!!errors.fullName}
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
              />
              <HelperText type="error" visible={!!errors.fullName}>
                {errors.fullName}
              </HelperText>

              <TextInput
                mode="outlined"
                label="Email *"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={!!errors.email}
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />
              <HelperText type="error" visible={!!errors.email}>
                {errors.email}
              </HelperText>

              <TextInput
                mode="outlined"
                label="Password *"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry={!showPassword}
                autoComplete="password-new"
                error={!!errors.password}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              <HelperText type="error" visible={!!errors.password}>
                {errors.password}
              </HelperText>

              <TextInput
                mode="outlined"
                label="Confirm Password *"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoComplete="password-new"
                error={!!errors.confirmPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock-check" />}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
              />
              <HelperText type="error" visible={!!errors.confirmPassword}>
                {errors.confirmPassword}
              </HelperText>

              <TextInput
                mode="outlined"
                label="Phone Number"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
                autoComplete="tel"
                error={!!errors.phone}
                style={styles.input}
                left={<TextInput.Icon icon="phone" />}
              />
              <HelperText type="error" visible={!!errors.phone}>
                {errors.phone}
              </HelperText>              <TextInput
                mode="outlined"
                label="Date of Birth (YYYY-MM-DD)"
                value={formData.dateOfBirth}
                onChangeText={(value) => updateFormData('dateOfBirth', value)}
                placeholder="1990-05-15"
                style={styles.input}
                left={<TextInput.Icon icon="calendar" />}
              />              <HelperText type="info" visible={!formData.dateOfBirth}>
                Optional: Enter your date of birth (e.g., 1990-05-15)
              </HelperText>

              <TextInput
                mode="outlined"
                label="Address"
                value={formData.address}
                onChangeText={(value) => updateFormData('address', value)}
                multiline
                numberOfLines={2}
                style={styles.input}
                left={<TextInput.Icon icon="map-marker" />}
              />
              <HelperText type="info" visible={!formData.address}>
                Optional: Enter your full address
              </HelperText>
            </View>

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Create Account
            </Button>

            <Divider style={styles.divider} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('Login')}
                style={styles.linkButton}
              >
                Sign In
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 40,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 4,
  },
  button: {
    marginBottom: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },  linkButton: {
    marginLeft: 8,
  },
  exampleButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  exampleButton: {
    borderColor: '#6200ee',
    borderWidth: 1,
  },
});

export default RegisterScreen;
