import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberInfoCardComponent from './MemberInfoCardComponent';

const MypageSidenavComponent = () => {
    return (
      <>
        {/* <div id="div_headerHeight" /> */}
          <Navbar bg="light" expand="lg" className="flex-column" style={{ width: '250px' }} id="mypage_sidenav">
            <Navbar.Brand href="#">마이페이지</Navbar.Brand>
            <Nav className="flex-column">
              <Nav.Link href="#">구매 / 판매</Nav.Link>
              <div className="ml-3">
                <Nav.Link href="#">구매내역조회</Nav.Link>
                <Nav.Link href="#">판매내역조회</Nav.Link>
              </div>
              <Nav.Link href="#">포인트 관리</Nav.Link>
              <Nav.Link href="#">문의 사항</Nav.Link>
              <Nav.Link href="#">내 정보</Nav.Link>
            </Nav>
          </Navbar>
      </>
    );
  };
  
  export default MypageSidenavComponent;