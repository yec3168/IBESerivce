import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api"

const REST_API_URL = `${REST_API_BASE_URL}/products`

let accessToken = localStorage.getItem('accessToken');
const headers = {
        headers: {Authorization: `Bearer ${accessToken}`}
}


//물품 등록.
export const saveProduct = (productFormRequest) => axios.post(`${REST_API_URL}`, productFormRequest, headers )


// 물품 상세조회
export const getProduct = (productId) => axios.get(`${REST_API_URL}/${productId}`, );


// 물품 목록 조회.
export const getProductList = () => axios.get(`${REST_API_URL}`)


// 댓글 등록.
export const saveProductComment = (productCommentFormRequest) => axios.post(`${REST_API_URL}/comments`, productCommentFormRequest, headers)


// 댓글 목록 조회.
export const getProductCommentList = (productCommentRequest) => {
    const { productId } = productCommentRequest;
    return axios.get(`${REST_API_URL}/comments`, {
        params: { productId } // 쿼리 파라미터로 전달
    }, headers);
};


// 대댓글 등록.
export const saveProductReply = (productReplyReqeust) => axios.post(`${REST_API_URL}/reply`, productReplyReqeust, headers);


// 주문시 필요정보 조회
export const getProductOrderResponse = (productId) => axios.get(`${REST_API_URL}/orders/${productId}`, headers);