import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductOrderResponse } from '../service/ProductService';

import "./Order.css"
import thumbnaiil from "../assets/images/thumbnail.png"

const OrderDetailComponent = () => {

    const {id} = useParams();

    // 사용자 정보와 배송지 상태 관리
    const [productId, setProductId] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [productPoint, setProductPoint] = useState("");
    const [productImage, setProductImage] = useState("");
    const [member, setMember] = useState([]);
    const [showModal, setShowModal] = useState(false);
    

    useEffect(() => {
        // 사용자 정보 가져오기
        getProductOrderResponse(id)
            .then(response => {
                if (response.data.code === '200') {
                    const data = response.data.data;
                    console.log(data)
                    setProductId(data.productId !== null ?  data.productId : null)
                    setProductTitle(data.productTitle !== null ?  data.productTitle : "제목")
                    setProductPoint(data.productPoint !== null ?  data.productPoint : "포인트" )
                    setProductImage(data.thumbnail !== null ?  data.thumbnail : thumbnaiil)
                    setMember(data.member !== null ?  data.member : null)

                    // setUserInfo(data);
                    // setAddress(data.address || '주소가 없습니다.');
                    // setPhoneNumber(data.phoneNumber || '전화번호가 없습니다.');
                    // setPointsToDeduct(data.points); // 사용자의 포인트
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.error(error);
                alert("사용자 정보를 불러오는 데 실패했습니다.");
            });
    }, []);

     const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }
    
    const getFullImageUrl = (imagePath) => {
        const cleanPath = imagePath.replace(/\\/g, "/"); // 백슬래시를 슬래시로 변경
        return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
    };

    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    const handlePurchase = () => {
        setShowModal(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmPurchase = () => {
        // 포인트 차감 및 구매 로직 처리
        alert('구매가 완료되었습니다.');
        setShowModal(false);

    };

    return (
        <div className="order-detail mx-4">
            <p id="content_title" className="h2">택배거래, 안전결제로 구매합니다. </p>
            <div className='product_info'>
                <Row>
                    <Col>
                        <img
                            id="product_img"
                            src={getFullImageUrl(productImage)}
                            alt={"productImg"}
                            onError={(e) => e.target.src = thumbnaiil}
                        />
                        <p>{addComma(productPoint)}</p>
                        <p>{productTitle}</p>
                    </Col>
                    <Col>
                    </Col>
                </Row>

            </div>
            
            <div className="user-info">
                <p> <strong>{member.memberNickName}님</strong></p>
                <p>{member.memberAddr} {member.memberAddrDetail}</p>
                <p>{formatPhoneNumber(member.memberPhone.replace("-", "").trim())}</p>
                <p>총 차감할 포인트: P</p>
            </div>

            <div>

            </div>
            <Button variant="primary" onClick={handlePurchase}>
                구매하기
            </Button>

            {/* 포인트 차감 확인 모달 */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>포인트 차감 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>차감할 포인트: P</p>
                    <p>포인트를 차감하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleConfirmPurchase}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderDetailComponent;