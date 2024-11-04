import React, { useState } from 'react';
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
  const [currentComponent, setCurrentComponent] = useState(<AdminMainboard />); // 기본 컴포넌트를 대시보드로 설정

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
        setCurrentComponent(<AdminMainboard />); // 기본 컴포넌트 설정
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
