import { useLocation } from "react-router-dom";
import '../mypage/Mypage.css'
import ibe_logo from "../assets/images/header/ibe_logo.png";
import point_icon from "../assets/images/header/coin_purse_icon.png";
import { Button, Container } from "react-bootstrap";

const MypagePointPayBackResultComponent = ()=>{
    const location = useLocation();
    console.log(location.state);
    let memberName = location.state.data.memberName;
    let memberPoint = location.state.data.memberPoint.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let payBackPoint = location.state.data.payBackPoint.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let money = (location.state.data.payBackPoint*10).toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return(
        <>
        <Container className="text-center my-5 containerPCharge">
        <img src={ibe_logo} width="200px" alt="logo" />
        <h1 id="h1_pointTitle">환급 완료</h1>
        <hr />
        <br/> 
        <table style={{margin: 'auto',borderCollapse: 'separate' ,borderSpacing: '10px 10px'}}>
            <tr >
                <td colSpan={'2'}>
                    <h1>{memberName}님</h1> 
                </td>
            </tr>
            <tr>
                <td><h3>환급&nbsp;<span id="span_won">₩</span>&nbsp;</h3></td>
                <td align="right">
                         <h3>
                        {money}&nbsp;<span id="span_won">₩</span>
                    </h3>
                </td>
            </tr>
            <tr>
                <td><h3>환급&nbsp;<span id="span_won">P</span>&nbsp;</h3></td>
                <td align="right">
                    <h3>
                        <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                        <span id="span_amt">{payBackPoint}&nbsp;</span><span id="span_won">P</span>
                    </h3>
                </td>
            </tr>
            <tr>
                <td><h3>보유&nbsp;<span id="span_won">P</span>&nbsp;</h3></td>
                <td align="right"><h3><img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
            <span id="span_amt">{memberPoint}&nbsp;</span>
            <span id="span_won">P</span></h3></td>
            </tr>
            <tr>
                <th colSpan={'2'}>
                    <h2>정상 환급 되었습니다!</h2>
                </th>
            </tr>
        </table> 
        
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
export default MypagePointPayBackResultComponent;