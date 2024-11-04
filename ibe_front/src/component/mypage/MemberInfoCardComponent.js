import { Card } from 'react-bootstrap';

const MemberInfoCardComponent = () => {
  return (
    <Card id="card_memberInfo">
      <Card.Body>
        <Card.Title>홍길동닉네임 님</Card.Title>
        <Card.Text/> 
        <Card.Text>
          구매 <strong>12 건</strong>
        </Card.Text>
        <Card.Text>
          판매 <strong>5 건</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MemberInfoCardComponent;
