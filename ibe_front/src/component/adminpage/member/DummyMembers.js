// DummyMembers.js
const generateDummyMembers = (count) => {
  const members = [];
  for (let i = 1; i <= count; i++) {
    members.push({
      nickname: `user${i}`,
      email: `user${i}@example.com`, // 자동 생성된 이메일
      role: i % 2 === 0 ? '관리자' : '사용자', // 임의의 권한 부여
      phone: `010-1234-${String(i).padStart(4, '0')}`, // 임의의 전화번호
      joinedDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(), // 가입일
      modifiedDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(), // 수정일
    });
  }
  return members;
};

const dummyMembers = generateDummyMembers(1000); // 1000명의 더미 회원 데이터 생성
export default dummyMembers;
