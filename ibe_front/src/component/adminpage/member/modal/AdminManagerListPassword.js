import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminManagerModal.css';

const AdminManagerListPassword = ({
  isOpen,
  onClose,
  onSave,
  selectedManager,
}) => {
  const [newManagerPassword, setNewManagerPassword] = useState('');
  const [newManagerConfirmPassword, setNewManagerConfirmPassword] =
    useState('');
  const [updatePasswordError, setUpdatePasswordError] = useState('');

  // 모달이 열릴 때마다 입력 필드를 초기화
  useEffect(() => {
    if (isOpen) {
      setNewManagerPassword('');
      setNewManagerConfirmPassword('');
      setUpdatePasswordError(''); // 에러 메시지도 초기화
    }
  }, [isOpen]);

  const handlePasswordChangeSave = () => {
    if (newManagerPassword !== newManagerConfirmPassword) {
      setUpdatePasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 변경 요청
    axios
      .post(`http://localhost:8080/admin/member/adminlist/changepass`, {
        memberEmail: selectedManager.memberEmail, // 선택된 관리자의 이메일
        memberPassword: newManagerPassword, // 새 비밀번호
      })
      .then((response) => {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        onSave(newManagerPassword); // 비밀번호 변경 완료 후 상위 컴포넌트에 알림
        onClose(); // 모달 닫기
      })
      .catch((error) => {
        console.error('비밀번호 변경 오류:', error);
        alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      });
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 null 반환

  return (
    <div className="admin-manager-modal">
      <div className="admin-manager-modal-content">
        <h4>비밀번호 변경</h4>
        <label>새 비밀번호 입력</label>
        <input
          type="password"
          value={newManagerPassword}
          onChange={(e) => setNewManagerPassword(e.target.value)}
          placeholder="새 비밀번호를 입력하세요"
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={newManagerConfirmPassword}
          onChange={(e) => setNewManagerConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
        />
        {updatePasswordError && (
          <p className="admin-manager-modal-error">{updatePasswordError}</p>
        )}
        <div className="admin-manager-modal-actions">
          <button onClick={handlePasswordChangeSave}>변경</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AdminManagerListPassword;
