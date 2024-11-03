import { useParams } from 'react-router-dom';
import './Mypage.css'
import { Col, Container, Row } from 'react-bootstrap';

const MypageInquiryAnsComponent = () => {
    // inquiry id값 가져오기
    const { id } = useParams();

    return (
        <>
            <Container className="text-center my-5 containerInq" style={{ maxWidth: '600px' }}>
                {/* 1:1문의 타이틀*/}
                <h1 id="h1_inqAnsTitle">1:1 문의</h1>

                {/* 구분선 */}
                <hr/>

                <Container className="mt-4">
                    {/* 문의 유형 */}
                    <Row className="mb-3">
                        <Col className="text-start">
                            <div id="div_inqAns" style={{height:'40px'}}>
                                <div>물품 하자</div>
                            </div>
                        </Col>
                    </Row>

                    {/* 문의 제목 */}
                    <Row className="mb-3">
                        <Col className="text-start">
                            <div id="div_inqAns" style={{height:'40px'}}>
                                <div>상품에 문제가 있어서 문의합니다.</div>
                            </div>
                        </Col>
                    </Row>

                    {/* 문의 내용 */}
                    <Row className="mb-3">
                        <Col className="text-start">
                            <div id="div_inqAns" style={{height:'300px'}}>
                                <div>유모차를 구매 했는데 손잡이 부분이 파손되어 왔어요...</div>
                            </div>
                        </Col>
                    </Row>

                    {/* 구분선 */}
                    <hr/>

                    {/* 문의 답변 */}
                    <Row className="mb-3">
                        <Col className="text-start">
                            <div id="div_inqAns" style={{height:'300px'}}>
                                <div>
                                    [운영자]<br/>
                                    안녕하세요, 운영자 아이비 입니다.<br/>
                                    해당 제품은 미리 손잡이 부분이 파손되어 있음을 명시하고 사진을 올려 놓은 제품으로 확인되었습니다.<br/>
                                    감사합니다.
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </Container>
        </>
    );
}

export default MypageInquiryAnsComponent;