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
  Avatar,
  HelperText,
  Appbar
} from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, updateProfile, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth ? 
      new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
    address: user?.address || ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.dateOfBirth) {
      const date = new Date(formData.dateOfBirth);
      const now = new Date();
      if (date > now) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    // Clean up the data
    const cleanData = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim() || undefined,
      address: formData.address.trim() || undefined,
      dateOfBirth: formData.dateOfBirth || undefined
    };
    
    const result = await updateProfile(cleanData);
    setIsSaving(false);
    
    if (result.success) {
      Alert.alert(
        'Success',
        'Profile updated successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert('Update Failed', result.message);
      
      // Set server validation errors if any
      if (result.errors) {
        const serverErrors = {};
        result.errors.forEach(error => {
          if (error.includes('name')) serverErrors.fullName = error;
          if (error.includes('phone')) serverErrors.phone = error;
        });
        setErrors(serverErrors);
      }
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Profile" />
        <Appbar.Action 
          icon="content-save" 
          onPress={handleSave}
          disabled={isSaving}
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card}>
            <Card.Content>
              {/* Avatar Section */}
              <View style={styles.avatarContainer}>
                <Avatar.Text
                  size={100}
                  label={getInitials(formData.fullName)}
                  style={styles.avatar}
                />
                <Title style={styles.emailTitle}>{user?.email}</Title>
                <Paragraph style={styles.subtitle}>
                  Update your personal information
                </Paragraph>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <TextInput
                  mode="outlined"
                  label="Full Name *"
                  value={formData.fullName}
                  onChangeText={(value) => updateFormData('fullName', value)}
                  autoCapitalize="words"
                  error={!!errors.fullName}
                  style={styles.input}
                  left={<TextInput.Icon icon="account" />}
                />
                <HelperText type="error" visible={!!errors.fullName}>
                  {errors.fullName}
                </HelperText>

                <TextInput
                  mode="outlined"
                  label="Phone Number"
                  value={formData.phone}
                  onChangeText={(value) => updateFormData('phone', value)}
                  keyboardType="phone-pad"
                  error={!!errors.phone}
                  style={styles.input}
                  left={<TextInput.Icon icon="phone" />}
                />
                <HelperText type="error" visible={!!errors.phone}>
                  {errors.phone}
                </HelperText>

                <TextInput
                  mode="outlined"
                  label="Date of Birth (YYYY-MM-DD)"
                  value={formData.dateOfBirth}
                  onChangeText={(value) => updateFormData('dateOfBirth', value)}
                  placeholder="1990-01-01"
                  error={!!errors.dateOfBirth}
                  style={styles.input}
                  left={<TextInput.Icon icon="calendar" />}
                />
                <HelperText type="error" visible={!!errors.dateOfBirth}>
                  {errors.dateOfBirth}
                </HelperText>

                <TextInput
                  mode="outlined"
                  label="Address"
                  value={formData.address}
                  onChangeText={(value) => updateFormData('address', value)}
                  multiline
                  numberOfLines={3}
                  style={styles.input}
                  left={<TextInput.Icon icon="map-marker" />}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.buttons}>
                <Button
                  mode="contained"
                  onPress={handleSave}
                  loading={isSaving}
                  disabled={isSaving}
                  style={styles.saveButton}
                  contentStyle={styles.buttonContent}
                  icon="content-save"
                >
                  Save Changes
                </Button>

                <Button
                  mode="outlined"
                  onPress={() => navigation.goBack()}
                  style={styles.cancelButton}
                  contentStyle={styles.buttonContent}
                >
                  Cancel
                </Button>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: '#6200ee',
    marginBottom: 16,
  },
  emailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 4,
  },
  buttons: {
    gap: 12,
  },
  saveButton: {
    borderRadius: 8,
  },
  cancelButton: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default ProfileScreen;
