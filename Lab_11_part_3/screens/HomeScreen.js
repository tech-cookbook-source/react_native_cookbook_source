import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { postsAPI } from '../services/api';

const avatar = require('../assets/icon.png'); // Use your logo or avatar

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await postsAPI.getPosts();
      setPosts(response.data || []);
    } catch (error) {
      console.log('Fetch posts error:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách bài viết');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handleDeletePost = async (postId) => {
    if (!postId) return;
    
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa bài viết này?',
      [
        { 
          text: 'Hủy', 
          style: 'cancel' 
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await postsAPI.deletePost(postId);
              Alert.alert('Thành công', 'Đã xóa bài viết');
              fetchPosts();
            } catch (error) {
              console.log('Delete error:', error);
              Alert.alert('Lỗi', 'Không thể xóa bài viết');
            }
          },
        },
      ]
    );
  };

  const handleEditPost = (post) => {
    if (!post) return;
    navigation.navigate('PostForm', { post, isEdit: true });
  };

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { 
          text: 'Hủy', 
          style: 'cancel' 
        },
        {
          text: 'Đăng xuất',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  const renderPost = ({ item }) => {
    if (!item) {
      return null;
    }

    const title = item.title ? String(item.title) : 'Tiêu đề không có';
    const content = item.content ? String(item.content) : '';
    const authorName = item.authorName ? String(item.authorName) : 'Không xác định';
    const createdAt = item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : 'Ngày không xác định';
    const isAdmin = user && user.role === 'admin';

    return (
      <View style={styles.postCard}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postContent} numberOfLines={3}>
          {content}
        </Text>
        <Text style={styles.postAuthor}>Tác giả: {authorName}</Text>
        <Text style={styles.postDate}>{createdAt}</Text>
        
        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditPost(item)}
          >
            <Text style={styles.editButtonText}>Sửa</Text>
          </TouchableOpacity>
          
          {isAdmin && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePost(item._id)}
            >
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const userName = user && user.name ? String(user.name) : 'Người dùng';
  const userRole = user && user.role === 'admin' ? 'Quản trị viên' : 'Người dùng';

  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={avatar} style={styles.avatar} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.welcomeText}>Xin chào, {userName}</Text>
              <Text style={styles.roleText}>Vai trò: {userRole}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PostForm', { isEdit: false })}
          activeOpacity={0.85}
        >
          <Text style={styles.addButtonText}>+ Thêm bài viết mới</Text>
        </TouchableOpacity>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) => {
            if (item && item._id) {
              return String(item._id);
            }
            return String(index);
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Chưa có bài viết nào</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 0,
    borderRadius: 16,
    margin: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3e3e3',
    borderWidth: 2,
    borderColor: '#c3cfe2',
  },
  welcomeText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
  },
  roleText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    shadowColor: '#ff4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  addButton: {
    backgroundColor: '#2193b0',
    marginHorizontal: 24,
    marginVertical: 12,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2193b0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  postCard: {
    backgroundColor: 'rgba(255,255,255,0.98)',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  postTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  postContent: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  postDate: {
    fontSize: 12,
    color: '#b0bec5',
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 7,
    minWidth: 60,
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 7,
    minWidth: 60,
    alignItems: 'center',
    shadowColor: '#dc3545',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default HomeScreen;
