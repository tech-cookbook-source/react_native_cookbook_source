# React Native Cookbook - Collection of 11 Practical Applications

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-49.0-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Language:** [🇻🇳 Tiếng Việt](README.md) | [🇺🇸 English](README-EN.md)

A collection of 11 React Native applications from basic to advanced, designed as a practical cookbook for learning React Native development. Each lab represents a specific topic with increasing complexity.

## 📋 Table of Contents

- [System Requirements](#system-requirements)
- [Installation](#installation)
- [List of Labs](#list-of-labs)
- [Knowledge Gained](#knowledge-gained)
- [How to Use](#how-to-use)
- [Support](#support)

## 🔧 System Requirements

- **Node.js**: v14 or higher
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **React Native CLI** (optional)
- **MongoDB** (for Lab 07, 08, 11_part_3)
- **Android Studio** or **Xcode** (for testing on real devices)

## 🚀 Installation

1. **Clone repository:**
```bash
git clone <repository-url>
cd react_native_cookbook_source
```

2. **Install dependencies for each lab:**
```bash
# Example for LAB_01
cd LAB_01
npm install

# Run the application
npm start
```

## 📚 List of Labs

### 🎯 **LAB_01: Getting Started with React Native**
**Topic:** React Native Components and Styling Basics  
**Content:**
- Create first app with Expo
- Using Text, View components
- Styling with StyleSheet
- Display personal information

**Knowledge:** `React Native Basics`, `StyleSheet`, `Flexbox`

---

### 🎯 **LAB_02: Event Handling and Lists**
**Topic:** Event Handling and Data Processing  
**Content:**
- Handle onClick, onPress events
- State management with useState
- Student data processing (sorting, filtering)
- Navigation with Bottom Tab Navigator
- Custom hooks for event handling

**Main Files:**
- `eventHandler.js` - Custom hooks for event handling
- `studentStatistics.js` - Data processing and statistics

**Knowledge:** `Event Handling`, `useState`, `Custom Hooks`, `Data Processing`, `Navigation`

---

### 🎯 **LAB_03: Advanced UI Components**
**Topic:** Advanced UI Components  
**Content:**
- Checkbox and RadioButton components
- FlatList and SectionList for displaying lists
- Modal and ActivityIndicator
- Tab Navigation

**Main Files:**
- `CheckboxRadioButton.js` - Exercise 1
- `FlatListSectionList.js` - Exercise 2  
- `ModalActivityIndicator.js` - Exercise 3

**Knowledge:** `FlatList`, `SectionList`, `Modal`, `ActivityIndicator`, `Checkbox`, `RadioButton`

---

### 🎯 **LAB_04: Styling and UI Enhancement**
**Topic:** Styling, StatusBar and Login Form  
**Content:**
- Advanced StyleSheet techniques
- Spinner/Loading components
- StatusBar customization and Pull-to-Refresh
- Login screen with form validation

**Main Files:**
- `StyleSheetSpinner.js` - Styling and Spinner
- `StatusBarRefresh.js` - StatusBar and Refresh
- `LoginScreen.js` - Login form

**Knowledge:** `Advanced Styling`, `StatusBar`, `RefreshControl`, `Form Validation`

---

### 🎯 **LAB_05: State Management and Logic**
**Topic:** State Management and Business Logic  
**Content:**
- Todo list management
- Appointment system
- Complex state management
- Business logic separation

**Main Files:**
- `TodoScreen.js` - Task management
- `AppointmentScreen.js` - Appointments
- `AppointmentLogic.js` - Business logic

**Knowledge:** `Complex State Management`, `Business Logic`, `Data Persistence`

---

### 🎯 **LAB_06: Navigation and Gestures**
**Topic:** Drawer Navigation and Flexbox  
**Content:**
- Drawer Navigation with custom content
- Gesture Handler integration
- Multiple screens management
- Flexbox layouts practice

**Main Files:**
- `screens/` - Different screens
- `components/CustomDrawerContent.js` - Custom drawer
- `screens/FlexboxScreen.js` - Flexbox practice

**Knowledge:** `Drawer Navigation`, `Gesture Handler`, `Custom Components`, `Flexbox`

---

### 🎯 **LAB_07: Authentication System with MongoDB**
**Topic:** Full-Stack Authentication  
**Content:**
- Backend with Node.js + Express + MongoDB
- JWT Authentication
- User registration and login
- Password hashing with bcryptjs
- Protected routes and middleware
- AsyncStorage for token management

**Structure:**
```
Lab_07/
├── backend/          # Node.js API server
├── contexts/         # React Context for auth
├── navigation/       # Navigation setup
├── screens/         # Auth screens
└── services/        # API services
```

**Knowledge:** `Authentication`, `JWT`, `MongoDB`, `API Integration`, `Security`

---

### 🎯 **LAB_08: Comprehensive App with Multiple Features**
**Topic:** Multi-Feature Application  
**Content:**
- Redux Toolkit + Redux Thunk
- WebSocket real-time chat
- AsyncStorage data persistence
- API integration with JSONPlaceholder
- 4 main modules: Todo, Contacts, Chat, Booking

**Modules:**
1. **Todo Management** - Redux state management
2. **Contact Management** - AsyncStorage persistence  
3. **Real-time Chat** - WebSocket + AI responses
4. **Booking System** - Appointment scheduling

**Knowledge:** `Redux Toolkit`, `WebSocket`, `AsyncStorage`, `Multi-module Architecture`

---

### 🎯 **LAB_09: Advanced Features**
**Topic:** Animation and Advanced APIs  
**Content:**
- Animation with Animated API
- React Navigation with parameters
- API debugging and error handling
- MongoDB integration (simulation)
- Multiple countdown timers

**Features:**
- Fade In/Out animations
- Scale and Translate effects
- API error handling
- Data synchronization

**Knowledge:** `Animated API`, `Advanced Navigation`, `Error Handling`, `Debugging`

---

### 🎯 **LAB_10_part_1: Weather App with Network Detection**
**Topic:** Network Status and External APIs  
**Content:**
- Real-time network connection status monitoring
- Weather API integration
- Expo Notifications
- Broadcast Receiver for network events
- Custom hooks for network status

**Features:**
- Real-time network status monitoring
- Weather data for Vietnamese cities
- Smart notifications
- Auto-refresh on reconnect

**Knowledge:** `Network Detection`, `External APIs`, `Notifications`, `Real-time Updates`

---

### 🎯 **LAB_10_part_2: [Extension of Part 1]**
**Topic:** Enhanced Weather Features  
**Content:** Further development of weather app features

---

### 🎯 **LAB_11_part_1: Music Player**
**Topic:** Media Player Development  
**Content:**
- Audio playback with Expo AV
- Music player controls
- Playlist management
- Media file handling

**Main Files:**
- `MusicPlayer.js` - Main player component
- `data/` - Music data
- `utils/` - Player utilities

**Knowledge:** `Audio Playback`, `Media Controls`, `File Management`

---

### 🎯 **LAB_11_part_2: [Music Player Extended]**
**Topic:** Advanced Music Player Features

---

### 🎯 **LAB_11_part_3: User Management System**
**Topic:** Full-Stack CRUD with Authentication  
**Content:**
- User and post management system
- User/Admin role permissions
- CRUD operations
- RESTful API with Node.js
- Role-based access control

**Features:**
- **User Role:** View, add, edit own posts
- **Admin Role:** Full CRUD permissions
- JWT Authentication
- Role-based UI rendering

**Structure:**
```
Lab_11_part_3/
├── api/              # Node.js API server  
├── screens/          # App screens
├── contexts/         # Auth context
└── services/         # API services
```

**Knowledge:** `Role-based Access`, `CRUD Operations`, `RESTful API`, `Admin Panel`

---

## 🎓 Knowledge Gained

### **Frontend Development**
- React Native core concepts
- Component lifecycle and hooks
- State management (useState, Redux Toolkit)
- Navigation (Stack, Tab, Drawer)
- Styling and responsive design
- Animation and gestures
- Form handling and validation

### **Backend Development**  
- Node.js + Express API development
- MongoDB database design
- JWT authentication
- RESTful API principles
- Middleware and security
- Error handling

### **Advanced Topics**
- WebSocket real-time communication
- Network status monitoring
- File and media handling
- Push notifications
- Data persistence strategies
- Performance optimization

### **Best Practices**
- Code organization and architecture
- Custom hooks and reusable components
- Error boundary and debugging
- Security practices
- Testing strategies

## 🎯 How to Use

### **For Beginners:**
1. Start from LAB_01 and follow the sequence
2. Read code and comments in each file carefully
3. Try modifying code to understand how it works
4. Run each lab and test on device

### **For Experienced Developers:**
1. Can skip basic labs
2. Focus on advanced labs (07, 08, 09, 11)
3. Use as reference for projects
4. Customize and extend features

### **Running Each Lab:**
```bash
# Navigate to lab directory
cd LAB_XX

# Install dependencies
npm install

# Run with Expo
npm start

# Scan QR code with Expo Go app
```

### **Running Labs with Backend:**
```bash
# Lab 07, 08, 11_part_3
cd LAB_XX/backend  # or api/
npm install
npm start          # Run backend first

# Another terminal
cd LAB_XX
npm install  
npm start          # Run React Native app
```

## 🛠️ Troubleshooting

### **Common Issues:**
1. **Metro bundler issues:** `npx react-native start --reset-cache`
2. **Dependencies conflicts:** Delete `node_modules` and run `npm install` again
3. **Expo version mismatch:** Update Expo CLI: `npm install -g @expo/cli`
4. **MongoDB connection:** Check if MongoDB service is running

### **Performance Tips:**
- Use `useMemo` and `useCallback` for optimization
- Implement lazy loading for large lists
- Optimize images and media files
- Monitor memory usage

## 📱 Test Devices

**Recommended Testing:**
- **iOS:** iPhone simulator or physical device
- **Android:** Android emulator or physical device  
- **Expo Go:** For quick testing and development

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

- **Issues:** [GitHub Issues](link-to-issues)
- **Discussions:** [GitHub Discussions](link-to-discussions)
- **Documentation:** See README in each lab folder

## 🌟 Acknowledgments

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

**Happy learning with React Native Cookbook! 🚀**

*If this repository is helpful, please give it a ⭐ star to support!*
