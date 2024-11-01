const dummyData = Array.from({ length: 1200 }, (_, index) => ({
  id: index + 1,
  title: `${index + 1}번째 판매`,
  status: index % 2 === 0 ? '판매 중' : '판매 완료', // 짝수는 판매 중, 홀수는 판매 완료
  buyer: `구매자${String.fromCharCode(65 + (index % 13))}`, // A~M
  seller: `판매자${String.fromCharCode(65 + (index % 13))}`, // A~M
  notes: index % 3 === 0 ? '삭제됨' : '삭제되지 않음', // 3개 중 1개는 삭제됨
  uploadDate: `2024-11-${String((index % 30) + 1).padStart(2, '0')}`, // 1일~30일 사이의 날짜
}));

export default dummyData;
