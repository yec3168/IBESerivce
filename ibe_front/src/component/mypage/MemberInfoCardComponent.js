import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

const MemberInfoCardComponent = () => {
  // 데이터 상태 관리
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

  // Handle purchase click
  const handlePurchaseClick = () => {
    navigate('/mypage/plist'); // Navigate to purchase list
  };

  // Handle sales click
  const handleSalesClick = () => {
    navigate('/mypage/slist'); // Navigate to sales list
  };

  return (
    <Card id="card_memberInfo" className="mx-2 mr-5">
      <Card.Body>
        <Card.Title>
          {info.memberNickName} 님 &nbsp;
          <span id="span_welcome">환영합니다!</span>
        </Card.Title>

        <div className="d-flex justify-content-between">
          <Card.Text className="mx-4" onClick={handlePurchaseClick} style={{ cursor: 'pointer' }} id="card_toPlist">
            구매 &nbsp;<strong>12 건</strong>
          </Card.Text>
          <Card.Text className="mx-4" onClick={handleSalesClick} style={{ cursor: 'pointer' }} id="card_toSlist">
            판매 &nbsp;<strong>5 건</strong>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MemberInfoCardComponent;
