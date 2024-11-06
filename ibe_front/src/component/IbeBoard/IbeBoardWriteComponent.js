import React, { useState } from 'react';
import axios from 'axios';
import './Board.css';
import { Button, Col, Container, Row, Form, Spinner } from 'react-bootstrap';

const IbeBoardWriteComponent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 글 작성 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 제목, 내용, 카테고리가 비어 있으면 오류 처리
    if (!title || !content || !category) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 인증 토큰 가져오기 (로컬스토리지에서)
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:8080/api/boards', // 서버의 글 작성 API 엔드포인트
        {
          boardTitle: title, // boardTitle로 변경
          boardCategory: category, // boardCategory로 변경
          boardContent: content, // boardContent로 변경
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더
          },
        }
      );

      if (response.status === 200) {
        alert('게시글이 성공적으로 작성되었습니다.');
        console.log(response);
        // 글 작성 후 다른 페이지로 이동하거나 목록 페이지로 리다이렉트 할 수 있음
        // window.location.href = '/boards';
      }
    } catch (error) {
      console.error('Error posting the board:', error);
      setError('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="board_content">
      <Container className="board-container">
        <Row>
          <p className="h2 board-title">글 작성하기</p>
        </Row>

        <Row>
          <Col md={8} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>제목</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="category" className="mt-3">
                <Form.Label>카테고리</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="NOTICE">공지</option>
                  <option value="REQUEST">REQUEST</option>
                  <option value="QUESTION">질문</option>
                  <option value="INFORMATION">정보</option>
                  <option value="GENARAL">일반</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="content" className="mt-3">
                <Form.Label>내용</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onInput={(e) => {
                    e.target.style.height = 'auto'; // 높이를 자동으로 맞추기 위해 초기화
                    e.target.style.height = `${e.target.scrollHeight}px`; // 컨텐츠 높이에 맞춰 자동 확장
                  }}
                  style={{ resize: 'none', overflow: 'hidden' }} // 크기 조절 비활성화 및 자동 스크롤 조정
                  required
                />
              </Form.Group>

              {error && <p className="error-message mt-3">{error}</p>}

              <div className="text-end">
                <Button type="submit" className="add-post-btn">
                  {loading ? <Spinner animation="border" size="sm" /> : '작성'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IbeBoardWriteComponent;
