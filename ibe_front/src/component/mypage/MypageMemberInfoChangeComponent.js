import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

const MemberInfoChangeComponent = () => {
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [errors, setErrors] = useState({});

    // 비밀번호 확인
    const handleConfirmClick = () => {
        if (password === "123123") {
            setIsConfirmed(true);
        } else {
            alert('비밀번호가 일치하지 않습니다.');
            setIsConfirmed(false);
        }
    };

    // 전화번호 포맷팅
    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return value;
    };

    // 전화번호 자리수 확인 후 포맷된 값으로 변환
    const handlePhoneNumberChange = (e) => {
        const { value } = e.target;
        if (value.replace(/\D/g, '').length > 11) {
            return;
        }
        const formattedNumber = formatPhoneNumber(value);
        setPhoneNumber(formattedNumber);

        if (formattedNumber.replace(/-/g, '').length !== 11 && formattedNumber !== '') {
            setErrors(prev => ({ ...prev, phoneNumber: "전화번호는 11자리여야 합니다." }));
        } else {
            setErrors(prev => {
                const { phoneNumber, ...rest } = prev; // phoneNumber 에러만 제거
                return rest;
            });
        }
    };

    // 계좌번호 자리수 확인
    const handleAccountNumberChange = (e) => {
        const { value } = e.target;
        setAccountNumber(value);

        if (value.length < 10 || value.length > 15) {
            setErrors(prev => ({ ...prev, accountNumber: "계좌 번호는 10~15자리 숫자여야 합니다." }));
        } else {
            setErrors(prev => {
                const { accountNumber, ...rest } = prev; // accountNumber 에러만 제거
                return rest;
            });
        }
    };

    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // validation
        const newErrors = {};
        if (!name) newErrors.name = "성명을 입력하세요.";
        if (!nickname) newErrors.nickname = "닉네임을 입력하세요.";
        if (!phoneNumber) newErrors.phoneNumber = "전화번호를 입력하세요.";
        if (!accountNumber) newErrors.accountNumber = "계좌 번호를 입력하세요.";
        if (!address) newErrors.address = "주소를 입력하세요.";
        if (!addressDetail) newErrors.detailAddress = "상세주소를 입력하세요.";
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 여기서 api 호출

        alert('정보가 수정되었습니다.');
        setErrors({}); 
    };

    return (
        <>
            <div className="container text-center my-5" id="container_info">
                <h1 id="h1_infoTitle">회원 정보 변경</h1>
                <hr />

                <Form onSubmit={handleSubmit}>
                    {/* 아이디 */}
                    <Form.Group as={Row} className="mb-4 mt-5">
                        <Form.Label column sm={2}>아이디</Form.Label>
                        <Col sm={8}>
                            <Form.Control plaintext readOnly defaultValue="yec3618@naver.com" />
                        </Col>
                    </Form.Group>

                    {/* 비밀번호 */}
                    <Form.Group as={Row} className="mb-4">
                        <Form.Label column sm={2}>비밀번호</Form.Label>
                        <Col sm={4}>
                            <Form.Control 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                readOnly={isConfirmed} // 비밀번호 확인 후 비활성화
                            />
                        </Col>
                        <Col sm={2}>
                            {!isConfirmed && (
                                <Button id="button_infoCheckPw" onClick={handleConfirmClick}>비밀번호 확인</Button>
                            )}
                        </Col>
                    </Form.Group>

                    {/* 비밀번호 확인 후 활성화 */}
                    {isConfirmed && (
                        <>
                            {/* 성명 */}
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={2}>성명</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        placeholder="홍길동" />
                                    {errors.name && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }}>
                                            {errors.name}
                                        </small>}
                                </Col>
                            </Form.Group>

                            {/* 닉네임 */}
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={2}>닉네임</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" value={nickname} 
                                        onChange={(e) => setNickname(e.target.value)} 
                                        placeholder="길동" />
                                    {errors.nickname && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }}>
                                            {errors.nickname}
                                        </small>}
                                </Col>
                            </Form.Group>

                            {/* 전화 번호 */}
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={2}>전화 번호</Form.Label>
                                <Col sm={8}>
                                    <Form.Control 
                                        type="text" value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        placeholder="010-1234-5678"
                                    />
                                    {errors.phoneNumber && 
                                            <small className="text-danger" 
                                                   style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }}>
                                                {errors.phoneNumber}
                                            </small>}
                                </Col>
                            </Form.Group>

                            {/* 계좌 번호 */}
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={2}>계좌 번호</Form.Label>
                                <Col sm={2}>
                                    <Form.Select defaultValue="농협은행" className="select-custom">
                                        <option>국민은행</option>
                                        <option>신한은행</option>
                                        <option>하나은행</option>
                                        <option>우리은행</option>
                                        <option>농협은행</option>
                                        <option>산업은행</option>
                                        <option>카카오뱅크</option>
                                        <option>토스뱅크</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={6}>
                                    <Form.Control type="text" value={accountNumber} 
                                        onChange={handleAccountNumberChange} 
                                        placeholder="12345677897897" />
                                    {errors.accountNumber && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }}>
                                            {errors.accountNumber}
                                        </small>}
                                </Col>
                            </Form.Group>

                            {/* 주소 */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>주소</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" value={address} 
                                        onChange={(e) => setAddress(e.target.value)} 
                                        placeholder="서울특별시 강서구 양천로 560" />
                                    {errors.address && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }}>
                                            {errors.address}
                                        </small>}
                                </Col>
                            </Form.Group>

                            {/* 상세 주소 */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>상세주소</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" value={addressDetail} 
                                        onChange={(e) => setAddressDetail(e.target.value)} 
                                        placeholder="101동 101호" />
                                    {errors.detailAddress && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }}>
                                            {errors.detailAddress}
                                        </small>}
                                </Col>
                            </Form.Group>

                            {/* 저장 버튼 */}
                            <div className="d-flex justify-content-center mt-4">
                                <Button type="submit" id="button_infoSubmit">저장</Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

export default MemberInfoChangeComponent;
