// AdminManagerAdd.js
import './AdminManagerModal.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios를 import 합니다.

const AdminManagerAdd = ({
  isOpen,
  onClose,
  onSave,
  existingManagers = [],
}) => {
  const [newManagerId, setNewManagerId] = useState('');
  const [newManagerName, setNewManagerName] = useState(''); // 이름 상태 추가
  const [newManagerRole, setNewManagerRole] = useState('ROLE_SERVICE_MANAGER');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState(''); // 이름 에러 상태 추가
  const [isIdDuplicate, setIsIdDuplicate] = useState(false);

  useEffect(() => {
    // 모달이 열릴 때 입력값 초기화
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
  }, [isOpen]); // isOpen이 변경될 때마다 호출

  useEffect(() => {
    // 아이디 중복 체크
    const checkDuplicateId = () => {
      const newManagerIdPrefix = newManagerId.trim(); // 입력된 아이디 앞자리
      const isDuplicate = existingManagers.some(
        (email) => email.split('@')[0] === newManagerIdPrefix // 이메일의 앞자리와 비교
      );
      setIsIdDuplicate(isDuplicate);
    };

    checkDuplicateId();
  }, [newManagerId, existingManagers]);

  const handleAddManagerSave = async () => {
    // 비밀번호 일치 체크
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 이름 유효성 체크
    if (newManagerName.length < 2 || newManagerName.length > 8) {
      setNameError('이름은 2~8자 사이여야 합니다.');
      return;
    } else {
      setNameError(''); // 유효성 검사 통과 시 에러 초기화
    }

    const newManager = {
      memberEmail: newManagerId + '@manager.com',
      memberName: newManagerName, // 이름 추가
      role: newManagerRole,
      memberPassword: newPassword,
    };

    try {
      // 관리자 정보를 서버에 전송
      const response = await axios.post(
        'http://localhost:8080/admin/member/adminlist/addmanager',
        newManager
      );
      console.log('응답:', response.data); // 서버의 응답 확인

      // onSave 콜백을 호출하여 부모 컴포넌트에 추가된 관리자 정보를 전달합니다.
      onSave(newManager);
      onClose();

      // 초기화
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

  // 입력값이 변경될 때 에러 메시지 초기화
  const handleChangeName = (e) => {
    setNewManagerName(e.target.value);
    // 이름 입력 시 에러 메시지를 초기화
    if (e.target.value.length >= 2 && e.target.value.length <= 8) {
      setNameError('');
    }
  };

  const handleChangeId = (e) => {
    setNewManagerId(e.target.value);
    // 아이디 입력 시 에러 메시지를 초기화
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
          onChange={handleChangeName} // 수정된 핸들러
          placeholder="이름을 입력하세요"
        />
        {nameError && <p className="admin-manager-modal-error">{nameError}</p>}{' '}
        {/* 이름 에러 메시지 표시 */}
        <label>아이디 입력</label>
        <input
          type="text"
          value={newManagerId}
          onChange={handleChangeId} // 수정된 핸들러
          placeholder="아이디를 입력하세요"
        />
        {isIdDuplicate && <p className="admin-manager-modal-error">중복된 아이디입니다.</p>}
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
          onChange={handleChangePassword} // 수정된 핸들러
          placeholder="비밀번호를 입력하세요"
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword} // 수정된 핸들러
          placeholder="비밀번호를 다시 입력하세요"
        />
        {passwordError && <p className="admin-manager-modal-error">{passwordError}</p>}
        <div className="admin-manager-modal-actions">
          <button
            onClick={handleAddManagerSave}
            disabled={
              isIdDuplicate || !newManagerId || !newManagerName || nameError
            } // 이름 오류도 체크
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
