# Hướng Dẫn Cấu Hình Chi Tiết

## 1. Cấu Hình MongoDB Atlas

### Bước 1: Thay thế mật khẩu trong file .env
1. Mở file `api/.env`
2. Thay thế `<db_password>` bằng mật khẩu thực của MongoDB Atlas user
3. Thay thế `your_jwt_secret_key_here` bằng một chuỗi bí mật bất kỳ (ví dụ: `my_super_secret_jwt_key_2024`)

Ví dụ:
```
MONGODB_URI=mongodb+srv://dbuser:your_real_password_here@cluster0.bexxzsd.mongodb.net/blog_management?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=my_super_secret_jwt_key_2024
PORT=3000
```

### Bước 2: Cấu hình Network Access trong MongoDB Atlas
1. Đăng nhập vào MongoDB Atlas
2. Vào mục "Network Access"
3. Thêm IP address hiện tại hoặc chọn "Allow access from anywhere" (0.0.0.0/0) để test

### Bước 3: Kiểm tra Database User
1. Vào mục "Database Access"
2. Đảm bảo user `dbuser` có quyền đọc/ghi database

## 2. Chạy Ứng Dụng

### Bước 1: Khởi động API Server
```bash
cd api
npm start
```

### Bước 2: Khởi động React Native App (Terminal mới)
```bash
npx expo start
```

### Bước 3: Test ứng dụng
1. Quét QR code bằng Expo Go app trên điện thoại
2. Hoặc nhấn 'w' để mở trên web browser

## 3. Test với Tài Khoản Demo

- **Admin**: admin@admin.com / admin123
- **User**: Đăng ký tài khoản mới

## 4. Lưu Ý Khi Test Trên Thiết Bị Thật

Nếu test trên điện thoại thật, cần thay đổi URL API:

1. Mở file `services/api.js`
2. Thay thế:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

Bằng:
```javascript
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:3000/api';
```

Để tìm IP máy tính:
- Windows: `ipconfig` trong cmd
- Tìm địa chỉ IPv4 (ví dụ: 192.168.1.100)

## 5. Troubleshooting

### API không kết nối được
- Kiểm tra API server đã chạy: http://localhost:3000
- Kiểm tra MongoDB connection string
- Kiểm tra Network Access trong MongoDB Atlas

### App không load được
- Kiểm tra URL API trong `services/api.js`
- Đảm bảo cả API server và Expo đều chạy
- Kiểm tra console để xem lỗi chi tiết
