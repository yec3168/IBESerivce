import { Container, Row, Col, Button, Form, Nav, Tab, Badge, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Mypage.css';
import { getInquiries } from '../service/InquiryService';

const MypageInquiryListComponent = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const formattedToday = today.toISOString().split('T')[0];
    const formattedOneWeekAgo = oneWeekAgo.toISOString().split('T')[0];

    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [startDate, setStartDate] = useState(formattedOneWeekAgo);  // 검색 시작 날짜 == 일주일 전 날짜
    const [endDate, setEndDate] = useState(formattedToday);           // 검색 끝 날짜 == 오늘 날짜

    const [activeKey, setActiveKey] = useState('inqAll'); // 활성 탭 상태 관리

    const [currentPageAll, setCurrentPageAll] = useState(1);
    const [currentPageProcessing, setCurrentPageProcessing] = useState(1);
    const [currentPageComplete, setCurrentPageComplete] = useState(1);

    const itemsPerPage = 5; // 한 페이지에 보여줄 항목 수

    const handleDateChange = () => {
        setLoading(true);
        setError(null);

        const endDateAdjusted = new Date(endDate);
        endDateAdjusted.setHours(23, 59, 59, 999); // 자정까지의 게시글 조회

        getInquiries()
            .then(response => {
                if (response && response.data.data.data && Array.isArray(response.data.data.data)) {
                    let filteredInquiries = response.data.data.data.filter(inquiry => {
                        const inquiryDate = new Date(inquiry.inquiryCreatedAt);
                        const start = new Date(startDate);
                        const end = endDateAdjusted;
                        return inquiryDate >= start && inquiryDate <= end;
                    });

                    // 최신순 정렬
                    filteredInquiries = filteredInquiries.sort((a, b) => {
                        const dateA = new Date(a.inquiryCreatedAt);
                        const dateB = new Date(b.inquiryCreatedAt);
                        return dateB - dateA;
                    });

                    setInquiries(filteredInquiries);
                } else {
                    setError('문의 내역을 가져오는 데 실패했습니다. 데이터 형식이 올바르지 않습니다.');
                }
                setLoading(false);
            })
            .catch(err => {
                setError('문의 내역을 가져오는 데 실패했습니다.');
                setLoading(false);
            });
    };

    const paginateInquiries = (inquiries, currentPage) => {
        const indexOfLastInquiry = currentPage * itemsPerPage;
        const indexOfFirstInquiry = indexOfLastInquiry - itemsPerPage;
        return inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);
    };

    const handlePageChange = (tab, pageNumber) => {
        if (tab === 'all') setCurrentPageAll(pageNumber);
        if (tab === 'processing') setCurrentPageProcessing(pageNumber);
        if (tab === 'complete') setCurrentPageComplete(pageNumber);
    };

    useEffect(() => {
        handleDateChange();
    }, []);

    const inquiriesAll = paginateInquiries(inquiries, currentPageAll);
    const inquiriesProcessing = paginateInquiries(inquiries.filter(inquiry => !inquiry.inquiryAnswered), currentPageProcessing);
    const inquiriesComplete = paginateInquiries(inquiries.filter(inquiry => inquiry.inquiryAnswered), currentPageComplete);

    const totalPagesAll = Math.ceil(inquiries.length / itemsPerPage);
    const totalPagesProcessing = Math.ceil(inquiries.filter(inquiry => !inquiry.inquiryAnswered).length / itemsPerPage);
    const totalPagesComplete = Math.ceil(inquiries.filter(inquiry => inquiry.inquiryAnswered).length / itemsPerPage);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container className="mt-5 text-center containerInqList">
            {/* 1:1 문의 타이틀 */}
            <h1 id="h1_inqListTitle">문의 내역</h1>

            {/* 구분선 */}
            <hr />

            <Row className="align-items-center mt-4">
                {/* 날짜 선택 */}
                <Col md={3}>
                    <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </Col>
                <Col md="auto" className="text-center">
                    <span>~</span>
                </Col>
                <Col md={3}>
                    <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </Col>

                {/* 조회 버튼 */}
                <Col md="auto">
                    <Button id="button_inqSearchDate" onClick={handleDateChange}>
                        조회
                    </Button>
                </Col>
            </Row>

            {/* 탭 */}
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                {/* 탭 메뉴 */}
                <Nav variant="tabs" className="mt-4" id="nav_inqListTab">
                    <Nav.Item>
                        <Nav.Link eventKey="inqAll" className="inqListTab">전체</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="inqProcessing" className="inqListTab">답변 대기</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="inqComplete" className="inqListTab">답변 완료</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* 문의 내역 */}
                <Tab.Content className="mt-3">
                    {/* 전체 탭에 모든 문의 내용 표시 */}
                    <Tab.Pane eventKey="inqAll" className="tabpane_inqList">
                        {inquiriesAll.map(inquiry => (
                            <div key={inquiry.inquiryTitle} className="p-3 border rounded d-flex align-items-center mb-2">
                                {/* 상태에 따라 배지 표시 */}
                                <Badge pill className={`me-2 badge_${inquiry.inquiryAnswered ? 'complete' : 'processing'}`}>
                                    {inquiry.inquiryAnswered ? '답변 완료' : '답변 대기'}
                                </Badge>
                                {/* 문의 내용 */}
                                <Link to={`/mypage/inquiry/answer/${inquiry.inquiryId}`} className="text-decoration-none">
                                    <span className="hover-highlight">{inquiry.inquiryTitle}</span>
                                </Link>
                            </div>
                        ))}
                    </Tab.Pane>

                    {/* 답변 대기 탭 */}
                    <Tab.Pane eventKey="inqProcessing" className="tabpane_inqList">
                        {inquiriesProcessing.map(inquiry => (
                            <div key={inquiry.inquiryTitle} className="p-3 border rounded d-flex align-items-center mb-2">
                                <Badge pill className="me-2 badge_processing">답변 대기</Badge>
                                <Link to={`/mypage/inquiry/answer/${inquiry.inquiryTitle}`} className="text-decoration-none">
                                    <span className="hover-highlight">{inquiry.inquiryTitle}</span>
                                </Link>
                            </div>
                        ))}
                    </Tab.Pane>

                    {/* 답변 완료 탭 */}
                    <Tab.Pane eventKey="inqComplete" className="tabpane_inqList">
                        {inquiriesComplete.map(inquiry => (
                            <div key={inquiry.inquiryTitle} className="p-3 border rounded d-flex align-items-center mb-2">
                                <Badge pill className="me-2 badge_complete">답변 완료</Badge>
                                <Link to={`/mypage/inquiry/answer/${inquiry.inquiryTitle}`} className="text-decoration-none">
                                    <span className="hover-highlight">{inquiry.inquiryTitle}</span>
                                </Link>
                            </div>
                        ))}
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>

            {/* Pagination */}
            {/* 탭 별로 페이징 처리하지 않으면 데이터 수가 달라 페이지 수가 추가되어 보임 */}
            <Row className="justify-content-center mt-2">
                {activeKey === 'inqAll' && (
                    <Pagination id="pagination_purListPaging">
                        <Pagination.Prev onClick={() => handlePageChange('all', currentPageAll - 1)} disabled={currentPageAll === 1} />
                        {[...Array(totalPagesAll).keys()].map(page => (
                            <Pagination.Item key={page + 1} active={page + 1 === currentPageAll} onClick={() => handlePageChange('all', page + 1)}>
                                {page + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange('all', currentPageAll + 1)} disabled={currentPageAll === totalPagesAll} />
                    </Pagination>
                )}

                {activeKey === 'inqProcessing' && (
                    <Pagination id="pagination_purListPaging">
                        <Pagination.Prev onClick={() => handlePageChange('processing', currentPageProcessing - 1)} disabled={currentPageProcessing === 1} />
                        {[...Array(totalPagesProcessing).keys()].map(page => (
                            <Pagination.Item key={page + 1} active={page + 1 === currentPageProcessing} onClick={() => handlePageChange('processing', page + 1)}>
                                {page + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange('processing', currentPageProcessing + 1)} disabled={currentPageProcessing === totalPagesProcessing} />
                    </Pagination>
                )}

                {activeKey === 'inqComplete' && (
                    <Pagination id="pagination_purListPaging">
                        <Pagination.Prev onClick={() => handlePageChange('complete', currentPageComplete - 1)} disabled={currentPageComplete === 1} />
                        {[...Array(totalPagesComplete).keys()].map(page => (
                            <Pagination.Item key={page + 1} active={page + 1 === currentPageComplete} onClick={() => handlePageChange('complete', page + 1)}>
                                {page + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange('complete', currentPageComplete + 1)} disabled={currentPageComplete === totalPagesComplete} />
                    </Pagination>
                )}
            </Row>
        </Container>
    );
};

export default MypageInquiryListComponent;
