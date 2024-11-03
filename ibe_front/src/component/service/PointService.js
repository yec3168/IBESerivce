import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/members/points`
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

// kakao 결제창 호출
export const kakaoReady = (data) => axios.post(`${REST_API_URL}/kakao/ready`, data )

export const kakaoCompleted = (pg_token,tid) => axios.get(`${REST_API_URL}/kakao/completed?${pg_token}&tid=${tid}`)
