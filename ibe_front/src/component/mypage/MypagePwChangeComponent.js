import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { checkMemberPw, updateMemberPw } from '../service/MypageService';

const MypagePwChangeComponent = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({
        currentPasswordError: '',
        newPasswordError: '',
        confirmPasswordError: ''
    });

    const handleChange = (setter) => (e) => setter(e.target.value);

    const validatePasswords = () => {
        const errors = {
            currentPasswordError: '',
            newPasswordError: '',
            confirmPasswordError: ''
        };

        if (currentPassword === '') {
            errors.currentPasswordError = "현재 비밀번호를 입력해주세요.";
        }

        if (newPassword.length < 6 || newPassword.length > 20) {
            errors.newPasswordError = "비밀번호는 6 ~ 20자여야 합니다.";
        }

        if (newPassword === currentPassword) {
            errors.newPasswordError = "현재 비밀번호와 동일한 비밀번호를 사용할 수 없습니다.";
        }

        if (newPassword !== confirmPassword) {
            errors.confirmPasswordError = "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.";
        }

        setErrorMessages(errors);
        return errors;
    };

    // 현재 비밀번호 확인 함수
    const handleCheckCurrentPassword = async () => {
        const requestData = { memberPassword: currentPassword };

        try {
            // 비밀번호 확인 API 호출
            const response = await checkMemberPw(requestData);
            
            if (response.data.code === "200" && response.data.data.success) {
                return true; // 비밀번호 일치
            } else {
                setErrorMessages((prev) => ({
                    ...prev,
                    currentPasswordError: "현재 비밀번호가 일치하지 않습니다.",
                }));
                return false; // 비밀번호 불일치
            }
        } catch (error) {
            console.error('비밀번호 확인 오류:', error);
            setErrorMessages((prev) => ({
                ...prev,
                currentPasswordError: "현재 비밀번호 확인 중 오류가 발생했습니다.",
            }));
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 현재 비밀번호 확인
        const isCurrentPasswordValid = await handleCheckCurrentPassword();
        if (!isCurrentPasswordValid) return; // 현재 비밀번호가 일치하지 않으면 종료
        
        // 비밀번호 유효성 체크
        const errors = validatePasswords();
    
        // 에러가 있으면 오류 메시지에 맞게 처리하고, 진행하지 않음
        if (errors.currentPasswordError || errors.newPasswordError || errors.confirmPasswordError) {
            return;
        }
    
        const confirmChange = window.confirm("비밀번호 변경은 되돌릴 수 없습니다.\n진행하시겠습니까?");
        if (confirmChange) {
            const requestData = {
                memberPassword: currentPassword,
                memberNewPassword: newPassword
            };
    
            try {
                // 비밀번호 변경 API 호출
                const response = await updateMemberPw(requestData);
                
                console.log("비밀번호 변경 응답:", response.data); // 서버 응답 로그 확인
    
                if (response.data.code === "200" && response.data.data.success) {
                    alert("비밀번호가 변경되었습니다.");
                } else {
                    alert("비밀번호 변경에 실패했습니다.");
                }
            } catch (error) {
                console.error('비밀번호 변경 오류:', error);
                alert("비밀번호 변경에 실패했습니다.");
            }
        }
    };    

    return (
        <div className="container text-center my-5" id="container_info">
            <h1 id="h1_infoTitle">비밀번호 변경</h1>
            <hr />
            <div id="div_spacing" />
            <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                <FormGroup 
                    label="현재 비밀번호" 
                    value={currentPassword} 
                    onChange={handleChange(setCurrentPassword)} 
                    errorMessage={errorMessages.currentPasswordError} 
                />
                <FormGroup 
                    label="새 비밀번호" 
                    value={newPassword} 
                    onChange={handleChange(setNewPassword)} 
                    errorMessage={errorMessages.newPasswordError} 
                />
                <FormGroup 
                    label="새 비밀번호 확인" 
                    value={confirmPassword} 
                    onChange={handleChange(setConfirmPassword)} 
                    errorMessage={errorMessages.confirmPasswordError} 
                />
                <div className="d-flex justify-content-center w-100 mt-4">
                    <Button type="submit" id="button_infoCheckPw">비밀번호 변경</Button>
                </div>
            </Form>
        </div>
    );
};

const FormGroup = ({ label, value, onChange, errorMessage }) => (
    <Form.Group as={Row} className="mb-4 w-100">
        <Form.Label column sm={4} className="text-end">{label}</Form.Label>
        <Col sm={4}>
            <Form.Control 
                type="password" 
                value={value} 
                onChange={onChange} 
            />
            {errorMessage && (
                <small className="text-danger" style={{ textAlign: 'left', display: 'block', marginLeft: '5px' }} >
                    {errorMessage}
                </small>
            )}
        </Col>
    </Form.Group>
);

export default MypagePwChangeComponent;
