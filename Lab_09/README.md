# Lab 9 - React Native Advanced Features

## Mô tả dự án
Ứng dụng React Native thực hành các tính năng nâng cao bao gồm:
1. Animation với Animated API
2. React Navigation với parameters
3. API debugging và xử lý lỗi
4. Tích hợp MongoDB (mô phỏng) để quản lý dữ liệu
5. Đồng bộ nhiều bộ đếm ngược

## Cài đặt

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy ứng dụng
```bash
npm start
```

## Tính năng chính

### 1. Animation Screen
- **Fade In**: Hiệu ứng làm mờ dần từ 0% đến 100%
- **Scale**: Phóng to hình vuông từ kích thước gốc
- **Translate**: Di chuyển hình vuông từ trái sang phải
- Các nút reset để đặt lại animation

### 2. Posts Screen - API Integration & Debugging
- Hiển thị danh sách bài viết từ JSONPlaceholder API
- Tính năng debug mode để thực hành xử lý lỗi
- Chi tiết bài viết với comments
- Pull-to-refresh functionality

#### Debugging Steps thực hiện:
1. **Tạo lỗi cố ý**: Sử dụng URL sai (`/post` thay vì `/posts`)
2. **Kiểm tra Console**: Xem error logs chi tiết
3. **Phân tích Response**: Kiểm tra status code và message
4. **Xác minh URL**: So sánh với API documentation
5. **Fix và test**: Sửa URL và kiểm tra lại

### 3. Friends Screen - MongoDB Integration
- Quản lý danh sách bạn bè (CRUD operations)
- Tích hợp MongoDB mô phỏng
- Tính năng tìm kiếm realtime
- Form validation và error handling

#### MongoDB Operations:
- `getAllFriends()`: Lấy danh sách tất cả bạn bè
- `addFriend()`: Thêm bạn bè mới
- `updateFriend()`: Cập nhật thông tin
- `deleteFriend()`: Xóa bạn bè
- `searchFriends()`: Tìm kiếm theo tên, phone, email

### 4. Countdown Screen - Multiple Timers
- Tạo và quản lý nhiều bộ đếm ngược đồng thời
- Mỗi timer chạy độc lập không ảnh hưởng UI chính
- Các chức năng: Start, Pause, Reset, Delete
- Thông báo khi timer hoàn thành
- Hiển thị thống kê realtime

#### Technical Implementation:
- Sử dụng `setInterval` cho mỗi timer
- `useRef` để quản lý intervals
- Cleanup intervals khi component unmount
- Async operations không block main thread

## Cấu trúc thư mục

```
src/
├── navigation/
│   └── AppNavigator.js     # React Navigation setup
├── screens/
│   ├── AnimationScreen.js  # Animation demonstrations
│   ├── PostsScreen.js      # API integration & debugging
│   ├── PostDetailScreen.js # Post details with params
│   ├── FriendsScreen.js    # MongoDB CRUD operations
│   └── CountdownScreen.js  # Multiple countdown timers
└── services/
    ├── PostService.js      # API service with debugging
    └── FriendsService.js   # MongoDB service (mock)
```

## Các thư viện sử dụng

- **@react-navigation/native**: Navigation giữa các screens
- **@react-navigation/stack**: Stack navigation
- **@react-navigation/bottom-tabs**: Bottom tab navigation
- **react-native-screens**: Screen management
- **react-native-safe-area-context**: Safe area handling
- **react-native-gesture-handler**: Gesture handling
- **react-native-reanimated**: Advanced animations
- **axios**: HTTP client cho API calls
- **mongoose**: MongoDB integration (trong production)

## Ghi chú Debug

### API Debugging Process:
1. **Enable Debug Mode**: Bật debug mode trong Posts screen
2. **Trigger Error**: API sẽ sử dụng URL sai
3. **Check Console**: Xem error logs chi tiết
4. **Analyze Error**: Phân tích status code và message
5. **Fix Issue**: Tắt debug mode để fix lỗi
6. **Verify Fix**: Kiểm tra API hoạt động bình thường

### Common Issues & Solutions:
- **Network Error**: Kiểm tra kết nối internet
- **404 Error**: Xác minh URL endpoint
- **Timeout**: Kiểm tra API server status
- **Parsing Error**: Xác minh JSON response format

## Khuyến nghị phát triển

1. **Production MongoDB**: Thay thế mock service bằng real MongoDB connection
2. **Push Notifications**: Thêm notification khi countdown complete
3. **Persistent Storage**: Lưu trữ timers khi app restart
4. **Background Processing**: Sử dụng background tasks cho timers
5. **Error Boundaries**: Thêm error boundaries cho better UX

## Testing

Để test các tính năng:
1. Test animations bằng cách nhấn các nút
2. Test API bằng cách bật/tắt debug mode
3. Test MongoDB operations với CRUD
4. Test multiple timers cùng lúc
5. Test navigation parameters giữa screens
