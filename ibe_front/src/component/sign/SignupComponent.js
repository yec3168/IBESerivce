import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import{FaAddressBook } from "react-icons/fa"
import Logo from '../assets/images/sign/ibe_logo1.png'

import './Sign.css'

const SignupComponent = () => {
    const [memberEmail, setMemberEmail] = useState("");
    const [memberPassword, setMemberPassword] = useState("");
    const [memberPassword1, setMemberPassword1] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberNickName, setMemberNickName] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberAddr, setMemberAddr] = useState("");
    const [memberAddrDetail, setMemberAddrDetail] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [memberBank, setMemberBank] = useState("");
    const [memberAccountNumber, setMemberAccountNumber] = useState("");

    


    const isSame = memberPassword === memberPassword1;

    return (
        <div className="sign-up__wrapper">
            
            <Form className=" bg-white rounded" >
                <img
                className="img mx-auto d-block mb-2 w-50"
                src={Logo}
                alt="logo"
                />
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
                        <Button className="w-100 mb-3" variant="primary" type="button"  style={{backgroundColor:'#FFD774'}}>
                             중복
                        </Button>
                        </Col>
                    </Row>
                </Form.Group>

                {/* 비밀번호 */}
                <Form.Group className="mb-2 mb-4 " controlId="memberPassword">
                        <Form.Control type="password" 
                        value={memberPassword}
                        onChange={(e) => setMemberPassword(e.target.value)}
                        placeholder="비밀번호" required/>
                        <Form.Text className="passwordHelpBlock" muted>
                            비밀번호는 6 ~ 20자로 입력해주세요.
                        </Form.Text>
                </Form.Group>

                <Form.Group className="mb-2 mb-4 " controlId="memberPassword1">
                        <Form.Control type="password" 
                        value={memberPassword1}
                        onChange={(e) => setMemberPassword1(e.target.value)}
                        placeholder="비밀번호 재확인" required/>
                        {memberPassword1 !== '' && !isSame ?(
                            <Form.Text className="passwordHelpBlock" muted>
                              비밀번호는 6 ~ 20자로 입력해주세요.
                            </Form.Text>
                        ):(
                            <Form.Text className="passwordHelpBlock " muted>비밀번호가 다릅니다.</Form.Text>
                        )}
                </Form.Group>
                
                {/* 이름, 닉네임 */}
                <Row className="mb-2 mb-4 ">
                    <Col className="col-6">
                        <Form.Group controlId="memberName">
                            <Form.Control type="text" 
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                                placeholder="이름" required/>
                        </Form.Group>
                    </Col>
                    <Col className="col-6">
                        <Form.Group controlId="memberNickname">
                            <Form.Control type="text" 
                                value={memberNickName}
                                onChange={(e) => setMemberNickName(e.target.value)}
                                placeholder="닉네임" required/>
                        </Form.Group>
                    </Col>
                </Row>


                {/* 생년월일 */}
                <Form.Group className="mb-2 mb-4 " controlId="memberBirth">
                        <Form.Control type="date" 
                        value={memberBirth}
                        onChange={(e) => setMemberBirth(e.target.value)}
                        placeholder="생년월일" required/>
                </Form.Group>

                {/* 주소 */}
                <Form.Group className="mb-2 mb-4 " controlId="memberAddr">
                        <Form.Control type="text"
                        value={memberAddr}
                        onChange={(e) => setMemberAddr(e.target.value)}
                        placeholder="주소" required/>
                </Form.Group>

                {/* 상세주소 */}
                <Form.Group className="mb-2 mb-4 " controlId="memberAddrDetail">
                        <Form.Control type="text"
                        value={memberAddrDetail}
                        onChange={(e) => setMemberAddrDetail(e.target.value)}
                        placeholder="상세주소" required/>
                </Form.Group>

                {/* 상세주소 */}
                <Form.Group className="mb-2 mb-4 " controlId="memberPhone">
                        <Form.Control type="text" 
                        value={memberPhone}
                        onChange={(e) => setMemberPhone(e.target.value)}
                        placeholder="번호" required/>
                </Form.Group>

                
                {/* 계좌 */}
                <Row className="mb-2 mb-4 ">
                    <Col className="col-2">
                        <Form.Group className="mb-2" controlId="memberBank">
                            <Form.Select aria-label="은행"
                            value={memberBank}
                            onChange={(e) => setMemberBank(e.target.value)}
                            >
                                <option value="KB">국민</option>
                                <option value="SINHAN">신한</option>
                                <option value="WOORI">우리</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col className="col-10">
                        <Form.Group controlId="memberAccountNumber">
                            <Form.Control type="text" 
                            value={memberAccountNumber}
                            onChange={(e) => setMemberAccountNumber(e.target.value)}
                            placeholder="계좌번호" required/>
                        </Form.Group>
                    </Col>
                </Row>


                <Button href="/signin" className="w-100 mb-3" variant="primary" type="submit"  style={{backgroundColor:'#FFD774'}}>
                        회원가입
                </Button>

            </Form>
        </div>
    );
}

export default SignupComponent;