import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MemberPointCardComponent = () => {
  
  const navigate = useNavigate();

  // 데이터 상태 관리
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Bearer Token
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmaGJzeTg0QGdtYWlsLmNvbSIsImlhdCI6MTczMDc3MDY5NywiZXhwIjoxNzMwODU3MDk3fQ.IdaZJ1ilvWTjboYWZ6ZcDjf0i83z2KRUQ0cwCWkSVBc';

    // API 호출
    axios.get('http://localhost:8080/api/members/mypage', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setInfo(response.data.data);
      })
      .catch(err => {
        setError('데이터를 가져오는데 실패했습니다.');
      });
  }, []);

  if (error) {
    return (
      <Container className="text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!info) {
    // 데이터가 아직 로드되지 않은 경우
    return null; // 여기에 대체 UI를 표시
  }

  const handlePointCharge = () => {
    navigate('/mypage/pntcharge');
  };

  const handlePointPayback = () => {
    navigate('/mypage/pntpayback');
  };

  return (
    <Card id="card_memberPointInfo" className="mx-2">
      <Card.Body>
        <Card.Text>
          마이 포인트 &ensp; <strong>{info.memberPoint} P</strong>
        </Card.Text>

        <Row className="d-flex justify-content-center">
          <Col xs="auto" className="mx-3">
            <Button onClick={handlePointCharge} id="btn_pCharge">
              포인트 충전
            </Button>
          </Col>
          <Col xs="auto" className="mx-3">
            <Button onClick={handlePointPayback} id="btn_pPayback">
              포인트 환급
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MemberPointCardComponent;
