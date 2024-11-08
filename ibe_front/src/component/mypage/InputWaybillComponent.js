import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import ibe_logo from "../assets/images/header/ibe_logo.png";

const InputWaybillComponent = () => {
    // 상태를 관리할 변수 (운송장 번호)
    const [waybillNumber, setWaybillNumber] = useState('');

    // 입력된 운송장 번호를 처리하는 함수
    const handleInputChange = (e) => {
        setWaybillNumber(e.target.value);
    };

    // 운송장 번호 제출 처리 함수
    const handleSubmit = () => {
        // 운송장 번호가 비어 있는지 확인
        if (!waybillNumber) {
            alert("운송장 번호를 입력해 주세요.");
            return;
        }

        // 운송장 번호 처리 로직 (예: 서버에 전송)
        alert(`운송장 번호: ${waybillNumber}이(가) 제출되었습니다.`);
        window.close();
    };

    return (
        <>
            <Container className="text-center my-2 containerPCharge">
                <img src={ibe_logo} width="200px" alt="logo" />
                <h1 id="h1_pointTitle">배송 시작</h1>
                <div>상품을 발송하셨다면 택배사와 운송장 번호를 기입해 주세요.</div>
                <hr />
                <br />

                {/* 운송장 번호 입력 폼 */}
                <Form>
                    <Row className="align-items-center justify-content-center">
                        {/* 라벨과 입력창을 한 줄로 배치 */}
                        <Col xs="auto">
                            <Form.Label style={{marginTop:'8px'}}>운송장 번호</Form.Label>
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                placeholder="CJ대한통운 1234-1234-1234"
                                value={waybillNumber}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Row>
                </Form>

                {/* 확인 버튼 */}
                <Button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#FFD54F',
                        borderColor: '#FFEB3B',
                        marginTop: '20px',
                        width: '60px',
                        height: '40px',
                        color: '#000435',
                    }}
                >
                    확인
                </Button>
            </Container>
        </>
    );
};

export default InputWaybillComponent;
