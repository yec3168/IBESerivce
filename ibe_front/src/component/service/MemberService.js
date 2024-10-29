import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/members`


// 회원 등록
export const saveMember = (member) => axios.post( `${REST_API_URL}/signup`, member )

