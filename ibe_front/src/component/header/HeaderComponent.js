import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ibe_logo from '../assets/images/header/ibe_logo.png';
import coin_purse_icon from '../assets/images/header/coin_purse_icon.png';
import './HeaderComponent.css';
import { getMemberPoint } from '../service/MypageService';

const HeaderComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [memberPoint, setMemberPoint] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
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

  return (
    <div className="container-fluid fixed-top bg-white" id="div_header">
      <header>
        <nav className="navbar navbar-expand-lg" id="header_nav">
          <div className="container-fluid fixed-top">
            <div
              className="collapse navbar-collapse justify-content-end"
              id="loginMenubar"
            >
              <ul className="navbar-nav loginMenubar">
                <span id="span_parent" className="mr-80">
                  <img
                    src={coin_purse_icon}
                    width="20px"
                    alt="coin_purse"
                    id="coin_purse_icon"
                  />
                  <li className="nav-item">
                    <a
                      className="nav-link active4"
                      href="/"
                      id="amt"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <span
                        id="span_amt"
                        style={{
                          whiteSpace: 'nowrap',
                          display: 'inline-block',
                        }}
                      >
                        {memberPoint !== null ? `${memberPoint}` : '로딩중'}
                      </span>
                      <span id="span_won" style={{ display: 'inline-block' }}>
                        &nbsp;P
                      </span>
                    </a>
                  </li>
                </span>
                {isAdmin && (
                  <li className="nav-item mx-3">
                    <a className="nav-link active" href="/admin">
                      관리자 페이지
                    </a>
                  </li>
                )}
                <li className="nav-item mx-3">
                  <a className="nav-link active" href="/signin">
                    로그인
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item ms-3">
                  <a className="nav-link active" href="/terms">
                    회원가입
                  </a>
                </li>
                <li className="nav-item mx-1">
                  <a className="nav-link active" href="/">
                    고객센터
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={ibe_logo} width="200px" alt="logo" />
            </a>
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
                <li className="nav-item mr-150">
                  <a className="nav-link active5" href="/mypage">
                    마이페이지
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
