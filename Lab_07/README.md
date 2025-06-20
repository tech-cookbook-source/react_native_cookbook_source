# Lab 07 - Authentication System with MongoDB & React Native

A complete authentication system built with MongoDB, Node.js (Express) backend, and React Native frontend featuring user registration, login, profile management, and JWT token authentication.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- ✅ MongoDB integration with Mongoose
- ✅ User registration and login
- ✅ Password hashing with bcryptjs  
- ✅ JWT token authentication
- ✅ Protected routes with middleware
- ✅ User profile management (view/update)
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation and error handling

### Frontend (React Native + Expo)
- ✅ Beautiful UI with React Native Paper
- ✅ Login and Registration screens
- ✅ Home screen with user profile display
- ✅ Profile editing functionality
- ✅ JWT token storage with AsyncStorage
- ✅ Navigation with React Navigation
- ✅ Form validation and error handling
- ✅ Loading states and pull-to-refresh

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Expo CLI
- React Native development environment
- Android Studio (for Android) or Xcode (for iOS)

## 🛠️ Installation & Setup

### 1. MongoDB Setup

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   mongod
   ```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `.env` file in backend folder

### 2. Backend Setup

1. Navigate to backend directory:
   ```cmd
   cd backend
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Configure environment variables:
   - Copy `.env` file and update with your settings:
   ```
   MONGODB_URI=mongodb://localhost:27017/lab07_auth
   JWT_SECRET=your_super_secret_jwt_key_here_please_change_in_production
   PORT=3000
   ```

4. Start the backend server:
   ```cmd
   npm run dev
   ```
   
   The server will run on `http://localhost:3000`

5. Test the API:
   - Open browser and go to `http://localhost:3000`
   - Test endpoint: `http://localhost:3000/api/test`

### 3. Frontend Setup

1. Navigate back to main directory:
   ```cmd
   cd ..
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Update API configuration:
   - Open `services/api.js`
   - Update `BASE_URL` with your local IP address:
   ```javascript
   const BASE_URL = 'http://YOUR_LOCAL_IP:3000/api';
   ```
   
   To find your local IP:
   ```cmd
   ipconfig
   ```
   Look for IPv4 Address under your network adapter.

4. Start the React Native app:
   ```cmd
   npm start
   ```

5. Run on device/emulator:
   - Press `a` for Android
   - Press `i` for iOS
   - Or scan QR code with Expo Go app

## 📱 How to Use

### Registration
1. Launch the app
2. Tap "Sign Up" on login screen
3. Fill in required information:
   - Full Name (required)
   - Email (required) 
   - Password (required, min 6 chars)
   - Confirm Password (required)
   - Phone (optional)
   - Address (optional)
4. Tap "Create Account"

### Login
1. Enter registered email and password
2. Tap "Sign In"
3. You'll be redirected to the Home screen

### Profile Management
1. On Home screen, tap the edit icon or "Edit Profile" button
2. Update your information
3. Tap "Save Changes"

### Logout
1. On Home screen, tap "Logout" button
2. Confirm logout in the alert dialog

## 🔧 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/test` | Test API connection | No |
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

## 📂 Project Structure

```
Lab_07/
├── backend/                 # Node.js Backend
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/
│   │   └── User.js         # User model (Mongoose)
│   ├── routes/
│   │   └── auth.js         # Authentication routes
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Express server setup
├── contexts/
│   └── AuthContext.js      # React Context for auth state
├── navigation/
│   └── AppNavigator.js     # React Navigation setup
├── screens/
│   ├── LoginScreen.js      # Login interface
│   ├── RegisterScreen.js   # Registration interface
│   ├── HomeScreen.js       # User dashboard
│   └── ProfileScreen.js    # Profile editing
├── services/
│   └── api.js              # Axios API configuration
├── App.js                  # Main app component
└── package.json            # Frontend dependencies
```

## 🔐 Security Features

- **Password Hashing**: Uses bcryptjs with salt rounds
- **JWT Tokens**: Secure authentication with 7-day expiration
- **Input Validation**: Server-side validation with Mongoose
- **Protected Routes**: Middleware to verify JWT tokens
- **CORS Configuration**: Controlled cross-origin access
- **Environment Variables**: Sensitive data stored in .env

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **API Connection Failed**
   - Update IP address in `services/api.js`
   - Ensure backend server is running
   - Check firewall settings

3. **Metro Bundler Issues**
   ```cmd
   npx expo start --clear
   ```

4. **Package Installation Issues**
   ```cmd
   npm install --legacy-peer-deps
   ```

### Getting Your Local IP Address

**Windows:**
```cmd
ipconfig
```

**macOS/Linux:**
```bash
ifconfig
```

Look for your WiFi adapter's IPv4 address (usually starts with 192.168.x.x or 10.x.x.x)

## 📚 Learning Objectives Achieved

✅ **MongoDB Integration**: Successfully connected and tested MongoDB with CRUD operations  
✅ **Authentication System**: Implemented complete user registration and login  
✅ **Security**: Applied bcryptjs for password hashing and JWT for token management  
✅ **API Development**: Created RESTful API with Express.js  
✅ **Frontend Integration**: Built React Native UI with navigation and state management  
✅ **Data Persistence**: Used AsyncStorage for token storage  
✅ **UI/UX**: Implemented modern interface with React Native Paper  

## 🚀 Next Steps

- Add password reset functionality
- Implement email verification
- Add social login (Google, Facebook)
- Implement user roles and permissions
- Add push notifications
- Add image upload for profile pictures

## 📄 License

This project is created for educational purposes as part of Lab 07 coursework.
