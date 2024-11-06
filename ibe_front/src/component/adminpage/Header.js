import React, { useEffect } from 'react';
import './AdminPage.css'; // 헤더 스타일 추가
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  // accessToken에서 sub 값 추출
  const accessToken = localStorage.getItem('accessToken');
  let adminId = '';

  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken);
      adminId = decodedToken.sub; // JWT의 sub 값을 관리자 ID로 사용
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 로컬스토리지에서 accessToken 삭제
    localStorage.removeItem('accessToken');

    // 로그아웃 알림
    alert('로그아웃되었습니다.');

    // 홈 화면으로 이동
    window.location.href = 'http://localhost:3000/';
  };

  const goToHomePage = () => {
    window.location.href = 'http://localhost:3000/';
  };

  useEffect(() => {
    // storage 이벤트 리스너 등록
    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' && !event.newValue) {
        // accessToken이 삭제되었을 때, 다른 탭에서 로그아웃 처리
        alert('다른 탭에서 로그아웃되었습니다.');
        window.location.href = 'http://localhost:3000/';
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <header className="admin-main-header">
      <div className="admin-main-account-info">
        <span>{adminId ? `접속한 계정 : ${adminId}` : '관리자계정id'}</span>{' '}
        {/* 관리자 ID 표시 */}
        <button className="admin-main-button" onClick={handleLogout}>
          로그아웃
        </button>
        <button className="admin-main-button" onClick={goToHomePage}>
          홈 화면으로 돌아가기
        </button>
      </div>
    </header>
  );
};

export default Header;
