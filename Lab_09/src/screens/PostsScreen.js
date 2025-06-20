import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PostService from '../services/PostService';
import theme from '../styles/theme';
import { Card, Badge } from '../components/UI';

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsData = await PostService.getAllPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      Alert.alert(
        'Lỗi khi tải bài viết',
        `Không thể tải danh sách bài viết.\n\nChi tiết lỗi: ${error.message}\n\nCác bước debug đã thực hiện:\n1. Kiểm tra kết nối internet\n2. Xác minh URL API\n3. Kiểm tra endpoint tồn tại\n4. Xác minh định dạng response`,
        [
          { text: 'Thử lại', onPress: fetchPosts },
          { text: 'Hủy', style: 'cancel' }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const toggleDebugMode = () => {
    PostService.toggleDebugging();
    setDebugMode(!debugMode);
    Alert.alert(
      'Debug Mode',
      `Debug mode đã ${!debugMode ? 'BẬT' : 'TẮT'}.\n\n${!debugMode ? 'API sẽ sử dụng URL lỗi để thực hành debugging.' : 'API sẽ hoạt động bình thường.'}`,
      [{ text: 'OK' }]
    );
  };
  const renderPost = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostDetail', { 
        postId: item.id,
        title: item.title 
      })}
      activeOpacity={0.7}
    >
      <Card style={[styles.postCard, { marginTop: index === 0 ? 0 : theme.spacing.md }]} elevated>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderLeft}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={theme.colors.gradient.primary}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>
                  {item.title.charAt(0).toUpperCase()}
                </Text>
              </LinearGradient>
            </View>
          </View>
          <Badge text={`#${item.id}`} variant="primary" />
        </View>
        
        <Text style={styles.postTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <Text style={styles.postBody} numberOfLines={3}>
          {item.body}
        </Text>
        
        <View style={styles.postFooter}>
          <View style={styles.postMeta}>
            <Ionicons name="time-outline" size={14} color={theme.colors.text.tertiary} />
            <Text style={styles.postMetaText}>Just now</Text>
          </View>
          <View style={styles.readMoreContainer}>
            <Text style={styles.readMoreText}>Read more</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={theme.colors.gradient.primary}
          style={styles.loadingIcon}
        >
          <ActivityIndicator size="large" color="white" />
        </LinearGradient>
        <Text style={styles.loadingText}>Đang tải bài viết...</Text>
        <Text style={styles.loadingSubtext}>Vui lòng đợi trong giây lát</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Debug Control */}
      <View style={styles.debugContainer}>
        <TouchableOpacity
          style={[styles.debugButton, debugMode && styles.debugButtonActive]}
          onPress={toggleDebugMode}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={debugMode ? "bug" : "settings"} 
            size={16} 
            color="white" 
            style={styles.debugIcon}
          />
          <Text style={styles.debugButtonText}>
            {debugMode ? 'Debug ON' : 'Debug OFF'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  
  loadingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  
  loadingText: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  
  loadingSubtext: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  
  debugContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  
  debugButton: {
    backgroundColor: theme.colors.text.tertiary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  debugButtonActive: {
    backgroundColor: theme.colors.error,
  },
  
  debugIcon: {
    marginRight: theme.spacing.xs,
  },
  
  debugButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
  },
  
  listContent: {
    padding: theme.spacing.md,
  },
  
  separator: {
    height: theme.spacing.sm,
  },
  
  postCard: {
    marginBottom: 0,
  },
  
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  avatarContainer: {
    marginRight: theme.spacing.sm,
  },
  
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  avatarText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
  },
  
  postTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    lineHeight: 24,
  },
  
  postBody: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  postMetaText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary,
    marginLeft: theme.spacing.xs,
  },
  
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  readMoreText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
    marginRight: theme.spacing.xs,
  },
});
