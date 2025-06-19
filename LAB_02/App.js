import React from 'react'; // Import React để sử dụng trong phần giao diện
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer từ thư viện điều hướng
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import createStackNavigator từ thư viện điều hướng stack
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native'; // Import các thành phần cần thiết
import { top100StudentsByAvgPoint, top100StudentsByAvgTraningPoint } from './studentStatistics'; // Import dữ liệu từ file đã xử lý
import { useEventHandlers } from './eventHandler'; // Nhập custom hook từ eventHandlers


// Cần tập lại các bài tập
const Exercise1 = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Danh sách sinh viên có điểm số từ cao xuống thấp:</Text>
      {/* Hiển thị danh sách sinh viên */}
      {top100StudentsByAvgPoint.map((student, index) => (
        <Text key={student.mssv}>
          {index + 1}. {student.name} - MSSV: {student.mssv} - Điểm: {student.avgPoint}
        </Text>
      ))}

      <Text style={styles.title}>Danh sách sinh viên có điểm rèn luyện cao nhất:</Text>
      {/* Hiển thị danh sách sinh viên */}
      {top100StudentsByAvgTraningPoint.map((student, index) => (
        <Text key={student.mssv}>
          {index + 1}. {student.name} - MSSV: {student.mssv} - Điểm rèn luyện: {student.avgTrainingPoint}
        </Text>
      ))}
    </ScrollView>
  );
};


const Exercise2 = () => {
  const {
    inputValue,
    handleButtonClick,
    handleTextClick,
    handleInputChange,
    handleTextViewClick,
  } = useEventHandlers(); // Sử dụng các hàm xử lý sự kiện hook

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Xử lý sự kiện onClick</Text>
        <View style={styles.viewContainer} onTouchEnd={handleTextClick}>
          <Text>Nhấn vào đây để xử lý sự kiện View</Text>
        </View>


        <Text style={styles.clickableText} onPress={handleTextClick}>
          Nhấn vào đây để xử lý kiện Text
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập thông tin vào đây..."
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <Button title="Nhấn vào đây" onPress={handleButtonClick} style={styles.btntest} />
        <Button title="Cập nhật TextView" onPress={handleTextViewClick} value={inputValue}/> 
    </ScrollView>
  );
};


const Exercise3 = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bài tập 3:</Text>

    </ScrollView>
  );
};

const tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <tab.Navigator>
        <tab.Screen name="Bài tập 1" component={Exercise1} />
        <tab.Screen name="Bài tập 2" component={Exercise2} />
      </tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    borderRadius: 5,
  },
  clickableText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
