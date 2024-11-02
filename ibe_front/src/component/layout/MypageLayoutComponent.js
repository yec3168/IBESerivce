import { Col, Container, Row } from "react-bootstrap";
import FooterComponent from "../footer/FooterComponent";
import HeaderComponent from "../header/HeaderComponent";
import MypageSidenavComponent from "../mypage/MypageSidenavComponent";

const MypageLayoutComponent = (props) => {
  return (
    <>
      <HeaderComponent />
        {/* 헤더 픽스된 위치만큼 div 설정 */}
        <div id="div_headerHeight"/>
        
        <Container fluid>
            <Row>
                {/* 마이페이지 사이드메뉴 */}
                <Col md={1} className="p-3" id="mypage_col_001">
                    <MypageSidenavComponent />
                </Col>
                {/* 마이페이지 사이드 메뉴 제외 바디 */}
                <Col className="p-3" id="mypage_col_002">
                    {/* 마이페이지 바디에 들어가는 컴포넌트 */}
                    {props.children}
                </Col>
            </Row>
        </Container>
      <FooterComponent />
    </>
  );
};

export default MypageLayoutComponent;