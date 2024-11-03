import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './Mypage.css'

const MypageInquiryComponent = () => {
    const inquiryCategory = ["배송 지연 / 누락", "물품 하자", "포인트 결제", "포인트 환급",  "기타"];

    return(
        <>
            <Container className="text-center my-5 containerInq" style={{ maxWidth: '600px' }}>
                {/* 1:1문의 타이틀*/}
                <h1 id="h1_inqTitle">1:1 문의</h1>
                <div id="div_inqInfo">아이비를 사용하면서 생긴 문제를 문의하세요.</div>

                {/* 구분선 */}
                <hr/>

                <Form className="mt-4">
                    {/* 문의 유형 */}
                    <Form.Group controlId="inqCategory" className="mb-3">
                        <Form.Select style={{ borderRadius: '20px', borderColor: '#ddd', padding: '10px 15px' }}>
                            <option value="">문의 유형</option>
                            {inquiryCategory.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    {/* 문의 제목 */}
                    <Form.Group controlId="inqTitle">
                        <Form.Control type="text" placeholder="제목" 
                            style={{ borderRadius: '20px', borderColor: '#ddd', padding: '10px 15px' }} />
                    </Form.Group>
                    {/* 문의 내용 */}
                    <Form.Group controlId="inqContent" className="mt-3">
                        <Form.Control as="textarea" rows={5} placeholder="문의 내용" 
                            style={{ borderRadius: '20px', borderColor: '#ddd', padding: '15px' }} />
                    </Form.Group>

                    {/* 문의 버튼 */}
                    <Row className="justify-content-center mt-4">
                        <Col xs="auto">
                            <Button id="button_inqSubmit" className="px-4" style={{ borderRadius: '20px' }}>
                                문의하기
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
}

export default MypageInquiryComponent;