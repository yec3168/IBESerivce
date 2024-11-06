import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import point_icon from "../assets/images/header/coin_purse_icon.png";
import ibe_logo from "../assets/images/header/ibe_logo.png";


const MypagePointChargeResult = ()=>{
    const location = useLocation();
    console.log(location.state);
    let name = location.state.data.memberName;
    let memberPoint = location.state.data.memberPoint
    let points = location.state.data.chargePoint;
    let amount = location.state.data.amount;
    return(
        <>
            <Container className="text-center my-5 containerPCharge">

                <img src={ibe_logo} width="200px" alt="logo" />
                <h1 id="h1_pointTitle">충전 완료</h1>
                <hr />
                <br/>  
                <h1>{name}님</h1> 
                <h3>결제 : {amount}<span id="span_won">₩</span></h3>
                <h3>충전 :&nbsp; 
                    <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                    <span id="span_amt">{points}&nbsp;</span>
                    <span id="span_won">P</span>
                </h3>
                <h3>보유 :&nbsp; 
                    <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                    <span id="span_amt">{memberPoint}&nbsp;</span>
                    <span id="span_won">P</span>
                </h3>
                <h2>감사합니다!</h2>
                <br/>
                <hr />
                <Button onClick={()=>window.close()}
                        style={{ backgroundColor:'#FFD54F', borderColor:'#FFEB3B', marginLeft:'20px', width:'80px', height:'50px', color:'#000435' }}>
                        확인
                </Button>
            </Container>
            
        </>
    )
}
export default MypagePointChargeResult;