import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getMemberPoint } from '../service/MypageService'; 

const MemberPointCardComponent = () => {
  
  const navigate = useNavigate();

  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [memberPoint, setMemberPoint] = useState(null);

  useEffect(() => {
    // 포인트 조회 API 호출
    const fetchMemberPoint = async () => {
      try {
        const response = await getMemberPoint(); 
        if (response.data && response.data.data.memberPoint) {
          setMemberPoint(response.data.data.memberPoint); 
        }
      } catch (error) {
        console.error('포인트 조회 실패:', error);
      }
    };

    fetchMemberPoint(); 
  }, []);

  if (error) {
    return (
      <Container className="text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
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
          마이 포인트 &ensp; <strong>{memberPoint !== null ? `${memberPoint}` : '로딩중'} P</strong>
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
