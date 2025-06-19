const class1 = [
  {
    mssv: 'PS00000', // Mã số sinh viên
    name: 'Nguyen Van A', // Tên sinh viên
    avgPoint: 8.5, // Điểm trung bình
    avgTrainingPoint: 7, // Điểm rèn luyện trung bình
    status: 'pass', // Trạng thái sinh viên
  },
  {
    mssv: 'PS00001',
    name: 'Nguyen Van B',
    avgPoint: 4.9,
    avgTrainingPoint: 10,
    status: 'pass',
  },
];

const class2 = [
  {
    mssv: 'PS00002',
    name: 'Nguyen Van C',
    avgPoint: 4.9,
    avgTrainingPoint: 10,
    status: 'failed',
  },
  {
    mssv: 'PS00003',
    name: 'Nguyen Van D',
    avgPoint: 10,
    avgTrainingPoint: 10,
    status: 'pass',
  },
  {
    mssv: 'PS00004',
    name: 'Nguyen Van E',
    avgPoint: 10,
    avgTrainingPoint: 2,
    status: 'pass',
  },
];

// Xử lý dữ liệu sinh viên
const allStudents = [...class1, ...class2]; // Gộp dữ liệu sinh viên từ hai lớp
const filteredStudents = allStudents.filter(student => student.status === 'pass');

const sortedByAvgPoint = [...filteredStudents].sort((a, b) => b.avgPoint - a.avgPoint);
const sortedByAvgTrainingPoint = [...filteredStudents].sort((a, b) => b.avgTrainingPoint - a.avgTrainingPoint);


const top100StudentsByAvgPoint = sortedByAvgPoint.slice(0, 100);
const top100StudentsByAvgTraningPoint = sortedByAvgTrainingPoint.slice(0, 100)

export { top100StudentsByAvgPoint, top100StudentsByAvgTraningPoint}; 