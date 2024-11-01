import React, { useState } from 'react';
import './AdminManagerList.css';

const AdminManagerList = () => {
  const [managers, setManagers] = useState([
    { id: 'admin001', role: 'Super Admin', note: '메인 관리자' },
    { id: 'admin002', role: 'Editor', note: '게시물 관리자' },
  ]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [newManagerId, setNewManagerId] = useState('');
  const [newManagerRole, setNewManagerRole] = useState('Viewer');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newManagerPassword, setNewManagerPassword] = useState('');
  const [newManagerConfirmPassword, setNewManagerConfirmPassword] = useState('');
  const [updatePasswordError, setUpdatePasswordError] = useState('');

  const handleRoleChangeClick = (manager) => {
    setSelectedManager(manager);
    setNewRole(manager.role);
    setIsRoleModalOpen(true);
  };

  const handleRoleSave = () => {
    setManagers((prevManagers) =>
      prevManagers.map((manager) =>
        manager.id === selectedManager.id ? { ...manager, role: newRole } : manager
      )
    );
    setIsRoleModalOpen(false);
    setSelectedManager(null);
  };

  const handleAddManagerClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddManagerSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    const newManager = { id: newManagerId, role: newManagerRole, note: '신규 관리자' };
    setManagers((prevManagers) => [...prevManagers, newManager]);
    setIsAddModalOpen(false);
    setNewManagerId('');
    setNewManagerRole('Viewer');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  // 삭제 버튼 클릭 시 관리자 삭제 함수
  const handleDeleteManager = (managerId) => {
    const confirmed = window.confirm("정말로 이 관리자를 삭제하시겠습니까?");
    if (confirmed) {
      setManagers((prevManagers) =>
        prevManagers.filter((manager) => manager.id !== managerId)
      );
    }
  };

  // 비밀번호 변경 버튼 클릭 시
  const handlePasswordChangeClick = (manager) => {
    setSelectedManager(manager);
    setNewManagerPassword('');
    setNewManagerConfirmPassword('');
    setUpdatePasswordError('');
    setIsPasswordModalOpen(true);
  };

  const handlePasswordChangeSave = () => {
    if (newManagerPassword !== newManagerConfirmPassword) {
      setUpdatePasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 비밀번호 변경 로직을 추가할 수 있음 (여기서는 단순히 모달 닫기)
    alert(`${selectedManager.id}의 비밀번호가 변경되었습니다.`);
    setIsPasswordModalOpen(false);
    setSelectedManager(null);
  };

  return (
    <div className="manager-list-container">
      <h2>관리자 목록</h2>
      <div className="manager-list-box">
        <button className="add-manager-button" onClick={handleAddManagerClick}>관리자 추가하기</button>
        <div className="manager-row header">
          <div className="column managerId">관리자 아이디</div>
          <div className="column role">역할</div>
          <div className="column role-change">역할 변경</div>
          <div className="column note">비고</div>
          <div className="column actions">비밀번호 변경</div>
          <div className="column actions">삭제</div>
        </div>
        {managers.map((manager) => (
          <div key={manager.id} className="manager-row">
            <div className="column managerId">{manager.id}</div>
            <div className="column role">{manager.role}</div>
            <div className="column role-change">
              <button onClick={() => handleRoleChangeClick(manager)}>역할 변경</button>
            </div>
            <div className="column note">{manager.note}</div>
            <div className="column actions">
              <button onClick={() => handlePasswordChangeClick(manager)}>비밀번호 변경</button>
            </div>
            <div className="column actions">
              <button onClick={() => handleDeleteManager(manager.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      {/* 역할 변경 모달 */}
      {isRoleModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>역할 변경</h3>
            <label>역할 선택:</label>
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="Super Admin">Super Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleRoleSave}>완료</button>
              <button onClick={() => setIsRoleModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 관리자 추가 모달 */}
      {isAddModalOpen && (
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
              <button onClick={() => setIsAddModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>비밀번호 변경</h3>
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
              <button onClick={() => setIsPasswordModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagerList;
