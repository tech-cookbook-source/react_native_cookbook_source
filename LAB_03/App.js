import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckboxRadioButton from './CheckboxRadioButton'; // Bài Tập 1
import FlatListSectionList from './FlatListSectionList'; // Bài Tập 2
import ModalActivityIndicator from './ModalActivityIndicator'; // Bài Tập 3

import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Checkbox & RadioButton" component={CheckboxRadioButton} />
        <Tab.Screen name="FlatList & SectionList" component={FlatListSectionList} />
        <Tab.Screen name="Modal & ActivityIndicator" component={ModalActivityIndicator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
