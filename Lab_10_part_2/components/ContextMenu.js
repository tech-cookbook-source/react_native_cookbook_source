import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';

const ContextMenu = ({ visible, onClose, position, onAction }) => {
  const { theme } = useTheme();
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleAddEvent = () => {
    setShowEventModal(true);
  };

  const handleSaveEvent = () => {
    if (!eventTitle.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tiêu đề sự kiện');
      return;
    }

    const event = {
      id: Date.now().toString(),
      title: eventTitle,
      description: eventDescription,
      createdAt: new Date(),
    };

    onAction?.('add_event', event);
    setEventTitle('');
    setEventDescription('');
    setShowEventModal(false);
    onClose();
    
    Alert.alert('Thành công', 'Sự kiện đã được thêm!');
  };

  const handleRefresh = () => {
    onAction?.('refresh');
    onClose();
  };

  const handleSettings = () => {
    onAction?.('settings');
    onClose();
  };

  const menuItems = [
    {
      id: 'add_event',
      title: 'Thêm sự kiện',
      icon: '➕',
      action: handleAddEvent,
      color: COLORS.PRIMARY_GRADIENT,
    },
    {
      id: 'refresh',
      title: 'Làm mới',
      icon: '🔄',
      action: handleRefresh,
      color: COLORS.SECONDARY_GRADIENT,
    },
    {
      id: 'settings',
      title: 'Cài đặt',
      icon: '⚙️',
      action: handleSettings,
      color: ['#667eea', '#764ba2'],
    },
  ];

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <View
            style={[
              styles.contextMenu,
              {
                backgroundColor: theme.colors.BACKGROUND,
                top: position?.y || 100,
                left: position?.x || 50,
              },
            ]}
          >
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.action}
              >
                <LinearGradient
                  colors={item.color}
                  style={styles.menuItemGradient}
                >
                  <Text style={styles.menuItemIcon}>{item.icon}</Text>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        visible={showEventModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEventModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.eventModalContainer, { backgroundColor: theme.colors.BACKGROUND }]}>
            <LinearGradient
              colors={COLORS.PRIMARY_GRADIENT}
              style={styles.eventModalHeader}
            >
              <Text style={styles.eventModalTitle}>➕ Thêm Sự Kiện Mới</Text>
            </LinearGradient>

            <View style={styles.eventModalContent}>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: theme.colors.TEXT }]}>
                  Tiêu đề sự kiện *
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: theme.colors.TEXT,
                      borderColor: theme.colors.BORDER,
                      backgroundColor: theme.colors.CARD,
                    },
                  ]}
                  value={eventTitle}
                  onChangeText={setEventTitle}
                  placeholder="Nhập tiêu đề sự kiện"
                  placeholderTextColor={theme.colors.TEXT + '80'}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: theme.colors.TEXT }]}>
                  Mô tả
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    styles.multilineInput,
                    {
                      color: theme.colors.TEXT,
                      borderColor: theme.colors.BORDER,
                      backgroundColor: theme.colors.CARD,
                    },
                  ]}
                  value={eventDescription}
                  onChangeText={setEventDescription}
                  placeholder="Nhập mô tả sự kiện (tùy chọn)"
                  placeholderTextColor={theme.colors.TEXT + '80'}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.eventModalButtons}>
                <TouchableOpacity
                  style={[styles.eventButton, styles.cancelEventButton]}
                  onPress={() => {
                    setEventTitle('');
                    setEventDescription('');
                    setShowEventModal(false);
                  }}
                >
                  <Text style={styles.cancelEventButtonText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventButton}
                  onPress={handleSaveEvent}
                >
                  <LinearGradient
                    colors={COLORS.PRIMARY_GRADIENT}
                    style={styles.saveEventButtonGradient}
                  >
                    <Text style={styles.saveEventButtonText}>Lưu</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contextMenu: {
    position: 'absolute',
    minWidth: 200,
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuItem: {
    marginBottom: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuItemIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventModalContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  eventModalHeader: {
    padding: 20,
    alignItems: 'center',
  },
  eventModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  eventModalContent: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
  },
  eventModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  eventButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 25,
    overflow: 'hidden',
  },
  cancelEventButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelEventButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveEventButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveEventButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContextMenu;
