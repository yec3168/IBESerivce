import { useLocation } from "react-router-dom";
import './Point.css'
import ibe_logo from "../assets/images/header/ibe_logo.png";
import point_icon from "../assets/images/header/coin_purse_icon.png";
import { Button, Col, Container, Row,} from "react-bootstrap";

const MypagePointPayBackResultComponent = ()=>{
    const location = useLocation();
    console.log(location.state);
    let memberName = location.state.data.memberName;
    let previousPoint =(location.state.data.memberPoint+location.state.data.payBackPoint).toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let memberPoint = location.state.data.memberPoint.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let payBackPoint = location.state.data.payBackPoint.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let money = (location.state.data.payBackPoint*10).toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    const handleConfirmClick = () => {
        window.opener.location.reload(); 
        window.close();
    };

    return(
        <>
       <Container className="text-center my-5 point-container">
        
        <Row>
            <Col className="mb-4 ">
                <img src={ibe_logo} width="200px" alt="logo" />
                <h1><strong>환급 완료</strong></h1>
                <hr/>
            </Col>
        </Row>
        <Row>
            <Col className="mb-4">
                <Row>
                    <Col className="mb-4">
                        <div className="text-center" id="payback01">
                            입력하신 계좌로 입금이 완료되었습니다.
                        </div>
                    </Col>
                </Row>

                {/* <Row className="mb-4">
                    <Col sm={6} className="text-start">
                        보유&nbsp;<span id="span_won">P</span>&nbsp;
                    </Col>
                    <Col sm={6} className="text-end">
                        <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px' }} />
                        {previousPoint}&nbsp;<span id="span_won">P</span>
                    </Col>
                </Row> */}

                {/* <Row className="mb-4">
                    <Col sm={6} className="text-start">
                        변동&nbsp;<span id="span_won">P</span>&nbsp;
                    </Col>
                    <Col sm={6} className="text-end" style={{ color: "red" }}>
                        <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px' }} />
                        <span id="span_amt" style={{ color: 'red' }}>-{payBackPoint}&nbsp;</span><span id="span_won">P</span>
                    </Col>
                </Row> */}

                {/* <Row className="mb-1" id="payback02"> */}
                    {/* <Col sm={6} className="text-start">
                        최종&nbsp;<span id="span_won">P</span>&nbsp;
                    </Col>
                    <Col sm={6} className="text-end">
                        <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px' }} />
                        <span id="span_amt">{memberPoint}&nbsp;</span>
                        <span id="span_won">P</span>
                    </Col> */}
                    {/* <Col sm={12} className="text-center">
                        보유 포인트 &ensp;
                        {memberPoint}&nbsp;<span id="span_won">P</span>
                    </Col>
                </Row> */}

                {/* <Row className="mb-1" id="payback02">
                    <Col sm={12} className="text-center"> <strong>
                        입금 금액 &ensp;
                        {money}&nbsp;<span id="span_won">₩</span></strong>
                    </Col>
                </Row> */}

                <div className="point-info-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', whiteSpace:'nowrap' }}>
                    <div className="point-info-item" style={{ display: 'flex', justifyContent: 'space-between', width: '50%', padding: '10px 0'}}>
                        <div>보유 포인트</div>
                        <div>
                            <span id="span_amt">{memberPoint}</span>&nbsp;<span id="span_won">P</span>
                        </div>
                    </div>
                    <div className="point-info-item" style={{ display: 'flex', justifyContent: 'space-between', width: '50%', padding: '10px 0', fontWeight:'bold' }}>
                        <div>입금 금액</div>
                        <div>
                            <span id="span_amt">{money}</span>&nbsp;<span id="span_won">₩</span>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col className="mb-4 ">
                <hr />
                <Button onClick={handleConfirmClick}
                    style={{ backgroundColor:'#FFD54F', borderColor:'#FFEB3B', marginRight:'20px',marginLeft:'20px', width:'60px', height:'40px', color:'#000435' }}>
                    <strong>확인</strong>
                </Button>
            </Col>
        </Row>
        </Container>
        </>
    )
}
export default MypagePointPayBackResultComponent;