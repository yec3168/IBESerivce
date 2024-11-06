import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ibe_logo from '../assets/images/header/ibe_logo.png';
import coin_purse_icon from '../assets/images/header/coin_purse_icon.png';
import './HeaderComponent.css';
import { getMemberPoint } from '../service/MypageService';

const HeaderComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [memberPoint, setMemberPoint] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      setIsLoggedIn(true); //로그인 상태 변경

      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        console.log(userRole);
        // 관리자 권한 확인
        if (
          userRole === 'ROLE_ADMIN' ||
          userRole === 'ROLE_SERVICE_MANAGER' ||
          userRole === 'ROLE_BOARD_MANAGER'
        ) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('토큰 디코딩 에러:', error);
      }
    }
  }, []);

  useEffect(() => {
    // 포인트 조회 API 호출
    const fetchMemberPoint = async () => {
      try {
        const response = await getMemberPoint();
        if (response.data && response.data.data.memberPoint) {
          setMemberPoint(response.data.data.memberPoint);
        }
      } catch (error) {
        console.error('포인트 조회 실패:', error);
      }
    };

    fetchMemberPoint();
  }, []);

  // 로그아웃 함수
  const clickLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    window.location.reload();
  }

  // 마이페이지 클릭 시 로그인 상태 확인
  const handleMypageClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert('로그인 한 사용자만 접근할 수 있습니다.');
    }
  };

  return (
    <div className="container-fluid fixed-top bg-white" id="div_header">
      <header>
        <nav className="navbar navbar-expand-lg" id="header_nav">
          <div className="container-fluid fixed-top">
            {/* 로그인 메뉴바 */}
            <div className="collapse navbar-collapse justify-content-end" id="loginMenubar">
              <ul className="navbar-nav loginMenubar">
                {/* 포인트 잔액 */}
                {/* 사용자 로그인 상태에만 표시 */}
                {/* 클릭시 포인트 충전 페이지 이동 */}
                {isLoggedIn && !isAdmin &&  (
                  <span id="span_parent" className="mr-80">
                    <li className="nav-item">
                      <a className="nav-link active4" href="/mypage/pntcharge" id="amt" style={{ whiteSpace: 'nowrap' }}>
                        <img src={coin_purse_icon} width="20px" alt="coin_purse" id="coin_purse_icon" />
                        <span id="span_amt" style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                          {memberPoint !== null ? `${memberPoint}` : '로딩중'}
                        </span>
                        <span id="span_won" style={{ display: 'inline-block' }}>
                          &nbsp;P
                        </span>
                      </a>
                    </li>
                  </span>
                )}
                {/* 로그인 버튼 */}
                {/* 로그인 상태별 로그인/로그아웃 표시 */}
                {isLoggedIn ? (
                    <li className="nav-item mx-3">
                      <button className="nav-link active" onClick={clickLogout} id="button_logout">로그아웃</button>
                    </li>
                ) : (
                    <li className="nav-item mx-3">
                      <a className="nav-link active" href="/signin" id="button_login">로그인</a>
                    </li>
                )}
              </ul>
            </div>
          </div>
          <div className="container-fluid">
            {/* 메인 로고 */}
            <a className="navbar-brand" href="/">
              <img src={ibe_logo} width="200px" alt="logo" />
            </a>
            {/* 반응형 메뉴바 버튼 */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* 메뉴바 */}
            <div
              className="collapse navbar-collapse justify-content-end"
              id="menubar"
            >
              <ul className="navbar-nav menubar">
                <li className="nav-item mr-150">
                  <a className="nav-link active1" href="/products">
                    전체 상품
                  </a>
                </li>
                <li className="nav-item mr-150">
                  <a className="nav-link active2" href="/products/create">
                    판매 신청
                  </a>
                </li>
                <li className="nav-item mr-150">
                  <a className="nav-link active3" href="/boards">
                    아이비 게시판
                  </a>
                </li>
                {/* 사용자는 마이페이지, 관리자는 관리자페이지 */}
                {isAdmin ? (
                  <li className="nav-item mr-150">
                    <a className="nav-link active5" href="/admin">
                      관리자 페이지
                    </a>
                  </li>
                ) : (
                  <li className="nav-item mr-150">
                    <a className="nav-link active5" href="/mypage" onClick={handleMypageClick}>
                      마이페이지
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
