import React, { useState } from 'react';
import './AdminManagerModal.css';

const AdminManagerListPassword = ({ isOpen, onClose, onSave, selectedManager }) => {
  const [newManagerPassword, setNewManagerPassword] = useState('');
  const [newManagerConfirmPassword, setNewManagerConfirmPassword] = useState('');
  const [updatePasswordError, setUpdatePasswordError] = useState('');

  const handlePasswordChangeSave = () => {
    if (newManagerPassword !== newManagerConfirmPassword) {
      setUpdatePasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    onSave(newManagerPassword); // 상위 컴포넌트로 비밀번호 전달
    onClose(); // 모달 닫기
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 null 반환

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{selectedManager.id} 비밀번호 변경</h3>
        <label>새 비밀번호 입력:</label>
        <input
          type="password"
          value={newManagerPassword}
          onChange={(e) => setNewManagerPassword(e.target.value)}
          placeholder="새 비밀번호를 입력하세요"
        />
        <label>비밀번호 확인:</label>
        <input
          type="password"
          value={newManagerConfirmPassword}
          onChange={(e) => setNewManagerConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
        />
        {updatePasswordError && <p className="error">{updatePasswordError}</p>}
        <div className="modal-actions">
          <button onClick={handlePasswordChangeSave}>변경</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AdminManagerListPassword;
