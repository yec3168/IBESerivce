import { useLocation } from "react-router-dom";
import '../mypage/Mypage.css'
import { Col, Container, Row } from "react-bootstrap";
import point_icon from "../assets/images/header/coin_purse_icon.png";

const MypagePointPayBackResultComponent = ()=>{
    const location = useLocation();
    console.log(location.state);
    let account = location.state.data.account;
    let bankName = location.state.data.bankName;
    let memberName = location.state.data.memberName;
    let memberPoint = location.state.data.memberPoint;
    let payBackPoint = location.state.data.payBackPoint;
    return(
        <>
        <Container className="text-center my-5 containerPCharge">
                {/* 포인트 환급 타이틀*/}
                <h1 id="h1_pointTitle">포인트 환급</h1>
                <div id="div_pointInfo" className="text-muted">포인트를 현금으로 전환할 수 있습니다.</div>
                <div id="div_spacing"/>

                {/* 보유 포인트 */}
                <div id="div_pointData">
                    보유 포인트 : 
                    <span id="span_point">&nbsp;10,000&nbsp;</span>
                    <span id="span_p">P</span>
                </div>

                {/* 구분선 */}
                <hr />

                <Container className="my-5">
                    <Row className="justify-content-center align-items-center">
                        <Col xs='auto'>
                        
                        <h1>{memberName}님 </h1>
                        <h3>환전 :&nbsp; 
                        <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                        <span id="span_amt">{payBackPoint}&nbsp;</span>
                        <span id="span_won">P</span>
                        </h3>
                        <h3>잔여 :&nbsp;
                        <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                        <span id="span_amt">{memberPoint}&nbsp;</span>
                        <span id="span_won">P</span>
                        </h3>
                        <h2>{bankName} {account}</h2>
                        <h2>정상 환전 되었습니다!</h2>
                        
                        </Col>
                    </Row>
                </Container>

        </Container>
        
        
        
        </>
    )
}
export default MypagePointPayBackResultComponent;