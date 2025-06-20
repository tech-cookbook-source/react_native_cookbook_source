import GeminiService from './geminiService';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.url = 'wss://echo.websocket.org'; // Public WebSocket echo server for testing
    this.listeners = [];
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.isProcessingMessage = false;
  }

  connect() {
    try {
      console.log('Attempting to connect to WebSocket...');
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('Kết nối thành công!');
        this.reconnectAttempts = 0;
        this.notifyListeners('connected', { type: 'connection', status: 'connected' });
      };      this.ws.onmessage = async (event) => {
        // Prevent multiple simultaneous message processing
        if (this.isProcessingMessage) {
          return;
        }
        
        console.log('Received WebSocket message:', event.data);
        
        this.isProcessingMessage = true;
        
        try {
          // Parse the message
          let messageData;
          try {
            messageData = JSON.parse(event.data);
          } catch (parseError) {
            // If parsing fails, check if it's a server message we should ignore
            const rawMessage = event.data.toString();
            if (rawMessage.startsWith('Request served by') || 
                rawMessage.includes('echo.websocket.org') ||
                rawMessage.length < 5) {
              console.log('Ignoring server message:', rawMessage);
              this.isProcessingMessage = false;
              return;
            }
            
            // If it's not a server message, treat as user content
            messageData = { 
              type: 'message',
              content: rawMessage,
              sender: 'user' 
            };
          }
          
          // Only process messages that are actual user messages
          if (messageData && 
              messageData.type === 'message' && 
              messageData.sender === 'user' && 
              messageData.content && 
              messageData.content.trim().length > 0) {
            
            console.log('Processing user message:', messageData.content);
            
            // Get AI response from Gemini
            const aiResponse = await GeminiService.sendMessage(messageData.content);
            
            // Send the AI response back to the UI
            this.notifyListeners('message', {
              type: 'message',
              content: aiResponse.content,
              sender: 'bot',
              timestamp: aiResponse.timestamp,
              success: aiResponse.success
            });
          } else {
            // Log but don't process other message types
            console.log('Ignoring non-user message:', messageData);
          }
          
        } catch (error) {
          console.error('Error processing message:', error);
          
          // Send error response only if it was a user message
          this.notifyListeners('message', {
            type: 'message',
            content: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại.',
            sender: 'bot',
            timestamp: new Date().toISOString(),
            success: false
          });
        } finally {
          this.isProcessingMessage = false;
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        this.notifyListeners('disconnected', { type: 'connection', status: 'disconnected' });
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyListeners('error', { type: 'error', error: error.message });
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.notifyListeners('error', { type: 'error', error: error.message });
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const messageData = {
        type: 'message',
        content: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
      this.ws.send(JSON.stringify(messageData));
      return true;
    } else {
      console.error('WebSocket is not connected');
      return false;
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.log('Max reconnection attempts reached');
      this.notifyListeners('maxReconnectAttemptsReached', { 
        type: 'error', 
        error: 'Max reconnection attempts reached' 
      });
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners(event, data) {
    this.listeners.forEach(listener => {
      try {
        listener(event, data);
      } catch (error) {
        console.error('Error in WebSocket listener:', error);
      }
    });
  }
  getConnectionState() {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
        return 'disconnecting';
      case WebSocket.CLOSED:
        return 'disconnected';
      default:
        return 'unknown';
    }
  }

  clearChatHistory() {
    // Reset Gemini chat history
    GeminiService.resetChat();
  }
}

export default new WebSocketService();
