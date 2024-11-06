import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the token
import './AdminPage.css';
import AdminSidebar from './AdminSidebar';
import Header from './Header';
import AdminMainboard from './AdminMainboard'; // 대시보드 컴포넌트
import AdminSalesRequest from './board/AdminSalesRequest';
import AdminDeletedPost from './board/AdminViewPost';
import AdminMemberList from './member/AdminMemberList';
import AdminManagerList from './member/AdminManagerList';
import AdminInquiryOrder from './inquiry/AdminInquiryOrder';
import AdminInquiryList from './inquiry/AdminInquiryList';
import AdminPointExchangeDetails from './point/AdminPointExchangeDetails';

const AdminPage = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [currentComponent, setCurrentComponent] = useState(null); // 현재 선택된 컴포넌트를 설정
  const [userRole, setUserRole] = useState(''); // 사용자 역할을 설정

  // Decode JWT token to get the role and set the default component
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role; // Get user role from the token
        setUserRole(role); // Set the role

        // Set the default component based on the user's role
        switch (role) {
          case 'ROLE_ADMIN':
            setCurrentComponent(<AdminMainboard />);
            break;
          case 'ROLE_SERVICE_MANAGER':
            setCurrentComponent(<AdminInquiryOrder />);
            break;
          case 'ROLE_BOARD_MANAGER':
            setCurrentComponent(<AdminSalesRequest />);
            break;
          default:
            setCurrentComponent(<AdminMainboard />); // Default to AdminMainboard if no role
        }
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
  }, []);

  // Handle menu item click
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);

    switch (menu) {
      case 'dashboard':
        setCurrentComponent(<AdminMainboard />);
        break;
      case 'salesRequest':
        setCurrentComponent(<AdminSalesRequest />);
        break;
      case 'deletedPost':
        setCurrentComponent(<AdminDeletedPost />);
        break;
      case 'memberList':
        setCurrentComponent(<AdminMemberList />);
        break;
      case 'managerList':
        setCurrentComponent(<AdminManagerList />);
        break;
      case 'inquiryOrder':
        setCurrentComponent(<AdminInquiryOrder />);
        break;
      case 'inquiryList':
        setCurrentComponent(<AdminInquiryList />);
        break;
      case 'pointExchangeDetails':
        setCurrentComponent(<AdminPointExchangeDetails />);
        break;
      default:
        setCurrentComponent(<AdminMainboard />); // Default to AdminMainboard if no match
    }
  };

  return (
    <div className="admin-main-container">
      <AdminSidebar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
      <main className="admin-main-content">
        <Header />
        {currentComponent} {/* 현재 선택된 컴포넌트를 렌더링 */}
      </main>
    </div>
  );
};

export default AdminPage;
