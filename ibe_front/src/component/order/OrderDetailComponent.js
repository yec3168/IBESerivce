import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductOrderResponse } from '../service/ProductService';

import "./Order.css";
import thumbnail from "../assets/images/thumbnail.png";

const OrderDetailComponent = () => {

    const { id } = useParams();
    const [productId, setProductId] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [productPoint, setProductPoint] = useState("");
    const [productImage, setProductImage] = useState("");
    const [member, setMember] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
                }
            })
            .catch(error => {
                console.error(error);
                alert("사용자 정보를 불러오는 데 실패했습니다.");
            });
    }, []);

    const addComma = (price) => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const getFullImageUrl = (imagePath) => {
        const cleanPath = imagePath.replace(/\\/g, "/");
        return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
    };

    const handlePurchase = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmPurchase = () => {
        let purchasePrice = member.memberPoint - productPoint;
        console.log(purchasePrice)
        if(purchasePrice < 0){
            if(window.confirm("포인트가 부족합니다.\n 충전하시겠습니까?")){
                console.log("충전")
                // window.location.href ="/mypage"
            }
        }
        else{
            alert('구매가 완료되었습니다.');
        }
       
        setShowModal(false);
    };

    return (
        <Container className="order-detail" style={{ fontFamily: "'CookieRun-Regular', sans-serif" }}>
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
                        <p className="h4 text-warning">{addComma(productPoint)}P</p>
                        <p className="text-muted mb-0">{productTitle}</p>
                    </Col>
                </Row>
            </div>

            <div className="user-info mb-4 p-3 rounded shadow-sm">
                <h5 className="mb-3">구매자 정보</h5>
                <p><strong>{member.memberName}</strong></p>
                <p>{member.memberAddr} {member.memberAddrDetail}</p>
                <p>{member.memberPhone}</p>
            </div>

            <div className="point_info p-3 rounded shadow-sm">
                <Row className="align-items-center">
                <h5 className="mb-3">보유 포인트</h5>
                    <Col md={2}>
                        <Form.Control type="text" value={addComma(member.memberPoint)} disabled className="bg-light text-right" />
                    </Col>
                    <Col md={2} className="text-left">
                        <Button variant="custom" className="w-100">포인트 충전</Button>
                    </Col>
                </Row>
                <h5 className="text-right mt-3">총 차감할 포인트: {addComma(productPoint)} P</h5>
            </div>

            <div className="text-center mt-4">
                <Button variant="custom" className="btn-outline-dark" onClick={handlePurchase}>
                    구매하기
                </Button>
            </div>

            <Modal id="order-modal"show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>포인트 차감 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>차감할 포인트: {addComma(productPoint)} P</p>
                    <p>포인트를 차감하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
                    <Button variant="custom" onClick={handleConfirmPurchase}>확인</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OrderDetailComponent;