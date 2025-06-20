import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, ZODIAC_SIGNS } from '../constants';
import { usePersonalInfo } from '../contexts/PersonalInfoContext';
import { useTheme } from '../contexts/ThemeContext';

const PersonalProfileView = () => {
  const { personalInfo, updatePersonalInfo } = usePersonalInfo();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(personalInfo);
  const [showZodiacModal, setShowZodiacModal] = useState(false);

  const handleSave = () => {
    updatePersonalInfo(editedInfo);
    setIsEditing(false);
    Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật!');
  };

  const handleCancel = () => {
    setEditedInfo(personalInfo);
    setIsEditing(false);
  };

  const handleZodiacSelect = (zodiac) => {
    setEditedInfo({ ...editedInfo, zodiacSign: zodiac });
    setShowZodiacModal(false);
  };

  const calculateAge = (birthday) => {
    if (!birthday) return '';
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const InfoCard = ({ title, value, onPress, editable = false }) => (
    <TouchableOpacity
      style={[styles.infoCard, { backgroundColor: theme.colors.CARD }]}
      onPress={onPress}
      disabled={!editable}
    >
      <Text style={[styles.infoLabel, { color: theme.colors.TEXT }]}>{title}</Text>
      <Text style={[styles.infoValue, { color: theme.colors.TEXT }]}>
        {value || 'Chưa cập nhật'}
      </Text>
      {editable && <Text style={styles.editIcon}>✏️</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.BACKGROUND }]}>
      <LinearGradient
        colors={COLORS.PROFILE_GRADIENT}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{personalInfo.avatar || '👤'}</Text>
        </View>
        <Text style={styles.nameText}>{personalInfo.name || 'Người dùng'}</Text>
        <Text style={styles.subtitleText}>Thông tin cá nhân</Text>
      </LinearGradient>

      <View style={styles.content}>
        {!isEditing ? (
          <>
            <InfoCard
              title="👤 Họ và tên"
              value={personalInfo.name}
            />
            
            <InfoCard
              title="🎂 Tuổi"
              value={personalInfo.age ? `${personalInfo.age} tuổi` : ''}
            />
            
            <InfoCard
              title="🎓 Lớp học"
              value={personalInfo.class}
            />
            
            <InfoCard
              title="🆔 Mã số sinh viên"
              value={personalInfo.studentId}
            />
            
            <InfoCard
              title="⭐ Cung hoàng đạo"
              value={personalInfo.zodiacSign ? 
                `${personalInfo.zodiacSign.symbol} ${personalInfo.zodiacSign.name}` : 
                ''
              }
            />

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEditedInfo(personalInfo);
                setIsEditing(true);
              }}
            >
              <LinearGradient
                colors={COLORS.PRIMARY_GRADIENT}
                style={styles.editButtonGradient}
              >
                <Text style={styles.editButtonText}>✏️ Chỉnh sửa thông tin</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={[styles.inputContainer, { backgroundColor: theme.colors.CARD }]}>
              <Text style={[styles.inputLabel, { color: theme.colors.TEXT }]}>
                👤 Họ và tên
              </Text>
              <TextInput
                style={[styles.textInput, { color: theme.colors.TEXT, borderColor: theme.colors.BORDER }]}
                value={editedInfo.name}
                onChangeText={(text) => setEditedInfo({ ...editedInfo, name: text })}
                placeholder="Nhập họ và tên"
                placeholderTextColor={theme.colors.TEXT + '80'}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.CARD }]}>
              <Text style={[styles.inputLabel, { color: theme.colors.TEXT }]}>
                🎂 Tuổi
              </Text>
              <TextInput
                style={[styles.textInput, { color: theme.colors.TEXT, borderColor: theme.colors.BORDER }]}
                value={editedInfo.age}
                onChangeText={(text) => setEditedInfo({ ...editedInfo, age: text })}
                placeholder="Nhập tuổi"
                placeholderTextColor={theme.colors.TEXT + '80'}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.CARD }]}>
              <Text style={[styles.inputLabel, { color: theme.colors.TEXT }]}>
                🎓 Lớp học
              </Text>
              <TextInput
                style={[styles.textInput, { color: theme.colors.TEXT, borderColor: theme.colors.BORDER }]}
                value={editedInfo.class}
                onChangeText={(text) => setEditedInfo({ ...editedInfo, class: text })}
                placeholder="Nhập lớp học"
                placeholderTextColor={theme.colors.TEXT + '80'}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.CARD }]}>
              <Text style={[styles.inputLabel, { color: theme.colors.TEXT }]}>
                🆔 Mã số sinh viên
              </Text>
              <TextInput
                style={[styles.textInput, { color: theme.colors.TEXT, borderColor: theme.colors.BORDER }]}
                value={editedInfo.studentId}
                onChangeText={(text) => setEditedInfo({ ...editedInfo, studentId: text })}
                placeholder="Nhập mã số sinh viên"
                placeholderTextColor={theme.colors.TEXT + '80'}
              />
            </View>

            <TouchableOpacity
              style={[styles.inputContainer, { backgroundColor: theme.colors.CARD }]}
              onPress={() => setShowZodiacModal(true)}
            >
              <Text style={[styles.inputLabel, { color: theme.colors.TEXT }]}>
                ⭐ Cung hoàng đạo
              </Text>
              <Text style={[styles.zodiacSelection, { color: theme.colors.TEXT }]}>
                {editedInfo.zodiacSign ? 
                  `${editedInfo.zodiacSign.symbol} ${editedInfo.zodiacSign.name}` : 
                  'Chọn cung hoàng đạo'
                }
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>❌ Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSave}
              >
                <LinearGradient
                  colors={COLORS.PRIMARY_GRADIENT}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>💾 Lưu</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Zodiac Selection Modal */}
      <Modal
        visible={showZodiacModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowZodiacModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.BACKGROUND }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.TEXT }]}>
              Chọn Cung Hoàng Đạo
            </Text>
            <ScrollView style={styles.zodiacList}>
              {ZODIAC_SIGNS.map((zodiac) => (
                <TouchableOpacity
                  key={zodiac.id}
                  style={[styles.zodiacItem, { backgroundColor: theme.colors.CARD }]}
                  onPress={() => handleZodiacSelect(zodiac)}
                >
                  <Text style={styles.zodiacSymbol}>{zodiac.symbol}</Text>
                  <View style={styles.zodiacInfo}>
                    <Text style={[styles.zodiacName, { color: theme.colors.TEXT }]}>
                      {zodiac.name}
                    </Text>
                    <Text style={[styles.zodiacDates, { color: theme.colors.TEXT }]}>
                      {zodiac.dates}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowZodiacModal(false)}
            >
              <Text style={styles.modalCloseText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 50,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  infoCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    flex: 2,
    textAlign: 'right',
  },
  editIcon: {
    fontSize: 16,
    marginLeft: 10,
  },
  editButton: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  editButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
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
  zodiacSelection: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 25,
    overflow: 'hidden',
  },
  cancelButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  zodiacList: {
    maxHeight: 400,
  },
  zodiacItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  zodiacSymbol: {
    fontSize: 24,
    marginRight: 15,
  },
  zodiacInfo: {
    flex: 1,
  },
  zodiacName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  zodiacDates: {
    fontSize: 14,
    opacity: 0.7,
  },
  modalCloseButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  modalCloseText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalProfileView;
