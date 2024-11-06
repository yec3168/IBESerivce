import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import './Mypage.css'
import point_to_cash_icon from '../assets/images/mypage/point_to_cash_icon.png'
import { useNavigate } from 'react-router-dom';
import { getMemberPoint } from '../service/MypageService'; 

const MypagePointPaybackComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [accountNumber, setAccountNumber] = useState('1000003188002'); //정보 받아와서 초기값에 넣어주고 싶음.
    const [isFail, setIsFail] = useState(false);
    const [memberPoint, setMemberPoint] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        // 포인트 조회 API 호출
        const fetchMemberPoint = async () => {
          try {
            const response = await getMemberPoint(); 
            if (response.data && response.data.data.memberPoint) {
              setMemberPoint(response.data.data.memberPoint); 
            }
          } catch (error) {
            console.error('포인트 조회 실패:', error);
          }
        };
    
        fetchMemberPoint(); 
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value.replace(/[^0-9]/g, ''));
    };
    const handleAccountNumberChange = (event) => {
        setAccountNumber(event.target.value);
    };

    const expectedPayback = inputValue ? (parseInt(inputValue) * 10).toLocaleString() : '0';

    const pointButtonEvent = ()=>{
        //포인트 비교(구현필요) 후 밑에 은행, 계좌 받는 곳 보이게하기

        if(!inputValue || inputValue==0){
            return
        }
        document.getElementById('point-back-put-bank').style.display='inline';
        document.getElementById('point_input_button').style.display='none';
        document.getElementById('point_input').setAttribute('disabled',true);
    }
    const pointCancleButtonEvent =()=>{
        document.getElementById('popup_result').innerText='';
        document.getElementById('point-back-put-bank').style.display='none';
        document.getElementById('point_input_button').style.display='inline';
        document.getElementById('point_input').removeAttribute('disabled');

    }
    let popup
    const pointPayBackButtonEvent=()=>{
            
        let popupW = 750;
        let popupH = 650;
        let left = Math.ceil((window.screen.width - popupW)/2);
        let top = Math.ceil((window.screen.height - popupH)/2);
        if(popup){
             popup.close();
            }
        popup = window.open('http://localhost:3000/mypage/pntpayback/confirm','_blank',
                'width='+popupW+',height='+popupH+',left='+left+',top='+top);
  
    }
    return (
        <>
            <Container className="text-center my-5 containerPCharge">
                {/* 포인트 환급 타이틀*/}
                <h1 id="h1_pointTitle">포인트 환급</h1>
                <div id="div_pointInfo" className="text-muted">포인트를 현금으로 전환할 수 있습니다.</div>
                <div id="div_spacing"/>

                {/* 보유 포인트 */}
                <div id="div_pointData">
                    보유 포인트&nbsp;:&nbsp;
                    <span id="span_point">{memberPoint !== null ? `${memberPoint}` : '로딩중'} </span>
                    <span id="span_p">&nbsp;P</span>
                </div>

                {/* 구분선 */}
                <hr />

                {/* 포인트 환급 금액 입력 */}
                <Container className="my-5">
                    <Row className="justify-content-center align-items-center">
                        <Col xs="auto">
                            <img src={point_to_cash_icon} alt="point_to_cash_icon" 
                                style={{ width:'100px', height:'100px', marginLeft:'200px', marginRight:'10px' }} />
                        </Col>
                        <Col xs={12} md={8}>
                            <Form inline className="d-flex align-items-center">
                                <Form.Group controlId="formPointInput">
                                    <Form.Control 
                                        id ='point_input'
                                        type="text" 
                                        placeholder="환급 받을 포인트를 입력해주세요." 
                                        style={{ borderColor:'#FFB800', width:'500px', height:'50px'}} 
                                        value={inputValue} 
                                        onChange={handleInputChange} 
                                    />
                                </Form.Group>
                                <Button onClick={()=>pointButtonEvent()} id="point_input_button"
                                    style={{ backgroundColor:'#FFD54F', borderColor:'#FFEB3B', marginLeft:'20px', width:'80px', height:'50px', color:'#000435' }}>
                                    입력
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    {/* 포인트 환급 예상 금액 */}
                    {/* 포인트 입력마다 금액 보여주는 것까지 작성, 보유 포인트를 넘기지 않는지 확인시키는 코드 추가해야함 */}
                    <div className="mt-3">
                        고객님의 환급 예상 금액은 <strong>{expectedPayback}원</strong>입니다.
                    </div>
                </Container>

                
                
                <Container className="my-5" id='point-back-put-bank' style={{display: 'none'}}>
                    <Row className="justify-content-center align-items-center">
                    <Col xs='auto'>
                    <Form inline className="d-flex align-items-center" >
                    
                                <Form.Group controlId="formPointInput">
                                    <div className="mt-3">
                        <strong>{inputValue}포인트</strong>를 환급 원하십니까?
                    </div>
                                    <Form.Select id='bank'
                                        style={{ borderColor:'#FFB800', width:'150px', height:'50px'}}
                                        >
                                        <option value="011">농협은행</option>
                                        <option value="002">산업은행</option>
                                        <option value="3">은행3</option>
                                    </Form.Select>   
                                    
                                    <Form.Control 
                                        id='account_nubmer'
                                        type="text" 
                                        placeholder="계좌번호" 
                                        style={{ borderColor:'#FFB800', width:'500px', height:'50px'}} 
                                        value={accountNumber} 
                                        onChange={handleAccountNumberChange} 
                                    />
                                    
                                        <span id='popup_result'></span>
                                        
                                    <div>
                                    <Button onClick={()=>pointCancleButtonEvent()}
                                    style={{ backgroundColor:'#FFD54F', borderColor:'#FFEB3B', marginLeft:'20px', width:'80px', height:'50px', color:'#000435' }}>
                                    취소
                                </Button>
                                <Button onClick={()=>pointPayBackButtonEvent()}
                                    style={{ backgroundColor:'#FFD54F', borderColor:'#FFEB3B', marginLeft:'20px', width:'80px', height:'50px', color:'#000435' }}>
                                    입력
                                </Button>
                                </div>
                                </Form.Group>
                                
                            </Form>
                            </Col>
                    </Row>
                </Container>

                <div id="div_spacing"/>

                {/* 포인트 약관 */}
                <div id="div_pointTerms">
                    <div style={{ fontWeight: 'bolder' }}>아이비 포인트 이용약관</div>
                    <div>아이비 포인트 잔액을 보유한 이용자는 회사에 요청하여 본인이 보유한 아이비 포인트 잔액을 환불받을 수 있습니다.</div>
                    <div>이용자가 실제 정상적인 구매내역이 기록되는 이용대금의 결제를 통하지 않고 비정상 경로로 취득한 아이비 포인트는 환불되지 않습니다.</div>
                    <div>문의사항은 아이비 고객 센터의 1:1문의하기를 통해 문의바랍니다.</div>
                </div>
            </Container>
        </>
    );
}

export default MypagePointPaybackComponent;
