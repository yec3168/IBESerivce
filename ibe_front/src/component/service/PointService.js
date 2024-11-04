import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/members/points`
let accessToken = localStorage.getItem('accessToken');
const headers = {
        headers: {Authorization: `Bearer ${accessToken}`}
    }


// kakao 결제창 호출
export const kakaoReady = (data) => axios.post(`${REST_API_URL}/kakao/ready`, data,headers )

export const kakaoCompleted = (pg_token,tid) => axios.get(`${REST_API_URL}/kakao/completed?${pg_token}&tid=${tid}`,headers)
