import React from 'react';
import axios from 'axios';
import '../AdminMemberList.css';

const AdminMemberListDetails = ({ member, onClose, fetchMembers }) => {
  if (!member) return null;

  // 계정 정지 요청 핸들러
  const handleBanAccount = async () => {
    const isConfirmed = window.confirm(
      '정말로 이 계정을 정지하시겠습니까?\n로그인과 회원탈퇴를 제외한 대부분의 기능이 정지되며\n등록한 모든 게시물이 숨김처리됩니다.'
    );
    if (!isConfirmed) return; // '아니오'를 선택한 경우 함수 종료

    try {
      await axios.post('http://localhost:8080/admin/member/memberlist/ban', {
        memberEmail: member.memberEmail,
      });
      alert('계정이 정지되었습니다.');
      fetchMembers();
      onClose();
    } catch (error) {
      console.error('Error banning account:', error);
      alert('계정 정지에 실패했습니다.');
    }
  };

  const handleCancelBan = async () => {
    try {
      await axios.post('http://localhost:8080/admin/member/memberlist/unban', {
        memberEmail: member.memberEmail,
      });
      alert('계정이 정지가 취소되었습니다.');
      fetchMembers();
      onClose();
    } catch (error) {
      console.error('Error cancelling ban:', error);
      alert('계정 정지취소에 실패했습니다.');
    }
  };

  const getRoleDisplay = (role) => {
    switch (role) {
      case 'ROLE_CLIENT':
        return '회원';
      case 'ROLE_BANNED_CLIENT':
        return '회원(정지됨)';
      case 'ROLE_DEFAULT':
        return '회원(탈퇴)';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="admin-member-modal">
      <div className="admin-member-modal-content">
        <h2>회원 상세 정보</h2>
        <p>닉네임: {member.memberNickName}</p>
        <p>휴대폰번호: {member.memberPhone}</p>
        <p>이메일: {member.memberEmail}</p>
        <p>권한: {getRoleDisplay(member.role)}</p>
        <p>가입일: {new Date(member.entryDate).toLocaleDateString()}</p>
        <p>수정일: {new Date(member.updateDate).toLocaleDateString()}</p>
        <div className="admin-member-modal-button-group">
          {member.role === 'ROLE_CLIENT' && (
            <button
              className="admin-member-modal-action-button"
              onClick={handleBanAccount}
            >
              계정 정지
            </button>
          )}
          {member.role === 'ROLE_BANNED_CLIENT' && (
            <button
              className="admin-member-modal-action-button"
              onClick={handleCancelBan}
            >
              정지 취소
            </button>
          )}
          <button
            className="admin-member-modal-action-button"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMemberListDetails;
