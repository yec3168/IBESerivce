import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MypageDeleteAccountComponent = () => {
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        setShowPasswordInput(true);
        setErrorMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password === "123123") {
            const confirmChange = window.confirm("계정 탈퇴는 되돌릴 수 없습니다.\n정말 계속하시겠습니까?");
            if (confirmChange) {
                // 여기에 회원 탈퇴 API 호출 추가
                alert("회원 탈퇴가 완료되었습니다.");
                navigate('/'); // 탈퇴하면 메인 페이지로 리디렉션
            }
        } else {
            setErrorMessage("비밀번호가 다릅니다.");
        }
    };

    return (
        <div className="container text-center my-5" id="container_info">
            <h1 id="h1_infoTitle">회원 탈퇴</h1>
            <hr />
            <div id="div_spacing" />
            <div>
                아이비는 매일매일 새롭고 다양한 상품들로 가득 차 있어요! <br />
                많은 회원님들이 함께 활동하고 있답니다. <br />
                정말로 탈퇴하시겠어요? 조금 더 생각해 보세요!<br />
            </div>
            <div id="div_spacing" />

            <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                {showPasswordInput && (
                    <Form.Group as={Row} className="mb-4">
                        <Form.Label column sm={4}>비밀번호</Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            {errorMessage && (
                                <small className="text-danger">
                                    {errorMessage}
                                </small>
                            )}
                        </Col>
                    </Form.Group>
                )}
                {!showPasswordInput && (
                    <div className="d-flex justify-content-center w-100 mt-4">
                        <Button type="button" onClick={handleDeleteClick} id="button_accDelete">회원 탈퇴</Button>
                    </div>
                )}
                {showPasswordInput && (
                    <div className="d-flex justify-content-center w-100 mt-4">
                        <Button type="submit" id="button_accDelete">회원 탈퇴</Button>
                    </div>
                )}
            </Form>
        </div>
    );
}

export default MypageDeleteAccountComponent;
