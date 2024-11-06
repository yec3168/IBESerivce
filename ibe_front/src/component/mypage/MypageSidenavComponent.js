import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Mypage.css'

const MypageSidenavComponent = () => {
    return (
      <>
          <Navbar expand="lg" className="flex-column" id="mypage_sidenav">
            <Navbar.Brand href="/mypage" className="me-auto my-1" style={{ marginLeft:'10px'}}>
              마이페이지
            </Navbar.Brand>
            <Nav className="flex-column me-auto" style={{ marginLeft:'30px', marginTop:'10px' }}>
              <Nav.Link className='disabled' id="mypage_sidenav_bigmenu">아이비 히스토리</Nav.Link>
                <div className="ml-5" id="mypage_sidenav_smenu" style={{ marginLeft:'20px'}}>
                  <Nav.Link href="/mypage/plist">구매 내역 조회</Nav.Link>
                  <Nav.Link href="/mypage/slist">판매 내역 조회</Nav.Link>
                </div>
              <Nav.Link className='disabled' id="mypage_sidenav_bigmenu">아이비 포인트</Nav.Link>
                <div className="ml-5" id="mypage_sidenav_smenu" style={{ marginLeft:'20px'}}>
                  <Nav.Link href="/mypage/pntcharge">포인트 충전</Nav.Link>
                  <Nav.Link href="/mypage/pntpayback">포인트 환급</Nav.Link>
                </div>
              <Nav.Link className='disabled' id="mypage_sidenav_bigmenu">아이비 고객 센터</Nav.Link>
                <div className="ml-5" id="mypage_sidenav_smenu" style={{ marginLeft:'20px'}}>
                  <Nav.Link href="/mypage/inquiry">1&nbsp;:&nbsp;1 &nbsp;문의하기</Nav.Link>
                  <Nav.Link href="/mypage/inqlist">문의 내역</Nav.Link>
                </div>
              <Nav.Link className='disabled' id="mypage_sidenav_bigmenu">마이 아이비</Nav.Link>
                <div className="ml-5" id="mypage_sidenav_smenu" style={{ marginLeft:'20px'}}>
                  <Nav.Link href="/mypage/info">회원 정보 변경</Nav.Link>
                  <Nav.Link href="/mypage/pw">비밀번호 변경</Nav.Link>
                  <Nav.Link href="/mypage/delete">회원 탈퇴</Nav.Link>
                </div>
            </Nav>
          </Navbar>
      </>
    );
  };
  
  export default MypageSidenavComponent;