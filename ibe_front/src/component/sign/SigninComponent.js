import { Form, Button, FloatingLabel , Row, Col } from "react-bootstrap";
import Logo from '../assets/images/sign/ibe_logo1.png'
import Kakao from '../assets/images/sign/kakao_login.png'
import { RiKakaoTalkFill } from "react-icons/ri";
import './Sign.css'

function SignInComponent(){
    return(
        <div className="sign-in__wrapper">
            <div className="sign-in__backdrop"></div>
            {/* <Form className="shadow p-4 bg-white rounded" >*/}
                <Form className=" bg-white rounded" >
                    <img
                    className="img mx-auto d-block mb-2 w-50"
                    src={Logo}
                    alt="logo"
                    />

                    <FloatingLabel className="mb-2 mb-3 " controlId="email" label="이메일">
                        <Form.Control
                            type="text"
                            placeholder="@gmail.com"
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel className="mb-2 mb-3 " controlId="password" label="비밀번호">
                        <Form.Control
                            type="password"
                            placeholder="비밀번호"
                            required
                        />
                    </FloatingLabel>

                    <Form.Group className="mb-2 mb-3" controlId="checkbox">
                        <Form.Check type="checkbox" label="로그인 상태 유지" />
                    </Form.Group>

                    <Button className="w-100 mb-3" variant="primary" type="submit"  style={{backgroundColor:'#FFD774'}}>
                        로그인
                    </Button>

                    <Row className="mb-2 mb-3" style={{borderBottom: '1px solid #666666'}}>
                        <Col className="col_list">아이디 찾기</Col>
                        <Col className="col_list">비밀번호 찾기</Col>
                        <Col className="col_list">회원가입</Col>
                    </Row>

                    <Row className="mb-2 mb-3">
                        <Col className="d-flex justify-content-center">간편로그인</Col>
                    </Row>

                    <Button className="w-100 mb-3" variant="primary" type="button"  style={{backgroundColor:'#FFE337', color:'black'}}>
                        <RiKakaoTalkFill/>
                        카톡으로 쉽게 시작하기
                    </Button>



                </Form>
        </div>
    );
}

export default SignInComponent;