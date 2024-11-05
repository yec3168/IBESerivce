import axios from "axios"

const kakao_clinet_id = process.env.REACT_APP_KAKAO_CLEINT_ID
const kakao_redirect_uri = process.env.REACT_APP_KAKAO_CREDIRECT_URI
const kakao_auth_path = 'https://kauth.kakao.com/oauth/authorize';

export const getKaKaoLoginLink = () => {
    const kakaoURL = `${kakao_auth_path}?client_id=${kakao_clinet_id}&redirect_uri=${kakao_redirect_uri}&response_type=code`;
    return kakaoURL;
}


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