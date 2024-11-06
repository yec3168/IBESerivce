import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import DaumPostcode from 'react-daum-postcode';
import { getMemberInfo, updateMemberInfo, checkMemberPw  } from '../service/MypageService'; 

const MemberInfoChangeComponent = () => {
    // 데이터 상태 관리
    const [memberInfo, setMemberInfo] = useState(null);
    const [error, setError] = useState(null);

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // 멤버 정보 조회 API 호출
        const fetchMemberInfo = async () => {
          try {
            const response = await getMemberInfo(); 
            if (response.data && response.data.data) {
              setMemberInfo(response.data.data); 
            }
          } catch (error) {
            console.error('멤버 정보 조회 실패:', error);
          }
        };
    
        fetchMemberInfo(); 
    }, []);    

    // 비밀번호 확인 API 호출
    const handleConfirmClick = async () => {
        // 요청 DTO 만들기
        const requestData = {
            memberPassword: password
        };
    
        try {
            const response = await checkMemberPw(requestData);
            if (response.data.code === "200") {
                setIsConfirmed(true); 
                setErrors((prev) => {
                    const { passwordMismatch, ...rest } = prev; // 비밀번호 불일치 에러 제거
                    return rest;
                });
            } else {
                setIsConfirmed(false);  
                setErrors((prev) => ({
                    ...prev,
                    passwordMismatch: "비밀번호가 다릅니다."  // 비밀번호 불일치 메시지 설정
                }));
            }
        } catch (error) {
            console.error('비밀번호 확인 오류:', error);
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

     // 이름, 닉네임 정규식 확인
     const validateNameAndNickname = () => {
        const newErrors = {};
        // const nameRegex = /^[가-힣]{2,11}$/; // 한글 2~11자
        // const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,11}$/; // 한글, 영문, 숫자 2~11자

        // 이름이 사용자가 입력했을 경우에만 정규식 확인
        if (name && !/^[가-힣]{2,11}$/.test(name)) {
            newErrors.name = "이름은 한글 2~11자로 입력해 주세요.";
        }

        // 닉네임이 사용자가 입력했을 경우에만 정규식 확인
        if (nickname && !/^[a-zA-Z0-9가-힣]{2,11}$/.test(nickname)) {
            newErrors.nickname = "닉네임은 한글, 영문, 숫자 포함 2~11자로 입력해 주세요.";
        }
        return newErrors;
    };

     // Form submit
     const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {
            ...validateNameAndNickname(),
        };

        // null checking 안함. 입력안하면 기존 값으로 전송.
        // if (!phoneNumber) newErrors.phoneNumber = "전화번호를 입력하세요.";
        // if (!accountNumber) newErrors.accountNumber = "계좌 번호를 입력하세요.";
        // if (!address) newErrors.address = "주소를 입력하세요.";
        // if (!addressDetail) newErrors.detailAddress = "상세주소를 입력하세요.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 사용자가 값을 입력하지 않았으면 info에서 기본값을 사용
        const nameToSubmit = name || memberInfo.memberName;
        const nicknameToSubmit = nickname || memberInfo.memberNickName;
        const phoneNumberToSubmit = phoneNumber || memberInfo.memberPhone;
        const accountNumberToSubmit = accountNumber || memberInfo.memberAccountNumber;
        const bankToSubmit = bank || memberInfo.memberBank;
        const addressToSubmit = address || memberInfo.memberAddr;
        const addressDetailToSubmit = addressDetail || memberInfo.memberAddrDetail;

        // 요청 DTO 만들기
        const requestData = {
            memberName: nameToSubmit,
            memberNickName: nicknameToSubmit,
            memberPhone: phoneNumberToSubmit,
            memberAddr: addressToSubmit,
            memberAddrDetail: addressDetailToSubmit,
            memberAccountNumber: accountNumberToSubmit,
            memberBank: bankToSubmit
        };

        try {
            // 멤버 정보 변경 API 호출
            const response = await updateMemberInfo(requestData);
            if (response.data.code === "200") {
              alert("회원 정보가 성공적으로 변경되었습니다.");
            } else {
              alert("회원 정보 변경에 실패했습니다.");
            }
          } catch (error) {
            console.error('회원 정보 변경 실패:', error);
            alert('회원 정보 변경에 실패했습니다.');
          }
    };

    /**
     * 주소 관련 daum Post api 
     */
    const [showPostcode, setShowPostcode] = useState(false); // 주소 검색창 표시 상태
    const handleCompletePostcode = (data) => {
        // 주소 선택 시 실행될 함수
        setAddress(data.address);
        setShowPostcode(false); // 모달 창 닫기
    };

    const handlePostcodeButtonClick = () => {
        setShowPostcode(true); // 주소 검색 모달 창 열기
    };

    if (memberInfo === null) {
        return <div>로딩 중...</div>; // info가 null이면 로딩 표시(필수)
    }

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
                            <Form.Control plaintext readOnly defaultValue={memberInfo.memberEmail} />
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
                            {errors.passwordMismatch && 
                                <small className="text-danger" 
                                    style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }} >
                                    {errors.passwordMismatch}
                                </small>}
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
                                        placeholder={memberInfo.memberName} />
                                    {errors.name && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }} >
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
                                        placeholder={memberInfo.memberNickName} />
                                    {errors.nickname && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }} >
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
                                        placeholder={memberInfo.memberPhone}
                                    />
                                    {errors.phoneNumber && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }} >
                                            {errors.phoneNumber}
                                        </small>}
                                </Col>
                            </Form.Group>

                            {/* 계좌 번호 */}
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={2}>계좌 번호</Form.Label>
                                <Col sm={2}>
                                <Form.Select 
                                        value={bank} 
                                        onChange={(e) => setBank(e.target.value)} 
                                        className="select-custom">
                                        <option value="KB">국민은행</option>
                                        <option value="SHINHAN">신한은행</option>
                                        <option value="HANA">하나은행</option>
                                        <option value="WOORI">우리은행</option>
                                        <option value="NH">농협은행</option>
                                        <option value="KDB">산업은행</option>
                                        <option value="KAKAO">카카오뱅크</option>
                                        <option value="TOSS">토스뱅크</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={6}>
                                    <Form.Control type="text" value={accountNumber} 
                                        onChange={handleAccountNumberChange} 
                                        placeholder={memberInfo.memberAccountNumber} />
                                    {errors.accountNumber && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }} >
                                            {errors.accountNumber}
                                        </small>}
                                </Col>
                            </Form.Group>

                            {/* 주소 */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>주소</Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="text" value={address} 
                                        onChange={(e) => setAddress(e.target.value)} 
                                        placeholder={memberInfo.memberAddr} />
                                    {errors.address && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }} >
                                            {errors.address}
                                        </small>}
                                </Col>
                                <Col sm={1}>
                                    <Button id="button_infoFindAddr" onClick={handlePostcodeButtonClick}
                                            style={{whiteSpace: "nowrap"}}>
                                        주소찾기
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Modal show={showPostcode} onHide={() => setShowPostcode(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>주소 검색</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <DaumPostcode onComplete={handleCompletePostcode} />
                                </Modal.Body>
                            </Modal>

                            {/* 상세 주소 */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>상세주소</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" value={addressDetail} 
                                        onChange={(e) => setAddressDetail(e.target.value)} 
                                        placeholder={memberInfo.memberAddrDetail} />
                                    {errors.detailAddress && 
                                        <small className="text-danger" 
                                               style={{ textAlign: 'left', display: 'block', marginLeft:'5px' }} >
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
