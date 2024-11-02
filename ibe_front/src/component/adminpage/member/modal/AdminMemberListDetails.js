import React from 'react';
import axios from 'axios';
import '../AdminMemberList.css'; // CSS 파일을 import 합니다.

const AdminMemberListDetails = ({ member, onClose, fetchMembers }) => {
  if (!member) return null; // 회원 정보가 없으면 null 반환

  // 계정 정지 요청 핸들러
  const handleBanAccount = async () => {
    try {
      await axios.post('http://localhost:8080/admin/member/memberlist/ban', {
        email: member.memberEmail, // 이메일을 payload로 전송
      });
      alert('계정이 정지되었습니다.'); // 사용자에게 알림
      fetchMembers(); // 회원 목록 갱신
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('Error banning account:', error);
      alert('계정 정지에 실패했습니다.');
    }
  };

  // 정지 취소 요청 핸들러
  const handleCancelBan = async () => {
    try {
      await axios.post('http://localhost:8080/admin/member/memberlist/unban', {
        email: member.memberEmail, // 이메일을 payload로 전송
      });
      alert('계정이 정지가 취소되었습니다.'); // 사용자에게 알림
      fetchMembers(); // 회원 목록 갱신
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('Error cancelling ban:', error);
      alert('계정 정지취소에 실패했습니다.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>회원 상세 정보</h2>
        <p>닉네임: {member.memberNickName}</p>
        <p>휴대폰번호: {member.memberPhone}</p>
        <p>이메일: {member.memberEmail}</p>
        <p>권한: {member.role}</p>
        <p>가입일: {new Date(member.entryDate).toLocaleDateString()}</p>
        <p>수정일: {new Date(member.UpdateDate).toLocaleDateString()}</p>

        {/* 버튼 그룹 */}
        <div className="button-group">
          {/* 조건에 따라 버튼 표시 */}
          {member.role === 'ROLE_CLIENT' && (
            <button className="action-button" onClick={handleBanAccount}>
              계정 정지
            </button>
          )}
          {member.role === 'ROLE_BANNED_CLIENT' && (
            <button className="action-button" onClick={handleCancelBan}>
              정지 취소
            </button>
          )}
          {/* 닫기 버튼 추가 */}
          <button className="action-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMemberListDetails;
