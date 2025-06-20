import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  TouchableOpacity,
  Text,
  Alert,
  BackHandler,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

// Components
import WeatherView from './components/WeatherView';
import HoroscopeView from './components/HoroscopeView';
import PersonalProfileView from './components/PersonalProfileView';
import OptionMenu from './components/OptionMenu';
import ContextMenu from './components/ContextMenu';

// Contexts
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { PersonalInfoProvider } from './contexts/PersonalInfoContext';

// Services and utilities
import { notificationService } from './services/notificationService';
import { validateApiKey } from './utils';
import { COLORS, TABS } from './constants';

// Remove initialLayout since we're not using TabView anymore

const MainApp = () => {
  const { theme, isLoading } = useTheme();
  const [activeTab, setActiveTab] = useState(TABS.WEATHER);
  const [showOptionMenu, setShowOptionMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [events, setEvents] = useState([]);
  
  const notificationListener = useRef();
  const responseListener = useRef();

  const tabs = [
    { key: TABS.WEATHER, title: 'Thời Tiết', icon: '🌤️' },
    { key: TABS.HOROSCOPE, title: 'Tử Vi', icon: '🔮' },
    { key: TABS.PROFILE, title: 'Hồ Sơ', icon: '👤' },
  ];

  // Khởi tạo notifications và validate API key - MUST be before any early returns
  useEffect(() => {
    const initializeApp = async () => {
      // Validate API key
      const apiValidation = validateApiKey();
      if (!apiValidation.isValid) {
        Alert.alert(
          'Cấu hình API Key',
          apiValidation.message + '\n\nVui lòng kiểm tra file .env và khởi động lại ứng dụng.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Initialize notifications
      await notificationService.requestPermissions();
    };
    
    initializeApp();

    // Listener cho notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    // Handle Android back button
    const backAction = () => {
      Alert.alert(
        'Thoát ứng dụng',
        'Bạn có chắc chắn muốn thoát ứng dụng?',
        [
          {
            text: 'Hủy',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Thoát', onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      backHandler.remove();
    };
  }, []);

  // Show loading while theme is being loaded - AFTER all hooks
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#4c669f' }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🌟 Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case TABS.WEATHER:
        return <WeatherView />;
      case TABS.HOROSCOPE:
        return <HoroscopeView />;
      case TABS.PROFILE:
        return <PersonalProfileView />;
      default:
        return <WeatherView />;
    }
  };

  const renderTabBar = () => (
    <View style={[styles.tabBar, { backgroundColor: theme.isDark ? COLORS.DARK_THEME.BACKGROUND : '#4c669f' }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tabButton,
            activeTab === tab.key && styles.activeTabButton
          ]}
          onPress={() => setActiveTab(tab.key)}
        >
          <Text style={[styles.tabIcon, { opacity: activeTab === tab.key ? 1 : 0.7 }]}>
            {tab.icon}
          </Text>
          <Text
            style={[
              styles.tabText,
              { 
                color: activeTab === tab.key ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                fontSize: 10,
              }
            ]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleLongPress = (event) => {
    // Use a default position if event data is not available
    let x = 50, y = 100;
    
    if (event && event.nativeEvent) {
      x = event.nativeEvent.pageX || event.nativeEvent.locationX || 50;
      y = event.nativeEvent.pageY || event.nativeEvent.locationY || 100;
    }
    
    setContextMenuPosition({ x, y });
    setShowContextMenu(true);
  };

  const handleContextMenuAction = (action, data) => {
    switch (action) {
      case 'add_event':
        setEvents(prev => [...prev, data]);
        break;
      case 'refresh':
        // Refresh current tab
        console.log('Refreshing current tab');
        break;
      case 'settings':
        setShowOptionMenu(true);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.BACKGROUND }]}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      
      {/* Header with menu button */}
      <View style={[styles.header, { backgroundColor: theme.isDark ? COLORS.DARK_THEME.BACKGROUND : '#4c669f' }]}>
        <Text style={styles.headerTitle}>🌟 Ứng Dụng Đa Chức Năng</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowOptionMenu(true)}
        >
          <Text style={styles.menuButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {renderTabBar()}
        <View style={styles.tabContent}>
          {renderActiveTab()}
        </View>
        
        {/* Floating Action Button for Context Menu */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            setContextMenuPosition({ x: 200, y: 400 });
            setShowContextMenu(true);
          }}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Option Menu */}
      <OptionMenu
        visible={showOptionMenu}
        onClose={() => setShowOptionMenu(false)}
      />

      {/* Context Menu */}
      <ContextMenu
        visible={showContextMenu}
        onClose={() => setShowContextMenu(false)}
        position={contextMenuPosition}
        onAction={handleContextMenuAction}
      />
    </SafeAreaView>
  );
};

// Wrap the main app with providers
export default function App() {
  return (
    <ThemeProvider>
      <PersonalInfoProvider>
        <MainApp />
      </PersonalInfoProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuButtonText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
  },
  tabContent: {
    flex: 1,
  },
  tabLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  tabIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  tabText: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4c669f',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
