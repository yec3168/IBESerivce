import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import point_icon from "../assets/images/header/coin_purse_icon.png";
import ibe_logo from "../assets/images/header/ibe_logo.png";


const MypagePointChargeResult = ()=>{
    const location = useLocation();
    console.log(location.state);
    let name = location.state.data.memberName;
    let memberPoint = location.state.data.memberPoint.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let points = location.state.data.chargePoint.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  
    let amount = location.state.data.amount.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    
    return(
        <>
            <Container className="text-center my-5 point-container">
                <Row>
                    <Col className="mb-4 "> 
                        <img src={ibe_logo} width="200px" alt="logo" />
                        <h1><strong>충전 완료</strong></h1>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-4 "> 
                        <table className='point-table' style={{margin: 'auto',borderCollapse: 'separate' ,borderSpacing: '0px 10px'}}>
                            {/* <tr >
                                <td colSpan={'2'}>
                                    {name}님
                                </td>
                            </tr> */}
                            <tr>
                                <td>결제&nbsp;</td>
                                <td align="right">
                                    {amount}&nbsp;<span id="span_won">₩</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   충전&nbsp;
                                </td>
                                <td align="right">
                                    <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                                    <span id="span_amt">{points}&nbsp;</span><span id="span_won">P</span>
                                </td>
                            </tr>
                            <tr>
                                <td>보유&nbsp;</td>
                                <td align="right">
                                    <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                                    <span id="span_amt">{memberPoint}&nbsp;</span>
                                    <span id="span_won">P</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={'2'}>
                                    감사합니다 
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
export default MypagePointChargeResult;