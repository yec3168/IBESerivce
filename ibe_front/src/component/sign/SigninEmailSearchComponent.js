import React, { useState } from "react";
import { Form, Button, FloatingLabel, Row, Col, Modal} from "react-bootstrap";
import {searchEmail} from '../service/MemberService';
import Logo from '../assets/images/sign/ibe_logo1.png'

import './Sign.css'


const SigninEmailSearchComponent =() =>{
    const [memberName, setMemberName] = useState("");
    const [memberPhone, setMemberPhone] = useState("");

    const validateName = (name) => /^[가-힣]{2,11}$/.test(name); // 한글만, 2~11자
    const [isNameValid, setIsNameValid] = useState(true);
    


    // 전화번호 인증번호 관련
    const [verificationSent, setVerificationSent] = useState(false); // 버튼 클릭하면 인증번호 호출. (true, false)
	const [verificationCode, setVerificationCode] = useState("");  // 사용자가 입력한 인증번호 저장. ( String)
    const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부
	const [verificationMessage, setVerificationMessage] = useState(""); // 메세지 출력

    // 전화번호 인증번호 저장.
    const [saveCode, setSaveCode] = useState("");
    // 성공시 보여줄 이메일을 저장.
    const [saveEmail, setSaveEmail] = useState("");

    
     /**
     * 전화번호 관련
     */
       // 입력 폼 변경 시 실행되는 함수
	const handleChange = (e) => {
		const numbersOnly = e.target.value.replace(/\D/g, "");
		if (numbersOnly.length <= 11) {
			setMemberPhone(numbersOnly);
		}
	};
    // 전화번호 입력에 '-' 넣는 함수
    const displayFormattedPhoneNumber = (phone) => {
		if (phone.length <= 3) {
			return phone;
		} else if (phone.length <= 7) {
			return `${phone.slice(0, 3)}-${phone.slice(3)}`;
		} else {
			return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(
				7
			)}`;
		}
	};

    // 인증번호 전송 함수
	const sendVerification = () => {
		if (memberPhone.length < 10) return;
		// 정확한 전화번호 입력.
        setVerificationSent(true);
        
        let memberSnsRequest ={
            memberName : memberName,
            memberPhone : memberPhone
        } 
		// 인증번호 전송하는 로직
        searchEmail(memberSnsRequest)
            .then(response =>{
                if(response.data.code === '200'){
                    console.log(response.data.data);
                    setSaveEmail(response.data.data.memberEmail);
                    setSaveCode(response.data.data.randomCode);
                }
               
            })
            .catch((error) => {
                console.error("인증 실패.:", error); // 에러 로그 확인
                setSaveCode("");
            });

	};

	// 인증번호 확인 함수
	const verifyCode = () => {
        console.log(verificationCode)
        console.log(saveCode)

		// 인증번호 확인하는 로직
        if(verificationCode === saveCode){
            setIsVerified(true);
			setVerificationMessage("인증 성공");
        }
        else{
            setIsVerified(false);
			setVerificationMessage("인증번호가 잘못되었습니다.");
        }
	};

    const handleVerificationCodeChange = (e) => {
		const numbersOnly = e.target.value.replace(/\D/g, "");
		if (numbersOnly.length <= 6) {
			setVerificationCode(numbersOnly);
		}
	};



    const onSubmitHandler = (event) => {
        event.preventDefault(); 
        const isNameFormatValid = validateName(memberName);

        setIsNameValid(isNameFormatValid);

        if (!isNameFormatValid ) {
            alert("이름을 올바르게 입력해 주세요.");
            return false;
        }
        if(!isVerified){
            alert("전화번호 인증해주세요.")
            return false;
        }

        modalViewHandler();
    }

    // 모달 관련

    const [showModal, setShowModal] = useState(false); // 주소 검색창 표시 상태
    
    const modalCloseHandler =() =>{
        setShowModal(false); // 모달 창 닫기
        window.location.href="/signin"
    }
    const modalViewHandler = () =>{
        setShowModal(true); // 모달 창 열기
    }




    return (
        <div className="sign-in__wrapper">
            <div className="sign-in__backdrop"></div>
            {/* <Form className="shadow p-4 bg-white rounded" >*/}
                <Form className=" bg-white rounded"  >
                    <a href="/">
                        <img className="img mx-auto d-block mb-2 w-50" src={Logo} alt="logo" />
                    </a>
                    {/* <div>아이디찾기</div> */}
                    {/* //이름 입력 */}
                    <FloatingLabel className="mb-2 mb-3 " controlId="memberEmail" label="이름">
                        <Form.Control
                                type="text"
                                value={memberName}
                                maxLength={11}
                                onChange={(e) => {
                                    setMemberName(e.target.value);
                                    setIsNameValid(validateName(e.target.value));
                                }}
                                placeholder="이름"
                                required
                            />
                            {isNameValid && <p style={{ fontSize: "12px" }}>한글 2~11자로 입력해 주세요.</p>}
                            {!isNameValid && <p style={{ color: "red", fontSize: "12px" }}>이름은 한글 2~11자로 입력해 주세요.</p>}
                    </FloatingLabel>

                    {/* 전화번호 입력 */}
                    <FloatingLabel className="mb-2 mb-3 " controlId="memberPhone" label="전화번호">
                            <Form.Control type="text" 
                                value={displayFormattedPhoneNumber(memberPhone)}
                                onChange={handleChange}
                                placeholder="전화번호" required/>
                    </FloatingLabel>

                    
                    {/* 인증번호 입력 */}
                    {verificationSent && (
                        <Form.Group className="mb-2 " controlId="memberPhoneCheck">
                            <Row>
                                <Col className="col-8">
                                    <Form.Control
                                        placeholder="인증번호 입력"
                                        type="text"
                                        value={verificationCode}
                                        onChange={handleVerificationCodeChange}
                                    />
                                </Col>
                                <Col className="col-4">
                                    <Button className="w-100 mb-3" variant="default" type="button"  style={{backgroundColor:'#FFD774'}} onClick={verifyCode} disabled={isVerified}>
                                        확인
                                    </Button>
                                </Col>

                            </Row>
                            {!isVerified && (
                                    <p className="passwordHelpBlock"  style={{color:"red", fontSize:"12px"}}  muted >{verificationMessage}</p> // 인증 실패 메시지
                            )}
                            {isVerified && (
                                    <p className="passwordHelpBlock"  style={{color:"blue", fontSize:"12px"}}  muted >{verificationMessage}</p> // 인증 성공 메시지
                            )}
                        </Form.Group>
                    )}

                    {!isVerified && (
                        <Button className="w-100 mb-3" variant="default" type="button"  style={{backgroundColor:'#FFD774'}}  onClick={sendVerification}>
                            인증번호 전송
                        </Button>
                    )}
                    {isVerified && (
                           <Button className="w-100 mb-3" variant="default" type="submit"  style={{backgroundColor:'#FFD774'}} onClick={onSubmitHandler}>
                           이메일찾기
                       </Button>
                    )}

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton={modalCloseHandler}>
                        <Modal.Title>이메일 찾기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center p-4">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h5 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#4A4A4A' }}>
                            {memberName}님,
                        </h5>
                        <p style={{ fontSize: '16px', color: '#555' }}>
                            회원님의 이메일은 <span style={{ fontWeight: 'bold', color: '#007bff' }}>{saveEmail}</span> 입니다.
                        </p>
                        <Button
                            onClick={modalCloseHandler}
                            variant="primary"
                            style={{
                                backgroundColor: '#FFD774',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '8px 16px',
                                fontWeight: 'bold',
                                marginTop: '15px'
                            }}
                        >
                            확인
                        </Button>
                        </div>
                       
                    </Modal.Body>
                </Modal>

                </Form>
            </div>
    );
}

export default SigninEmailSearchComponent;