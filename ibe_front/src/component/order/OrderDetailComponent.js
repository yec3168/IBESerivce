import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import { getUserInfo } from '../service/UserService'; // 사용자 정보를 가져오는 API

import "./Order.css"

const OrderDetailComponent = () => {
    const { productId } = useParams();


    // 사용자 정보와 배송지 상태 관리
    const [userInfo, setUserInfo] = useState({});
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [pointsToDeduct, setPointsToDeduct] = useState(0); // 차감할 포인트

    // useEffect(() => {
    //     // 사용자 정보 가져오기
    //     getUserInfo()
    //         .then(response => {
    //             if (response.data.code === '200') {
    //                 const data = response.data.data;
    //                 setUserInfo(data);
    //                 setAddress(data.address || '주소가 없습니다.');
    //                 setPhoneNumber(data.phoneNumber || '전화번호가 없습니다.');
    //                 setPointsToDeduct(data.points); // 사용자의 포인트
    //             } else {
    //                 alert(response.data.message);
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             alert("사용자 정보를 불러오는 데 실패했습니다.");
    //         });
    // }, []);

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
        <div className="order-detail">
            <h1>주문 상세 정보</h1>
            <div className="order-info">
                <h4>배송지 정보</h4>
                <p>이름: {userInfo.name || '이름이 없습니다.'}</p>
                <p>주소: {address}</p>
                <p>전화번호: {phoneNumber}</p>
                <p>총 차감할 포인트: {pointsToDeduct}P</p>
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
                    <p>차감할 포인트: {pointsToDeduct}P</p>
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