import React, { useState } from "react";
import { Form, Button, FloatingLabel} from "react-bootstrap";
import {saveCodeNumber} from '../service/MemberService';
import Logo from '../assets/images/sign/ibe_logo1.png'

import './Sign.css'


const SigninEmailSearchComponent =() =>{
    const [memberName, setMemberName] = useState("");
    const [memberPhone, setMemberPhone] = useState("");

    const validateName = (name) => /^[가-힣]{2,11}$/.test(name); // 한글만, 2~11자
    // const [isNameValid, setIsNameValid] = useState(true);
    
    // 전화번호 인증번호 관련
    const [verificationSent, setVerificationSent] = useState(false); // 버튼 클릭하면 인증번호 호출. (true, false)
	const [verificationCode, setVerificationCode] = useState("");  // 사용자가 입력한 인증번호 저장. ( String)
    const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부
	const [verificationMessage, setVerificationMessage] = useState(""); // 메세지 출력

    // 전화번호 인증번호 저장.
    const [saveCode, setSaveCode] = useState("");
    
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



    return (
        <div className="sign-in__wrapper">
            <div className="sign-in__backdrop"></div>
            {/* <Form className="shadow p-4 bg-white rounded" >*/}
                <Form className=" bg-white rounded"  >
                    <a href="/">
                        <img className="img mx-auto d-block mb-2 w-50" src={Logo} alt="logo" />
                    </a>
                    {/* <div className="h4 mb-4 text-center">아이디 찾기</div> */}
                    <Form.Group controlId="memberName">
                            <Form.Control
                                type="text"
                                value={memberName}
                                maxLength={11}
                                // onChange={(e) => {
                                //     setMemberName(e.target.value);
                                //     setIsNameValid(validateName(e.target.value));
                                // }}
                                placeholder="이름"
                                required
                            />
                            {/* {isNameValid && <p style={{ fontSize: "12px" }}>한글 2~11자로 입력해 주세요.</p>}
                            {!isNameValid && <p style={{ color: "red", fontSize: "12px" }}>이름은 한글 2~11자로 입력해 주세요.</p>} */}
                        </Form.Group>
                </Form>
            </div>
    );
}

export default SigninEmailSearchComponent;