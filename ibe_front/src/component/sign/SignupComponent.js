import { Form, Button, Row, Col } from "react-bootstrap";
// import{FaAddressBook } from "react-icons/fa"
import Logo from '../assets/images/sign/ibe_logo1.png'

import './Sign.css'

const SignupComponent = () => {
    return (
        <div className="sign-up__wrapper">
            <div className="sign-up__backdrop"></div>
            <Form className="shadow p-4 bg-white rounded" >
                <img
                className="img mx-auto d-block mb-2 w-50"
                src={Logo}
                alt="logo"
                />
                {/* 이메일 */}
                <Form.Group className="mb-2  " controlId="email">
                    <Row>
                        <Col className="col-10">
                            <Form.Control type="email" placeholder="이메일" required/>
                        </Col>
                        <Col lassName="col-2">
                        <Button className="w-100 mb-3" variant="primary" type="button"  style={{backgroundColor:'#FFD774'}}>
                             중복확인
                        </Button>
                        </Col>
                    </Row>
                </Form.Group>

                {/* 비밀번호 */}
                <Form.Group className="mb-2 mb-4 " controlId="password">
                        <Form.Control type="password" placeholder="비밀번호" required/>
                </Form.Group>
                
                {/* 이름, 닉네임 */}
                <Row className="mb-2 mb-4 ">
                    <Col className="col-6">
                        <Form.Group controlId="name">
                            <Form.Control type="text" placeholder="이름" required/>
                        </Form.Group>
                    </Col>
                    <Col className="col-6">
                        <Form.Group controlId="nickname">
                            <Form.Control type="text" placeholder="닉네임" required/>
                        </Form.Group>
                    </Col>
                </Row>

                {/* 생년월일 */}
                <Form.Group className="mb-2 mb-4 " controlId="birthday">
                        <Form.Control type="date" placeholder="생년월일" required/>
                </Form.Group>

                {/* 주소 */}
                <Form.Group className="mb-2 mb-4 " controlId="address">
                        <Form.Control type="text" placeholder="주소" required/>
                </Form.Group>

                {/* 상세주소 */}
                <Form.Group className="mb-2 mb-4 " controlId="address_detail">
                        <Form.Control type="text" placeholder="상세주소" required/>
                </Form.Group>

                {/* 상세주소 */}
                <Form.Group className="mb-2 mb-4 " controlId="phone">
                        <Form.Control type="text" placeholder="번호" required/>
                </Form.Group>

                
                {/* 계좌 */}
                <Row className="mb-2 mb-4 ">
                    <Col className="col-2">
                        <Form.Group className="mb-2 mb-4  " controlId="phone">
                            <Form.Select aria-label="Default select example">
                                <option>은행</option>
                                <option value="KB">국민</option>
                                <option value="SINHAN">신한</option>
                                <option value="WOORI">우리</option>
                            </Form.Select>

                        </Form.Group>
                    </Col>
                    <Col className="col-10">
                        <Form.Group controlId="account_number">
                            <Form.Control type="text" placeholder="계좌번호" required/>
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