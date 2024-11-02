// AdminManagerAdd.js
import './AdminManagerModal.css';
import React, { useState } from 'react';

const AdminManagerAdd = ({ isOpen, onClose, onSave }) => {
  const [newManagerId, setNewManagerId] = useState('');
  const [newManagerRole, setNewManagerRole] = useState('Viewer');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleAddManagerSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    const newManager = { id: newManagerId, role: newManagerRole, note: '신규 관리자' };
    onSave(newManager);
    onClose();
    // 초기화
    setNewManagerId('');
    setNewManagerRole('Viewer');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>관리자 추가</h3>
        <label>아이디 입력:</label>
        <input
          type="text"
          value={newManagerId}
          onChange={(e) => setNewManagerId(e.target.value)}
          placeholder="아이디를 입력하세요"
        />
        <label>역할 선택:</label>
        <select value={newManagerRole} onChange={(e) => setNewManagerRole(e.target.value)}>
          <option value="Super Admin">Super Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <label>비밀번호 입력:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <label>비밀번호 확인:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <div className="modal-actions">
          <button onClick={handleAddManagerSave}>추가</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AdminManagerAdd;
