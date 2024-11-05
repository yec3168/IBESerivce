import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/members`


// 회원 등록
export const saveMember = (memberForm) => axios.post(`${REST_API_URL}/signup`, memberForm )


// 로그인
export const login = (loginMember) => axios.post(`${REST_API_URL}/signin`, loginMember);


// 이메일 중복확인
export const checkEmail = (memberEmail) => axios.get(`${REST_API_URL}/signup/${memberEmail}/`)


// 전화번호 인증번호 받기
export const saveCodeNumber = (memberPhone) => axios.post(`${REST_API_URL}/mail/send/${memberPhone}/`)

// 이메일 찾기
export const searchEmail = (memberSnsRequest) => axios.post(`${REST_API_URL}/mail/send`, memberSnsRequest)


// 메일전송
export const sendMail = (mailRequest) => axios.post(`${REST_API_URL}/emailAuth`, mailRequest)


// 카카오 회원가입
export const kakaoSignup = (kakaoSignupRequest) => axios.post(`${REST_API_URL}/kakao/oauth/signup`, kakaoSignupRequest);