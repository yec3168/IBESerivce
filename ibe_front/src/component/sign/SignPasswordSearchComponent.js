import React, { useState } from "react";
import { Form, Button, FloatingLabel} from "react-bootstrap";
import {sendMail} from '../service/MemberService';
import Logo from '../assets/images/sign/ibe_logo1.png'

import './Sign.css'

const SignPasswordSeacchComponent = () =>{

    const [memberEmail, setMemberEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const [isMailSend, setIsMailSend] = useState("");

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

    const mailHandler = () =>{
        const isEmailFormatValid = validateEmail(memberEmail);

        setIsEmailValid(isEmailFormatValid);

        if( !isEmailFormatValid){
            alert("이메일을 제대로 입력해주세요.")
            setIsEmailValid(false);
            return false;
        }
        let mailRequest = {
            email : memberEmail
        }
        sendMail(mailRequest)
        .then(response =>{
            if(response.data.code === '200'){
                console.log(response.data.data);
                setIsMailSend(response.data.data)
            }
            else{
                setIsMailSend(response.data.data)
            }
           
        })
        .catch((error) => {
            console.error("전송실패.:", error); // 에러 로그 확인
            setIsMailSend(false);
        });

        if(isMailSend){
            alert("메일을 보냈습니다.")
            window.location.href ="/signin"
        }
        else{
            return false;
        }

        

    }


    return(
        <div className="sign-in__wrapper">
            <div className="sign-in__backdrop"></div>
            <Form className=" bg-white rounded"  >
                <a href="/">
                    <img className="img mx-auto d-block mb-2 w-50" src={Logo} alt="logo" />
                </a>

                <FloatingLabel className="mb-2 mb-3 " controlId="memberEmail" label="이메일">
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
                        {isEmailValid && (<div />)}
                </FloatingLabel>

        
                <Button className="w-100 mb-3" variant="default" type="button"  style={{backgroundColor:'#FFD774'}} onClick={mailHandler} >
                    이메일 인증
                </Button>
            
            </Form>
        </div>
    );
}

export default SignPasswordSeacchComponent;