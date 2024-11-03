import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import product_stroller from '../assets/images/main/product/product_stroller.png'
import badge_available from '../assets/images/main/badge/badge_available.png'

const MypageSalesListComponent = () => {
    return (
        <>
            {/* 판매 목록 타이틀 */}
            <h3 id="h3_salListTitle">판매 목록</h3>

            {/* 판매 목록 리스트 */}
            <Container className="mb-3">
                <Row className="my-5">
                    <Col xs={1} id="col_salList">
                        <img src={product_stroller} alt="strollerImg" id="img_salListThumbnail" />
                    </Col>
                    <Col xs={2} id="col_salList">
                        <div>
                            <div id="salListTitle">유모차 팝니다</div>
                            <div>판매자닉네임</div>
                            <div>70,000 P</div>
                        </div>
                    </Col>
                    <Col xs={4} id="col_salList">
                        <div>
                            <div>신청일자   2024-10-25 19:00</div>
                            <div>배송도착   2024-10-25 19:00</div>
                        </div>
                    </Col>
                    <Col xs={2} id="col_salList">
                        <div>
                            <img src={badge_available} alt="finished" width="100px"/>
                        </div>
                    </Col>
                    <Col xs={2} id="col_salList">
                        <div>
                            <Button size="lg" variant="warning" id="btn_salConfirm">거래 수락</Button>
                        </div>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col xs={1} id="col_salList">
                        <img src={product_stroller} alt="strollerImg" id="img_salListThumbnail" />
                    </Col>
                    <Col xs={2} id="col_salList">
                        <div>
                            <div id="salListTitle">유모차 팝니다</div>
                            <div>판매자닉네임</div>
                            <div>70,000 P</div>
                        </div>
                    </Col>
                    <Col xs={4} id="col_salList">
                        <div>
                            <div>신청일자   2024-10-25 19:00</div>
                            <div>배송도착   2024-10-25 19:00</div>
                        </div>
                    </Col>
                    <Col xs={2} id="col_salList">
                        <div>
                            <img src={badge_available} alt="finished" width="100px"/>
                        </div>
                    </Col>
                    <Col xs={2} id="col_salList">
                        <div>
                            <Button size="lg" variant="warning" id="btn_salConfirm">거래 수락</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MypageSalesListComponent