import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { usePersonalInfo } from '../contexts/PersonalInfoContext';

const OptionMenu = ({ visible, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { personalInfo } = usePersonalInfo();
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  const handleThemeToggle = () => {
    toggleTheme();
    Alert.alert(
      'Đã thay đổi giao diện',
      `Đã chuyển sang chế độ ${theme.isDark ? 'sáng' : 'tối'}`,
      [{ text: 'OK' }]
    );
  };

  const handleShowPersonalInfo = () => {
    setShowPersonalInfo(true);
  };

  const handleExitApp = () => {
    Alert.alert(
      'Thoát ứng dụng',
      'Bạn có chắc chắn muốn thoát ứng dụng không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Thoát',
          style: 'destructive',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]
    );
  };

  const MenuButton = ({ title, icon, onPress, color = COLORS.PRIMARY_GRADIENT }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <LinearGradient
        colors={color}
        style={styles.menuButtonGradient}
      >
        <Text style={styles.menuIcon}>{icon}</Text>
        <Text style={styles.menuTitle}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

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
          <View style={[styles.menuContainer, { backgroundColor: theme.colors.BACKGROUND }]}>
            <Text style={[styles.menuHeader, { color: theme.colors.TEXT }]}>
              ⚙️ Tùy chọn
            </Text>

            <MenuButton
              title={`Chế độ ${theme.isDark ? 'sáng' : 'tối'}`}
              icon={theme.isDark ? '☀️' : '🌙'}
              onPress={handleThemeToggle}
            />

            <MenuButton
              title="Thông tin cá nhân"
              icon="👤"
              onPress={handleShowPersonalInfo}
              color={COLORS.SECONDARY_GRADIENT}
            />

            <MenuButton
              title="Thoát ứng dụng"
              icon="🚪"
              onPress={handleExitApp}
              color={['#ff6b6b', '#ee5a52']}
            />

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Personal Info Modal */}
      <Modal
        visible={showPersonalInfo}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPersonalInfo(false)}
      >
        <View style={styles.overlay}>
          <View style={[styles.personalInfoContainer, { backgroundColor: theme.colors.BACKGROUND }]}>
            <LinearGradient
              colors={COLORS.PROFILE_GRADIENT}
              style={styles.personalInfoHeader}
            >
              <Text style={styles.personalInfoTitle}>👤 Thông Tin Cá Nhân</Text>
            </LinearGradient>

            <View style={styles.personalInfoContent}>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.TEXT }]}>
                  Họ và tên:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.TEXT }]}>
                  {personalInfo.name || 'Chưa cập nhật'}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.TEXT }]}>
                  Tuổi:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.TEXT }]}>
                  {personalInfo.age ? `${personalInfo.age} tuổi` : 'Chưa cập nhật'}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.TEXT }]}>
                  Lớp học:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.TEXT }]}>
                  {personalInfo.class || 'Chưa cập nhật'}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.TEXT }]}>
                  Mã số sinh viên:
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.TEXT }]}>
                  {personalInfo.studentId || 'Chưa cập nhật'}
                </Text>
              </View>

              {personalInfo.zodiacSign && (
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme.colors.TEXT }]}>
                    Cung hoàng đạo:
                  </Text>
                  <Text style={[styles.infoValue, { color: theme.colors.TEXT }]}>
                    {personalInfo.zodiacSign.symbol} {personalInfo.zodiacSign.name}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowPersonalInfo(false)}
            >
              <Text style={styles.modalCloseText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '80%',
    maxWidth: 300,
    borderRadius: 15,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  menuButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  personalInfoContainer: {
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
  personalInfoHeader: {
    padding: 20,
    alignItems: 'center',
  },
  personalInfoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  personalInfoContent: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  modalCloseButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OptionMenu;
