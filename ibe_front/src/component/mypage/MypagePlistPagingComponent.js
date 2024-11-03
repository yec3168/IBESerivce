import { useState } from "react";
import { Button, Col, Container, Pagination, Row } from "react-bootstrap";
import thumbnail2 from '../assets/images/thumbnail2.png';
import badge_finished from '../assets/images/main/badge/badge_finished.png';

const MypagePlistPagingComponent = () => {
    const productNames = [
        '유모차', '유아 모빌', '신생아 우주복', '이유식 용기', '아기 침대', '아기띠',
        '젖병', '분유통', '신생아 배냇저고리', '유아 장난감', '아기 발싸개',
        '아기 화장대', '카시트', '아기 소독기', '아기 모자', '이불 세트',
        '유아용 식탁 의자', '아기 수영복', '유아용 신발', '신생아 수면조끼'
    ];

    const purchaseList = productNames.map((name, index) => ({
        id: index + 1,
        title: `${name} 판매합니다`,
        seller: `판매자${index + 1} 닉네임`,
        price: `${(index + 1) * 10000} P`,
        listedDate: '2024-10-25 19:00',
        deliveryDate: '2024-10-25 19:00',
    }));

    const itemsPerPage = 5; // 한 페이지에 5개 씩 띄움
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(purchaseList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = purchaseList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {/* 구매 목록 타이틀 */}
            <h3 id="h3_purListTitle">구매 목록</h3>

            {/* 구매 목록 리스트 */}
            <Container className="mb-3" id="container_purListPaging">
                {currentItems.map(item => (
                    <Row className="my-2" key={item.id}>
                        <Col xs={1} id="col_purListPaging">
                            <img src={thumbnail2} alt="thumbnailImg" id="img_purListPagingThumbnail"/>
                        </Col>
                        <Col xs={2} id="col_purListPagingTitle">
                            <div>
                                <div id="purListPagingTitle">{item.title}</div>
                                <div>{item.seller}</div>
                                <div>{item.price}</div>
                            </div>
                        </Col>
                        <Col xs={4} id="col_purListPaging">
                            <div>
                                <div>신청 일자: {item.listedDate}</div>
                                <div>배송 도착: {item.deliveryDate}</div>
                            </div>
                        </Col>
                        <Col xs={2} id="col_purListPaging">
                            <div>
                                <img src={badge_finished} alt="finished" id="img_purListPagingBadge"/>
                            </div>
                        </Col>
                        <Col xs={2} id="col_purListPaging">
                            <div>
                                <Button size="lg" variant="warning" id="btn_purListPagingConfirm">구매 확정</Button>
                            </div>
                        </Col>
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

export default MypagePlistPagingComponent;
