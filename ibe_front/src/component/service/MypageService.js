import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/members/mypage`

let accessToken = localStorage.getItem('accessToken');
const headers = {
        headers: {Authorization: `Bearer ${accessToken}`}
}

// 포인트 조회
export const getMemberPoint = () => axios.get(`${REST_API_URL}/point`, headers );