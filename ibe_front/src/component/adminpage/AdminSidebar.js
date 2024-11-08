import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the token
import './AdminSidebar.css';

const AdminSidebar = ({ activeMenu, handleMenuClick }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [userRole, setUserRole] = useState('');

  // Decode JWT token to get the role
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role); // Set user role based on decoded token
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
  }, []);

  const toggleMenu = (menuName) => {
    if (openMenu === menuName) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuName);
    }
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-main-title">IBE 관리자</h2>
      <nav>
        <ul>
        {userRole === 'ROLE_ADMIN' && (
            <li className="main-li">
              <a
                href="/admin"
                onClick={() => handleMenuClick('dashboard')}
                className={activeMenu === 'dashboard' ? 'active' : ''}
              >
                대시보드
              </a>
            </li>
          )}

          {/* Conditionally Render "게시판 관리" for ROLE_ADMIN or ROLE_BOARD_MANAGER */}
          {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_BOARD_MANAGER') && (
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
                    - 게시글 조회
                  </a>
                </li>
              </ul>
            </li>
          )}

          {/* Conditionally Render "문의 관리" for ROLE_ADMIN or ROLE_SERVICE_MANAGER */}
          {(userRole === 'ROLE_ADMIN' ||
            userRole === 'ROLE_SERVICE_MANAGER') && (
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
              <ul
                className={`sub-menu ${openMenu === 'inquiry' ? 'open' : ''}`}
              >
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
          )}

          {/* Always show "사용자 관리" for ROLE_ADMIN */}
          {userRole === 'ROLE_ADMIN' && (
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
          )}

          {/* Always show "포인트 관리" for ROLE_ADMIN */}
          {userRole === 'ROLE_ADMIN' && (
            <li className="main-li">
              <a
                href="#point"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu('point');
                }}
              >
                포인트 관리
              </a>
              <ul className={`sub-menu ${openMenu === 'point' ? 'open' : ''}`}>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick('pointExchangeDetails');
                    }}
                    className={
                      activeMenu === 'pointExchangeDetails' ? 'active' : ''
                    }
                  >
                    - 포인트 환전 내역
                  </a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
