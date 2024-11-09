import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ibe_logo_header from '../assets/images/header/ibe_logo_header.png';
import coin_purse_icon from '../assets/images/header/coin_purse_icon.png';
import login_icon from '../assets/images/header/login_icon.png';
import logout_icon from '../assets/images/header/logout_icon.png';
import './HeaderComponent.css';
import { getMemberInfo } from '../service/MypageService';

const HeaderComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [memberPoint, setMemberPoint] = useState(null);
  const [memberNickName, setMemberNickName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      setIsLoggedIn(true); // 로그인 상태 변경

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
    // 멤버 정보 조회 API 호출 
    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfo();
        if (response.data) {
          setMemberPoint(response.data.data.memberPoint); 
          setMemberNickName(response.data.data.memberNickName); 
        }
      } catch (error) {
        console.error('멤버 정보 조회 실패:', error);
      }
    };

    fetchMemberInfo();
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

   const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

  return (
    <div className="container-fluid fixed-top bg-white" id="div_header">
      <header>
        <nav className="navbar navbar-expand-lg" id="header_nav">
          <div className="container-fluid fixed-top">
            {/* 로그인 메뉴바 */}
            <div className="collapse navbar-collapse justify-content-end" id="loginMenubar">
              <ul className="navbar-nav loginMenubar">
                {/* 사용자 닉네임, 포인트 */}
                {/* 사용자 로그인 상태에만 표시 */}
                {isLoggedIn && !isAdmin && (
                  <>
                    <span id="span_parent" className="mr-30">
                      <li className="nav-item">
                        {/* 닉네임 */}
                        <span id="span_amt" style={{ whiteSpace: 'nowrap', display: 'inline-block', marginRight: '10px', marginTop:'13px' }}>
                          {memberNickName ? `${memberNickName} 님` : '로딩중'}  
                        </span>
                      </li>
                    </span>
                    {/* <span id="span_parent" style={{marginRight:'107px'}}> */}
                    <span id="span_parent" style={{marginRight:'100px'}}>
                      <li className="nav-item">
                        {/* 포인트 */}
                        {/* 클릭 시 포인트 충전 페이지 이동 */}
                        <a className="nav-link active4" href="/mypage/pntcharge" id="amt" style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                          <img src={coin_purse_icon} width="20px" alt="coin_purse" id="coin_purse_icon" />
                          <span id="span_won" style={{ display: 'inline-block' }}>
                            {memberPoint !== null ? addComma(`${memberPoint}`) : '로딩중'}
                          </span>
                          <span id="span_won" style={{ display: 'inline-block' }}>
                            &nbsp;P
                          </span>
                        </a>
                      </li>
                    </span>
                  </>
                )}
                {/* 로그인 버튼 */}
                {isLoggedIn ? (
                  // 로그아웃 아이콘
                  <li className="nav-item mx-3 mt-1">
                    <button className="nav-link active" onClick={clickLogout}>
                      <img src={logout_icon} alt="로그아웃" width="25px" />
                    </button>
                  </li>
                ) : (
                  // 로그인 아이콘
                  <li className="nav-item mx-3 mt-1">
                    <a className="nav-link active" href="/signin">
                      <img src={login_icon} alt="로그인" width="25px" /> 
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="container-fluid">
            {/* 메인 로고 */}
            <a className="navbar-brand" href="/">
              <img src={ibe_logo_header} width="200px" alt="logo" style={{marginTop:'10px'}}/>
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
              style={{marginTop:'38px'}}
            >
              <ul className="navbar-nav menubar">
                <li className="nav-item mr-150">
                  <a className="nav-link active1" href="/products">
                    전체 상품 조회
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
