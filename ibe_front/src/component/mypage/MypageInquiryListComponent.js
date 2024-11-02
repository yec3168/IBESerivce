import { Container, Row, Col, Button, Form, Nav, Tab, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Mypage.css'

const inquiries = [
  {
    id: 1,
    status: 'processing',
    title: '상품에 문제가 있어서 문의합니다.'
  },
  {
    id: 2,
    status: 'complete',
    title: '배송 완료 상태인데 상품 도착이 지연되고 있습니다.'
  }
];

const MypageInquiryListComponent = () => {
    return (
      <Container className="mt-5 text-center containerInqList">
          {/* 1:1 문의 타이틀 */}
          <h1 id="h1_inqListTitle">문의 내역</h1>
  
          {/* 구분선 */}
          <hr/>
  
          <Row className="align-items-center mt-4">
              {/* 날짜 선택 */}
              <Col md={3}>
                  <Form.Control type="date" defaultValue="2024-10-25" />
              </Col>
              <Col md="auto" className="text-center">
                  <span>~</span>
              </Col>
              <Col md={3}>
                  <Form.Control type="date" defaultValue="2024-10-25" />
              </Col>
              
              {/* 조회 버튼 */}
              <Col md="auto">
                  <Button id="button_inqSearchDate">조회</Button>
              </Col>
          </Row>
  
          {/* 탭 */}
          <Tab.Container defaultActiveKey="inqAll">
              {/* 탭 메뉴 */}
              <Nav variant="tabs" className="mt-4" id="nav_inqListTab">
                  <Nav.Item>
                      <Nav.Link eventKey="inqAll" className="inqListTab">전체</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="inqProcessing" className="inqListTab">답변 대기</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="inqComplete" className="inqListTab">답변 완료</Nav.Link>
                  </Nav.Item>
              </Nav>
  
              {/* 문의 내역 */}
              <Tab.Content className="mt-3">
                  {/* 전체 탭에 모든 문의 내용 표시 */}
                  <Tab.Pane eventKey="inqAll" className="tabpane_inqList">
                      {inquiries.map(inquiry => (
                          <div key={inquiry.id} className="p-3 border rounded d-flex align-items-center mb-2">
                              {/* 상태에 따라 배지 표시 */}
                              <Badge pill className={`me-2 badge_${inquiry.status}`}>
                                  {inquiry.status === 'processing' ? '답변 대기' : '답변 완료'}
                              </Badge>
                              {/* 문의 내용 */}
                              <Link to={`/mypage/inqList/detail/${inquiry.id}`} className="text-decoration-none">
                                  <span className="hover-highlight">{inquiry.title}</span>
                              </Link>
                          </div>
                      ))}
                  </Tab.Pane>
                  
                  {/* 답변 대기 탭 */}
                  <Tab.Pane eventKey="inqProcessing" className="tabpane_inqList">
                      {inquiries.filter(inquiry => inquiry.status === 'processing').map(inquiry => (
                          <div key={inquiry.id} className="p-3 border rounded d-flex align-items-center mb-2">
                              <Badge pill className="me-2 badge_processing">답변 대기</Badge>
                              <Link to={`/mypage/inqList/detail/${inquiry.id}`} className="text-decoration-none">
                                  <span className="hover-highlight">{inquiry.title}</span>
                              </Link>
                          </div>
                      ))}
                  </Tab.Pane>
                  
                  {/* 답변 완료 탭 */}
                  <Tab.Pane eventKey="inqComplete" className="tabpane_inqList">
                      {inquiries.filter(inquiry => inquiry.status === 'complete').map(inquiry => (
                          <div key={inquiry.id} className="p-3 border rounded d-flex align-items-center mb-2">
                              <Badge pill className="me-2 badge_complete">답변 완료</Badge>
                              <Link to={`/mypage/inqList/detail/${inquiry.id}`} className="text-decoration-none">
                                  <span className="hover-highlight">{inquiry.title}</span>
                              </Link>
                          </div>
                      ))}
                  </Tab.Pane>
              </Tab.Content>
          </Tab.Container>
      </Container>
    );
  };
  
  export default MypageInquiryListComponent;
