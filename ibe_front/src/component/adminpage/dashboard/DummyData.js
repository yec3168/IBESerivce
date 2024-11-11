const getRandomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const categories = ['아동 의류', '아동 완구', '아동 도서', '외출 용품', '기타'];

const today = new Date();
const DummyData = Array.from({ length: 500 }, (_, index) => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  let baseIncome = getRandomInRange(20000, 130000);
  let baseTransCount = getRandomInRange(20, 40);

  // 카테고리에 따라 income 값 조정
  switch (category) {
    case '외출 용품':
      baseIncome = Math.floor(baseIncome * 3);
      baseTransCount = Math.floor(baseTransCount * 0.2);
      break;
    case '기타':
      baseIncome = Math.floor(baseIncome * 0.4);
      baseTransCount = Math.floor(baseTransCount * 2);
      break;
    case '아동 도서':
      baseIncome = Math.floor(baseIncome * 0.5);
      baseTransCount = Math.floor(baseTransCount * 0.8);
      break;
    case '아동 완구':
      baseIncome = Math.floor(baseIncome * 1.2);
      baseTransCount = Math.floor(baseTransCount * 0.7);
      break;
    case '아동 의류':
      baseIncome = Math.floor(baseIncome * 1.2);
      baseTransCount = Math.floor(baseTransCount * 1.5);
      break;
    default:
  }

  return {
    category, // 무작위 카테고리
    id: index + 1,
    income: baseIncome, // 조정된 income 값
    connCount: getRandomInRange(900, 1400),
    transCount: baseTransCount, // 조정된 transCount 값
    uploadCount: getRandomInRange(40, 140),
    daily: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - index
    )
      .toISOString()
      .split('T')[0], // 오늘날짜부터 1씩 감소
  };
});

export default DummyData;
