import { Card } from 'react-bootstrap';

const MemberInfoCardComponent = () => {
  return (
    <Card id="card_memberInfo">
      <Card.Body>
        <Card.Title>홍길동 님</Card.Title>
        <Card.Text/> 
        <Card.Text>
          이름: 홍길동
        </Card.Text>
        <Card.Text>
          이메일: hong@example.com
        </Card.Text>
        <Card.Text>
          포인트: 1,500 P
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MemberInfoCardComponent;
