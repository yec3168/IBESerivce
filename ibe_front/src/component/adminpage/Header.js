// Header.js
import React from 'react';
import './AdminPage.css'; // 헤더 스타일 추가

const Header = () => {
  const handleLogout = () => {
    alert('로그아웃되었습니다.'); // 예시
  };

  const goToHomePage = () => {
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <header className="admin-header">
      <div className="account-info">
        <span>관리자계정id</span>
        <button className="admin-button" onClick={handleLogout}>
          로그아웃
        </button>
        <button className="admin-button" onClick={goToHomePage}>
          홈 화면으로 돌아가기
        </button>
      </div>
    </header>
  );
};

export default Header;
