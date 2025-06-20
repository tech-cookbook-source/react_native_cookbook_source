import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PERSONAL_INFO } from '../constants';

const PersonalInfoContext = createContext();

export const usePersonalInfo = () => {
  const context = useContext(PersonalInfoContext);
  if (!context) {
    throw new Error('usePersonalInfo must be used within a PersonalInfoProvider');
  }
  return context;
};

export const PersonalInfoProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState(DEFAULT_PERSONAL_INFO);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      const savedInfo = await AsyncStorage.getItem('personalInfo');
      if (savedInfo) {
        const parsedInfo = JSON.parse(savedInfo);
        setPersonalInfo({ ...DEFAULT_PERSONAL_INFO, ...parsedInfo });
      }
    } catch (error) {
      console.error('Error loading personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePersonalInfo = async (newInfo) => {
    const updatedInfo = { ...personalInfo, ...newInfo };
    setPersonalInfo(updatedInfo);
    try {
      await AsyncStorage.setItem('personalInfo', JSON.stringify(updatedInfo));
    } catch (error) {
      console.error('Error saving personal info:', error);
    }
  };

  const resetPersonalInfo = async () => {
    setPersonalInfo(DEFAULT_PERSONAL_INFO);
    try {
      await AsyncStorage.removeItem('personalInfo');
    } catch (error) {
      console.error('Error resetting personal info:', error);
    }
  };

  const value = {
    personalInfo,
    updatePersonalInfo,
    resetPersonalInfo,
    isLoading,
  };

  return (
    <PersonalInfoContext.Provider value={value}>
      {children}
    </PersonalInfoContext.Provider>
  );
};
