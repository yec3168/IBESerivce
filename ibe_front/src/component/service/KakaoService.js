import axios from "axios"

const kakao_clinet_id = process.env.REACT_APP_KAKAO_CLEINT_ID
const kakao_redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI
const kakao_auth_path = 'https://kauth.kakao.com/oauth/authorize';

export const getKaKaoLoginLink = () => {
    console.log(kakao_redirect_uri)
    const kakaoURL = `${kakao_auth_path}?client_id=${kakao_clinet_id}&redirect_uri=${kakao_redirect_uri}&response_type=code`;
    return kakaoURL;
}


// 카카오 로그인 회원가입 여부 확인.
export const checkKakaoLogin = async(code) => {
    return  await axios.get(`http://localhost:8080/api/members/kakao/oauth?code=${code}`);
}
    
    
// export const kakaoLogin = async(code) => await axios.get(`${kakao_redirect_uri}?code=${code}`);


// export const getProductCommentList = (productCommentRequest) => {
//     const { productId } = productCommentRequest;
//     return axios.get(`${REST_API_URL}/comments`, {
//         params: { productId } // 쿼리 파라미터로 전달
//     }, headers);
// };




// 백엔드에서 작업하는 것으로 바꿈.
const access_token_uri = 'https://kauth.kakao.com/oauth/token';

// 2. 인가 코드를 통해 Access Token 발급
export const getAccessToken = async(authCode) => {
    const header = { headers: {
            "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
    }}
    const body = {
        grant_type: 'authorization_code',
        client_id: kakao_clinet_id,
        redirect_uri: kakao_redirect_uri,
        code: authCode
    }
    const res = await axios.post(access_token_uri, body, header);
    const accessToken = res.data.access_token;
    return accessToken;
}