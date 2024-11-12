import React, { useState } from "react";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { sendMail, searchPw } from '../service/MemberService';
import Logo from '../assets/images/sign/ibe_logo1.png';

import './Sign.css';

const SignPasswordSeacchComponent = () => {
    const [memberEmail, setMemberEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isMailSend, setIsMailSend] = useState(false);
    const [verificationCode, setVerificationCode] = useState(""); // 인증번호 입력값
    const [receivedCode, setReceivedCode] = useState(""); // 서버에서 받은 인증번호
    const [isCodeValid, setIsCodeValid] = useState(null); // 인증번호 유효성 여부
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    
    // 이메일 형식 검증 함수
    const validateEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    // 이메일 입력 변경 핸들러
    const handleEmailChange = (e) => {
        const email = e.target.value;
        setMemberEmail(email);
        setIsEmailValid(validateEmail(email));
    };

    // 인증번호 입력 변경 핸들러
    const handleCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsPasswordMatch(e.target.value === newPassword);
    };

    const mailHandler = () => {
        const isEmailFormatValid = validateEmail(memberEmail);
        setIsEmailValid(isEmailFormatValid);

        if (!isEmailFormatValid) {
            alert("이메일을 제대로 입력해주세요.");
            return;
        }

        const mailRequest = { email: memberEmail };
        sendMail(mailRequest)
            .then(response => {
                // console.log(response.data.message);/
                if (response.data.code === '200') {
                    
                    setReceivedCode(response.data.message); // 서버에서 받은 인증번호 저장
                    setIsMailSend(true);
                } else {
                    alert("인증번호 전송에 실패했습니다.");
                    setIsMailSend(false);
                }
            })
            .catch((error) => {
                console.error("전송실패:", error);
                setIsMailSend(false);
            });
    };

    // 인증번호 검증 함수
    const verifyCode = () => {
        if (verificationCode === receivedCode) {
            setIsCodeValid(true);
            alert("인증이 완료되었습니다.");
            // window.location.href = "/signin"; // 인증 성공 시 페이지 이동
        } else {
            setIsCodeValid(false);
        }
    };

    const handlePasswordSubmit = () => {
        if (newPassword === confirmPassword) {
            // alert("비밀번호가 변경되었습니다.");
            const memberPasswordRequest ={
                memberEmail : memberEmail,
                memberPassword : newPassword
            }

            searchPw(memberPasswordRequest)
            .then(response =>{
                console.log(response.data);
                if(response.data.code ==='200'){
                    alert("비밀번호가 변경되었습니다.")
                    window.location.href="/signin"
                }
                else{
                    alert("비밀번호가 올바르지 않습니다.")
                }
            })
            .catch(error =>{
                console.log(error)
            })
            
        } else {
            alert("비밀번호가 일치하지 않습니다.");
            return
        }
    };


    return (
        <div className="sign-in__wrapper">
            <div className="sign-in__backdrop"></div>
            {!isCodeValid ? (
                <Form className="bg-white rounded">
                    <a href="/">
                        <img className="img mx-auto d-block mb-2 w-50" src={Logo} alt="logo" />
                    </a>

                    <FloatingLabel className="mb-2 mb-3" controlId="memberEmail" label="이메일">
                        <Form.Control
                            type="email"
                            value={memberEmail}
                            onChange={handleEmailChange}
                            placeholder="이메일"
                            required
                        />
                        {!isEmailValid && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                올바른 이메일 형식을 입력해 주세요.
                            </p>
                        )}
                    </FloatingLabel>

                    {isMailSend && (
                        <>
                            <Row>
                                <Col className="col-9">
                                    <Form.Control
                                        type="text"
                                        value={verificationCode}
                                        onChange={handleCodeChange}
                                        placeholder="인증번호"
                                        required
                                    />
                                    {isCodeValid === false && (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            인증번호가 일치하지 않습니다.
                                        </p>
                                    )}
                                </Col>
                                <Col className="col-3">
                                    <Button
                                        className="w-100 mb-3"
                                        variant="default"
                                        type="button"
                                        style={{ backgroundColor: '#FFD774' }}
                                        onClick={verifyCode}
                                    >
                                        확인
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}

                    <Button
                        className="w-100 mb-3"
                        variant="default"
                        type="button"
                        style={{ backgroundColor: '#FFD774' }}
                        onClick={mailHandler}
                    >
                        이메일 인증
                    </Button>
                </Form>
            ) 
            :
             (
                <Form className="bg-white rounded">
                    <a href="/">
                        <img className="img mx-auto d-block mb-2 w-50" src={Logo} alt="logo" />
                    </a>

                    <FloatingLabel className="mb-2 mb-3" controlId="newPassword" label="새 비밀번호">
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            placeholder="새 비밀번호"
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel className="mb-2 mb-3" controlId="confirmPassword" label="새 비밀번호 확인">
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="새 비밀번호 확인"
                            required
                        />
                        {!isPasswordMatch && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                비밀번호가 일치하지 않습니다.
                            </p>
                        )}
                    </FloatingLabel>

                    <Button
                        className="w-100 mb-3"
                        variant="default"
                        type="button"
                        style={{ backgroundColor: '#FFD774' }}
                        onClick={handlePasswordSubmit}
                        disabled={!isPasswordMatch}
                    >
                        비밀번호 변경
                    </Button>
                </Form>
            )}
        </div>
    );
};


export default SignPasswordSeacchComponent;
