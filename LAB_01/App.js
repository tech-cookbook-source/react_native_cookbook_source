import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Họ và tên: Nguyen Van A</Text>
      <View style={styles.stepContainer}>
        <Text>MSSV: 21000126</Text>
        <Text>Lớp: 23CC112</Text>
        <Text>Trường: Đại học Lạc Hồng</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30, // Kích thước chữ lớn hơn
    fontWeight: 'bold', // In đậm
  },
  stepContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
