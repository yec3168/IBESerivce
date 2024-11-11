import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Mypage.css';
import { Col, Container, Row } from 'react-bootstrap';
import { getInquiry, getInquiryAnswer } from '../service/InquiryService';

const MypageInquiryAnsComponent = () => {
    // URL에서 inquiryId 값을 가져오기
    const { id } = useParams();
    
    const [inquiry, setInquiry] = useState(null);  
    const [inquiryAnswer, setInquiryAnswer] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const inquiryCategoryMapping = {
        "DELIVERY": "배송 지연 / 누락",
        "PRODUCT_DEFECT": "물품 하자",
        "POINT_CHARGE": "포인트 결제",
        "POINT_PAYBACK": "포인트 환급",
        "INQ_MISC": "기타"
    };

    // 문의 유형 매핑 함수
    const getCategoryLabel = (category) => {
        return inquiryCategoryMapping[category] || category;  
    };

    useEffect(() => {
        // API 호출
        const fetchInquiryData = async () => {
            try {
                // 문의 조회
                const inquiryResponse = await getInquiry(id);  // inquiryId를 파라미터로 전달
                if (inquiryResponse.data.responseCode === 'SUCCESS') {
                    setInquiry(inquiryResponse.data.data);  
                } else {
                    setError('문의 데이터를 가져오는데 실패했습니다.');
                }

                // 문의 답변 조회
                const inquiryAnswerResponse = await getInquiryAnswer(id);  // inquiryId를 파라미터로 전달
                if (inquiryAnswerResponse.data.responseCode === 'SUCCESS') {
                    setInquiryAnswer(inquiryAnswerResponse.data.data);
                } else {
                    // setError('답변 데이터를 가져오는데 실패했습니다.');
                }

            } catch (err) {
                setError('API 요청 중 에러가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchInquiryData();
    }, [id]);  // id가 바뀔 때마다 다시 호출

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container className="text-center my-5 containerInq" style={{ maxWidth: '600px' }}>
            {/* 1:1문의 타이틀*/}
            <h1 id="h1_inqAnsTitle">1:1 문의</h1>

            {/* 구분선 */}
            <hr />

            <Container className="mt-4">
                {/* 문의 유형 */}
                <Row className="mb-3">
                    <Col className="text-start">
                        <div id="div_inqAns" style={{ height: '40px' }}>
                            <div>{getCategoryLabel(inquiry?.inquiryCategory) || '미제공'}</div>  
                        </div>
                    </Col>
                </Row>

                {/* 문의 제목 */}
                <Row className="mb-3">
                    <Col className="text-start">
                        <div id="div_inqAns" style={{ height: '40px' }}>
                            <div>{inquiry?.inquiryTitle || '미제공'}</div>  
                        </div>
                    </Col>
                </Row>

                {/* 문의 내용 */}
                <Row className="mb-3">
                    <Col className="text-start">
                        <div id="div_inqAns" style={{ height: '300px' }}>
                            <div>{inquiry?.inquiryContent || '미제공'}</div>  
                        </div>
                    </Col>
                </Row>

                {/* 문의 답변 */}
                <Row className="mb-3">
                    <Col className="text-start">
                        {/* 답변이 없을 때 div_inqAns를 숨기도록 조건부 렌더링 적용 */}
                        {inquiryAnswer?.inquiryAnswered && inquiryAnswer.inquiryAnswerContent ? (
                            <>
                                <hr />
                                <div id="div_inqAns" style={{ height: '300px' }}>
                                    <div>
                                        {/* 답변 내용 표시 */}
                                        <strong>[운영자]</strong><br />
                                        {inquiryAnswer.inquiryAnswerContent}
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default MypageInquiryAnsComponent;
