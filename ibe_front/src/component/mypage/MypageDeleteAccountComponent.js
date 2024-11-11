import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkMemberPw, updateMemberDel } from '../service/MypageService';

const MypageDeleteAccountComponent = () => {
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false); // 첫 번째 모달 상태
    const [showConfirmModal, setShowConfirmModal] = useState(false); // 두 번째 모달 상태
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        setShowWarningModal(true); // 첫 번째 경고 모달 표시
        setErrorMessage(''); // 비밀번호 입력란이 보일 때 에러 메시지 초기화
    };

    const handleWarningModalClose = () => setShowWarningModal(false); // 첫 번째 모달 닫기
    const handleConfirmModalClose = () => setShowConfirmModal(false); // 두 번째 모달 닫기

    const handleWarningConfirm = () => {
        setShowWarningModal(false);
        setShowPasswordInput(true); // 비밀번호 입력란 표시
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage(''); // 에러 메시지 초기화
        const passwordData = { memberPassword: password };

        try {
            const checkResponse = await checkMemberPw(passwordData);

            if (checkResponse.data.code === "200" && checkResponse.data.data.success) {
                setShowConfirmModal(true); // 최종 확인 모달 표시
            } else {
                setErrorMessage("비밀번호가 다릅니다."); // 비밀번호가 틀렸을 때 에러 메시지
            }
        } catch (error) {
            console.error("탈퇴 오류:", error);
            setErrorMessage("비밀번호 확인에 실패했습니다."); // API 호출 오류 처리
        }
    };

    const handleFinalDelete = async () => {
        const passwordData = { memberPassword: password };

        try {
            const deleteResponse = await updateMemberDel(passwordData);

            if (deleteResponse.data.code === "200" && deleteResponse.data.data.success) {
                alert("회원 탈퇴가 완료되었습니다.");
                localStorage.removeItem('accessToken'); // 로그아웃
                navigate('/'); // 탈퇴 후 메인 페이지로 리디렉션
            } else {
                alert("회원 탈퇴 실패, 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("탈퇴 오류:", error);
            setErrorMessage("회원 탈퇴에 실패했습니다."); // API 호출 오류 처리
        }
    };

    return (
        <div className="container text-center mx-5 my-5" id="container_info">
            <h1 id="h1_infoTitle">회원 탈퇴</h1>
            <hr />
            <div id="div_spacing" />
            <div>
                아이비는 매일매일 새롭고 다양한 상품들로 가득 차 있어요! <br />
                많은 회원님들이 함께 활동하고 있답니다. <br />
                정말로 탈퇴하시겠어요? 조금 더 생각해 보세요!<br />
            </div>

            <Form className="d-flex flex-column align-items-center" onSubmit={handlePasswordSubmit}>
                {showPasswordInput && (
                    <Form.Group as={Row} className="my-4">
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
                    <div className="d-flex justify-content-center w-100 mt-5">
                        <Button type="button" onClick={handleDeleteClick} id="button_accDelete">회원 탈퇴</Button>
                    </div>
                )}
                {showPasswordInput && (
                    <div className="d-flex justify-content-center w-100 mt-4">
                        <Button type="submit" id="button_accDelete">회원 탈퇴</Button>
                    </div>
                )}

                {/* 첫 번째 경고 모달 */}
                <Modal show={showWarningModal} onHide={handleWarningModalClose} centered>
                    <Modal.Header closeButton style={{ backgroundColor: '#ffcccc', borderBottom: '2px solid #ff7777', fontFamily:"Paperlogy-4Regular" }}>
                        <Modal.Title style={{ color: '#d9534f', fontWeight: 'bold' }}>⚠️ 회원 탈퇴 주의</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '20px 30px', fontFamily:"Pretendard-Regular" }}>
                        <p style={{ fontSize: '1.1em', color: '#333' }}>
                            계정을 탈퇴하면 다음과 같은 내용이 <strong style={{ color: '#d9534f' }}>영구적으로 삭제</strong>됩니다:
                        </p>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                            <li style={{ margin: '10px 0', fontSize: '1em', color: '#555' }}>
                                <span style={{ color: '#d9534f', fontWeight: 'bold', marginRight: '5px' }}>•</span>
                                <strong>개인 정보 및 모든 계정 데이터</strong>가 삭제됩니다.
                            </li>
                            <li style={{ margin: '10px 0', fontSize: '1em', color: '#555' }}>
                                <span style={{ color: '#d9534f', fontWeight: 'bold', marginRight: '5px' }}>•</span>
                                현재 보유 중인 <strong>모든 포인트가 소멸</strong>되며, 복구가 불가능합니다.
                            </li>
                            <li style={{ margin: '10px 0', fontSize: '1em', color: '#555' }}>
                                <span style={{ color: '#d9534f', fontWeight: 'bold', marginRight: '5px' }}>•</span>
                                이전 구매 내역 및 활동 내역이 삭제됩니다.
                            </li>
                            <li style={{ margin: '10px 0', fontSize: '1em', color: '#555' }}>
                                <span style={{ color: '#d9534f', fontWeight: 'bold', marginRight: '5px' }}>•</span>
                                탈퇴 후 다시 가입하더라도 삭제된 정보는 복구되지 않습니다.
                            </li>
                        </ul>
                        <p style={{ fontSize: '1.1em', color: '#d9534f', fontWeight: 'bold' }}>
                            정말로 계정을 탈퇴하시겠습니까?
                        </p>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', fontFamily:"Pretendard-Regular" }}>
                        <Button variant="secondary" onClick={handleWarningModalClose} style={{ width: '100px', backgroundColor: '#aaa', border: 'none' }}>취소</Button>
                        <Button variant="danger" onClick={handleWarningConfirm} style={{ width: '100px', backgroundColor: '#d9534f', border: 'none' }}>확인</Button>
                    </Modal.Footer>
                </Modal>

               {/* 최종 확인 모달 */}
                <Modal show={showConfirmModal} onHide={handleConfirmModalClose} centered>
                    <Modal.Header closeButton style={{ backgroundColor: '#ffe6e6', borderBottom: '2px solid #ff6666',  fontFamily:"Paperlogy-4Regular"  }}>
                        <Modal.Title style={{ color: '#d9534f', fontWeight: 'bold' }}>⚠️ 최종 확인: 회원 탈퇴</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '20px 30px', textAlign: 'center', fontFamily:"Pretendard-Regular" }}>
                        <p style={{ fontSize: '1.2em', color: '#333' }}>
                            <strong style={{ color: '#d9534f' }}>탈퇴 후에는 계정을 복구할 수 없습니다.</strong>
                        </p>
                        <p style={{ fontSize: '1.1em', color: '#555' }}>
                            탈퇴가 완료되면 모든 데이터가 삭제되며, 다시 가입하더라도 이전 기록을 복구할 수 없습니다.
                        </p>
                        <p style={{ fontSize: '1.1em', color: '#d9534f', fontWeight: 'bold', marginTop: '20px' }}>
                            정말로 계속 진행하시겠습니까?
                        </p>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', fontFamily:"Pretendard-Regular" }}>
                        <Button variant="secondary" onClick={handleConfirmModalClose} style={{ width: '100px', backgroundColor: '#aaa', border: 'none' }}>
                            취소
                        </Button>
                        <Button variant="danger" onClick={handleFinalDelete} style={{ width: '100px', backgroundColor: '#d9534f', border: 'none' }}>
                            탈퇴하기
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Form>
        </div>
    );
}

export default MypageDeleteAccountComponent;
