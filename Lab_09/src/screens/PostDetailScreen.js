import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PostService from '../services/PostService';

export default function PostDetailScreen({ route, navigation }) {
  const { postId, title } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set navigation title
    navigation.setOptions({ title: 'Chi tiết bài viết' });
    
    fetchPostDetail();
  }, [postId]);

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      
      // Fetch post details and comments in parallel
      const [postData, commentsData] = await Promise.all([
        PostService.getPostById(postId),
        PostService.getPostComments(postId)
      ]);
      
      setPost(postData);
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching post detail:', error);
      Alert.alert(
        'Lỗi',
        'Không thể tải chi tiết bài viết',
        [
          { text: 'Thử lại', onPress: fetchPostDetail },
          { text: 'Quay lại', onPress: () => navigation.goBack() }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Đang tải chi tiết...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không thể tải bài viết</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Post Content */}
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postMeta}>Bài viết #{post.id} • Tác giả #{post.userId}</Text>
        <Text style={styles.postBody}>{post.body}</Text>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>
          Bình luận ({comments.length})
        </Text>
        
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <Text style={styles.commentName}>{comment.name}</Text>
            <Text style={styles.commentEmail}>({comment.email})</Text>
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
  },
  postContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textTransform: 'capitalize',
    lineHeight: 28,
  },
  postMeta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  postBody: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  commentsContainer: {
    margin: 15,
    marginTop: 0,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  commentItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007bff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    textTransform: 'capitalize',
  },
  commentEmail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  commentBody: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
