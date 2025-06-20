// Dữ liệu trò chơi với 30+ câu hỏi có độ khó cao
export const gameData = [
  {
    id: 1,
    image: "🦋",
    answer: "BUTTERFLY",
    hint: "Loài côn trùng có cánh đẹp"
  },
  {
    id: 2,
    image: "🌋",
    answer: "VOLCANO",
    hint: "Núi lửa phun trào"
  },
  {
    id: 3,
    image: "🎭",
    answer: "THEATER",
    hint: "Nghệ thuật biểu diễn"
  },
  {
    id: 4,
    image: "🧭",
    answer: "COMPASS",
    hint: "Dụng cụ chỉ phương hướng"
  },
  {
    id: 5,
    image: "🎨",
    answer: "PALETTE",
    hint: "Bảng màu của họa sĩ"
  },
  {
    id: 6,
    image: "🔭",
    answer: "TELESCOPE",
    hint: "Dụng cụ quan sát vũ trụ"
  },
  {
    id: 7,
    image: "🏺",
    answer: "AMPHORA",
    hint: "Bình gốm cổ đại"
  },
  {
    id: 8,
    image: "🎪",
    answer: "CIRCUS",
    hint: "Rạp xiếc biểu diễn"
  },
  {
    id: 9,
    image: "🌪️",
    answer: "TORNADO",
    hint: "Cơn lốc xoáy mạnh"
  },
  {
    id: 10,
    image: "🧬",
    answer: "MOLECULE",
    hint: "Đơn vị nhỏ nhất của chất"
  },
  {
    id: 11,
    image: "🎯",
    answer: "TARGET",
    hint: "Mục tiêu bắn cung"
  },
  {
    id: 12,
    image: "🔬",
    answer: "MICROSCOPE",
    hint: "Dụng cụ quan sát vi sinh vật"
  },
  {
    id: 13,
    image: "🏛️",
    answer: "PANTHEON",
    hint: "Đền thờ cổ đại"
  },
  {
    id: 14,
    image: "🎼",
    answer: "SYMPHONY",
    hint: "Tác phẩm âm nhạc giao hưởng"
  },
  {
    id: 15,
    image: "🗿",
    answer: "SCULPTURE",
    hint: "Tác phẩm điêu khắc"
  },
  {
    id: 16,
    image: "🔮",
    answer: "CRYSTAL",
    hint: "Quả cầu pha lê"
  },
  {
    id: 17,
    image: "🎠",
    answer: "CAROUSEL",
    hint: "Trò chơi ngựa gỗ quay"
  },
  {
    id: 18,
    image: "🌌",
    answer: "GALAXY",
    hint: "Hệ sao trong vũ trụ"
  },
  {
    id: 19,
    image: "🧮",
    answer: "ABACUS",
    hint: "Dụng cụ tính toán cổ xưa"
  },
  {
    id: 20,
    image: "🎪",
    answer: "CARNIVAL",
    hint: "Lễ hội hóa trang"
  },
  {
    id: 21,
    image: "🧪",
    answer: "LABORATORY",
    hint: "Phòng thí nghiệm"
  },
  {
    id: 22,
    image: "🎨",
    answer: "MASTERPIECE",
    hint: "Kiệt tác nghệ thuật"
  },
  {
    id: 23,
    image: "🏰",
    answer: "FORTRESS",
    hint: "Pháo đài kiên cố"
  },
  {
    id: 24,
    image: "🌠",
    answer: "METEORITE",
    hint: "Thiên thạch rơi xuống Trái Đất"
  },
  {
    id: 25,
    image: "🎭",
    answer: "PERFORMANCE",
    hint: "Màn trình diễn"
  },
  {
    id: 26,
    image: "🔬",
    answer: "EXPERIMENT",
    hint: "Thí nghiệm khoa học"
  },
  {
    id: 27,
    image: "🏺",
    answer: "ARCHAEOLOGY",
    hint: "Khoa học nghiên cứu cổ vật"
  },
  {
    id: 28,
    image: "🎪",
    answer: "ACROBAT",
    hint: "Nghệ sĩ nhào lộn"
  },
  {
    id: 29,
    image: "🌋",
    answer: "ERUPTION",
    hint: "Sự phun trào của núi lửa"
  },
  {
    id: 30,
    image: "🧭",
    answer: "NAVIGATION",
    hint: "Nghệ thuật định hướng"
  },
  {
    id: 31,
    image: "🔭",
    answer: "OBSERVATORY",
    hint: "Đài thiên văn học"
  },
  {
    id: 32,
    image: "🎨",
    answer: "RENAISSANCE",
    hint: "Thời kỳ Phục Hưng"
  },
  {
    id: 33,
    image: "🏛️",
    answer: "ARCHITECTURE",
    hint: "Nghệ thuật kiến trúc"
  },
  {
    id: 34,
    image: "🎼",
    answer: "ORCHESTRA",
    hint: "Dàn nhạc giao hưởng"
  },
  {
    id: 35,
    image: "🌪️",
    answer: "HURRICANE",
    hint: "Cơn bão lớn"
  }
];

// Hàm lấy ngẫu nhiên các chữ cái để tạo bảng chọn
export const generateLetterPool = (correctAnswer) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const answerLetters = [...new Set(correctAnswer.split(''))];
  
  // Tạo thêm các chữ cái ngẫu nhiên
  const extraLetters = [];
  while (extraLetters.length < 10) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (!answerLetters.includes(randomLetter) && !extraLetters.includes(randomLetter)) {
      extraLetters.push(randomLetter);
    }
  }
  
  // Trộn tất cả chữ cái
  const allLetters = [...answerLetters, ...extraLetters];
  return allLetters.sort(() => Math.random() - 0.5);
};
