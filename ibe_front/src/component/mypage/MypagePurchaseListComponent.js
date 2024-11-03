import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import product_stroller from '../assets/images/main/product/product_stroller.png'
import badge_finished from '../assets/images/main/badge/badge_finished.png'

const MypagePurchaseListComponent = () => {
    return (
        <>
            {/* 구매 목록 타이틀 */}
            <h3 id="h3_purListTitle">구매 목록</h3>

            {/* 구매 목록 리스트 */}
            <Container className="mb-3">
                <Row className="my-5">
                    <Col xs={1} id="col_purList">
                        <img src={product_stroller} alt="strollerImg" id="img_purListThumbnail" />
                    </Col>
                    <Col xs={2} id="col_purList">
                        <div>
                            <div id="purListTitle">유모차 팝니다</div>
                            <div>판매자닉네임</div>
                            <div>70,000 P</div>
                        </div>
                    </Col>
                    <Col xs={4} id="col_purList">
                        <div>
                            <div>신청일자   2024-10-25 19:00</div>
                            <div>배송도착   2024-10-25 19:00</div>
                        </div>
                    </Col>
                    <Col xs={2} id="col_purList">
                        <div>
                            <img src={badge_finished} alt="finished" width="100px"/>
                        </div>
                    </Col>
                    <Col xs={2} id="col_purList">
                        <div>
                            <Button size="lg" variant="warning" id="btn_purConfirm">구매 확정</Button>
                        </div>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col xs={1} id="col_purList">
                        <img src={product_stroller} alt="strollerImg" id="img_purListThumbnail" />
                    </Col>
                    <Col xs={2} id="col_purList">
                        <div>
                            <div id="purListTitle">유모차 팝니다</div>
                            <div>판매자닉네임</div>
                            <div>70,000 P</div>
                        </div>
                    </Col>
                    <Col xs={4} id="col_purList">
                        <div>
                            <div>신청일자   2024-10-25 19:00</div>
                            <div>배송도착   2024-10-25 19:00</div>
                        </div>
                    </Col>
                    <Col xs={2} id="col_purList">
                        <div>
                            <img src={badge_finished} alt="finished" width="100px"/>
                        </div>
                    </Col>
                    <Col xs={2} id="col_purList">
                        <div>
                            <Button size="lg" variant="warning" id="btn_purConfirm">구매 확정</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MypagePurchaseListComponent