import React from 'react';
import './AdminMemberModal.css'; // 모달 스타일 시트

const AdminMemberListDetails = ({ member, closeModal }) => {
  const handleAccountAction = () => {
    if (member.role === '정지된 회원') {
      // 정지 취소 로직 추가
      console.log(`${member.nickname}의 계정 정지 취소`);
    } else {
      // 계정 정지 로직 추가
      console.log(`${member.nickname}의 계정 정지`);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>회원 상세 정보</h2>
        <p>
          <strong>닉네임:</strong> {member.nickname}
        </p>
        <p>
          <strong>이메일:</strong> {member.email}
        </p>
        <p>
          <strong>전화번호:</strong> {member.phone}
        </p>
        <p>
          <strong>가입일:</strong> {member.joinedDate}
        </p>
        <p>
          <strong>수정일:</strong> {member.modifiedDate}
        </p>
        <p>
          <strong>판매 건수:</strong> {member.salesCount || 0}
        </p>
        <p>
          <strong>구매 건수:</strong> {member.purchasesCount || 0}
        </p>
        <p>
          <strong>정보게시글 작성 건수:</strong> {member.infoPostsCount || 0}
        </p>
        <button onClick={closeModal} className="close-button">
          닫기
        </button>
        {member.role === '정지된 회원' ? (
          <button onClick={handleAccountAction} className="suspend-button">
            정지 취소
          </button>
        ) : (
          <button onClick={handleAccountAction} className="suspend-button">
            계정 정지
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminMemberListDetails;
