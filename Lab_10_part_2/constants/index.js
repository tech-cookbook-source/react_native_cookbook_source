// Constants for the Weather App
export const API_CONFIG = {
  WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY || 'your_api_key_here',
  BASE_URL: 'https://api.weatherapi.com/v1',
  TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT) || 10000, // 10 seconds timeout
};

export const APP_CONFIG = {
  DEFAULT_CITY: {
    id: '1',
    name: 'Hà Nội',
    value: process.env.EXPO_PUBLIC_DEFAULT_CITY || 'Hanoi'
  },
  REFRESH_INTERVAL: parseInt(process.env.EXPO_PUBLIC_REFRESH_INTERVAL) || 300000, // 5 minutes in milliseconds
  NOTIFICATION_DELAY: 1000, // 1 second delay for notifications
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME || 'Ứng Dụng Thời Tiết',
  DEBUG_MODE: process.env.EXPO_PUBLIC_DEBUG_MODE === 'true',
};

export const COLORS = {
  PRIMARY_GRADIENT: ['#4c669f', '#3b5998', '#192f6a'],
  SECONDARY_GRADIENT: ['#667eea', '#764ba2'],
  HOROSCOPE_GRADIENT: ['#ff9a9e', '#fecfef', '#fad0c4'],
  PROFILE_GRADIENT: ['#a8edea', '#fed6e3'],
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY: '#666666',
  LIGHT_GRAY: '#f0f0f0',
  DARK_GRAY: '#333333',
  TRANSPARENT_WHITE: 'rgba(255, 255, 255, 0.1)',
  TRANSPARENT_WHITE_LIGHT: 'rgba(255, 255, 255, 0.2)',
  TRANSPARENT_WHITE_DARK: 'rgba(255, 255, 255, 0.3)',
  TRANSPARENT_BLACK: 'rgba(0, 0, 0, 0.5)',
  ERROR: '#ff6b6b',
  SUCCESS: '#51cf66',
  WARNING: '#ffd43b',
  // Theme colors
  LIGHT_THEME: {
    BACKGROUND: '#ffffff',
    TEXT: '#000000',
    CARD: '#f8f9fa',
    BORDER: '#dee2e6',
  },
  DARK_THEME: {
    BACKGROUND: '#121212',
    TEXT: '#ffffff',
    CARD: '#1e1e1e',
    BORDER: '#333333',
  },
};

export const VIETNAMESE_CITIES = [
  { id: '1', name: 'Hà Nội', value: 'Hanoi' },
  { id: '2', name: 'TP. Hồ Chí Minh', value: 'Ho Chi Minh City' },
  { id: '3', name: 'Đà Nẵng', value: 'Da Nang' },
  { id: '4', name: 'Hải Phòng', value: 'Hai Phong' },
  { id: '5', name: 'Cần Thơ', value: 'Can Tho' },
  { id: '6', name: 'Nha Trang', value: 'Nha Trang' },
  { id: '7', name: 'Huế', value: 'Hue' },
  { id: '8', name: 'Vũng Tàu', value: 'Vung Tau' },
  { id: '9', name: 'Quy Nhon', value: 'Quy Nhon' },
  { id: '10', name: 'Đà Lạt', value: 'Dalat' },
  { id: '11', name: 'Biên Hòa', value: 'Bien Hoa' },
  { id: '12', name: 'Thủ Dầu Một', value: 'Thu Dau Mot' },
  { id: '13', name: 'Long Xuyên', value: 'Long Xuyen' },
  { id: '14', name: 'Tuy Hòa', value: 'Tuy Hoa' },
  { id: '15', name: 'Pleiku', value: 'Pleiku' },
];

export const NOTIFICATION_TYPES = {
  NETWORK_STATUS: 'network_status',
  WEATHER_UPDATE: 'weather_update',
  ERROR: 'error',
  GENERAL: 'general',
};

export const NETWORK_TYPES = {
  WIFI: 'wifi',
  CELLULAR: 'cellular',
  ETHERNET: 'ethernet',
  BLUETOOTH: 'bluetooth',
  NONE: 'none',
  UNKNOWN: 'unknown',
};

export const ERROR_MESSAGES = {
  NO_INTERNET: 'Không có kết nối internet',
  API_ERROR: 'Lỗi khi gọi API thời tiết',
  TIMEOUT: 'Quá thời gian chờ phản hồi',
  UNKNOWN: 'Lỗi không xác định',
  PERMISSION_DENIED: 'Không có quyền truy cập',
  INVALID_API_KEY: 'API key không hợp lệ',
  CITY_NOT_FOUND: 'Không tìm thấy thành phố',
};

// Zodiac signs data
export const ZODIAC_SIGNS = [
  { id: 1, name: 'Bạch Dương', nameEn: 'Aries', symbol: '♈', dates: '21/3 - 19/4' },
  { id: 2, name: 'Kim Ngưu', nameEn: 'Taurus', symbol: '♉', dates: '20/4 - 20/5' },
  { id: 3, name: 'Song Tử', nameEn: 'Gemini', symbol: '♊', dates: '21/5 - 20/6' },
  { id: 4, name: 'Cự Giải', nameEn: 'Cancer', symbol: '♋', dates: '21/6 - 22/7' },
  { id: 5, name: 'Sư Tử', nameEn: 'Leo', symbol: '♌', dates: '23/7 - 22/8' },
  { id: 6, name: 'Xử Nữ', nameEn: 'Virgo', symbol: '♍', dates: '23/8 - 22/9' },
  { id: 7, name: 'Thiên Bình', nameEn: 'Libra', symbol: '♎', dates: '23/9 - 22/10' },
  { id: 8, name: 'Hổ Cáp', nameEn: 'Scorpio', symbol: '♏', dates: '23/10 - 21/11' },
  { id: 9, name: 'Nhân Mã', nameEn: 'Sagittarius', symbol: '♐', dates: '22/11 - 21/12' },
  { id: 10, name: 'Ma Kết', nameEn: 'Capricorn', symbol: '♑', dates: '22/12 - 19/1' },
  { id: 11, name: 'Bảo Bình', nameEn: 'Aquarius', symbol: '♒', dates: '20/1 - 18/2' },
  { id: 12, name: 'Song Ngư', nameEn: 'Pisces', symbol: '♓', dates: '19/2 - 20/3' },
];

// Sample horoscope data
export const HOROSCOPE_MESSAGES = {
  'Aries': [
    'Hôm nay là ngày tuyệt vời để bắt đầu những dự án mới. Năng lượng của bạn đang ở mức cao.',
    'Hãy tin tương vào trực giác của mình. Một cơ hội bất ngờ có thể xuất hiện.',
    'Tình yêu đang gõ cửa trái tim bạn. Hãy mở lòng đón nhận.',
  ],
  'Taurus': [
    'Sự kiên trì sẽ được đền đáp xứng đáng. Đừng bỏ cuộc khi gần đến đích.',
    'Hôm nay là ngày tốt để đầu tư vào bản thân. Học hỏi điều gì đó mới mẻ.',
    'Gia đình sẽ mang lại cho bạn niềm vui và sự ấm áp.',
  ],
  'Gemini': [
    'Khả năng giao tiếp của bạn sẽ giúp ích rất nhiều trong công việc hôm nay.',
    'Một cuộc gặp gỡ ngẫu nhiên có thể thay đổi quan điểm của bạn.',
    'Hãy cân bằng giữa công việc và giải trí.',
  ],
  'Cancer': [
    'Cảm xúc của bạn có thể dao động nhiều hôm nay. Hãy tìm cách thư giãn.',
    'Gia đình và bạn bè sẽ là nguồn động viên lớn cho bạn.',
    'Một kỷ niệm đẹp từ quá khứ có thể quay trở lại.',
  ],
  'Leo': [
    'Bạn sẽ là tâm điểm chú ý hôm nay. Hãy tận dụng cơ hội này.',
    'Sự tự tin của bạn sẽ truyền cảm hứng cho người khác.',
    'Một tin tốt về tài chính có thể đến với bạn.',
  ],
  'Virgo': [
    'Sự tỉ mỉ và cẩn thận sẽ giúp bạn hoàn thành công việc xuất sắc.',
    'Hãy chú ý đến sức khỏe của mình. Đừng quên nghỉ ngơi.',
    'Một kế hoạch dài hạn của bạn đang dần thành hiện thực.',
  ],
  'Libra': [
    'Hôm nay bạn sẽ cần đưa ra một quyết định quan trọng. Hãy cân nhắc kỹ.',
    'Mối quan hệ xung quanh bạn sẽ trở nên hài hòa hơn.',
    'Vẻ đẹp và nghệ thuật sẽ mang lại cảm hứng cho bạn.',
  ],
  'Scorpio': [
    'Trực giác của bạn rất nhạy bén hôm nay. Hãy tin tưởng vào nó.',
    'Một bí mật có thể được tiết lộ. Hãy chuẩn bị tinh thần.',
    'Đây là thời điểm tốt để thay đổi và chuyển mình.',
  ],
  'Sagittarius': [
    'Tinh thần phiêu lưu của bạn sẽ dẫn đến những trải nghiệm thú vị.',
    'Một chuyến đi hoặc cuộc phiêu lưu mới đang chờ đợi bạn.',
    'Hãy mở rộng tầm nhìn và học hỏi từ những người xung quanh.',
  ],
  'Capricorn': [
    'Sự chăm chỉ của bạn sẽ được ghi nhận và đánh giá cao.',
    'Một mục tiêu dài hạn đang dần trong tầm tay.',
    'Hãy dành thời gian cho bản thân sau những ngày làm việc căng thẳng.',
  ],
  'Aquarius': [
    'Tính sáng tạo của bạn sẽ tỏa sáng hôm nay. Hãy thể hiện ý tưởng độc đáo.',
    'Bạn bè sẽ mang đến những cơ hội bất ngờ.',
    'Công nghệ và sự đổi mới sẽ đóng vai trò quan trọng trong ngày của bạn.',
  ],
  'Pisces': [
    'Trái tim nhạy cảm của bạn sẽ cảm nhận được những rung động tích cực.',
    'Nghệ thuật và âm nhạc sẽ chữa lành tâm hồn bạn.',
    'Một giấc mơ đẹp có thể trở thành hiện thực nếu bạn tin tưởng.',
  ],
};

// Theme configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Tab configuration
export const TABS = {
  WEATHER: 'weather',
  HOROSCOPE: 'horoscope',
  PROFILE: 'profile',
};

// Personal info default structure
export const DEFAULT_PERSONAL_INFO = {
  name: 'Người dùng',
  age: '',
  class: '',
  studentId: '',
  zodiacSign: null,
  avatar: '👤',
};
