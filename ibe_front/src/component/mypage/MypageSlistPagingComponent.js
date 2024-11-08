import { useState, useEffect } from "react";
import { Button, Col, Container, Pagination, Row, Modal } from "react-bootstrap";
import { getSellList, orderComplete } from "../service/OrderService";
import thumbnail2 from '../assets/images/thumbnail2.png';
import badge_available from '../assets/images/main/badge/badge_available.png';
import badge_finished from '../assets/images/main/badge/badge_finished.png';
import badge_delivery from '../assets/images/main/badge/badge_delivery.png'
import badge_delivery_complete from "../assets/images/main/badge/badge_delivery_complete.png";

const MypageSlistPagingComponent = () => {

    const [orders, setOrders] = useState([]); // 초기값을 빈 배열로 설정
    const [completed, setCompleted] = useState(false); // 거래완료시 변화함.
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 item 상태
    const [showModal, setShowModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    
    useEffect(() => {
        getSellList()
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
        seller: order.sellerMemberNickName,//`판매자${index + 1} 닉네임`,
        price: order.productPoint + " P",//`${(index + 1) * 10000} P`,
        listedDate: order.orderDate !==null ? "신청 일자 : " + order.orderDate : "판매 일자 : " + order.productListedAt,//'2024-10-25 19:00',
        deliveryDate: order.orderDeliveryDate !== null ? order.orderDeliveryDate: null ,//'2024-10-25 19:00',
        thumbnail : order.imagePath,
        orderState : order.orderState,
        orderMemberNickName : order.orderMember !== null ? "구매자 : " + order.orderMember.memberNickName: null , // 구매자 닉네임

        // 배송지 얻는부분.
        // 상세 주소 null인 경우 공백 치환 추가
        orderMemberAddr: order.orderMember !== null 
        ? (order.orderMember.memberAddr + " " + (order.orderMember.memberAddrDetail || "")) 
        : null,

        productId: order.productId,

        // 운송장 번호 추가
        waybill: order.orderWayBill,
    }))
    .sort((a, b) => new Date(b.listedDate.split(" : ")[1]) - new Date(a.listedDate.split(" : ")[1])); // 내림차순 정렬


    // 거래 확정 핸들러
    const orderCompleteHandler = () => {
        handleCloseModal();
        if (selectedItem) {
            const orderCompleteRequest = {
                orderId: selectedItem.id,
                productId: selectedItem.productId
            };

            orderComplete(orderCompleteRequest)
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
    };



     const addComma = (price) => {
                let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return returnString;
            }
    
    const getFullImageUrl = (imagePath) => {
        const cleanPath = imagePath.replace(/\\/g, "/"); // 백슬래시를 슬래시로 변경
        return cleanPath.startsWith("http") ? cleanPath : `http://localhost:8080${cleanPath}`;
    };

    const itemsPerPage = 5; // 한 페이지에 5개 씩 띄움
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(purchaseList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = purchaseList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 운송장 번호 입력을 위한 새 창 열기 함수
    const openWaybillWindow = (orderId, addr, productId, wb) => {
        const width = 700; 
        const height = 450; 
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
    
        // 새 창 오픈 위치 (화면 정중앙에 열리도록)
        const left = Math.max((screenWidth-width)/2, 0);
        const top = Math.max((screenHeight-height)/2, 0);

          // 배송지 입력 버튼 클릭 시 넘어가는 배열
          const waybillData = {
            orderId: orderId,
            productId: productId,
            addr: addr,
            // waybill: wb
        };

        console.log(waybillData);

        // const url = `/waybill/${orderId}?address=${encodeURIComponent(addr)}&waybillData=${encodeURIComponent(JSON.stringify(waybillData))}`;

        localStorage.setItem('waybillData', JSON.stringify(waybillData));
        const windowName = `waybillWindow`;
        const windowFeatures = `width=${width}, height=${height}, left=${left}, top=${top}`;

        const order = purchaseList.find(item => item.id === orderId);
        if (!order) {
            console.error('Order not found');
            return;
        }
        // window.open(`/waybill/${orderId}`, 'waybillWindow');
        const newWindow = window.open(`/waybill/${orderId}`, windowName, windowFeatures);


        checkWindowClose(newWindow);
    };
    const checkWindowClose = (newWindow) => {
        // setInterval을 외부에서 사용하여 창 상태를 계속 확인
        const intervalId = setInterval(() => {
            if (newWindow.closed) {
                // 자식 창이 닫혔을 때 실행할 동작
                setCompleted(prev => !prev);
                clearInterval(intervalId);  // 창이 닫히면 interval을 정리합니다.
            }
        }, 500);  // 0.5초마다 확인
    };

    
    const handlerComplete = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
        setCompleted(prev => !prev);
    };


    return (
        <>
            {/* 판매 목록 타이틀 */}
            <h3 id="h3_purListTitle">판매 목록</h3>

            {/* 판매 목록 리스트 */}
            <Container className="mb-3" id="container_purListPaging">
                {currentItems.map(item => (
                    <Row className="my-5" key={item.id}>
                        <Col xs={1} id="col_purListPaging">
                            <img src={getFullImageUrl(item.thumbnail)} alt="thumbnailImg" id="img_purListPagingThumbnail"  onError={(e) => e.target.src = thumbnail2}/>
                        </Col>
                        <Col xs={2} id="col_purListPagingTitle">
                            <div>
                                <div id="purListPagingTitle">{item.title}</div>
                                <div>{item.seller}</div>
                                <div>{addComma(item.price)}</div>
                            </div>
                        </Col>
                        <Col xs={4} id="col_purListPaging">
                            <div>
                                <div>{item.orderMemberNickName}</div>
                                <div>{item.listedDate}</div>
                                <div>{item.deliveryDate !== null ? <span>배송 도착: {item.deliveryDate} </span> : ""}</div>
                            </div>
                        </Col>
                        <Col xs={2} id="col_purListPaging">
                            <div>
                                {item.orderState === "AVAILABLE" &&  <img src={badge_available} alt="available" id="img_purListPagingBadge"/>}
                                {item.orderState === "COMPLETED" &&  <img src={badge_finished} alt="finished" id="img_purListPagingBadge"/>}
                                {item.orderState === "SHIPPING" &&  <img src={badge_delivery} alt="shipping" id="img_purListPagingBadge"/>}
                                {item.orderState === "DELIVERED" &&  <img src={badge_delivery_complete} alt="delivered" id="img_purListPagingBadge"/>}
                            </div>
                        </Col>
                        <Col xs={2} id="col_purListPaging">
                            <div>
                                {item.orderState === "AVAILABLE" && item.id !== null &&  
                                    <Button size="lg" variant="warning" id="btn_purListPagingConfirm" onClick={() => handlerComplete(item)}>거래 확정</Button>}
                                {item.orderState === "COMPLETED" &&   
                                    <Button size="lg" variant="warning" id="btn_purListPagingConfirm" onClick={() => openWaybillWindow(item.id, item.orderMemberAddr, item.productId, item.waybill)}>배송지 입력</Button>}
                                {item.orderState === "SHIPPING" &&  <div />}
                                {item.orderState === "DELIVERED" && <div />}
                            </div>
                        </Col>

                        <Modal id="order-modal" show={showModal} onHide={handleCloseModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>거래확정 확인.</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>상품: {selectedItem?.title}</p>
                                <p>가격: {addComma(selectedItem?.price)}</p>
                                <p>{selectedItem?.orderMemberNickName}</p>
                                <p>{selectedItem?.listedDate}</p>
                                <p>해당 구매자와 거래하시겠습니까?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
                                <Button variant="custom" onClick={orderCompleteHandler}>확인</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal  id="order-modal" show={showResultModal} onHide={handleCloseResultModal} centered>
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
                    </Row>
                ))}
            </Container>

            {/* 페이지 처리 */}
            <Pagination id="pagination_purListPaging">
                <Pagination.Prev id="paginationNum_purListPaging"/>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item id="paginationNum_purListPaging" 
                        key={index + 1} 
                        active={index + 1 === currentPage} 
                        onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next id="paginationNum_purListPaging"/>
            </Pagination>
        </>
    );
}

export default MypageSlistPagingComponent;