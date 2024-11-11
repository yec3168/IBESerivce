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
            roleCode: manager.role, // 역할 코드 추가
          }));

        // 역할에 따라 정렬
        const sortedManagers = filteredManagers.sort((a, b) => {
          const rolePriority = {
            'ROLE_ADMIN': 1,
            'ROLE_SERVICE_MANAGER': 2,
            'ROLE_BOARD_MANAGER': 3,
          };
          return rolePriority[a.roleCode] - rolePriority[b.roleCode];
        });

        setManagers(sortedManagers);
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

        // 역할에 따라 정렬
        const sortedManagers = filteredManagers.sort((a, b) => {
          const rolePriority = {
            'ROLE_ADMIN': 1,
            'ROLE_SERVICE_MANAGER': 2,
            'ROLE_BOARD_MANAGER': 3,
          };
          return rolePriority[a.roleCode] - rolePriority[b.roleCode];
        });

        setManagers(sortedManagers);
        setIsAddModalOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated managers:', error);
      });
  };

  const handleDeleteManager = (managerEmail) => {
    const confirmed = window.confirm('정말로 이 담당자를 삭제하시겠습니까?');
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
          alert('담당자가 성공적으로 삭제되었습니다.');
        })
        .catch((error) => {
          console.error('Error deleting manager:', error);
          alert('담당자 삭제 중 오류가 발생했습니다.');
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
    <>
      <h2 className="admin-manager-h2">사용자 관리 - 관리자 목록</h2>
      <div className="admin-manager-manager-list-container">
        <div className="admin-manager-manager-list-box">
          <div className="admin-manager-add-manager-button-container">
            <button
              className="admin-manager-add-manager-button"
              onClick={handleAddManagerClick}
            >
              관리자 추가하기
            </button>
          </div>
          <div className="admin-manager-manager-row admin-manager-header">
            <div className="admin-manager-column admin-manager-managerName">
              이름
            </div>
            <div className="admin-manager-column admin-manager-managerId">
              이메일
            </div>
            <div className="admin-manager-column admin-manager-role">역할</div>
            <div className="admin-manager-column admin-manager-role-change">
              역할 변경
            </div>
            <div className="admin-manager-column admin-manager-actions">
              비밀번호 변경
            </div>
            <div className="admin-manager-column admin-manager-actions-delete">
              삭제
            </div>
          </div>
          {managers.map((manager) => (
            <div
              key={manager.memberEmail}
              className="admin-manager-manager-row"
            >
              <div className="admin-manager-column admin-manager-managerName">
                {manager.memberName}
              </div>
              <div className="admin-manager-column admin-manager-managerId">
                {manager.memberEmail}
              </div>
              <div className="admin-manager-column admin-manager-role">
                {manager.role}
              </div>
              <div className="admin-manager-column admin-manager-role-change">
                {manager.role !== '관리자' && (
                  <button onClick={() => handleRoleChangeClick(manager)}>
                    역할 변경
                  </button>
                )}
              </div>
              <div className="admin-manager-column admin-manager-actions">
                <button onClick={() => handlePasswordChangeClick(manager)}>
                  비밀번호 변경
                </button>
              </div>
              <div className="admin-manager-column admin-manager-actions-delete">
                {manager.role !== '관리자' && (
                  <button
                    className="admin-manager-delete"
                    onClick={() => handleDeleteManager(manager.memberEmail)}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 역할 변경 모달 */}
        <AdminManagerListRole
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          onSave={(updatedRole) => {
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

                // 역할에 따라 정렬
                const sortedManagers = filteredManagers.sort((a, b) => {
                  const rolePriority = {
                    'ROLE_ADMIN': 1,
                    'ROLE_SERVICE_MANAGER': 2,
                    'ROLE_BOARD_MANAGER': 3,
                  };
                  return rolePriority[a.roleCode] - rolePriority[b.roleCode];
                });

                setManagers(sortedManagers);
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
          existingManagers={managers.map((manager) => manager.memberEmail)}
        />

        {/* 비밀번호 변경 모달 */}
        <AdminManagerListPassword
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSave={handlePasswordChangeSave}
          selectedManager={selectedManager}
        />
      </div>
    </>
  );
};

export default AdminManagerList;
