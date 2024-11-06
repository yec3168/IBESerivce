import { useEffect, useState } from 'react';
import { Card, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { getMemberInfo } from '../service/MypageService'; 

const MemberInfoCardComponent = () => {
  const [error, setError] = useState(null);
  const [memberInfo, setMemberInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // 멤버 정보 조회 API 호출
    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfo(); 
        if (response.data && response.data.data) {
          setMemberInfo(response.data.data); 
        }
      } catch (error) {
        console.error('멤버 정보 조회 실패:', error);
      }
    };

    fetchMemberInfo(); 
  }, []);

  if (error) {
    return (
      <Container className="text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!memberInfo) {
    // 데이터가 아직 로드되지 않은 경우
    return null; // 여기에 대체 UI를 표시
  }

  const handlePurchaseClick = () => {
    navigate('/mypage/plist');
  };

  const handleSalesClick = () => {
    navigate('/mypage/slist');
  };

  return (
    <Card id="card_memberInfo" className="mx-2 mr-5">
      <Card.Body>
        <Card.Title>
          {memberInfo.memberNickName} 님 &nbsp;
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
