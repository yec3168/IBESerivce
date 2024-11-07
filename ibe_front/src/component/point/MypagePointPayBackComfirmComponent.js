import { Button, Container } from "react-bootstrap";
import point_icon from "../assets/images/header/coin_purse_icon.png";
import ibe_logo from "../assets/images/header/ibe_logo.png";
import { useState } from "react";
import { nhTransfer } from '../service/PointService';
import { useNavigate } from "react-router-dom";

const MypagePointPayBackComfrimComponent = ()=>{
    const [isClicked, setIsClicked] = useState(false);
    let point = window.opener.document.getElementById('point_input').value;
    let bank = window.opener.document.getElementById('bank');
    let bankName = bank.options[bank.selectedIndex].text;
    let bankCode = bank.options[bank.selectedIndex].value;
    let accountNumber=window.opener.document.getElementById('account_nubmer').value;
    const navigate = useNavigate();
    console.log("123")
    const transfer = ()=>{
        setIsClicked(true);
        if(!isClicked){
            // let bank = document.getElementById('bank');
            let data ={
            "bankName" : `${bankName}`,
            "bank" : `${bankCode}`,
            "bankAccountNumber" : `${accountNumber}`,
            "memberPoint" : `${point}`
            }
            console.log(data);
            nhTransfer(data)
            .then(response =>{
                console.log(response);
                let msg = response.data.data.msg
                console.log(msg)
                if(msg !=='정상처리 되었습니다.'){
                    window.opener.document.getElementById('popup_result').innerText='계좌번호를 확인해 주세요.'
                    window.close();
                }else{
                    navigate("/mypage/pntPayBack/result",{ state: response.data });
                }
            })
            .catch(e=>{console.log(e)})
            setIsClicked(false);
        }
        
    }
    return(
        <>
        <Container className="text-center my-5 containerPCharge">

        <img src={ibe_logo} width="200px" alt="logo" />
        <h1 id="h1_pointTitle">환급 준비</h1>
        <hr />
        <br/> 
        <table style={{margin: 'auto',borderCollapse: 'separate' ,borderSpacing: '10px 10px'}}>
            <tr>
                <td colSpan={'2'} align="center">
                    <h3>
                    <img src={point_icon} alt="point_icon" style={{ width: '30px', height: '30px'}} />
                        {point}&nbsp;<span id="span_won">p</span>
                    </h3>
                </td>
            </tr>
            <tr>
                <td><h3>{bankName}&nbsp;</h3></td>
                <td align="right">
                    <h3>
                    {accountNumber}
                    </h3>
                </td>
            </tr>
            
            <tr>
                <td colSpan={'2'}>
                    <h2>신청하시겠습니까?</h2> 
                </td>
            </tr>
        </table> 



        <br/>
        <hr />
        <Button onClick={()=>transfer()}
                style={{ backgroundColor:'#FFD54F', borderColor:'#FFEB3B', marginLeft:'20px', width:'80px', height:'50px', color:'#000435' }}>
                확인
        </Button><Button onClick={()=>window.close()}
                style={{ backgroundColor:'#FFD54F', borderColor:'#FFEB3B', marginLeft:'20px', width:'80px', height:'50px', color:'#000435' }}>
                취소
        </Button>
        </Container>

        </>
    )

}
export default MypagePointPayBackComfrimComponent;