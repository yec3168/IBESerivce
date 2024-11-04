import React, { useState } from 'react';
import axios from 'axios'; // axios를 import
import './AdminManagerModal.css';

const AdminManagerListRole = ({
  isOpen,
  onClose,
  onSave,
  selectedManager,
  currentRole,
}) => {
  const [newRole, setNewRole] = useState(currentRole);

  const handleRoleChangeSave = async () => {
    try {
      // POST 요청을 보냅니다.
      await axios.post(
        'http://localhost:8080/admin/member/adminlist/changerole',
        {
          memberEmail: selectedManager?.memberEmail, // 선택된 관리자의 이메일
          role: newRole, // 새 역할
        }
      );

      onSave(newRole); // 상위 컴포넌트로 역할 전달
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('Error changing role:', error);
      // 오류 처리 로직 추가 가능
    }
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 null 반환

  return (
    <div className="admin-manager-modal">
      <div className="admin-manager-modal-content">
        <h3>
          {selectedManager?.memberName} 역할 변경 (현재: {currentRole})
        </h3>
        <p>이메일: {selectedManager?.memberEmail}</p>
        <label>역할 선택:</label>
        <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
          <option value="ROLE_SERVICE_MANAGER">문의 담당자</option>
          <option value="ROLE_BOARD_MANAGER">게시판 담당자</option>
        </select>
        <div className="admin-manager-modal-actions">
          <button onClick={handleRoleChangeSave}>변경</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AdminManagerListRole;
