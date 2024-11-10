import { useLocation } from "react-router-dom";
import './Point.css'
import ibe_logo from "../assets/images/header/ibe_logo.png";
import point_icon from "../assets/images/header/coin_purse_icon.png";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

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
                <table className='point-table' style={{margin:'auto',borderCollapse: 'separate',borderSpacing: '0px 10px'}}>
                    <tr>
                        <td align="left">보유&nbsp;<span id="span_won">P</span>&nbsp;</td>
                        <td align="right">
                            <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                            {previousPoint}&nbsp;<span id="span_won">P</span>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">변동&nbsp;<span id="span_won">P</span>&nbsp;</td>
                        <td align="right" tyle={{color:"red"}}>
                            <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                            <span id="span_amt" style={{color:'red'}}>-{payBackPoint}&nbsp;</span><span id="span_won">P</span>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">최종&nbsp;<span id="span_won">P</span>&nbsp;</td>
                        <td align="right"><img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                    <span id="span_amt">{memberPoint}&nbsp;</span>
                    <span id="span_won">P</span></td>
                    </tr>
                    <tr>
                        <td colSpan={'2'}>
                            {money}&nbsp;<span id="span_won">₩</span>&nbsp;
                            환급 되었습니다
                        </td>
                    </tr>
                </table> 
            </Col>
        </Row>
        <Row>
            <Col className="mb-4 ">
                <hr />
                <Button onClick={()=>window.close()}
                    style={{ backgroundColor:'#FFD54F', borderColor:'#FFEB3B', marginRight:'20px',marginLeft:'20px', width:'80px', height:'50px', color:'#000435' }}>
                    <strong>확인</strong>
                </Button>
            </Col>
        </Row>
        </Container>
        </>
    )
}
export default MypagePointPayBackResultComponent;