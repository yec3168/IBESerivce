import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/products`

//물품 등록.
export const saveProduct = (productFormRequest) => axios.post(`${REST_API_URL}`, productFormRequest )


// 물품 상세조회
export const getProductList = (productId) => axios.get(`${REST_API_URL}/${productId}`);