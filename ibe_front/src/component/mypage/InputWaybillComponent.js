import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Modal } from "react-bootstrap";
import ibe_logo from "../assets/images/header/ibe_logo.png";
import { useLocation } from "react-router-dom";

import { orderDelivery } from "../service/OrderService";

const InputWaybillComponent = () => {
    const [waybill, setWaybill] = useState('');  // 운송장 번호 입력 값
    const [addr, setAddr] = useState('');        // 구매자 주소 상태
    const [errors, setErrors] = useState({});    // 에러 메시지 상태
    const [waybillData, setWaybillData] = useState(null);  // 쿼리 파라미터로 받은 데이터
    const [localWaybillData, setLocalWaybillData] = useState(null); // 로컬 저장소의 데이터

    const [showModal, setShowModal] = useState(false);          // 거래확정 확인 모달 표시 여부
    const [showResultModal, setShowResultModal] = useState(false);  // 결과 모달 표시 여부
    const [resultMessage, setResultMessage] = useState("");     // 결과 메시지 상태

    const location = useLocation();
    
    // 컴포넌트 마운트 시, 로컬 저장소와 URL 파라미터에서 데이터 가져오기
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search); // URL에서 쿼리 파라미터 가져오기
        const waybillDataStr = queryParams.get('waybillData');
        
        // localStorage에서 데이터를 가져옴
        const localWayBill = JSON.parse(localStorage.getItem('waybillData'));
        if (localWayBill) {
            setLocalWaybillData(localWayBill); // 로컬 데이터 상태에 저장
            setAddr(decodeURIComponent(localWayBill.addr)); // 구매자 주소 설정
        }

        if (waybillDataStr) {
            // URL에서 받은 쿼리 파라미터를 JSON으로 파싱하여 상태에 저장
            try {
                const parsedWaybillData = JSON.parse(decodeURIComponent(waybillDataStr));
                setWaybillData(parsedWaybillData);
            } catch (e) {
                console.error('Error parsing waybillData:', e);
            }
        }
    }, [location.search]);

    // 운송장 번호 입력 핸들러
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
        setErrors({}); // 에러 상태 초기화
        

        // 운송장 번호가 비어 있는지 확인
        if (!waybill) {
            setErrors({
                waybill: "운송장 번호를 입력해 주세요." // 에러 메시지 설정
            });
            return;
        }
        
        handleCloseModal();
        
        // localWaybillData에 운송장 번호 저장
        const orderDeliveryRequest = {
            orderId : localWaybillData.orderId,     // 주문 ID
            productId: localWaybillData.productId,  // 제품 ID
            orderWayBill: waybill,                  // 운송장 번호
        }

        // 주문 배송 API 호출
        orderDelivery(orderDeliveryRequest)
            .then(response => {
                console.log(response.data)
                if (response.data.code === "200") {
                    setResultMessage("배송지 입력이 완료되었습니다.."); // 성공 메시지 설정
                } else {
                    setResultMessage(response.data.message); // 실패 메시지 설정
                }
                setShowResultModal(true);  // 결과 모달 열기
            })
            .catch(() => {
                setResultMessage("입력에 실패했습니다. 운송장번호를 확인해주세요.."); // 실패 메시지 설정
                setShowResultModal(true);  // 결과 모달 열기
            });
    };

    // 운송장 입력 확정 확인 모달 열기
    const handlerDelivery = () => {
        if (!waybill) {
            setErrors({
                waybill: "운송장 번호를 입력해 주세요." // 에러 메시지 설정
            });
            return;
        }
        setShowModal(true);
    };

    // 운송장 입력 확정 모달 닫기
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // 결과 모달 닫기
    const handleCloseResultModal = () => {
        setShowResultModal(false);
        window.close();
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
                            <div style={{ display: 'flex', justifyContent: 'start', marginLeft: '5px' }}>
                                {addr || (localWaybillData ? localWaybillData.addr : "주소 없음")}
                            </div>
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
                    onClick={handlerDelivery}
                    style={{
                        backgroundColor: '#FFD54F', borderColor: '#FFEB3B', color: '#000435',
                        margin: '20px 30px', width: '130px', height: '40px', whiteSpace: "nowrap"
                    }} >
                    운송장 번호 제출
                </Button>
            </Container>

            {/* 거래확정 확인 모달 */}
            <Modal id="order-modal" show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>운송장 입력 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>운송장을 정확히 입력하셨습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
                    <Button variant="primary" 
                    style={{
                        backgroundColor: '#FFD54F', borderColor: '#FFEB3B', color: '#000435',
                         whiteSpace: "nowrap"
                    }}
                    onClick={ handleSubmit }>확인</Button>
                </Modal.Footer>
            </Modal>

            {/* 결과 모달 */}
            <Modal  id="order-modal" show={showResultModal} onHide={handleCloseResultModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>결과</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{resultMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseResultModal}
                     style={{
                        backgroundColor: '#FFD54F', borderColor: '#FFEB3B', color: '#000435',
                         whiteSpace: "nowrap"
                    }}
                    >확인</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InputWaybillComponent;
