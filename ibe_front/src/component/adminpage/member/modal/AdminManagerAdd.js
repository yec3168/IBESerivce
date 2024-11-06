import './AdminManagerModal.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminManagerAdd = ({
  isOpen,
  onClose,
  onSave,
  existingManagers = [],
}) => {
  const [newManagerId, setNewManagerId] = useState('');
  const [newManagerName, setNewManagerName] = useState('');
  const [newManagerRole, setNewManagerRole] = useState('ROLE_SERVICE_MANAGER');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isIdDuplicate, setIsIdDuplicate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNewManagerId('');
      setNewManagerName('');
      setNewManagerRole('ROLE_SERVICE_MANAGER');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      setNameError('');
      setIsIdDuplicate(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const checkDuplicateId = () => {
      const newManagerIdPrefix = newManagerId.trim();
      const isDuplicate = existingManagers.some(
        (email) => email.split('@')[0] === newManagerIdPrefix
      );
      setIsIdDuplicate(isDuplicate);
    };

    checkDuplicateId();
  }, [newManagerId, existingManagers]);

  const handleAddManagerSave = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setPasswordError('비밀번호를 입력해 주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newManagerName.length < 2 || newManagerName.length > 8) {
      setNameError('이름은 2~8자 사이여야 합니다.');
      return;
    } else {
      setNameError('');
    }

    const newManager = {
      memberEmail: newManagerId + '@manager.com',
      memberName: newManagerName,
      role: newManagerRole,
      memberPassword: newPassword,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/admin/member/adminlist/addmanager',
        newManager
      );
      console.log('응답:', response.data);

      onSave(newManager);
      onClose();

      setNewManagerId('');
      setNewManagerName('');
      setNewManagerRole('ROLE_SERVICE_MANAGER');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      setNameError('');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleChangeName = (e) => {
    setNewManagerName(e.target.value);
    if (e.target.value.length >= 2 && e.target.value.length <= 8) {
      setNameError('');
    }
  };

  const handleChangeId = (e) => {
    const value = e.target.value;
    // 영문자와 숫자만 허용하는 정규식
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setNewManagerId(value);
    }

    // 아이디 중복 에러 초기화
    if (isIdDuplicate) {
      setIsIdDuplicate(false);
    }
  };

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-manager-modal">
      <div className="admin-manager-modal-content">
        <h3>관리자 추가</h3>
        <label>이름 입력</label>
        <input
          type="text"
          value={newManagerName}
          onChange={handleChangeName}
          placeholder="이름을 입력하세요"
        />
        {nameError && <p className="admin-manager-modal-error">{nameError}</p>}
        <label>아이디 입력</label>
        <input
          type="text"
          value={newManagerId}
          onChange={handleChangeId}
          placeholder="아이디를 입력하세요(영문, 숫자)"
        />
        {isIdDuplicate && (
          <p className="admin-manager-modal-error">중복된 아이디입니다.</p>
        )}
        <label>역할 선택</label>
        <select
          value={newManagerRole}
          onChange={(e) => setNewManagerRole(e.target.value)}
        >
          <option value="ROLE_SERVICE_MANAGER">문의 담당자</option>
          <option value="ROLE_BOARD_MANAGER">게시판 담당자</option>
        </select>
        <label>비밀번호 입력</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleChangePassword}
          placeholder="비밀번호를 입력하세요"
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          placeholder="비밀번호를 다시 입력하세요"
        />
        {passwordError && (
          <p className="admin-manager-modal-error">{passwordError}</p>
        )}
        <div className="admin-manager-modal-actions">
          <button
            onClick={handleAddManagerSave}
            disabled={
              isIdDuplicate || !newManagerId || !newManagerName || nameError
            }
          >
            추가
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AdminManagerAdd;
