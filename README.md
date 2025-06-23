# React Native Cookbook - Bộ Sưu Tập 11 Ứng Dụng Thực Hành

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-49.0-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Bộ sưu tập 11 ứng dụng React Native từ cơ bản đến nâng cao, được thiết kế như một cuốn cookbook thực hành để học React Native development. Mỗi lab đại diện cho một chủ đề cụ thể với độ phức tạp tăng dần.

## 📋 Mục Lục

- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt](#cài-đặt)
- [Danh Sách Các Lab](#danh-sách-các-lab)
- [Kiến Thức Thu Được](#kiến-thức-thu-được)
- [Cách Sử Dụng](#cách-sử-dụng)
- [Hỗ Trợ](#hỗ-trợ)

## 🔧 Yêu Cầu Hệ Thống

- **Node.js**: v14 hoặc cao hơn
- **npm** hoặc **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **React Native CLI** (tùy chọn)
- **MongoDB** (cho Lab 07, 08, 11_part_3)
- **Android Studio** hoặc **Xcode** (để test trên thiết bị thật)

## 🚀 Cài Đặt

1. **Clone repository:**
```bash
git clone <repository-url>
cd react_native_cookbook_source
```

2. **Cài đặt dependencies cho từng lab:**
```bash
# Ví dụ cho LAB_01
cd LAB_01
npm install

# Chạy ứng dụng
npm start
```

## 📚 Danh Sách Các Lab

### 🎯 **LAB_01: Khởi Đầu với React Native**
**Chủ đề:** Cơ bản về React Native Components và Styling  
**Nội dung:**
- Tạo ứng dụng đầu tiên với Expo
- Sử dụng Text, View components
- Styling với StyleSheet
- Hiển thị thông tin cá nhân

**Kiến thức:** `React Native Basics`, `StyleSheet`, `Flexbox`

---

### 🎯 **LAB_02: Xử Lý Sự Kiện và Danh Sách**
**Chủ đề:** Event Handling và Data Processing  
**Nội dung:**
- Xử lý sự kiện onClick, onPress
- Quản lý state với useState
- Xử lý dữ liệu sinh viên (sắp xếp, lọc)
- Navigation với Bottom Tab Navigator
- Custom hooks cho event handling

**Files chính:**
- `eventHandler.js` - Custom hooks xử lý sự kiện
- `studentStatistics.js` - Xử lý và thống kê dữ liệu

**Kiến thức:** `Event Handling`, `useState`, `Custom Hooks`, `Data Processing`, `Navigation`

---

### 🎯 **LAB_03: UI Components Nâng Cao**
**Chủ đề:** Advanced UI Components  
**Nội dung:**
- Checkbox và RadioButton components
- FlatList và SectionList để hiển thị danh sách
- Modal và ActivityIndicator
- Tab Navigation

**Files chính:**
- `CheckboxRadioButton.js` - Bài tập 1
- `FlatListSectionList.js` - Bài tập 2  
- `ModalActivityIndicator.js` - Bài tập 3

**Kiến thức:** `FlatList`, `SectionList`, `Modal`, `ActivityIndicator`, `Checkbox`, `RadioButton`

---

### 🎯 **LAB_04: Styling và UI Enhancement**
**Chủ đề:** Styling, StatusBar và Login Form  
**Nội dung:**
- Advanced StyleSheet techniques
- Spinner/Loading components
- StatusBar customization và Pull-to-Refresh
- Login screen với form validation

**Files chính:**
- `StyleSheetSpinner.js` - Styling và Spinner
- `StatusBarRefresh.js` - StatusBar và Refresh
- `LoginScreen.js` - Form đăng nhập

**Kiến thức:** `Advanced Styling`, `StatusBar`, `RefreshControl`, `Form Validation`

---

### 🎯 **LAB_05: Quản Lý State và Logic**
**Chủ đề:** State Management và Business Logic  
**Nội dung:**
- Quản lý danh sách công việc (Todo)
- Hệ thống lịch hẹn (Appointment)
- State management phức tạp
- Business logic separation

**Files chính:**
- `TodoScreen.js` - Quản lý công việc
- `AppointmentScreen.js` - Lịch hẹn
- `AppointmentLogic.js` - Business logic

**Kiến thức:** `Complex State Management`, `Business Logic`, `Data Persistence`

---

### 🎯 **LAB_06: Navigation và Gestures**
**Chủ đề:** Drawer Navigation và Flexbox  
**Nội dung:**
- Drawer Navigation với custom content
- Gesture Handler integration
- Multiple screens management
- Flexbox layouts practice

**Files chính:**
- `screens/` - Các màn hình khác nhau
- `components/CustomDrawerContent.js` - Custom drawer
- `screens/FlexboxScreen.js` - Thực hành Flexbox

**Kiến thức:** `Drawer Navigation`, `Gesture Handler`, `Custom Components`, `Flexbox`

---

### 🎯 **LAB_07: Authentication System với MongoDB**
**Chủ đề:** Full-Stack Authentication  
**Nội dung:**
- Backend với Node.js + Express + MongoDB
- JWT Authentication
- User registration và login
- Password hashing với bcryptjs
- Protected routes và middleware
- AsyncStorage cho token management

**Cấu trúc:**
```
Lab_07/
├── backend/          # Node.js API server
├── contexts/         # React Context cho auth
├── navigation/       # Navigation setup
├── screens/         # Auth screens
└── services/        # API services
```

**Kiến thức:** `Authentication`, `JWT`, `MongoDB`, `API Integration`, `Security`

---

### 🎯 **LAB_08: Comprehensive App với Multiple Features**
**Chủ đề:** Multi-Feature Application  
**Nội dung:**
- Redux Toolkit + Redux Thunk
- WebSocket real-time chat
- AsyncStorage data persistence
- API integration với JSONPlaceholder
- 4 modules chính: Todo, Contacts, Chat, Booking

**Modules:**
1. **Todo Management** - Redux state management
2. **Contact Management** - AsyncStorage persistence  
3. **Real-time Chat** - WebSocket + AI responses
4. **Booking System** - Appointment scheduling

**Kiến thức:** `Redux Toolkit`, `WebSocket`, `AsyncStorage`, `Multi-module Architecture`

---

### 🎯 **LAB_09: Advanced Features**
**Chủ đề:** Animation và Advanced APIs  
**Nội dung:**
- Animation với Animated API
- React Navigation với parameters
- API debugging và error handling
- MongoDB integration (mô phỏng)
- Multiple countdown timers

**Features:**
- Fade In/Out animations
- Scale và Translate effects
- API error handling
- Data synchronization

**Kiến thức:** `Animated API`, `Advanced Navigation`, `Error Handling`, `Debugging`

---

### 🎯 **LAB_10_part_1: Weather App với Network Detection**
**Chủ đề:** Network Status và External APIs  
**Nội dung:**
- Kiểm tra trạng thái kết nối mạng real-time
- Weather API integration
- Expo Notifications
- Broadcast Receiver cho network events
- Custom hooks cho network status

**Features:**
- Real-time network status monitoring
- Weather data cho các thành phố Việt Nam
- Smart notifications
- Auto-refresh khi reconnect

**Kiến thức:** `Network Detection`, `External APIs`, `Notifications`, `Real-time Updates`

---

### 🎯 **LAB_10_part_2: [Mở rộng của Part 1]**
**Chủ đề:** Enhanced Weather Features  
**Nội dung:** Phát triển thêm tính năng cho ứng dụng thời tiết

---

### 🎯 **LAB_11_part_1: Music Player**
**Chủ đề:** Media Player Development  
**Nội dung:**
- Audio playback với Expo AV
- Music player controls
- Playlist management
- Media file handling

**Files chính:**
- `MusicPlayer.js` - Main player component
- `data/` - Music data
- `utils/` - Player utilities

**Kiến thức:** `Audio Playback`, `Media Controls`, `File Management`

---

### 🎯 **LAB_11_part_2: [Music Player Extended]**
**Chủ đề:** Advanced Music Player Features

---

### 🎯 **LAB_11_part_3: User Management System**
**Chủ đề:** Full-Stack CRUD với Authentication  
**Nội dung:**
- Hệ thống quản lý người dùng và bài viết
- Phân quyền User/Admin
- CRUD operations
- RESTful API với Node.js
- Role-based access control

**Features:**
- **User Role:** Xem, thêm, sửa bài viết của mình
- **Admin Role:** Full CRUD permissions
- Authentication với JWT
- Role-based UI rendering

**Cấu trúc:**
```
Lab_11_part_3/
├── api/              # Node.js API server  
├── screens/          # App screens
├── contexts/         # Auth context
└── services/         # API services
```

**Kiến thức:** `Role-based Access`, `CRUD Operations`, `RESTful API`, `Admin Panel`

---

## 🎓 Kiến Thức Thu Được

### **Frontend Development**
- React Native core concepts
- Component lifecycle và hooks
- State management (useState, Redux Toolkit)
- Navigation (Stack, Tab, Drawer)
- Styling và responsive design
- Animation và gestures
- Form handling và validation

### **Backend Development**  
- Node.js + Express API development
- MongoDB database design
- JWT authentication
- RESTful API principles
- Middleware và security
- Error handling

### **Advanced Topics**
- WebSocket real-time communication
- Network status monitoring
- File và media handling
- Push notifications
- Data persistence strategies
- Performance optimization

### **Best Practices**
- Code organization và architecture
- Custom hooks và reusable components
- Error boundary và debugging
- Security practices
- Testing strategies

## 🎯 Cách Sử Dụng

### **Cho Người Mới Bắt Đầu:**
1. Bắt đầu từ LAB_01 và làm theo thứ tự
2. Đọc kỹ code và comment trong mỗi file
3. Thử modify code để hiểu cách hoạt động
4. Chạy từng lab và test trên device

### **Cho Developer Có Kinh Nghiệm:**
1. Có thể skip các lab cơ bản
2. Focus vào các lab nâng cao (07, 08, 09, 11)
3. Sử dụng như reference cho projects
4. Customize và extend features

### **Chạy Từng Lab:**
```bash
# Vào thư mục lab
cd LAB_XX

# Cài đặt dependencies
npm install

# Chạy với Expo
npm start

# Scan QR code với Expo Go app
```

### **Chạy Lab Có Backend:**
```bash
# Lab 07, 08, 11_part_3
cd LAB_XX/backend  # hoặc api/
npm install
npm start          # Chạy backend trước

# Terminal khác
cd LAB_XX
npm install  
npm start          # Chạy React Native app
```

## 🛠️ Troubleshooting

### **Common Issues:**
1. **Metro bundler issues:** `npx react-native start --reset-cache`
2. **Dependencies conflicts:** Xóa `node_modules` và `npm install` lại
3. **Expo version mismatch:** Update Expo CLI: `npm install -g @expo/cli`
4. **MongoDB connection:** Kiểm tra MongoDB service đang chạy

### **Performance Tips:**
- Sử dụng `useMemo` và `useCallback` cho optimization
- Implement lazy loading cho large lists
- Optimize images và media files
- Monitor memory usage

## 📱 Test Devices

**Recommended Testing:**
- **iOS:** iPhone simulator hoặc physical device
- **Android:** Android emulator hoặc physical device  
- **Expo Go:** For quick testing và development

## 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Hỗ Trợ

- **Issues:** [GitHub Issues](link-to-issues)
- **Discussions:** [GitHub Discussions](link-to-discussions)
- **Documentation:** Xem README trong từng lab folder

## 🌟 Acknowledgments

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

**Chúc bạn học tập hiệu quả với React Native Cookbook! 🚀**

*Nếu repository này hữu ích, hãy cho một ⭐ star để ủng hộ nhé!*
