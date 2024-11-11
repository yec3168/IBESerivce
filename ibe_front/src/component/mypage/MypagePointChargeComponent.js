import { Button, Col, Container, Row } from "react-bootstrap";
import './Mypage.css'
import point_icon from '../assets/images/header/coin_purse_icon.png'
import { kakaoReady } from "../service/PointService";
import { useEffect, useState } from "react";
import { getMemberPoint } from '../service/MypageService'; 

const MypagePointChargeComponent = () => {
    const pointAmount = [
        { amount: '100' },
        { amount: '500' },
        { amount: '1,000' },
        { amount: '3,000' },
        { amount: '5,000' },
        { amount: '10,000' },
        { amount: '20,000' },
        { amount: '50,000' }
    ];

    const cashAmount = [
        { amount: '1,000' },
        { amount: '5,000' },
        { amount: '10,000' },
        { amount: '30,000' },
        { amount: '50,000' },
        { amount: '100,000' },
        { amount: '200,000' },
        { amount: '500,000' }
    ];
    const [isClicked, setIsClicked] = useState(false);
    const [memberPoint, setMemberPoint] = useState(null);

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
    let popup;
    const charge = (price) =>{
        setIsClicked(true);
        if(popup){
            popup.close()
        }
        if (!isClicked) {
        let data ={
            "priceName" : `${price.replace(",", '')/10}포인트`,
            "totalPrice" : parseInt(price.replace(",", ''))
        }
        console.log(data);
        kakaoReady(data).then(
            response =>{
                
                    // 로직 실행
                    console.log(response.data.data);
                    localStorage.setItem("tid", response.data.data.tid);
                    let popupW = 750;
                    let popupH = 650;
                    let left = Math.ceil((window.screen.width - popupW)/2);
                    let top = Math.ceil((window.screen.height - popupH)/2);
                    popup = window.open(response.data.data.next_redirect_pc_url,'_blank',
                            'width='+popupW+',height='+popupH+',left='+left+',top='+top);
                        
                
            }
            
        )
    }
        setTimeout(() => setIsClicked(false), 3000); // 3000ms 후에 다시 클릭 가능하게 함
    }

     const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    return(
        <>
            <Container className="text-center my-5 containerPCharge">
                {/* 포인트 충전 타이틀*/}
                <h1 id="h1_pointTitle">포인트 충전</h1>
                <div id="div_pointInfo">포인트로 아이비에서 판매하는 상품을 구매할 수 있습니다.</div>
                <div id="div_spacing"/>
                
                {/* 보유 포인트 */}
                <div id="div_pointData">
                    보유 포인트&nbsp;:&nbsp;
                    <span id="span_point">{memberPoint !== null ? addComma(`${memberPoint}`) : '로딩중'} </span>
                    <span id="span_p">&nbsp;P</span>
                </div>

                {/* 구분선 */}
                <hr />

                {/* 포인트 충전 버튼 */}
            
                <Row className="text-center my-4"> 
                    {pointAmount.map((point, index) => (
                        <Col xs={6} md={3} className="mb-4" key={index}>
                            <Button onClick={()=>charge(cashAmount[index].amount)} id="button_pointAmt" variant="outline-secondary" 
                                className="w-100 p-3 rounded-3 d-flex align-items-center justify-content-center">
                                <img src={point_icon} alt="point_icon" style={{ width: '40px', height: '40px', marginRight: '15px' }} />
                                <div className="d-flex flex-column align-items-center" id="div_pNum">
                                    <div className="text-center">{point.amount}<span id="span_btnP">&nbsp;P</span></div>
                                    <div className="text-center">{cashAmount[index].amount}<span>&nbsp;₩</span></div>
                                </div>
                            </Button>
                        </Col>
                    ))}
                </Row>

                <div id="div_spacing"/>

                {/* 포인트 약관 */}
                <div id="div_pointTerms">
                    <div style={{ fontWeight:'bolder' }}>아이비 포인트 이용약관</div>
                    <div>"아이비 포인트"는 이용자가 아이비로부터 구매하여 이용하는 가상의 결제수단으로, 아이비의 상품를 구매하기 위한 수단으로만 사용할 수 있습니다.</div>
                    <div>문의사항은 아이비 고객 센터의 1:1문의하기를 통해 문의바랍니다.</div>
                </div>
            </Container>
        </>
    );
}

export default MypagePointChargeComponent;