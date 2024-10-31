import React, { useState } from 'react';
import './AdminSidebar.css';

const AdminSidebar = ({ activeMenu, handleMenuClick }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    if (openMenu === menuName) {
      // 이미 열려 있는 메뉴를 클릭하면 닫음
      setOpenMenu(null);
    } else {
      // 다른 메뉴를 클릭하면 해당 메뉴를 열음
      setOpenMenu(menuName);
    }
  };

  return (
    <aside className="admin-sidebar">
      <h2>IBE 관리자</h2>
      <nav>
        <ul>
          <li className="main-li">
            <a
              href="/admin"
              onClick={() => handleMenuClick('dashboard')}
              className={activeMenu === 'dashboard' ? 'active' : ''}
            >
              대시보드
            </a>
          </li>
          <li className="main-li">
            <a
              href="#board"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu('board');
              }}
            >
              게시판 관리
            </a>
            <ul className={`sub-menu ${openMenu === 'board' ? 'open' : ''}`}>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick('salesRequest');
                  }}
                  className={activeMenu === 'salesRequest' ? 'active' : ''}
                >
                  - 판매신청 목록
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick('deletedPost');
                  }}
                  className={activeMenu === 'deletedPost' ? 'active' : ''}
                >
                  - 삭제된 게시글 조회
                </a>
              </li>
            </ul>
          </li>
          <li className="main-li">
            <a
              href="#member"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu('member');
              }}
            >
              사용자 관리
            </a>
            <ul className={`sub-menu ${openMenu === 'member' ? 'open' : ''}`}>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick('memberList');
                  }}
                  className={activeMenu === 'memberList' ? 'active' : ''}
                >
                  - 회원 목록
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick('managerList');
                  }}
                  className={activeMenu === 'managerList' ? 'active' : ''}
                >
                  - 관리자 목록
                </a>
              </li>
            </ul>
          </li>
          <li className="main-li">
            <a
              href="#inquiry"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu('inquiry');
              }}
            >
              문의 관리
            </a>
            <ul className={`sub-menu ${openMenu === 'inquiry' ? 'open' : ''}`}>
              <li className="sub-li">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick('inquiryOrder');
                  }}
                  className={activeMenu === 'inquiryOrder' ? 'active' : ''}
                >
                  - 처리해야할 문의 목록
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick('inquiryList');
                  }}
                  className={activeMenu === 'inquiryList' ? 'active' : ''}
                >
                  - 처리된 문의 조회
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
