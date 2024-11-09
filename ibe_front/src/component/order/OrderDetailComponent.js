import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductOrderResponse } from '../service/ProductService';
import ReactDOM from 'react-dom';
import { saveOrders } from '../service/OrderService';

import "./Order.css";
import thumbnail from "../assets/images/thumbnail.png";
import MypagePointChargeComponent from '../mypage/MypagePointChargeComponent';

const OrderDetailComponent = () => {
    const { id } = useParams();
    const [productId, setProductId] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [productPoint, setProductPoint] = useState("");
    const [productImage, setProductImage] = useState("");
    const [member, setMember] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);  // Result modal state
    const [resultMessage, setResultMessage] = useState("");  // Result message state

    useEffect(() => {
        getProductOrderResponse(id)
            .then(response => {
                if (response.data.code === '200') {
                    const data = response.data.data;
                    setProductId(data.productId || null);
                    setProductTitle(data.productTitle || "제목");
                    setProductPoint(data.productPoint || "포인트");
                    setProductImage(data.thumbnail || thumbnail);
                    setMember(data.member || {});
                } else {
                    alert(response.data.message);
                    window.location.href ="/products"
                }
            })
            .catch(error => {
                console.error(error);
                alert("사용자 정보를 불러오는 데 실패했습니다.");
            });
    }, [id]);

    const addComma = (price) => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const getFullImageUrl = (imagePath) => {
        const cleanPath = imagePath.replace(/\\/g, "/");
        return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
    };

    const [showChargeModal, setShowChargeModal] = useState(false);

    const pointChargeHandler = () => {
        setShowChargeModal(true);
    };

    const handleCloseChargeModal = () => {
        setShowChargeModal(false);
        setMember(member);
    };

    const handlePurchase = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmPurchase = () => {
        const updatedPoint = member.memberPoint - productPoint;

        if (updatedPoint < 0) {
            if (window.confirm("포인트가 부족합니다.\n 충전하시겠습니까?")) {
                handleCloseModal();
                pointChargeHandler();
            }
        } else {
            const orderFormRequest = {
                productId: productId,
                productPoint: productPoint
            };

            saveOrders(orderFormRequest)
                .then(response => {
                    console.log(response)
                    if(response.data.code ==="200"){
                        setResultMessage("구매가 완료되었습니다.");  // 성공 메시지 설정
                        setShowResultModal(true);  // 결과 모달 열기
                    }
                    else{
                        setResultMessage(response.data.message);  // 실패 메시지 설정
                        setShowResultModal(true);  // 결과 모달 열기
                    }
                })
                .catch(error => {
                    setResultMessage("구매에 실패했습니다.\n 다시 시도해주세요.");  // 실패 메시지 설정
                    setShowResultModal(true);  // 결과 모달 열기
                });
            
            handleCloseModal();
        }
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
        // 구매 완료 후 페이지 이동
        window.location.href = "/products";  // 구매 완료 후 /products 페이지로 이동
    };

    return (
        <Container className="order-detail">
            <p className="h4 mb-4">택배거래, 안전결제로 구매합니다</p>

            <div className="product_info mb-4 p-3 rounded shadow-sm">
                <Row>
                    <Col md={4} className="text-center">
                        <img
                            id="product_order_img"
                            src={getFullImageUrl(productImage)}
                            alt="productImg"
                            className="img-fluid rounded bg-white"
                            onError={(e) => e.target.src = thumbnail}
                        />
                    </Col>
                    <Col md={8} className="d-flex flex-column justify-content-center">
                        <p className="h4">{addComma(productPoint)}<span className='text-warning'> P</span></p>
                        <p className="text-muted mb-0">{productTitle}</p>
                    </Col>
                </Row>
            </div>

            <div className="user-info mb-4 p-3 rounded shadow-sm">
                <h5 className="mb-3">구매자 정보</h5>
                <p><strong>{member.memberName}</strong></p>
                <p className="text-muted ">{member.memberAddr} {member.memberAddrDetail}</p>
                <p className="text-muted ">{member.memberPhone}</p>
            </div>

            <div className="point_info p-3 rounded shadow-sm">
                <Row className="align-items-center">
                    <h5 className="mb-3">보유 포인트</h5>
                    <Col md={2}>
                        <Form.Control type="text" value={addComma(member.memberPoint)} disabled className="bg-light text-right" />
                    </Col>
                    <Col md={2} className="text-left">
                        <Button variant="custom" className="w-100" onClick={pointChargeHandler}>포인트 충전</Button>
                    </Col>
                </Row>
                <h5 className="text-right mt-3">총 차감할 포인트: {addComma(productPoint)} <span style={{ color: "darkorange" }}>P</span></h5>
            </div>

            <div className="text-center mt-4">
                <Button variant="custom" className="btn-outline-dark" onClick={handlePurchase}>
                    구매하기
                </Button>
            </div>
            
            {showChargeModal && ReactDOM.createPortal(
                <Modal id="order-modal"
                    show={showChargeModal}
                    onHide={handleCloseChargeModal}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body >
                        <MypagePointChargeComponent />
                    </Modal.Body>
                </Modal>,
                document.body
            )}

            <Modal id="order-modal" show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>구매 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>보유 포인트: <span>{addComma(member.memberPoint)} <span style={{ color: "darkorange" }}>P</span></span></p>
                    <p>차감할 포인트: <span>{addComma(productPoint)} <span style={{ color: "darkorange" }}>P</span></span></p>
                    <p>구매하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
                    <Button variant="custom" onClick={handleConfirmPurchase}>확인</Button>
                </Modal.Footer>
            </Modal>

            {/* 결과 모달 */}
            <Modal  id="order-modal"  show={showResultModal} onHide={handleCloseResultModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>구매 결과</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{resultMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="custom" onClick={handleCloseResultModal}>확인</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OrderDetailComponent;
