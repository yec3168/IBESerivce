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
  const [idError, setIdError] = useState(''); // 아이디 오류 상태 추가
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
      setIdError(''); // 모달이 열릴 때 아이디 오류 초기화
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
    // 아이디 길이 체크
    if (newManagerId.length < 3 || newManagerId.length > 20) {
      setIdError('아이디는 3~20자 사이여야 합니다.');
      return;
    } else {
      setIdError('');
    }

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
      memberEmail: newManagerId + '@ibe.manager',
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
      setIdError(''); // 아이디 오류 초기화
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

    // 아이디 길이 체크
    if (value.length >= 3 && value.length <= 20) {
      setIdError(''); // 아이디가 유효한 길이일 경우 오류 제거
    } else {
      setIdError('아이디는 3~20자 사이여야 합니다.');
    }

    // 아이디 중복 체크 초기화
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
          placeholder="2~8글자 제한"
          maxLength={8}
        />
        {nameError && <p className="admin-manager-modal-error">{nameError}</p>}
        <label>아이디 입력</label>
        <input
          type="text"
          value={newManagerId}
          onChange={handleChangeId}
          placeholder="영문, 숫자 조합(3~20자)"
          maxLength={20}
        />
        {isIdDuplicate && (
          <p className="admin-manager-modal-error">중복된 아이디입니다.</p>
        )}
        {idError && <p className="admin-manager-modal-error">{idError}</p>}{' '}
        {/* 아이디 오류 메시지 추가 */}
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
          placeholder="비밀번호 입력(최대 20)"
          maxLength={20}
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          placeholder="비밀번호 재입력"
          maxLength={20}
        />
        {passwordError && (
          <p className="admin-manager-modal-error">{passwordError}</p>
        )}
        <div className="admin-manager-modal-actions">
          <button
            onClick={handleAddManagerSave}
            disabled={
              isIdDuplicate ||
              !newManagerId ||
              !newManagerName ||
              nameError ||
              idError // 추가 버튼 비활성화 조건에 아이디 오류 추가
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
