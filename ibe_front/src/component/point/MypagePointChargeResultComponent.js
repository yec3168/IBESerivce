import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
// import point_icon from "../assets/images/header/coin_purse_icon.png";
import ibe_logo from "../assets/images/header/ibe_logo.png";

const MypagePointChargeResult = () => {
    const location = useLocation();
    console.log(location.state);
    let name = location.state.data.memberName;
    let memberPoint = location.state.data.memberPoint.toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let points = location.state.data.chargePoint.toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  
    let amount = location.state.data.amount.toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    
    return (
        <>
            <Container className="text-center my-5 point-container">
                <Row>
                    <Col className="mb-4 "> 
                        <img src={ibe_logo} width="200px" alt="logo" />
                        <h1><strong>포인트 충전 완료</strong></h1>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-4 "> 
                        <div className="point-info-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', whiteSpace:'nowrap' }}>
                            <div className="point-info-item" style={{ display: 'flex', justifyContent: 'space-between', width: '50%', padding: '10px 0'}}>
                                <div>충전 포인트</div>
                                <div>
                                    <span id="span_amt">{points}</span>&nbsp;<span id="span_won">P</span>
                                </div>
                            </div>
                            <div className="point-info-item" style={{ display: 'flex', justifyContent: 'space-between', width: '50%', padding: '10px 0', fontWeight:'bold' }}>
                                <div>보유 포인트</div>
                                <div>
                                    <span id="span_amt">{memberPoint}</span>&nbsp;<span id="span_won">P</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-4 ">
                        <hr />
                        <Button onClick={() => window.close()}
                            style={{ backgroundColor: '#FFD54F', borderColor: '#FFEB3B', marginRight: '20px', marginLeft: '20px', width: '60px', height: '40px', color: '#000435' }}>
                            <strong>확인</strong>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MypagePointChargeResult;
