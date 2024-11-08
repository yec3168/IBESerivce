import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Board.css';
import { Button, Col, Container, Row, Form, Spinner } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const IbeBoardWriteComponent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    let tokenRole;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        tokenRole = decodedToken.role; // Get user role from the token
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
    const adminArr = [
      'ROLE_ADMIN',
      'ROLE_SERVICE_MANAGER',
      'ROLE_BOARD_MANAGER',
    ];
    for (let i = 0; i < adminArr.length; i++) {
      if (tokenRole === adminArr[i]) {
        setIsAdmin(true);
      }
    }
  }, []);

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
        window.location.href = '/boards';
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
                  className="board-input"
                />
              </Form.Group>

              <Form.Group controlId="category" className="mt-3">
                <Form.Label>카테고리</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="board-select"
                >
                  <option value="">선택하세요</option>
                  {/* 관리자 또는 보드 관리자일 때만 공지 카테고리 옵션 표시 */}
                  {isAdmin && <option value="NOTICE">공지</option>}
                  <option value="REQUEST">요청</option>
                  <option value="QUESTION">질문</option>
                  <option value="INFORMATION">정보</option>
                  <option value="GENERAL">일반</option>
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
                  className="board-textarea"
                />
              </Form.Group>

              {/* 정책 내용 추가 */}
              <div className="board-policy-notice mt-2">
                <p>
                  관련 법령을 위반하거나 타인의 권리를 침해하는 내용의 게시물은
                  명백한 법령 위반 또는 권리 침해의 내용이 아닌 한, 원칙적으로
                  법원의 판결, 결정 등 또는 법률에 따라 관련 권한을 보유한
                  행정기관의 행정처분, 명령 등에 의해 법령 위반 또는 권리 침해가
                  확인된 경우 게재가 제한됨을 알려 드립니다.
                </p>
              </div>

              {error && <p className="board-error-message mt-3">{error}</p>}

              <div className="text-end">
                <Button type="submit" className="board-add-post-btn">
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
