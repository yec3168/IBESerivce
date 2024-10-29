import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/member`


// 회원 등록
export const saveMember = (memberForm) => axios.post(`${REST_API_URL}/signup`, memberForm )


// 로그인
export const login = (loginMember) => axios.post(`${REST_API_URL}/signin`, loginMember);


// 이메일 중복확인
export const checkEmail = (memberEmail) => axios.get(`${REST_API_URL}/signup/${memberEmail}/`)