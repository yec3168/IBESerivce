// src/AdminHeader.js
import React from 'react';
import './AdminPage.css';

const AdminSidebar = ({ activeMenu, handleMenuClick }) => {

  return (
    <>
      <aside className="admin-sidebar">
        <h2>IBE 관리자</h2>
        <nav>
          <ul>
            <li>
              <a
                href="#dashboard"
                onClick={() => handleMenuClick('dashboard')}
                className={activeMenu === 'dashboard' ? 'active' : ''}
              >
                대시보드
              </a>
            </li>
            <li>
              <a
                href="#board"
                onClick={() => handleMenuClick('board')}
                className={activeMenu === 'board' ? 'active' : ''}
              >
                게시판 관리
              </a>
            </li>
            <li>
              <a
                href="#users"
                onClick={() => handleMenuClick('users')}
                className={activeMenu === 'users' ? 'active' : ''}
              >
                사용자 관리
              </a>
            </li>
            <li>
              <a
                href="#settings"
                onClick={() => handleMenuClick('settings')}
                className={activeMenu === 'settings' ? 'active' : ''}
              >
                문의 관리
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
