import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ZODIAC_SIGNS, HOROSCOPE_MESSAGES, COLORS } from '../constants';
import { usePersonalInfo } from '../contexts/PersonalInfoContext';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

const HoroscopeView = () => {
  const { personalInfo } = usePersonalInfo();
  const { theme } = useTheme();
  const [selectedSign, setSelectedSign] = useState(null);
  const [todayMessage, setTodayMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (personalInfo.zodiacSign) {
      setSelectedSign(personalInfo.zodiacSign);
      generateHoroscopeMessage(personalInfo.zodiacSign);
    }
  }, [personalInfo.zodiacSign]);

  const generateHoroscopeMessage = (sign) => {
    if (!sign) return;
    
    const messages = HOROSCOPE_MESSAGES[sign.nameEn] || [];
    if (messages.length > 0) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setTodayMessage(messages[randomIndex]);
    }
  };

  const handleZodiacSelect = (sign) => {
    setSelectedSign(sign);
    generateHoroscopeMessage(sign);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCompatibilityMessage = () => {
    if (!selectedSign) return '';
    
    const compatibility = {
      'Aries': 'Hợp với: Sư Tử, Nhân Mã, Song Tử',
      'Taurus': 'Hợp với: Xử Nữ, Ma Kết, Cú Giải',
      'Gemini': 'Hợp với: Thiên Bình, Bảo Bình, Bạch Dương',
      'Cancer': 'Hợp với: Hổ Cáp, Song Ngư, Kim Ngau',
      'Leo': 'Hợp với: Bạch Dương, Nhân Mã, Song Tử',
      'Virgo': 'Hợp với: Kim Ngau, Ma Kết, Hổ Cáp',
      'Libra': 'Hợp với: Song Tử, Bảo Bình, Sư Tử',
      'Scorpio': 'Hợp với: Cự Giải, Song Ngư, Ma Kết',
      'Sagittarius': 'Hợp với: Bạch Dương, Sư Tử, Thiên Bình',
      'Capricorn': 'Hợp với: Kim Ngau, Xử Nữ, Hổ Cáp',
      'Aquarius': 'Hợp với: Song Tử, Thiên Bình, Nhân Mã',
      'Pisces': 'Hợp với: Cú Giải, Hổ Cáp, Kim Ngau',
    };
    
    return compatibility[selectedSign.nameEn] || '';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.BACKGROUND }]}>
      <LinearGradient
        colors={COLORS.HOROSCOPE_GRADIENT}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🔮 Tử Vi Hôm Nay</Text>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      </LinearGradient>

      {/* Zodiac Signs Grid */}
      <View style={styles.zodiacGrid}>
        <Text style={[styles.sectionTitle, { color: theme.colors.TEXT }]}>
          Chọn Cung Hoàng Đạo
        </Text>
        <View style={styles.signsContainer}>
          {ZODIAC_SIGNS.map((sign) => (
            <TouchableOpacity
              key={sign.id}
              style={[
                styles.signCard,
                selectedSign?.id === sign.id && styles.selectedSignCard,
                { backgroundColor: theme.colors.CARD }
              ]}
              onPress={() => handleZodiacSelect(sign)}
            >
              <Text style={styles.signSymbol}>{sign.symbol}</Text>
              <Text style={[styles.signName, { color: theme.colors.TEXT }]}>
                {sign.name}
              </Text>
              <Text style={[styles.signDates, { color: theme.colors.TEXT }]}>
                {sign.dates}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Horoscope Message */}
      {selectedSign && (
        <View style={styles.messageContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.messageCard}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.messageSymbol}>{selectedSign.symbol}</Text>
              <Text style={styles.messageTitle}>{selectedSign.name}</Text>
            </View>
            
            <Text style={styles.messageText}>{todayMessage}</Text>
            
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => generateHoroscopeMessage(selectedSign)}
            >
              <Text style={styles.refreshButtonText}>🔄 Xem thông điệp khác</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Compatibility */}
          <View style={[styles.compatibilityCard, { backgroundColor: theme.colors.CARD }]}>
            <Text style={[styles.compatibilityTitle, { color: theme.colors.TEXT }]}>
              💕 Cung Hợp
            </Text>
            <Text style={[styles.compatibilityText, { color: theme.colors.TEXT }]}>
              {getCompatibilityMessage()}
            </Text>
          </View>
        </View>
      )}

      {/* Lucky Numbers */}
      {selectedSign && (
        <View style={[styles.luckyCard, { backgroundColor: theme.colors.CARD }]}>
          <Text style={[styles.luckyTitle, { color: theme.colors.TEXT }]}>
            🍀 Số May Mắn Hôm Nay
          </Text>
          <View style={styles.luckyNumbers}>
            {[...Array(5)].map((_, index) => (
              <View key={index} style={styles.luckyNumber}>
                <Text style={styles.luckyNumberText}>
                  {Math.floor(Math.random() * 99) + 1}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 8,
    textAlign: 'center',
  },
  zodiacGrid: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  signsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  signCard: {
    width: (width - 60) / 3,
    aspectRatio: 1,
    margin: 5,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedSignCard: {
    borderWidth: 2,
    borderColor: '#4c669f',
  },
  signSymbol: {
    fontSize: 24,
    marginBottom: 5,
  },
  signName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signDates: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  messageContainer: {
    padding: 20,
  },
  messageCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  messageSymbol: {
    fontSize: 32,
    marginRight: 10,
  },
  messageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 15,
  },
  refreshButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  compatibilityCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  compatibilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  compatibilityText: {
    fontSize: 14,
    lineHeight: 20,
  },
  luckyCard: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  luckyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  luckyNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  luckyNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4c669f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  luckyNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HoroscopeView;
