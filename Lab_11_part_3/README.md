# Hệ Thống Quản Lý Người Dùng và Bài Viết

Ứng dụng React Native cho phép quản lý bài viết với phân quyền người dùng (User/Admin).

## Tính Năng

### Người Dùng Thường (User)
- Đăng nhập/Đăng ký tài khoản
- Xem danh sách tất cả bài viết
- Thêm bài viết mới
- Sửa bài viết của chính mình

### Quản Trị Viên (Admin)
- Tất cả tính năng của User
- Xóa bất kỳ bài viết nào
- Sửa bất kỳ bài viết nào

## Cài Đặt và Chạy Ứng Dụng

### 1. Cài đặt dependencies cho React Native App

```bash
cd c:\Users\shynn\Applications\react_native_cookbook_source\Lab_11_part_3
npm install
```

### 2. Thiết lập và chạy API Server

```bash
cd api
npm install
```

### 3. Cấu hình MongoDB Atlas

1. Mở file `api/.env`
2. Thay thế `<db_password>` bằng mật khẩu thực của MongoDB Atlas
3. Đảm bảo MongoDB Atlas cluster đã được tạo và có thể kết nối

### 4. Chạy API Server

```bash
cd api
npm start
```
Hoặc để phát triển với auto-reload:
```bash
npm run dev
```

API sẽ chạy tại: http://localhost:3000

### 5. Chạy React Native App

```bash
# Ở thư mục gốc của dự án
npx expo start
```

## Tài Khoản Demo

### Admin
- Email: admin@admin.com
- Mật khẩu: admin123

### User
- Có thể đăng ký tài khoản mới hoặc tạo thêm user thông qua tính năng đăng ký

## Cấu Trúc Dự Án

```
Lab_11_part_3/
├── api/                          # Backend API
│   ├── server.js                # Server chính
│   ├── package.json            # Dependencies API
│   └── .env                    # Cấu hình môi trường
├── contexts/
│   └── AuthContext.js          # Context quản lý authentication
├── screens/
│   ├── LoginScreen.js          # Màn hình đăng nhập
│   ├── HomeScreen.js           # Màn hình chính
│   └── PostFormScreen.js       # Form thêm/sửa bài viết
├── services/
│   └── api.js                  # API client
├── App.js                      # Component gốc
└── package.json               # Dependencies React Native
```

## API Endpoints

### Authentication
- `POST /api/login` - Đăng nhập
- `POST /api/register` - Đăng ký

### Posts
- `GET /api/posts` - Lấy danh sách bài viết
- `POST /api/posts` - Tạo bài viết mới
- `PUT /api/posts/:id` - Cập nhật bài viết
- `DELETE /api/posts/:id` - Xóa bài viết (chỉ admin)

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String ('user' | 'admin'),
  createdAt: Date
}
```

### Posts Collection
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  authorId: ObjectId,
  authorName: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Lưu Ý Quan Trọng

1. **MongoDB Atlas**: Đảm bảo đã thay thế mật khẩu thực trong file `.env`
2. **Network Security**: Thêm IP address vào whitelist trong MongoDB Atlas
3. **API URL**: Nếu test trên thiết bị thật, thay đổi `localhost` thành IP thực của máy trong file `services/api.js`
4. **CORS**: API đã được cấu hình CORS để cho phép kết nối từ React Native

## Troubleshooting

### Lỗi kết nối API
- Kiểm tra API server đã chạy chưa
- Kiểm tra URL API trong `services/api.js`
- Nếu test trên thiết bị thật, thay `localhost` bằng IP máy

### Lỗi MongoDB
- Kiểm tra connection string trong `.env`
- Đảm bảo IP đã được whitelist trong MongoDB Atlas
- Kiểm tra mật khẩu database user

### Lỗi dependencies
```bash
# Xóa node_modules và cài đặt lại
rm -rf node_modules
npm install

# Hoặc với API
cd api
rm -rf node_modules  
npm install
```
