import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { postInquiry } from '../service/InquiryService';
import './Mypage.css'

const MypageInquiryComponent = () => {
    const inquiryCategory = ["배송 지연 / 누락", "물품 하자", "포인트 결제", "포인트 환급",  "기타"];

    const inquiryCategoryMapping = {
        "배송 지연 / 누락": "DELIVERY",
        "물품 하자": "PRODUCT_DEFECT",
        "포인트 결제": "POINT_CHARGE",
        "포인트 환급": "POINT_PAYBACK",
        "기타": "INQ_MISC"
    };

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitCategory = inquiryCategoryMapping[category];

        if (!submitCategory) {
            setError('잘못된 카테고리입니다.');
            return;
        }
        
        if (!category || !title || !content) {
            setError('입력 값이 없습니다.');
            return;
        }

        const inquiryData = {
            inquiryCategory: submitCategory,
            inquiryTitle: title,
            inquiryContent: content
        };

        try {
            // 문의 등록 API 호출
            const response = await postInquiry(inquiryData);
            console.log(inquiryData);
            if (response.data.responseCode === 'SUCCESS') {
                setSuccessMessage('문의가 성공적으로 등록되었습니다!');
                setError('');
                // submit 후 form clear 처리
                setCategory('');
                setTitle('');
                setContent('');
            }
        } catch (err) {
            setError('문의 등록에 실패했습니다. 다시 시도해주세요.');
            setSuccessMessage('');
        }
    };

    return (
        <Container className="text-center my-5 containerInq" style={{ maxWidth: '600px', marginLeft: '250px' }}>
            {/* 1:1문의 타이틀*/}
            <h1 id="h1_inqTitle">1:1 &nbsp;문의</h1>
            <div id="div_inqInfo">아이비를 사용하면서 생긴 문제를 문의하세요.</div>

            {/* 구분선 */}
            <hr/>

            {/* Form */}
            <Form className="mt-4" onSubmit={handleSubmit}>
                {/* 문의 유형 */}
                <Form.Group controlId="inqCategory" className="mb-3">
                    <Form.Select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} 
                        style={{ borderRadius: '10px', borderColor: '#ddd', padding: '10px 15px' }}>
                        <option value="">문의 유형</option>
                        {inquiryCategory.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* 문의 제목 */}
                <Form.Group controlId="inqTitle">
                    <Form.Control 
                        type="text" 
                        placeholder="제목" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ borderRadius: '10px', borderColor: '#ddd', padding: '10px 15px' }} />
                </Form.Group>

                {/* 문의 내용 */}
                <Form.Group controlId="inqContent" className="mt-3">
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        placeholder="문의 내용" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onInput={(e) => {
                            e.target.style.height = 'auto'; // 높이를 자동으로 맞추기 위해 초기화
                            e.target.style.height = `${e.target.scrollHeight}px`; // 컨텐츠 높이에 맞춰 자동 확장
                        }}
                        style={{ borderRadius: '20px', borderColor: '#ddd', padding: '15px', resize: 'none', overflow: 'hidden' }}
                        spellCheck={false} />
                </Form.Group>

                {/* 문의 등록 실패 에러 메시지 */}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {/* 문의 등록 성공 메시지 */}
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

                {/* 문의 버튼 */}
                <Row className="justify-content-center mt-4">
                    <Col xs="auto">
                        <Button 
                            id="button_inqSubmit" 
                            className="px-4" 
                            style={{ borderRadius: '20px', fontWeight:'bold' }}
                            type="submit">
                            문의하기
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default MypageInquiryComponent;