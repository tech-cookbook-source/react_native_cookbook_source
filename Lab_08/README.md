# React Native Comprehensive App

A comprehensive React Native application showcasing multiple features and technologies including state management, real-time communication, data persistence, and modern UI components.

## � About This App

This is a multi-featured mobile application built with React Native and Expo that demonstrates various essential mobile development concepts. The app includes four main sections accessible through a bottom tab navigation:

1. **Todo Management** - Task management with API integration
2. **Contact Management** - Local contact storage and management
3. **Real-time Chat** - WebSocket-based chat with AI responses
4. **Booking System** - Appointment scheduling with local database

## 🚀 Key Features

### 1. **Todo Management**
- ✅ Redux Toolkit and Redux Thunk for state management
- ✅ JSONPlaceholder API integration for fetching data
- ✅ Add, delete, and mark tasks as complete
- ✅ "Connection Successful!" notification on successful API calls
- ✅ Loading states and comprehensive error handling

### 2. **Contact Management**
- ✅ Data persistence using AsyncStorage (Shared Preferences)
- ✅ Add, edit, and delete contacts
- ✅ Search and display contact lists
- ✅ Direct calling and emailing from the app
- ✅ Colorful avatars for each contact

### 3. **Real-time Chat with WebSocket**
- ✅ WebSocket connection with echo server
- ✅ Send and receive messages in real-time
- ✅ Connection status indicators
- ✅ "Connection Successful!" notification when WebSocket connects
- ✅ Auto-reconnect functionality when connection is lost
- ✅ AI response simulation with random delays

### 4. **Booking System with SQLite**
- ✅ SQLite database for appointment storage
- ✅ Add and delete appointments
- ✅ Display information: time, location, and content
- ✅ Differentiate between upcoming and past appointments
- ✅ Persistent storage with local database

## 🛠 Technologies Used

- **React Native** + **Expo** - Mobile app framework
- **Redux Toolkit** + **Redux Thunk** - State management
- **AsyncStorage** - Local storage solution
- **SQLite** - Local database
- **WebSocket** - Real-time communication
- **React Navigation** - Navigation system
- **React Native Paper** - Material Design UI components
- **JSONPlaceholder API** - Mock REST API
- **Google Generative AI** - AI integration

## 📱 User Interface

- **Beautiful Material Design** UI components
- **Bottom Tab Navigation** for four main features
- **Responsive Design** with smooth animations
- **Modern Color Scheme** and typography
- **Loading States** and comprehensive error handling
- **Snackbar Notifications** for user feedback

## 🔧 Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Lab_08
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (if needed)**
   ```bash
   # Create .env file if using API keys
   cp .env.example .env
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the development server**
   ```bash
   npm start
   ```
   This will start the Expo development server and show a QR code.

2. **Run on Android**
   ```bash
   npm run android
   ```
   Requires Android Studio and Android SDK to be installed.

3. **Run on iOS**
   ```bash
   npm run ios
   ```
   Requires Xcode (macOS only).

4. **Run on Web**
   ```bash
   npm run web
   ```
   Opens the app in your default web browser.

### Using Expo Go App

1. Install Expo Go on your mobile device from the App Store or Google Play Store
2. Run `npm start` in your project directory
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## 📋 Project Structure

```
src/
├── navigation/
│   └── Navigation.js          # Main navigation setup with bottom tabs
├── screens/
│   ├── TodoScreen.js          # Todo management with Redux
│   ├── ContactScreen.js       # Contact management with AsyncStorage
│   ├── ChatScreen.js          # Real-time chat with WebSocket
│   └── BookingScreen.js       # Booking system with SQLite
├── store/
│   ├── index.js               # Redux store configuration
│   └── slices/
│       ├── todoSlice.js       # Todo state management
│       ├── contactSlice.js    # Contact state management
│       ├── chatSlice.js       # Chat state management
│       └── bookingSlice.js    # Booking state management
├── services/
│   ├── websocketService.js    # WebSocket service for real-time chat
│   └── geminiService.js       # AI service integration
└── theme/
    └── AppTheme.js            # App-wide theme configuration
```

## ✅ Feature Checklist

- [x] **Redux Store** with Redux Thunk for async operations
- [x] **API Integration** with JSONPlaceholder
- [x] **Async Actions** for data fetching
- [x] **AsyncStorage** for contact management
- [x] **WebSocket** for real-time chat
- [x] **SQLite** for booking system
- [x] **Beautiful UI** with modern design
- [x] **Connection Success Messages** displayed on successful connections

## 🎯 App Functionality

### Todo Tab
- Load data from JSONPlaceholder API
- Add new todos with user input
- Delete existing todos
- Mark todos as complete/incomplete
- Real-time state updates with Redux

### Contact Tab
- Manage personal contacts locally
- Add contacts with name, phone, and email
- Edit existing contact information
- Delete contacts with confirmation
- Search contacts by name
- Direct calling and emailing functionality

### Chat Tab
- Real-time messaging with WebSocket connection
- Send and receive messages instantly
- Connection status indicators
- Auto-reconnect on connection loss
- AI-powered responses with random delays
- Message history and typing indicators

### Booking Tab
- Schedule appointments with date/time
- Add booking details (location, description)
- View upcoming and past appointments
- Delete bookings with confirmation
- Persistent storage using SQLite database

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Dependencies conflicts**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Android build issues**
   - Ensure Android SDK is properly configured
   - Check that Android Studio is installed
   - Verify USB debugging is enabled

4. **iOS build issues (macOS only)**
   - Ensure Xcode is installed and updated
   - Check iOS Simulator is available

## 📝 License

This project is created for educational purposes as part of a React Native development course.

---

**Note**: This application is designed to demonstrate various React Native development concepts and is not intended for production use without proper security considerations and error handling enhancements.
