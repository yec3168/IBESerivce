import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

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

        if (currentPassword !== "123123") {
            errors.currentPasswordError = "비밀번호를 다시 확인해주세요.";
        }

        if (newPassword.length < 6 || newPassword.length > 20) {
            errors.newPasswordError = "비밀번호는 6 ~ 20자여야 합니다.";
        }

        if (newPassword === currentPassword) {
            errors.newPasswordError = "비밀번호가 동일합니다.";
        }

        if (newPassword !== confirmPassword) {
            errors.confirmPasswordError = "변경할 비밀번호를 확인해 주세요.";
        }

        setErrorMessages(errors);
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validatePasswords();

        if (!errors.currentPasswordError && !errors.newPasswordError && !errors.confirmPasswordError) {
            const confirmChange = window.confirm("비밀번호 변경은 되돌릴 수 없습니다.\n진행하시겠습니까?");
            if (confirmChange) {
                // 비밀번호 변경 api 여기서 호출
                alert("비밀번호가 변경되었습니다.");
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
                <small className="text-danger" style={{ textAlign: 'left', display: 'block', marginLeft: '5px' }}>
                    {errorMessage}
                </small>
            )}
        </Col>
    </Form.Group>
);

export default MypagePwChangeComponent;
