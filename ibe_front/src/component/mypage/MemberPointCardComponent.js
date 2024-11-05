import { Card } from 'react-bootstrap';

const MemberPointCardComponent = () => {
  return (
    <Card id="card_memberPointInfo">
      <Card.Body>
        <Card.Text>
          마이 포인트 <strong>10,000 P</strong>
        </Card.Text>
        <Card.Text>
          [포인트충전버튼]&nbsp;[포인트환급버튼]
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MemberPointCardComponent;
