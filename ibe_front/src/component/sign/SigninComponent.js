import React, { useState } from "react";
import { Form, Button, FloatingLabel , Row, Col, Alert } from "react-bootstrap";
import Logo from '../assets/images/sign/ibe_logo1.png'
import { RiKakaoTalkFill } from "react-icons/ri";
import {login } from '../service/MemberService';
import {getKaKaoLoginLink} from "../service/KakaoService";
import './Sign.css'


function SignInComponent(){

    const [memberEmail, setMemberEmail] = useState("");
    const [memberPassword, setMemberPassword] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);
   
  

    const onSubmitHandler =  (event) => {
        // 버튼만 누르면 리프레시 되는것을 막아줌
        event.preventDefault();
       console.log("asd")
        // if(memberEmail === "admin@test.com" || memberPassword ==="admin1"){
        //     setIsEmpty(true);
        // }
        // else{
        //     setIsEmpty(false)
        // }
    

        let memberForm = {
            memberEmail: memberEmail,
            memberPassword: memberPassword
        }
        login(memberForm)
            .then(response => {
            console.log(response.data);
            if (response.data.code === "200") {
                alert("로그인 성공!");
                console.log(response.data.message);
                let accessToken = response.data.message;
                localStorage.setItem('accessToken', accessToken);
                // console.log(`${localStorage.getItem('accessToken')}`)  
                
                window.location.href = "/";
                setIsEmpty(false);
            }   
            else{
                 console.error("로그인 실패");
                setIsEmpty(true);
            }
        })
        .catch(error => {
            console.error("로그인 실패:", error); // 에러 로그 확인
            setIsEmpty(true);
        });

    }
    const kakaoHandler = () =>{
        window.location.href = getKaKaoLoginLink()
      
    }

    return(
        <div className="sign-in__wrapper">
            {/* <div className="sign-in__backdrop"></div> */}
            {/* <Form className="shadow p-4 bg-white rounded" >*/}
                <Form className=" bg-white rounded"  onSubmit={onSubmitHandler}>
                    <a href="/">
                        <img className="img mx-auto d-block mb-2 w-50" src={Logo} alt="logo" />
                    </a>
                    
                    <FloatingLabel className="mb-2 mb-3 " controlId="email" label="이메일">
                        <Form.Control type="email" 
                        placeholder="이메일" 
                        value ={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        required />
                    </FloatingLabel>


                    <FloatingLabel className="mb-2 mb-3 " controlId="password" label="비밀번호">
                        <Form.Control type="password"
                         placeholder="비밀번호는 6 ~ 20자로 입력해주세요." 
                         value={memberPassword}
                         onChange={(e) => setMemberPassword(e.target.value)}
                         required />
                        {/* {
                            isEmpty ? (
                                <div />
                                ) : (
                                <Form.Text className="passwordHelpBlock" muted>
                                    비밀번호는 6 ~ 20자로 입력해주세요.
                                </Form.Text>
                            )
                        } */}
                        
                    </FloatingLabel>

                    {
                        isEmpty ? (
                            <Alert
                                className="mb-2"
                                variant="danger"
                                onClose={() => setIsEmpty(false)}
                                dismissible
                            >
                                이메일 혹은 비밀번호가 일치하지 않습니다.
                            </Alert>
                        ) : (
                            <div/>
                        )
                    }

                    <Form.Group className="mb-2 mb-3" controlId="checkbox">
                        <Form.Check type="checkbox" label="로그인 상태 유지" />
                    </Form.Group>


                    <Button className="w-100 mb-3" variant="default" type="submit"  style={{backgroundColor:'#FFD774'}}>
                        로그인
                    </Button>

                    <Row className="mb-2 mb-3" style={{ width:"95%", borderBottom: '1px solid #666666', margin:"auto"}}>
                        <Col className="col_list"><a class="signin_a" href="/searchEmail">아이디 찾기</a></Col>
                        <Col className="col_list"><a class="signin_a" href="/searchPassword">비밀번호 찾기</a></Col>
                        <Col className="col_list"><a class="signin_a" href="/terms">회원가입</a></Col>
                    </Row>


                    <Row className="mb-2 mb-3">
                        <Col className="d-flex justify-content-center">간편로그인</Col>
                    </Row>


                    <Button className="w-100 mb-3" variant="default" type="button"  
                        onClick={kakaoHandler}
                        style={{backgroundColor:'#FFE337', color:'black'}}>
                            <RiKakaoTalkFill s/>
                            카톡으로 쉽게 시작하기
                    </Button>



                </Form>
        </div>
    );
}

export default SignInComponent;