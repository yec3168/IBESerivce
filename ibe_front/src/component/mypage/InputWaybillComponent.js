import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import ibe_logo from "../assets/images/header/ibe_logo.png";
import { useLocation } from "react-router-dom";

const InputWaybillComponent = () => {
    const [waybill, setWaybill] = useState('');
    const [addr, setAddr] = useState('');
    const [errors, setErrors] = useState({});
    const [waybillData, setWaybillData] = useState(null);

    const location = useLocation();

    useEffect(() => {
        // URL에서 'addr', waybillData 쿼리 파라미터를 추출 (API 호출 X)
        const queryParams = new URLSearchParams(location.search);
        const waybillDataStr = queryParams.get('waybillData');
        const address = queryParams.get('address');

        if (waybillDataStr) {
            try {
                const parsedWaybillData = JSON.parse(decodeURIComponent(waybillDataStr));
                setWaybillData(parsedWaybillData);  
            } catch (e) {
                console.error('Error parsing waybillData:', e);
            }
        }
        if (address) {
            setAddr(decodeURIComponent(address));
        }
    }, [location.search]);

    useEffect(() => {
        // 넘어온 waybillData 콘솔 출력
        if (waybillData) {
            console.log('Received waybillData:', waybillData);
        }
    }, [waybillData]);


    // 입력된 운송장 번호를 처리하는 함수
    const handleInputChange = (e) => {
        const value = e.target.value;
        setWaybill(value);

        // 운송장 번호 입력이 시작되면 에러 메시지 삭제
        if (value.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, waybill: null }));
        }
    };

    // 운송장 번호 제출 처리 함수
    const handleSubmit = () => {
        setErrors({});

        // 운송장 번호가 비어 있는지 확인
        // 택배사, 운송장 번호 형식 validation 안함.
        if (!waybill) {
            setErrors({
                waybill: "운송장 번호를 입력해 주세요."
            });
            return;
        }

        // 여기서 운송장 번호 전송 API 호출
        alert(`운송장 정보: ${waybill}이(가) 제출되었습니다.`);

        window.close(); // 제출 후 창 닫기
    };

    return (
        <>
            <Container className="text-center my-2 containerPCharge">
                {/* 아이비 로고 */}
                <img src={ibe_logo} width="200px" alt="logo" />
                
                {/* 배송 시작 타이틀 */}
                <h1 id="h1_pointTitle">배송 시작</h1>
                
                {/* 배송 안내 */}
                <div style={{ marginTop: '20px', marginLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div>구매자 주소를 확인 후 상품을 발송해주세요.</div>
                    <div>상품을 발송하셨다면 택배사와 운송장 번호를 기입해 주세요.</div>
                </div>


                {/* 구분선 */}
                <hr />

                {/* 입력 폼 */}
                <Form style={{ marginTop: '10px' }}>
                    {/* 구매자 주소 */}
                    <Row className="align-items-center justify-content-center">
                        <Col xs="auto">
                            <Form.Label style={{ marginTop: '8px', fontWeight: 'bold' }}>구매자 주소</Form.Label>
                        </Col>
                        <Col xs={8}>
                            <div style={{ display: 'flex', justifyContent: 'start', marginLeft: '5px' }}>{addr}</div>
                        </Col>
                    </Row>
                    {/* 운송장 번호 */}
                    <Row className="align-items-center justify-content-center">
                        <Col xs="auto">
                            <Form.Label style={{ marginTop: '8px', fontWeight: 'bold' }}>운송장 번호</Form.Label>
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                placeholder="CJ대한통운 1234-1234-1234"
                                value={waybill}
                                onChange={handleInputChange}
                            />
                            {errors.waybill && 
                                <small className="text-danger" 
                                       style={{ textAlign: 'left', display: 'block', marginLeft: '5px' }} >
                                    {errors.waybill}
                                </small>}
                        </Col>
                    </Row>
                </Form>

                {/* 구매자 주소 확인 버튼 */}
                {/* 클릭 시 창 닫음 */}
                <Button
                    onClick={()=>{window.close()}}
                    style={{
                        backgroundColor: '#FFD54F', borderColor: '#FFEB3B', color: '#000435',
                        margin: '20px 30px', width: '130px', height: '40px', whiteSpace: "nowrap"
                    }} >
                    닫기
                </Button>
                
                {/* 운송장 제출 버튼 */}
                <Button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#FFD54F', borderColor: '#FFEB3B', color: '#000435',
                        margin: '20px 30px', width: '130px', height: '40px', whiteSpace: "nowrap"
                    }} >
                    운송장 번호 제출
                </Button>
            </Container>
        </>
    );
};

export default InputWaybillComponent;
