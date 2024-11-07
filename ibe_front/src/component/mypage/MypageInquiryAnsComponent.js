import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Mypage.css';
import { Col, Container, Row } from 'react-bootstrap';
import { getInquiry, getInquiryAnswer } from '../service/InquiryService';

const MypageInquiryAnsComponent = () => {
    // URL에서 inquiryId 값을 가져오기
    const { id } = useParams();
    
    // 상태 설정
    const [inquiry, setInquiry] = useState(null);  
    const [inquiryAnswer, setInquiryAnswer] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        // API 호출
        const fetchInquiryData = async () => {
            try {
                // API 호출 문의 조회
                const response = await getInquiry(id);  // inquiryId를 파라미터로 전달
                if (response.data.responseCode === 'SUCCESS') {
                    setInquiry(response.data.data);  
                } else {
                    setError('문의 데이터를 가져오는데 실패했습니다.');
                }
                //API 호출 답변 조회
                
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
                            <div>{inquiry?.inquiryCategory || '미제공'}</div>  {/* 문의 유형 */}
                        </div>
                    </Col>
                </Row>

                {/* 문의 제목 */}
                <Row className="mb-3">
                    <Col className="text-start">
                        <div id="div_inqAns" style={{ height: '40px' }}>
                            <div>{inquiry?.inquiryTitle || '미제공'}</div>  {/* 문의 제목 */}
                        </div>
                    </Col>
                </Row>

                {/* 문의 내용 */}
                <Row className="mb-3">
                    <Col className="text-start">
                        <div id="div_inqAns" style={{ height: '300px' }}>
                            <div>{inquiry?.inquiryContent || '미제공'}</div>  {/* 문의 내용 */}
                        </div>
                    </Col>
                </Row>

                {/* 구분선 */}
                <hr />

                {/* 문의 답변 */}
                <Row className="mb-3">
                    <Col className="text-start">
                        <div id="div_inqAns" style={{ height: '300px' }}>
                            <div>
                                [운영자]<br />
                                안녕하세요, 운영자 아이비 입니다.<br />
                                해당 제품은 미리 손잡이 부분이 파손되어 있음을 명시하고 사진을 올려 놓은 제품으로 확인되었습니다.<br />
                                감사합니다.
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default MypageInquiryAnsComponent;
