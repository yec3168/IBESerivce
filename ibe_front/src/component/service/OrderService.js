import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/orders`

let accessToken = localStorage.getItem('accessToken');
const headers = {
        headers: {Authorization: `Bearer ${accessToken}`}
}

export const saveOrders = (orderFormReqeust) => axios.post(`${REST_API_URL}`, orderFormReqeust, headers);

export const getOrderList = () => axios.get(`${REST_API_URL}`, headers);