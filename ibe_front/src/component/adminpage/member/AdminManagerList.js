import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminManagerListPassword from './modal/AdminManagerListPassword'; // 비밀번호 변경 모달 컴포넌트 임포트
import AdminManagerListRole from './modal/AdminManagerListRole'; // 역할 변경 모달 컴포넌트 임포트
import AdminManagerAdd from './modal/AdminManagerAdd'; // 관리자 추가 모달 컴포넌트 임포트
import './AdminManagerList.css';

const AdminManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    // 관리자 목록을 가져오는 GET 요청
    axios
      .get('http://localhost:8080/admin/member/memberlist')
      .then((response) => {
        // ROLE_ADMIN, ROLE_SERVICE_MANAGER, ROLE_BOARD_MANAGER만 필터링하고 역할명 변경
        const filteredManagers = response.data
          .filter((manager) =>
            [
              'ROLE_ADMIN',
              'ROLE_SERVICE_MANAGER',
              'ROLE_BOARD_MANAGER',
            ].includes(manager.role)
          )
          .map((manager) => ({
            memberName: manager.memberName,
            role:
              manager.role === 'ROLE_ADMIN'
                ? '관리자'
                : manager.role === 'ROLE_SERVICE_MANAGER'
                ? '문의 담당자'
                : '게시판 담당자',
            memberEmail: manager.memberEmail,
          }));
        setManagers(filteredManagers);
      })
      .catch((error) => {
        console.error('Error fetching managers:', error);
      });
  }, []);

  const handleRoleChangeClick = (manager) => {
    setSelectedManager(manager);
    setNewRole(manager.role);
    setIsRoleModalOpen(true);
  };

  const handleAddManagerClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddManagerSave = (newManager) => {
    // 새로운 관리자가 추가되었음을 서버에 알린 후 목록을 새로 고침
    axios
      .get('http://localhost:8080/admin/member/memberlist')
      .then((response) => {
        const filteredManagers = response.data
          .filter((manager) =>
            [
              'ROLE_ADMIN',
              'ROLE_SERVICE_MANAGER',
              'ROLE_BOARD_MANAGER',
            ].includes(manager.role)
          )
          .map((manager) => ({
            memberName: manager.memberName,
            role:
              manager.role === 'ROLE_ADMIN'
                ? '관리자'
                : manager.role === 'ROLE_SERVICE_MANAGER'
                ? '문의 담당자'
                : '게시판 담당자',
            memberEmail: manager.memberEmail,
          }));
        setManagers(filteredManagers); // 최신 목록으로 갱신
        setIsAddModalOpen(false); // 모달 닫기
      })
      .catch((error) => {
        console.error('Error fetching updated managers:', error);
      });
  };

  const handleDeleteManager = (managerEmail) => {
    const confirmed = window.confirm('정말로 이 관리자를 삭제하시겠습니까?');
    if (confirmed) {
      axios
        .delete(`http://localhost:8080/admin/member/adminlist/deletemanager`, {
          data: { memberEmail: managerEmail },
        })
        .then(() => {
          setManagers((prevManagers) =>
            prevManagers.filter(
              (manager) => manager.memberEmail !== managerEmail
            )
          );
          alert('관리자가 성공적으로 삭제되었습니다.');
        })
        .catch((error) => {
          console.error('Error deleting manager:', error);
          alert('관리자 삭제 중 오류가 발생했습니다.');
        });
    }
  };

  const handlePasswordChangeClick = (manager) => {
    setSelectedManager(manager);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordChangeSave = (newPassword) => {
    setIsPasswordModalOpen(false);
    setSelectedManager(null);
  };

  return (
    <div className="manager-list-container">
      <h2>관리자 목록</h2>
      <div className="manager-list-box">
        <button className="add-manager-button" onClick={handleAddManagerClick}>
          관리자 추가하기
        </button>
        <div className="manager-row header">
          <div className="column managerName">이름</div>
          <div className="column managerId">이메일</div>
          <div className="column role">역할</div>
          <div className="column role-change">역할 변경</div>
          <div className="column actions">비밀번호 변경</div>
          <div className="column actions">삭제</div>
        </div>
        {managers.map((manager) => (
          <div key={manager.memberEmail} className="manager-row">
            <div className="column managerName">{manager.memberName}</div>
            <div className="column managerId">{manager.memberEmail}</div>
            <div className="column role">{manager.role}</div>
            <div className="column role-change">
              <button onClick={() => handleRoleChangeClick(manager)}>
                역할 변경
              </button>
            </div>
            <div className="column actions">
              <button onClick={() => handlePasswordChangeClick(manager)}>
                비밀번호 변경
              </button>
            </div>
            <div className="column actions">
              <button onClick={() => handleDeleteManager(manager.memberEmail)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 역할 변경 모달 */}
      <AdminManagerListRole
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSave={(updatedRole) => {
          // 역할이 변경된 후 목록을 새로 고침
          axios
            .get('http://localhost:8080/admin/member/memberlist')
            .then((response) => {
              const filteredManagers = response.data
                .filter((manager) =>
                  [
                    'ROLE_ADMIN',
                    'ROLE_SERVICE_MANAGER',
                    'ROLE_BOARD_MANAGER',
                  ].includes(manager.role)
                )
                .map((manager) => ({
                  memberName: manager.memberName,
                  role:
                    manager.role === 'ROLE_ADMIN'
                      ? '관리자'
                      : manager.role === 'ROLE_SERVICE_MANAGER'
                      ? '문의 담당자'
                      : '게시판 담당자',
                  memberEmail: manager.memberEmail,
                }));
              setManagers(filteredManagers);
            })
            .catch((error) => {
              console.error('Error fetching updated managers:', error);
            });
        }}
        selectedManager={selectedManager}
        currentRole={newRole}
      />

      {/* 관리자 추가 모달 */}
      <AdminManagerAdd
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddManagerSave}
        existingManagers={managers.map((manager) => manager.memberEmail)} // 이메일 목록 전달
      />

      {/* 비밀번호 변경 모달 */}
      <AdminManagerListPassword
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handlePasswordChangeSave}
        selectedManager={selectedManager}
      />
    </div>
  );
};

export default AdminManagerList;
