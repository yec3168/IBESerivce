import React, { useState } from "react";
import { Form, Button, Row, Col, Modal  } from "react-bootstrap";
import {checkEmail, saveMember, saveCodeNumber} from '../service/MemberService';
// import{FaAddressBook } from "react-icons/fa"
import Logo from '../assets/images/sign/ibe_logo1.png'
import DaumPostcode from 'react-daum-postcode';

import './Sign.css'

const SignupComponent = () => {
    const [memberEmail, setMemberEmail] = useState("");
    const [memberPassword, setMemberPassword] = useState("");
    const [memberPassword1, setMemberPassword1] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberNickName, setMemberNickName] = useState("");
    // const [memberBirth, setMemberBirth] = useState("");
    const [memberAddr, setMemberAddr] = useState("");
    const [memberAddrDetail, setMemberAddrDetail] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [memberBank, setMemberBank] = useState("");
    const [memberAccountNumber, setMemberAccountNumber] = useState("");

    const [useEmail, setUseEmail] = useState(true);
    const [emailMessage, setEmailMessage] = useState("");
    const [isSame, setIsSame] = useState(true);
    const [isValidLength, setIsValidLength] = useState(true)

    // 전화번호 인증번호 관련
    const [verificationSent, setVerificationSent] = useState(false); // 버튼 클릭하면 인증번호 호출. (true, false)
	const [verificationCode, setVerificationCode] = useState("");  // 사용자가 입력한 인증번호 저장. ( String)
    const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부
	const [verificationMessage, setVerificationMessage] = useState(""); // 메세지 출력

    // 전화번호 인증번호 저장.
    const [saveCode, setSaveCode] = useState("");


    // 이메일 중복확인
    const  checkDuplicatedEmail = (event) => {
        event.preventDefault(); 
        if(memberEmail.trim() ==="")
            return;
        checkEmail(memberEmail).then( response =>{
            console.log(response.data)
            if(response.data){
                alert("사용할 수 없는 이메일입니다.")
                setUseEmail(true);
                setEmailMessage("사용할 수 없는 이메일입니다.")
            }
            else{
                if(window.confirm("사용가능한 이메일입니다.")){
                    setUseEmail(false)
                    setEmailMessage("사용할 수 있는 이메일입니다.")
                }
                else{
                    setMemberEmail("")
                    setUseEmail(null)
                }
            }
        }) 
    }

    /**
     * 주소 관련
     */

    const [showPostcode, setShowPostcode] = useState(false); // 주소 검색창 표시 상태

    const handleCompletePostcode = (data) => {
        // 주소 선택 시 실행될 함수
        setMemberAddr(data.address);
        setShowPostcode(false); // 모달 창 닫기
    };

    const handlePostcodeButtonClick = () => {
        setShowPostcode(true); // 주소 검색 모달 창 열기
    };




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
 
		// 인증번호 전송하는 로직
        saveCodeNumber(memberPhone)
            .then(response =>{
                console.log(response.data);
                setSaveCode(response.data.message);
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




    
    // 회원가입 버튼 이벤트 리스너.
    const onSubmitHandler = (event) => {
        event.preventDefault(); 
        if( memberPassword.length >= 6 && memberPassword.length <= 20)
            setIsValidLength(true);
        else{
            setIsValidLength(false);
            return false;
        }
        if( memberPassword === memberPassword1)
            setIsSame(true)  
        else{
            setIsSame(false);
            return false;
        }
        if(useEmail){
            alert("이메일 중복확인 해주세요.")
            return false;
        }
        if(!isVerified){
            alert("전화번호 인증해주세요.")
            return false;
        }
            
         
        let memberForm ={
            memberEmail : memberEmail,
            memberPassword: memberPassword,
            memberName : memberName,
            memberNickName : memberNickName,
            // memberBirth : memberBirth,
            memberAddr : memberAddr,
            memberAddrDetail : memberAddrDetail,
            memberPhone : memberPhone,
            memberBank : memberBank,
            memberAccountNumber : memberAccountNumber
        }

        // 회원가입 backend post 호출.
        saveMember(memberForm)
            .then((response) => {
                console.log(response.data);
                if (response.data.code === "200") {
                    alert("회원가입 성공!");
                    window.location.href = "/signin";
                }
        })
        .catch((error) => {
            console.error("회원가입 실패:", error); // 에러 로그 확인
            alert("회원가입에 실패했습니다. 다시 시도해주세요."); // 사용자에게 실패 알림
        });

    }




    return (
        <div className="sign-up__wrapper">
            
            <Form className=" bg-white rounded" onSubmit={onSubmitHandler}>
                <a href="/"> 
                    <img className="img mx-auto d-block mb-2 w-50"src={Logo}alt="logo"/>
                </a>
               
                {/* 이메일 */}
                <Form.Group className="mb-2  " controlId="memberEmail">
                    <Row>
                        <Col className="col-10">
                            <Form.Control type="email"
                             value={memberEmail}
                             onChange={(e) => setMemberEmail(e.target.value)}
                             placeholder="이메일" required/>
                        </Col>
                        <Col lassName="col-2">
                        <Button className="w-100 mb-3" variant="default" type="button"  style={{backgroundColor:'#FFD774'}} onClick={checkDuplicatedEmail}>
                             중복
                        </Button>
                        </Col>
                        {useEmail && (
                            <p style={{color:"red"}}>{emailMessage}</p>
                        ) }
                        {!useEmail &&(
                            <p style={{color:"blue"}}>{emailMessage}</p>
                        )}
                    </Row>
                </Form.Group>



                {/* 비밀번호 */}
                <Form.Group className="mb-2 mb-4 " controlId="memberPassword">
                        <Form.Control type="password" 
                        value={memberPassword}
                        maxLength={20}
                        onChange={(e) => setMemberPassword(e.target.value)}
                        placeholder="비밀번호" required/>
                       
                        {isValidLength &&
                         (<p className="passwordHelpBlock"  style={{ fontSize:"12px"}}  muted >비밀번호는 6 ~ 20자여야 합니다.</p>  )}
                        {!isValidLength &&
                         (<p className="passwordHelpBlock"  style={{color:"red", fontSize:"12px"}}  muted >비밀번호는 6 ~ 20자여야 합니다.</p> )} 
                        

                </Form.Group>

                <Form.Group className="mb-2 mb-4 " controlId="memberPassword1">
                        <Form.Control type="password" 
                        value={memberPassword1}
                        maxLength={20}
                        onChange={(e) => setMemberPassword1(e.target.value)}
                        placeholder="비밀번호 재확인" required/>
                        {isSame ?(
                            <div />
                        ):(
                            <p className="passwordHelpBlock"  style={{color:"red", fontSize:"12px"}} muted>비밀번호가 다릅니다.</p>
                        )}
                </Form.Group>
                
                {/* 이름, 닉네임 */}
                <Row className="mb-2 mb-4 ">
                    <Col className="col-6">
                        <Form.Group controlId="memberName">
                            <Form.Control type="text" 
                                value={memberName}
                                maxLength={11}
                                onChange={(e) => setMemberName(e.target.value)}
                                placeholder="이름" required/>
                        </Form.Group>
                    </Col>
                    <Col className="col-6">
                        <Form.Group controlId="memberNickname">
                            <Form.Control type="text" 
                                value={memberNickName}
                                maxLength={11}
                                onChange={(e) => setMemberNickName(e.target.value)}
                                placeholder="닉네임" required/>
                        </Form.Group>
                    </Col>
                </Row>


                {/* 주소 */}
                <Form.Group className="mb-2 mb-4 " controlId="memberAddr">
                        
                        <Row>
                            <Col lassName="col-9">
                                    <Form.Control type="text"
                                        value={memberAddr}
                                        onChange={(e) => setMemberAddr(e.target.value)}
                                        placeholder="주소" required/>
                            </Col>
                            <Col className="col-3">
                                <Button className="w-100 mb-3" variant="default" type="button"  style={{backgroundColor:'#FFD774'}} onClick={handlePostcodeButtonClick}>
                                    주소찾기
                                </Button>
                            </Col>
                        </Row>
                </Form.Group>
                {/* DaumPostcode 모달 */}
                <Modal show={showPostcode} onHide={() => setShowPostcode(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>주소 검색</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DaumPostcode onComplete={handleCompletePostcode} />
                    </Modal.Body>
                </Modal>

                {/* 상세주소 */}
                <Form.Group className="mb-2 mb-4 " controlId="memberAddrDetail">
                        <Form.Control type="text"
                        value={memberAddrDetail}
                        onChange={(e) => setMemberAddrDetail(e.target.value)}
                        placeholder="상세주소" required/>
                </Form.Group>

                {/* 전화번호 */}
                <Form.Group className="mb-2 " controlId="memberPhone">
                    <Row>
                        <Col className="col-8">
                            <Form.Control type="text" 
                            value={displayFormattedPhoneNumber(memberPhone)}
                            onChange={handleChange}
                            placeholder="전화번호" required/>
                        </Col>
                        <Col lassName="col-4">
                        <Button className="w-100 mb-3" variant="default" type="button"  style={{backgroundColor:'#FFD774'}}  onClick={sendVerification}>
                           인증번호 전송
                        </Button>
                        </Col>
                    </Row>
                </Form.Group>
                {verificationSent && (
                    <Form.Group className="mb-2 " controlId="memberPhoneCheck">
                        <Row>
                            <Col className="col-10">
                                <Form.Control
                                    placeholder="인증번호 입력"
                                    type="text"
                                    value={verificationCode}
                                    onChange={handleVerificationCodeChange}
                                />
                            </Col>
                            <Col className="col-2">
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



                
                {/* 계좌 */}
                <Row className="mb-2 mb-4 ">
                    <Col className="col-3">
                        <Form.Group className="mb-2" controlId="memberBank">
                            <Form.Select aria-label="은행"
                            value={memberBank}
                            onChange={(e) => setMemberBank(e.target.value)}
                            >
                                <option>은행선택</option>
                                <option value="KB">국민</option>
                                <option value="SHINHAN">신한</option>
                                <option value="HANA">하나</option>
                                <option value="WOORI">우리</option>
                                <option value="NH">농협</option>
                                <option value="KAKAO">카카오</option>
                                <option value="TOSS">토스</option>
                                
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col className="col-9">
                        <Form.Group controlId="memberAccountNumber">
                            <Form.Control type="text" 
                            value={memberAccountNumber}
                            onChange={(e) => setMemberAccountNumber(e.target.value)}
                            placeholder="계좌번호" required/>
                        </Form.Group>
                    </Col>
                </Row>





                <Button      className="w-100 mb-3" variant="default" type="submit"  style={{backgroundColor:'#FFD774'}}>
                        회원가입
                </Button>

            </Form>
        </div>
    );
}

export default SignupComponent;