import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { postsAPI } from '../services/api';

const PostFormScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { post, isEdit } = route.params || {};

  useEffect(() => {
    if (isEdit && post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [isEdit, post]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tiêu đề và nội dung');
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await postsAPI.updatePost(post._id, title.trim(), content.trim());
        Alert.alert('Thành công', 'Đã cập nhật bài viết', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        await postsAPI.createPost(title.trim(), content.trim());
        Alert.alert('Thành công', 'Đã tạo bài viết mới', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu bài viết. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#c3cfe2', '#f5f7fa']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={styles.headerCard}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#2193b0" />
            </TouchableOpacity>
            <Text style={styles.title}>
              {isEdit ? 'Sửa bài viết' : 'Thêm bài viết mới'}
            </Text>
          </View>
          <View style={styles.formCard}>
            <Text style={styles.label}>Tiêu đề</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Nhập tiêu đề bài viết..."
              value={title}
              onChangeText={setTitle}
              multiline
              maxLength={200}
              placeholderTextColor="#aaa"
            />
            <Text style={styles.charCount}>{title.length}/200</Text>
            <Text style={styles.label}>Nội dung</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Nhập nội dung bài viết..."
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              maxLength={5000}
              placeholderTextColor="#aaa"
            />
            <Text style={styles.charCount}>{content.length}/5000</Text>
            <TouchableOpacity
              style={[styles.saveButton, loading && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.saveButtonText}>
                {loading ? 'Đang lưu...' : (isEdit ? 'Cập nhật' : 'Tạo bài viết')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flex: 1,
  },
  headerCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    padding: 24,
    paddingTop: 48,
    borderRadius: 18,
    margin: 18,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2193b0',
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 16,
    margin: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  titleInput: {
    backgroundColor: '#f7fbfc',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 60,
    marginBottom: 5,
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contentInput: {
    backgroundColor: '#f7fbfc',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 200,
    marginBottom: 5,
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  charCount: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2193b0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#2193b0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#b0bec5',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default PostFormScreen;
