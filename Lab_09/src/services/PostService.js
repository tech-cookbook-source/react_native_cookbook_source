import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Intentionally create a buggy version first for debugging practice
const BUGGY_API_URL = 'https://jsonplaceholder.typicode.com/post'; // Missing 's' in 'posts'

class PostService {
  constructor() {
    this.isDebugging = false;
  }

  // Toggle between correct and buggy API for debugging practice
  toggleDebugging() {
    this.isDebugging = !this.isDebugging;
    console.log(`Debug mode: ${this.isDebugging ? 'ON (using buggy API)' : 'OFF (using correct API)'}`);
  }

  async getAllPosts() {
    try {
      console.log('🔍 Fetching posts...');
      const url = this.isDebugging ? BUGGY_API_URL : `${API_BASE_URL}/posts`;
      console.log(`📡 API URL: ${url}`);
      
      const response = await axios.get(url);
      console.log('✅ Posts fetched successfully:', response.data.length, 'posts');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching posts:');
      console.error('Status:', error.response?.status);
      console.error('Status Text:', error.response?.statusText);
      console.error('URL:', error.config?.url);
      console.error('Message:', error.message);
      
      // Debugging steps log
      console.log('🔧 Debug Steps:');
      console.log('1. Check internet connection');
      console.log('2. Verify API URL spelling');
      console.log('3. Check API endpoint exists');
      console.log('4. Verify response format');
      
      throw error;
    }
  }

  async getPostById(id) {
    try {
      console.log(`🔍 Fetching post with ID: ${id}`);
      const url = `${API_BASE_URL}/posts/${id}`;
      console.log(`📡 API URL: ${url}`);
      
      const response = await axios.get(url);
      console.log('✅ Post fetched successfully:', response.data.title);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching post:');
      console.error('Status:', error.response?.status);
      console.error('Message:', error.message);
      throw error;
    }
  }

  // Get comments for a post
  async getPostComments(postId) {
    try {
      console.log(`🔍 Fetching comments for post ID: ${postId}`);
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
      console.log('✅ Comments fetched successfully:', response.data.length, 'comments');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching comments:', error.message);
      throw error;
    }
  }
}

export default new PostService();
