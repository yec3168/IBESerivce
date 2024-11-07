import { useState, useEffect } from "react";
import { Button, Col, Container, Pagination, Row } from "react-bootstrap";
import { getSellList } from "../service/OrderService";
import thumbnail2 from '../assets/images/thumbnail2.png';
import badge_available from '../assets/images/main/badge/badge_available.png';
import badge_finished from '../assets/images/main/badge/badge_finished.png';
import badge_delivery from '../assets/images/main/badge/badge_delivery.png'
import badge_delivery_complete from "../assets/images/main/badge/badge_delivery_complete.png";

const MypageSalesListComponent = () => {

        const [orders, setOrders] = useState([]); // 초기값을 빈 배열로 설정
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
        }, []);




        const purchaseList = orders.map((order, index) => ({
            id: order.orderId,
            title: order.productTitle,//`${name} 판매합니다`,
            seller: order.sellerMemberNickName,//`판매자${index + 1} 닉네임`,
            price: order.productPoint + " P",//`${(index + 1) * 10000} P`,
            listedDate: order.orderDate !==null ? "신청 일자 : " + order.orderDate : "판매 일자 : " + order.productListedAt,//'2024-10-25 19:00',
            deliveryDate: order.orderDeliveryDate !== null ? order.orderDeliveryDate: null ,//'2024-10-25 19:00',
            thumbnail : order.imagePath,
            orderState : order.orderState,
            orderMemberNickName : order.orderMemberNickName !== null ? "구매자 : " + order.orderMemberNickName : null , // 구매자 닉네임
        }));
    
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
            {/* 판매 목록 타이틀 */}
            <h3 id="h3_salListTitle">판매 목록</h3>

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
                                <div>{item.deliveryDate !== null ? <span>배송 도착: {item.deliveryDate} </span>: ""}</div>
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
                                {/* <img src={badge_finished} alt="finished" id="img_purListPagingBadge"/> */}
                            </div>
                        </Col>
                        <Col xs={2} id="col_purListPaging">
                            <div>
                                {item.orderState === "AVAILABLE" &&   <Button size="lg" variant="warning" id="btn_purListPagingConfirm">거래 확정</Button>}
                                {item.orderState === "COMPLETED" &&   <Button size="lg" variant="warning" id="btn_purListPagingConfirm">배송지 입력</Button>}
                                {item.orderState === "SHIPPING" &&   <Button size="lg" variant="warning" id="btn_purListPagingConfirm">구매 확정</Button>}
                                {item.orderState === "DELIVERED" &&   <div />}
                            </div>
                        </Col>
                    </Row>
                ))}
            </Container>
        </>
    );
}

export default MypageSalesListComponent