import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/members/mypage`

let accessToken = localStorage.getItem('accessToken');
const headers = {
        headers: {Authorization: `Bearer ${accessToken}`}
}

// 문의 내역 목록 조회
export const getInquiries = () => axios.get(`${REST_API_URL}/inqlist`, headers );

// 문의 답변 조회
export const getInquiryAnswer = () => axios.get(`${REST_API_URL}/inquiry`, headers );

// 문의 답변 등록
export const postInquiry = (data) => {
    return axios.post(`${REST_API_URL}/inquiry/answer`, data, headers);
};

