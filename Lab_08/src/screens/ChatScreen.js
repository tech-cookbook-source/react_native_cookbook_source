import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  TextInput,
  Surface,
  Avatar,
  Chip,
  IconButton,
  Snackbar,
  ActivityIndicator,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessage,
  setConnectionStatus,
  clearMessages,
} from '../store/slices/chatSlice';
import WebSocketService from '../services/websocketService';

export default function ChatScreen() {
  const dispatch = useDispatch();
  const { messages, connected, connectionStatus } = useSelector(state => state.chat);
  
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef(null);
  useEffect(() => {
    // Setup WebSocket listener
    const handleWebSocketEvent = (event, data) => {
      switch (event) {
        case 'connected':
          dispatch(setConnectionStatus('connected'));
          dispatch(addMessage({
            content: 'Kết nối thành công! Bạn có thể bắt đầu chat.',
            sender: 'system',
            type: 'system',
          }));
          showSnackbar('Kết nối thành công!');
          break;
        case 'disconnected':
          dispatch(setConnectionStatus('disconnected'));
          dispatch(addMessage({
            content: 'Kết nối đã bị ngắt.',
            sender: 'system',
            type: 'system',
          }));
          showSnackbar('Kết nối bị ngắt');
          break;
        case 'message':
          if (data.sender !== 'user') {
            dispatch(addMessage({
              content: data.content || 'Echo: ' + data.content,
              sender: 'bot',
              type: 'message',
            }));
          }
          break;
        case 'error':
          showSnackbar('Lỗi kết nối: ' + data.error);
          break;
        case 'maxReconnectAttemptsReached':
          showSnackbar('Không thể kết nối lại. Vui lòng thử lại sau.');
          break;
      }
    };

    WebSocketService.addListener(handleWebSocketEvent);

    // Connect to WebSocket
    WebSocketService.connect();

    // Keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      WebSocketService.removeListener(handleWebSocketEvent);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [dispatch]);
  const handleSendMessage = () => {
    if (messageText.trim() && connected) {
      const message = {
        content: messageText.trim(),
        sender: 'user',
        type: 'message',
      };

      // Add user message to store
      dispatch(addMessage(message));

      // Send message via WebSocket
      const sent = WebSocketService.sendMessage(messageText.trim());
      
      if (!sent) {
        showSnackbar('Không thể gửi tin nhắn. Kiểm tra kết nối.');
      }

      setMessageText('');
      
      // Scroll to bottom after sending message
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    } else if (!connected) {
      showSnackbar('Chưa kết nối. Vui lòng thử lại.');
    }
  };

  const handleConnect = () => {
    dispatch(setConnectionStatus('connecting'));
    WebSocketService.connect();
  };

  const handleDisconnect = () => {
    WebSocketService.disconnect();
    dispatch(setConnectionStatus('disconnected'));
  };
  const handleClearMessages = () => {
    dispatch(clearMessages());
    WebSocketService.clearChatHistory();
    showSnackbar('Đã xóa tất cả tin nhắn');
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };    const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    const isSystem = item.sender === 'system';

    // Safety check for item content
    if (!item || !item.content) {
      return null;
    }

    if (isSystem) {
      return (
        <View style={styles.systemMessageContainer}>
          <Chip 
            style={styles.systemMessage}
            textStyle={styles.systemMessageText}
            icon="information"
          >
            {String(item.content)}
          </Chip>
        </View>
      );
    }

    // Determine message styling based on sender
    const messageContainerStyle = [
      styles.messageContainer,
      isUser ? styles.userMessageContainer : styles.botMessageContainer
    ];
    
    const messageCardStyle = [
      styles.messageCard,
      isUser ? styles.userMessage : styles.botMessage
    ];
    
    const avatarStyle = [
      styles.avatar,
      isUser ? styles.userAvatar : styles.botAvatar
    ];
    
    const avatarLabelStyle = isUser ? { color: '#6200ee' } : { color: '#ffffff' };
    
    const senderNameStyle = [
      styles.senderName,
      isUser ? styles.userSenderName : styles.botSenderName
    ];
    
    const timestampStyle = [
      styles.timestamp,
      isUser ? styles.userTimestamp : styles.botTimestamp
    ];
    
    const messageTextStyle = [
      styles.messageText,
      isUser ? styles.userMessageText : styles.botMessageText
    ];

    return (
      <View style={messageContainerStyle}>
        <Card style={messageCardStyle}>
          <Card.Content style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Avatar.Text
                size={32}
                label={isUser ? 'U' : 'AI'}
                style={avatarStyle}
                labelStyle={avatarLabelStyle}              />
              <View style={styles.messageInfo}>
                <Text style={senderNameStyle}>
                  {isUser ? 'Bạn' : 'AI Bot'}
                </Text>
                {item.timestamp ? (
                  <Text style={timestampStyle}>
                    {formatTime(item.timestamp)}
                  </Text>
                ) : null}
              </View>
            </View>
            <Text style={messageTextStyle}>
              {String(item.content || '')}
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#4caf50';
      case 'connecting':
        return '#ff9800';
      case 'disconnected':
        return '#e53e3e';
      default:
        return '#666';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Đã kết nối';
      case 'connecting':
        return 'Đang kết nối...';
      case 'disconnected':
        return 'Chưa kết nối';
      default:
        return 'Không xác định';
    }
  };

  return (
    // 1. Use a standard View as the root container
    <View style={styles.container}>
      {/* The header is now a direct child of the main View, not the KeyboardAvoidingView */}
      <Surface style={styles.header} elevation={1}>
        <View style={styles.headerContent}>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              { backgroundColor: getConnectionStatusColor() }
            ]} />
            <Text style={styles.statusText}>
              {getConnectionStatusText()}
            </Text>
          </View>
          <View style={styles.headerActions}>
            {!connected ? (
              <Button 
                mode="contained" 
                onPress={handleConnect}
                loading={connectionStatus === 'connecting'}
                disabled={connectionStatus === 'connecting'}
                style={styles.connectButton}
              >
                Kết nối
              </Button>
            ) : (
              <Button 
                mode="outlined" 
                onPress={handleDisconnect}
                style={styles.disconnectButton}
              >
                Ngắt kết nối
              </Button>
            )}
            <IconButton
              icon="delete-sweep"
              size={24}
              onPress={handleClearMessages}            />
          </View>
        </View>
      </Surface>
      <View style={[styles.contentContainer, { marginBottom: keyboardHeight }]}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => item.id ? String(item.id) : `message-${index}`}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          onLayout={() => flatListRef.current?.scrollToEnd()}          showsVerticalScrollIndicator={false}
          style={styles.messagesContainer}
        />
        
        {isTyping ? (
          <View style={styles.typingContainer}>
            <ActivityIndicator size="small" color="#666" />
            <Text style={styles.typingText}>AI đang trả lời...</Text>
          </View>
        ) : null}

        {/* Input container - always visible above keyboard */}
        <Surface style={styles.inputContainer} elevation={4}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              placeholder="Nhập tin nhắn..."
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={500}
              disabled={!connected}
              returnKeyType="send"
              onSubmitEditing={handleSendMessage}
              blurOnSubmit={false}
            />
            <IconButton
              icon="send"
              size={28}
              iconColor={connected && messageText.trim() ? '#6200ee' : '#ccc'}
              onPress={handleSendMessage}
              disabled={!connected || !messageText.trim()}
              style={styles.sendButton}
            />
          </View>
        </Surface>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View> // Close the root View
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: '#4caf50',
    marginRight: 8,
  },
  disconnectButton: {
    borderColor: '#e53e3e',
    marginRight: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 12,
    width: '100%',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  messageCard: {
    maxWidth: '85%',
    minWidth: '30%',
    elevation: 2,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: '#6200ee',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
  },
  messageContent: {
    padding: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    marginRight: 8,
  },
  userAvatar: {
    backgroundColor: '#ffffff',
  },
  botAvatar: {
    backgroundColor: '#6200ee',
  },
  messageInfo: {
    flex: 1,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  userSenderName: {
    color: '#ffffff',
  },
  botSenderName: {
    color: '#666',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 2,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  botTimestamp: {
    color: '#999',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 4,
  },
  userMessageText: {
    color: '#ffffff',
    fontWeight: '400',
  },
  botMessageText: {
    color: '#333333',
    fontWeight: '400',
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  systemMessage: {
    backgroundColor: '#e3f2fd',
  },
  systemMessageText: {
    color: '#1976d2',
    fontSize: 12,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  typingText: {
    marginLeft: 8,
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    maxHeight: 100,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    margin: 0,
  },
});
