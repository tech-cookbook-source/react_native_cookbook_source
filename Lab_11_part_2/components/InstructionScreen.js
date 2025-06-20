import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const InstructionScreen = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📖 Hướng dẫn chơi</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Mục tiêu</Text>
          <Text style={styles.sectionText}>
            Nhìn vào hình ảnh emoji và đoán đúng từ tiếng Anh tương ứng trong vòng 15 giây.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 Cách chơi</Text>
          <Text style={styles.sectionText}>
            1. Quan sát hình ảnh emoji được hiển thị{'\n'}
            2. Chọn các chữ cái từ bảng để tạo thành từ{'\n'}
            3. Hoàn thành từ trước khi hết thời gian{'\n'}
            4. Nếu sai, bạn có thể xóa và thử lại
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Điểm số</Text>
          <Text style={styles.sectionText}>
            • Đoán đúng: +10 điểm cơ bản{'\n'}
            • Thời gian còn lại: +1 điểm/giây{'\n'}
            • Ví dụ: Đoán đúng với 8 giây còn lại = 18 điểm
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Gợi ý</Text>
          <Text style={styles.sectionText}>
            • Chi phí: 5 điểm{'\n'}
            • Cung cấp mô tả về đáp án{'\n'}
            • Sử dụng khi gặp khó khăn
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Tính năng khác</Text>
          <Text style={styles.sectionText}>
            • Nút "Xóa": Xóa tất cả chữ cái đã chọn{'\n'}
            • Rung động khi đúng/sai{'\n'}
            • 35+ câu hỏi với độ khó tăng dần
          </Text>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💭 Mẹo chơi</Text>
          <Text style={styles.tipText}>
            • Đọc kỹ emoji, có thể có nhiều ý nghĩa{'\n'}
            • Nghĩ về từ tiếng Anh phổ biến{'\n'}
            • Sử dụng gợi ý khi thực sự cần thiết{'\n'}
            • Bình tĩnh, đừng vội vàng!
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.startButton} onPress={onBack}>
        <Text style={styles.startButtonText}>🚀 Bắt đầu chơi ngay!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InstructionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498DB',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
  },
  tipBox: {
    backgroundColor: '#E8F8F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#3498DB',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
