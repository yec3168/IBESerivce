import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";

import badge_available from '../assets/images/main/badge/badge_available.png'
import badge_finished from '../assets/images/main/badge/badge_finished.png';
import badge_delivery from '../assets/images/main/badge/badge_delivery.png'
import badge_delivery_complete from "../assets/images/main/badge/badge_delivery_complete.png";
import badge_rejected from "../assets/images/main/badge/badge_rejected.png"

import thumbnail2 from '../assets/images/thumbnail2.png';

import { getOrderList, orderFinished, orderRejected } from "../service/OrderService";

const MypagePurchaseListComponent = () => {

    const [orders, setOrders] = useState([]); // 초기값을 빈 배열로 설정
    const [completed, setCompleted] = useState(false); // 거래완료시 변화함.
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 item 상태
    const [showModal, setShowModal] = useState(false); // 구매 확정 모달
    const [showCancelModal, setShowCancelModal] = useState(false); // 구매 취소 모달
    const [showResultModal, setShowResultModal] = useState(false); // 결과 모달
    const [resultMessage, setResultMessage] = useState(""); // 결과 메시지


    useEffect(() => {
        getOrderList()
        .then(response => {
            console.log("Response:", response);  // 응답을 로깅하여 확인합니다.
            if(response.data.code ==="200"){
                setOrders(response.data.data)
            }
        })
        .catch(error => {
            console.error("Error fetching order list:", error);  // 에러 정보를 출력합니다.
        });
    }, [completed]);

    const purchaseList = orders.map((order, index) => ({
        id: order.orderId,
        title: order.productTitle,//`${name} 판매합니다`,
        seller: order.member.memberNickName,//`판매자${index + 1} 닉네임`,
        price: order.productPoint + " P",//`${(index + 1) * 10000} P`,
        listedDate: order.orderDate,//'2024-10-25 19:00',
        deliveryDate: order.orderDeliveryDate !== null ? order.orderDeliveryDate: null ,//'2024-10-25 19:00',
        thumbnail : order.imagePath,
        orderState : order.orderState,
        orderWayBill : order.orderWayBill,
        productId: order.productId,
    }));

   



  // 구매 확정 핸들러
  const orderFinishedHandler = () => {
        handleCloseModal();
        if (selectedItem) {
            const orderFinishedRequest = {
                orderId: selectedItem.id,
                productId: selectedItem.productId
            };

            console.log(orderFinishedRequest);

            orderFinished(orderFinishedRequest)
                .then(response => {
                    if (response.data.code === "200") {
                        setResultMessage("거래확정되었습니다.");
                    } else {
                        setResultMessage(response.data.message); // 실패 메시지 설정
                    }
                    setShowResultModal(true);  // 결과 모달 열기
                })
                .catch(() => {
                    setResultMessage("구매에 실패했습니다.\n 다시 시도해주세요."); // 실패 메시지 설정
                    setShowResultModal(true);  // 결과 모달 열기
                });
        }
    }
    // 구매취소 핸들러
    const orderRejectedHandler = () =>{
        handleCloseCancelModal();

        if (selectedItem) {
            const orderRejectedRequest = {
                orderId: selectedItem.id,
                productId: selectedItem.productId
            };

            console.log(orderRejectedRequest);

            orderRejected(orderRejectedRequest)
                .then(response => {
                    if (response.data.code === "200") {
                        setResultMessage("구매취소되었습니다.");
                    } else {
                        setResultMessage(response.data.message); // 실패 메시지 설정
                    }
                    setShowResultModal(true);  // 결과 모달 열기
                })
                .catch(() => {
                    setResultMessage("구매내역이 존재하지 않습니다."); // 실패 메시지 설정
                    setShowResultModal(true);  // 결과 모달 열기
                });
        }
    }
   

    const handlerRejected = (item) => {
        setSelectedItem(item);
        setShowCancelModal(true); // 구매 취소 모달 열기
    }


    const handlerFinished = (item) => {
        setSelectedItem(item);
        setShowModal(true); // 구매 확정 모달 열기
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseCancelModal = () => {
        setShowCancelModal(false);
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
        setCompleted(prev => !prev);
    };

     const addComma = (price) => {
                let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return returnString;
            }
    
    const getFullImageUrl = (imagePath) => {
        const cleanPath = imagePath.replace(/\\/g, "/"); // 백슬래시를 슬래시로 변경
        return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
    };

    const currentItems = purchaseList.slice(0, 3);



    return (
        <>
            {/* 구매 목록 타이틀 */}
            <h3 id="h3_purListTitle">구매 내역</h3>

            {/* 구매 목록 리스트 */}
            <Container className="mb-3" id="container_purListPaging">
                {currentItems.map(item => (
                    <Row className="my-4" key={item.id} id="row_purListPaging">
                        <Col xs={1} id="col_purListPaging">
                            <img src={getFullImageUrl(item.thumbnail)} alt="thumbnailImg" id="img_purListPagingThumbnail"  onError={(e) => e.target.src = thumbnail2}/>
                        </Col>
                        <Col xs={3} id="col_purListPagingTitle">
                            <div>
                                <div id="purListPagingTitle">{item.title}</div>
                                <div>{item.seller}</div>
                                <div>{addComma(item.price)}</div>
                            </div>
                        </Col>
                        <Col xs={4} id="col_purListPaging">
                            <div>
                                <div>신청 일자: {item.listedDate}</div>
                                <div>{item.deliveryDate !== null ? <span>배송 도착: {item.deliveryDate} </span>: ""}</div>
                                <div>{item.orderWayBill !== null ? <span>운송장 번호: {item.orderWayBill} </span>: ""}</div>
                            </div>
                        </Col>
                        <Col xs={2} id="col_purListPaging">
                    
                            <div>
                                {item.orderState === "AVAILABLE" &&  <img src={badge_available} alt="finished" id="img_purListPagingBadge"/>}
                                {item.orderState === "COMPLETED" &&  <img src={badge_finished} alt="finished" id="img_purListPagingBadge"/>}
                                {/* 배송중사진 */}
                                {item.orderState === "SHIPPING" &&  <img src={badge_delivery} alt="finished" id="img_purListPagingBadge"/>}    
                                {/* 배송완료사진 */}
                                {item.orderState === "DELIVERED" &&  <img src={badge_delivery_complete} alt="finished" id="img_purListPagingBadge"/>} 
                                {/* 구매거부*/}
                                {item.orderState === "REJECTED" &&  <img src={badge_rejected} alt="finished" id="img_purListPagingBadge"/>} 
                            </div>
                        </Col>
                        <Col xs={2} id="col_purListPaging">
                            <div>
                                {item.orderState === "AVAILABLE" && <Button size="lg" variant="warning" id="btn_purListPagingConfirm" onClick={() => handlerRejected(item)}>구매 취소</Button>}
                                {/* {item.orderState === "AVAILABLE" &&    <Button size="lg" variant="warning" id="btn_purListPagingConfirm" onClick={() =>handlerFinished(item)}>구매 확정</Button>} */}
                                {item.orderState === "COMPLETED" &&   <div />}
                                {item.orderState === "SHIPPING" &&   <Button size="lg" variant="warning" id="btn_purListPagingConfirm" onClick={() =>handlerFinished(item)}>구매 확정</Button>}
                                {item.orderState === "DELIVERED" &&   <div />}
                            </div>
                        </Col>

                         {/* 구매 취소 모달 */}
                        <Modal id="order-modal" show={showCancelModal} onHide={handleCloseCancelModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>구매 취소 확인</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div >
                                    <p>주의사항</p>
                                    <ul>
                                        <li>구매 취소가 완료되면 차감된 포인트는 자동으로 환불됩니다.</li>
                                        <li>취소 시 재구매에 제한이 있을 수 있습니다.</li>
                                        <li>구매 후 일정 시간이 지난 경우, 구매 취소가 제한될 수 있습니다.</li>
                                        <li>포인트 환불 처리에 영업일 기준 최대 1일이 소요될 수 있습니다.</li>
                                    </ul>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseCancelModal}>취소</Button>
                                <Button variant="custom" onClick={orderRejectedHandler}>확인</Button>
                            </Modal.Footer>
                        </Modal>

                         {/* 구매 확정 모달 */}
                        <Modal id="order-modal" show={showModal} onHide={handleCloseModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>구매 확정 확인</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <div style={{ marginTop: '20px', marginLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <div>물품을 수령했으면 상품을 확인 후 구매 확정 버튼을 눌러주세요.</div>
                                <div>구매 확정시 환불 및 교환이 <strong style={{color:"red"}}>불가</strong>합니다.</div>
                                <div  style={{color:"red"}}>구매 확정 하시겠습니까?</div>
                            </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
                                <Button variant="custom" onClick={orderFinishedHandler}>확인</Button>
                            </Modal.Footer>
                        </Modal>

                        {/* 결과 모달 */}
                        <Modal  id="order-modal" show={showResultModal} onHide={handleCloseResultModal} centered>
                            <Modal.Header closeButton>
                                {/* <Modal.Title>결고</Modal.Title> */}
                            </Modal.Header>
                            <Modal.Body>
                                <p>{resultMessage}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="custom" onClick={handleCloseResultModal}>확인</Button>
                            </Modal.Footer>
                        </Modal>

                    </Row>
                ))}
            </Container>
        </>
    );
}

export default MypagePurchaseListComponent