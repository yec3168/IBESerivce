import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/orders`

let accessToken = localStorage.getItem('accessToken');
const headers = {
        headers: {Authorization: `Bearer ${accessToken}`}
}

//구매 테이블 등록.
export const saveOrders = (orderFormReqeust) => axios.post(`${REST_API_URL}`, orderFormReqeust, headers);


//구매목록
export const getOrderList = () => axios.get(`${REST_API_URL}`, headers);

//판매목록
export const getSellList = () => axios.get(`${REST_API_URL}/sell`, headers);

//거래완료
export const orderComplete = (orderCompleteRequest) => axios.post(`${REST_API_URL}/complete`, orderCompleteRequest, headers);

// 배송지입력.
export const orderDelivery = (orderDeliveryRequest) => axios.post(`${REST_API_URL}/delivery`, orderDeliveryRequest, headers);

//구매확정
export const orderFinished = (orderFinishedRequest) => axios.post(`${REST_API_URL}/finish`, orderFinishedRequest, headers);