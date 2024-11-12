import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkKakaoLogin } from '../service/KakaoService';
import { Spinner, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import './KakaoOauthCallback.css';
import './Sign.css';
import Logo from '../assets/images/sign/ibe_logo1.png';
import {saveCodeNumber, kakaoSignup} from '../service/MemberService';

function KakaoOauthCallback() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [kakaoData, setKakaoData] = useState(null);
    const [showPostcode, setShowPostcode] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: '',
        name: '',
        address: '',
        addressDetail: '',
        bank: '',
        accountNumber: '',
    });

    const [memberPhone, setMemberPhone] = useState("");
    const [isValidLength, setIsValidLength] = useState(true);
    const [isSamePassword, setIsSamePassword] = useState(null);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isAccountNumberValid, setIsAccountNumberValid] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            checkKakaoLogin(code)
                .then((response) => {
                    console.log(response.data)
                    if (response.data.responseCode === "FAIL") {
                        setKakaoData(response.data.data);
                        setShowModal(true);
                    } else {
                        console.log("로그인되었습니다.", response.data.data);
                        let accessToken =  response.data.data;
                        localStorage.setItem('accessToken', accessToken);
                        alert("카카오로 로그인하였습니다.")
                        window.location.href = "/";
                    }
                })
                .catch((error) => {
                    console.error("카카오 로그인 실패:", error);
                });
        }
    }, [navigate]);

    const handleModalClose = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setIsValidLength(password.length >= 6 && password.length <= 20);
        setFormData({ ...formData, password });
    };

    const handlePasswordConfirmChange = (e) => {
        const passwordConfirm = e.target.value;
        setIsSamePassword(passwordConfirm === formData.password);
        setFormData({ ...formData, passwordConfirm });
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        const isValid = /^[가-힣]{2,11}$/.test(name);
        setIsNameValid(isValid);
        setFormData({ ...formData, name });
    };

    const handleAccountNumberChange = (e) => {
        const accountNumber = e.target.value;
        const isValid = /^\d{10,15}$/.test(accountNumber);
        setIsAccountNumberValid(isValid);
        setFormData({ ...formData, accountNumber });
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        // 유효성 검사 확인
        if (isSamePassword && isNameValid && isAccountNumberValid && isValidLength && formData.address) {
            // 최종 데이터 병합
            const signUpData = {
                ...kakaoData,
                memberPassword: formData.password,
                memberAddr : formData.address,
                memberAddrDetail : formData.addressDetail,
                memberName : formData.name,
                memberPhone : memberPhone,
                memberBank : formData.bank,
                memberAccountNumber : formData.accountNumber,
            };
            console.log("최종 회원가입 데이터:", signUpData);
            
            kakaoSignup(signUpData)
            .then( response =>{
                console.log(response.data)
                if(response.data.code === "200"){
                    alert("회원가입 성공!");
                    window.location.href = "/signin";
                }
            })
            .catch(error =>{
                console.log("에러 발생" , error);
            })
            
            // 이후 서버로 데이터 전송
            handleModalClose();
        } else {
            alert("모든 필드를 올바르게 입력해주세요.");
        }
    };

    const handleConfirmSignUp = () => {
        setShowSignUpForm(true);
        setShowModal(false);
    };

    const handleCompletePostcode = (data) => {
        setFormData({ ...formData, address: data.address });
        setShowPostcode(false);
    };

      /**
     * 전화번호 관련
     */
      // 전화번호 인증번호 저장.
      const [saveCode, setSaveCode] = useState("");

      const [verificationSent, setVerificationSent] = useState(false); // 버튼 클릭하면 인증번호 호출. (true, false)
      const [verificationCode, setVerificationCode] = useState("");  // 사용자가 입력한 인증번호 저장. ( String)
      const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부
      const [verificationMessage, setVerificationMessage] = useState(""); // 메세지 출력
  
       // 입력 폼 변경 시 실행되는 함수
	const handleChange = (e) => {
		const numbersOnly = e.target.value.replace(/\D/g, "");
		if (numbersOnly.length <= 11) {
            // setFormData({ ...formData, [phone]: numbersOnly });
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



    
    return (
        <div id="kakao-oauth-callback-container">
            {!showSignUpForm && (
                <>
                    <Spinner animation="border" role="status" id="kakao-oauth-spinner">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <h2 id="kakao-oauth-message">카카오 로그인 처리 중입니다...</h2>
                </>
            )}

            {/* 회원가입 모달 */}
            <Modal id="kakao_modal" show={showModal} onHide={handleConfirmSignUp} centered>
                <Modal.Header style={{ fontFamily:"Paperlogy-4Regular"}} closeButton>
                    <Modal.Title>회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontFamily:"PretendardVariable"}}>
                    <p>회원 정보가 없습니다. <br />회원가입을 진행하겠습니다.</p>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="custom" onClick={handleConfirmSignUp} type="button" className=""style={{ backgroundColor: '#FFD774',  fontFamily:"PretendardVariable"}}>
                            확인
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 회원가입 폼 */}
            {showSignUpForm && (
                <div className="sign-up__wrapper">
                    <Form onSubmit={handleSignUp} className="bg-white rounded">
                        <a href="/"> 
                            <img className="img mx-auto d-block mb-2 w-50" src={Logo} alt="logo" />
                        </a>
                        

                        {/* 비밀번호 */}
                        <Form.Group className="mb-4" controlId="memberPassword">
                            <Form.Control
                                type="password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                                placeholder="비밀번호"
                                required
                            />
                            <p style={{ fontSize: "12px", color: isValidLength ? 'black' : 'red' }}>
                                비밀번호는 6 ~ 20자여야 합니다.
                            </p>
                        </Form.Group>

                        {/* 비밀번호 확인 */}
                        <Form.Group className="mb-4" controlId="memberPasswordConfirm">
                            <Form.Control
                                type="password"
                                value={formData.passwordConfirm}
                                onChange={handlePasswordConfirmChange}
                                placeholder="비밀번호 재확인"
                                required
                            />
                            {isSamePassword !== null && (
                                <p style={{ fontSize: "12px", color: isSamePassword ? 'green' : 'red' }}>
                                    {isSamePassword ? '비밀번호가 일치합니다.' : '비밀번호가 다릅니다.'}
                                </p>
                            )}
                        </Form.Group>
                        

                         {/* 이름 */}
                         <Form.Group className="mb-4" controlId="memberName">
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={handleNameChange}
                                placeholder="이름"
                                required
                            />
                            {!isNameValid && (
                                <p style={{ color: "red", fontSize: "12px" }}>이름은 2~11자 한글만 입력 가능합니다.</p>
                            )}
                        </Form.Group>


                        {/* 주소 */}
                        <Form.Group className="mb-2" controlId="memberAddr">
                            <Row>
                                <Col className="col-9">
                                    <Form.Control
                                        type="text"
                                        value={formData.address}
                                        placeholder="주소"
                                        readOnly
                                        required
                                    />
                                </Col>
                                <Col className="col-3">
                                    <Button className="w-100 mb-3" variant="default" style={{ backgroundColor: '#FFD774' }} onClick={() => setShowPostcode(true)}>
                                        주소찾기
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                        {/* 상세주소 */}
                        <Form.Group className="mb-4" controlId="memberAddressDetail">
                            <Form.Control
                                type="text"
                                name="addressDetail" // <== name 속성 추가
                                value={formData.addressDetail}
                                onChange={handleInputChange}
                                placeholder="상세주소"
                            />
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


                        {/* 은행 정보와 계좌번호 */}
                        <Row className="mb-4">
                            <Col className="col-3">
                                <Form.Group controlId="memberBank">
                                    <Form.Select
                                        value={formData.bank}
                                        onChange={(e) => handleInputChange(e)}
                                        name="bank"
                                        required
                                    >
                                            <option>은행선택</option>
                                            {/* <option value="KB">국민은행</option> */}
                                            {/* <option value="SHINHAN">신한은행</option> */}
                                            {/* <option value="HANA">하나은행</option> */}
                                            {/* <option value="WOORI">우리은행</option> */}
                                            <option value="NH">농협은행</option>
                                            <option value="KDB">산업은행</option>
                                            {/* <option value="KAKAO">카카오뱅크</option> */}
                                            {/* <option value="TOSS">토스뱅크</option> */}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col className="col-9">
                                <Form.Group controlId="memberAccountNumber">
                                    <Form.Control
                                        type="text"
                                        value={formData.accountNumber}
                                        onChange={handleAccountNumberChange}
                                        placeholder="계좌번호"
                                        required
                                    />
                                    {!isAccountNumberValid && (
                                        <p style={{ color: "red", fontSize: "12px" }}>계좌번호는 숫자 10~15자리로 입력해 주세요.</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* DaumPostcode 모달 */}
                        <Modal show={showPostcode} onHide={() => setShowPostcode(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>주소 검색</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <DaumPostcode onComplete={handleCompletePostcode} />
                            </Modal.Body>
                        </Modal>

                        {/* 제출 버튼 */}
                        <Button type="submit" variant="default" className="w-100" style={{ backgroundColor: '#FFD774' }}>
                            회원가입
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default KakaoOauthCallback;
