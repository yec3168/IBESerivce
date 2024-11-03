const dummyData = Array.from({ length: 1200 }, (_, index) => ({
  id: index + 1,
  nickname: `닉네임${String.fromCharCode(65 + (index % 13))}`, // A~M
  email: `user${index + 1}@example.com`, // 이메일 형식
  exchangePoints: Math.floor(Math.random() * 10000) + 1000, // 1000에서 10999 사이의 환전 포인트
  paymentAmount: Math.floor(Math.random() * 5000) + 500, // 500에서 5499 사이의 지급 금액
  paymentDate: `2024-11-${String((index % 30) + 1).padStart(2, '0')}`, // 1일~30일 사이의 지급일
}));

export default dummyData;
