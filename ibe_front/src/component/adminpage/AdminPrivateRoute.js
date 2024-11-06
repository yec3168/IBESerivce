import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminPrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // 토큰이 없을 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/signin" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // 관리자 권한이 있는 경우만 접근 허용
    if (
      userRole === 'ROLE_ADMIN' ||
      userRole === 'ROLE_SERVICE_MANAGER' ||
      userRole === 'ROLE_BOARD_MANAGER'
    ) {
      return element;
    } else {
      return <Navigate to="/notfound" replace />;
    }
  } catch (error) {
    console.error('토큰 디코딩 에러:', error);
    return <Navigate to="/signin" replace />;
  }
};

export default AdminPrivateRoute;
