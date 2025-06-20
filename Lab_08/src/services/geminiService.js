import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from 'expo-constants';

class GeminiService {
  constructor() {
    // Initialize Gemini AI with API key from environment
    const apiKey = Constants.expoConfig?.extra?.GOOGLE_API_KEY ;
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Chat history to maintain context
    this.chatHistory = [
      {
        role: "user",
        parts: [{ text: "Bạn là một AI assistant thông minh và thân thiện. Hãy trả lời bằng tiếng Việt một cách tự nhiên và hữu ích." }]
      },
      {
        role: "model", 
        parts: [{ text: "Xin chào! Tôi là AI assistant của bạn. Tôi sẵn sàng giúp đỡ và trả lời các câu hỏi của bạn bằng tiếng Việt. Bạn cần hỗ trợ gì hôm nay?" }]
      }
    ];
    
    // Start chat session with history
    this.chat = this.model.startChat({
      history: this.chatHistory
    });
  }
  async sendMessage(message) {
    try {
      console.log('Sending message to Gemini:', message);
      
      // Send message and get response
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini response:', text);
      return {
        success: true,
        content: text,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Return contextual fallback responses based on user message
      const fallbackResponses = this.getContextualFallback(message);
      
      return {
        success: false,
        content: fallbackResponses,
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  }

  // Get contextual fallback responses
  getContextualFallback(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('xin chào') || message.includes('hello') || message.includes('chào')) {
      return 'Xin chào! Tôi là AI assistant của bạn. Hiện tại tôi đang gặp sự cố kỹ thuật nhưng rất vui được gặp bạn!';
    }
    
    // Question responses  
    if (message.includes('?') || message.includes('gì') || message.includes('sao') || message.includes('như thế nào')) {
      return 'Đây là một câu hỏi hay! Tôi đang gặp sự cố kỹ thuật nên không thể trả lời đầy đủ. Bạn có thể thử lại sau không?';
    }
    
    // Thank you responses
    if (message.includes('cảm ơn') || message.includes('thank')) {
      return 'Không có gì! Tôi luôn sẵn sàng giúp đỡ bạn, mặc dù hiện tại đang có chút trục trặc kỹ thuật.';
    }
    
    // Default fallback
    const fallbackResponses = [
      "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.",
      "Hiện tại tôi không thể trả lời được. Bạn có thể thử lại không?",
      "Đã có lỗi xảy ra. Tôi sẽ cố gắng phản hồi tốt hơn trong lần sau.",
      "Tôi đang học cách trở nên tốt hơn. Vui lòng kiên nhẫn với tôi."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  // Reset chat history
  resetChat() {
    this.chatHistory = [
      {
        role: "user",
        parts: [{ text: "Bạn là một AI assistant thông minh và thân thiện. Hãy trả lời bằng tiếng Việt một cách tự nhiên và hữu ích." }]
      },
      {
        role: "model", 
        parts: [{ text: "Xin chào! Tôi là AI assistant của bạn. Tôi sẵn sàng giúp đỡ và trả lời các câu hỏi của bạn bằng tiếng Việt. Bạn cần hỗ trợ gì hôm nay?" }]
      }
    ];
    
    this.chat = this.model.startChat({
      history: this.chatHistory
    });
  }

  // Get current chat history length
  getChatHistoryLength() {
    return this.chatHistory.length;
  }
}

export default new GeminiService();
