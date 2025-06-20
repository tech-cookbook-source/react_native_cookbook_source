# Ứng Dụng Thời Tiết Di Động

Ứng dụng thời tiết di động được phát triển bằng React Native với các tính năng hiện đại và giao diện người dùng thân thiện.

## ✨ Tính Năng Chính

### 🌐 Kiểm Tra Trạng Thái Kết Nối Mạng
- Theo dõi trạng thái kết nối internet theo thời gian thực
- Hiển thị thông báo khi mất kết nối hoặc khôi phục kết nối
- Tự động cập nhật dữ liệu khi kết nối được khôi phục

### 🌤️ Thông Tin Thời Tiết Chi Tiết
- Hiển thị thông tin thời tiết hiện tại cho các thành phố Việt Nam
- Bao gồm: nhiệt độ, điều kiện thời tiết, độ ẩm, tốc độ gió, chỉ số UV, tầm nhìn
- Biểu tượng thời tiết trực quan
- Thông tin "cảm giác như" (feels like temperature)

### 🏙️ Chọn Thành Phố
- Danh sách các thành phố chính của Việt Nam
- Giao diện chọn thành phố dễ sử dụng với chức năng tìm kiếm
- Hỗ trợ: Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Cần Thơ, Nha Trang, Huế, Vũng Tàu, Quy Nhon, Đà Lạt

### 🔔 Thông Báo Thông Minh
- Thông báo khi thay đổi trạng thái mạng
- Thông báo cập nhật thời tiết
- Thông báo lỗi khi không thể lấy dữ liệu
- Sử dụng Expo Notifications

### 📡 Broadcast Receiver
- Lắng nghe sự kiện thay đổi trạng thái mạng
- Tự động cập nhật giao diện khi có thay đổi
- Xử lý các sự kiện hệ thống

### 🎨 Giao Diện Đẹp Mắt
- Thiết kế gradient màu xanh dương hiện đại
- Giao diện responsive và thân thiện
- Hiệu ứng làm mờ và bóng đổ
- Pull-to-refresh để cập nhật dữ liệu

### 🛠️ Xử Lý Lỗi Thông Minh
- Hiển thị thông báo lỗi rõ ràng
- Nút "Thử lại" khi có lỗi
- Xử lý các trường hợp không có kết nối internet
- Validation dữ liệu từ API

## 🚀 Cài Đặt và Chạy Ứng Dụng

### Yêu Cầu Hệ Thống
- Node.js (v14 trở lên)
- npm hoặc yarn
- Expo CLI
- React Native development environment

### Bước 1: Clone và Cài Đặt Dependencies
```bash
cd Lab_10_part_1
npm install
```

### Bước 2: Cấu Hình Environment Variables
1. Copy file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

2. Đăng ký tài khoản miễn phí tại [WeatherAPI.com](https://www.weatherapi.com/)

3. Lấy API key của bạn từ dashboard

4. Mở file `.env` và cập nhật:
```env
EXPO_PUBLIC_WEATHER_API_KEY=your_actual_api_key_here
```

5. Tùy chỉnh các cài đặt khác nếu cần:
```env
EXPO_PUBLIC_DEFAULT_CITY=Hanoi
EXPO_PUBLIC_API_TIMEOUT=10000
EXPO_PUBLIC_REFRESH_INTERVAL=300000
EXPO_PUBLIC_DEBUG_MODE=false
```

### Bước 3: Chạy Ứng Dụng
```bash
# Chạy trên Android
npm run android

# Chạy trên iOS
npm run ios

# Chạy trên web
npm run web

# Chạy Expo development server
npm start
```

## 📱 Cách Sử Dụng

1. **Khởi động ứng dụng**: Mở ứng dụng trên thiết bị di động
2. **Chọn thành phố**: Nhấn vào nút "📍 Chọn thành phố" để chọn thành phố bạn muốn xem thời tiết
3. **Xem thông tin**: Thông tin thời tiết sẽ được hiển thị tự động
4. **Cập nhật dữ liệu**: Kéo xuống (pull-to-refresh) để cập nhật dữ liệu mới nhất
5. **Theo dõi kết nối**: Ứng dụng sẽ tự động thông báo khi có thay đổi về kết nối mạng

## 🏗️ Cấu Trúc Dự Án

```
Lab_10_part_1/
├── components/
│   ├── NetworkStatus.js      # Component hiển thị trạng thái mạng
│   ├── WeatherDisplay.js     # Component hiển thị thông tin thời tiết
│   └── CitySelector.js       # Component chọn thành phố
├── hooks/
│   └── useNetworkStatus.js   # Custom hook theo dõi trạng thái mạng
├── utils/
│   └── index.js              # Utility functions và validation
├── constants/
│   └── index.js              # Constants và configuration
├── assets/                   # Hình ảnh và tài nguyên
├── .env                      # Environment variables (bí mật)
├── .env.example             # Template cho environment variables
├── .gitignore               # Git ignore file
├── App.js                    # Component chính
├── package.json             # Dependencies và scripts
└── app.json                 # Cấu hình Expo
```

## 🔧 Công Nghệ Sử Dụng

- **React Native**: Framework phát triển mobile
- **Expo**: Platform phát triển React Native
- **@react-native-community/netinfo**: Theo dõi trạng thái mạng
- **expo-notifications**: Xử lý thông báo
- **expo-linear-gradient**: Tạo hiệu ứng gradient
- **WeatherAPI**: API cung cấp dữ liệu thời tiết

## 🎯 Tính Năng Nâng Cao

### Broadcast Receiver
Ứng dụng sử dụng NetInfo để lắng nghe các sự kiện thay đổi trạng thái mạng:
- Tự động phát hiện khi mất kết nối
- Tự động cập nhật khi khôi phục kết nối
- Gửi thông báo cho người dùng về trạng thái mạng

### Smart Error Handling
- Xử lý lỗi API một cách thông minh
- Hiển thị thông báo lỗi có ý nghĩa
- Cung cấp cách khắc phục cho người dùng
- Retry mechanism khi có lỗi

### Notification System
- Thông báo real-time về trạng thái mạng
- Thông báo cập nhật thời tiết
- Thông báo lỗi và hướng dẫn khắc phục
- Hỗ trợ cả iOS và Android

## �️ Cấu Hình Nâng Cao

### Environment Variables
Ứng dụng sử dụng các biến môi trường để cấu hình:

- `EXPO_PUBLIC_WEATHER_API_KEY`: API key từ WeatherAPI.com
- `EXPO_PUBLIC_DEFAULT_CITY`: Thành phố mặc định
- `EXPO_PUBLIC_API_TIMEOUT`: Timeout cho API calls (ms)
- `EXPO_PUBLIC_REFRESH_INTERVAL`: Khoảng thời gian tự động refresh (ms)
- `EXPO_PUBLIC_DEBUG_MODE`: Bật/tắt debug logging

### Debug Mode
Để bật debug mode, set `EXPO_PUBLIC_DEBUG_MODE=true` trong file `.env`. Điều này sẽ hiển thị thêm thông tin log trong console.

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi Environment Variables
- **Vấn đề**: "API key is not configured"
- **Giải pháp**: 
  1. Đảm bảo file `.env` tồn tại trong thư mục gốc
  2. Kiểm tra `EXPO_PUBLIC_WEATHER_API_KEY` có giá trị đúng
  3. Khởi động lại Expo development server

### Lỗi API Key
- **Vấn đề**: "Invalid API key" hoặc 401 error
- **Giải pháp**: 
  1. Kiểm tra API key có đúng không
  2. Đảm bảo API key chưa hết hạn
  3. Kiểm tra quota của API key trên WeatherAPI.com

### Lỗi Kết Nối Mạng
- **Vấn đề**: Hiển thị "Không có kết nối mạng"
- **Giải pháp**: Kiểm tra kết nối internet và thử lại

### Lỗi Dependencies
- **Vấn đề**: Lỗi khi chạy `npm install`
- **Giải pháp**: Xóa `node_modules` và `package-lock.json`, sau đó chạy lại `npm install`

## 📈 Tính Năng Có Thể Mở Rộng

1. **Dự báo nhiều ngày**: Thêm dự báo thời tiết 5-7 ngày
2. **Biểu đồ thời tiết**: Hiển thị biểu đồ nhiệt độ theo giờ
3. **Cảnh báo thời tiết**: Thông báo về thời tiết nguy hiểm
4. **Đa ngôn ngữ**: Hỗ trợ tiếng Anh và tiếng Việt
5. **Định vị GPS**: Tự động phát hiện vị trí hiện tại
6. **Widget**: Hiển thị thời tiết trên màn hình chính
7. **Lưu trữ offline**: Cache dữ liệu để xem khi không có mạng

## 📄 Giấy Phép

Dự án này được phát triển cho mục đích học tập và không có giấy phép thương mại.

## 👨‍💻 Hỗ Trợ

Nếu bạn gặp vấn đề gì, vui lòng:
1. Kiểm tra phần "Xử Lý Lỗi Thường Gặp" ở trên
2. Đảm bảo đã cấu hình API key đúng cách
3. Kiểm tra kết nối internet
4. Xem console logs để biết thêm chi tiết về lỗi
