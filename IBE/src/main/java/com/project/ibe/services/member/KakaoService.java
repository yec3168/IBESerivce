package com.project.ibe.services.member;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.ibe.dto.member.KakaoSignupCheckResponse;
import com.project.ibe.entity.common.SocialType;
import com.project.ibe.entity.member.Member;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.jwt.JwtTokenProvider;
import com.project.ibe.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
@PropertySource("classpath:application-api.properties")
public class KakaoService {

    @Value("${kakao.client.id}")
    private String clientKey;

    @Value("${kakao.client.secret}")
    private String clientSecret;

    @Value("${kakao.redirect.uri}")
    private String redirectUri;

    @Value("${kakao.redirect.uri.backend}")
    private String redirectUriBack;

    private final RestTemplate restTemplate;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public Object checkKakaoSignup(String code){
//        System.out.println(redirectUri);

        // 1. "인가 코드"로 "액세스 토큰" 생성
        String accessToken = getKakaoToken(code);
        System.out.println("accessToken " + accessToken);

        // 2. 생성된 "액세스 토큰"으로 카카오 API 호출.
        // 이미 존재하는 회원이면 null
        // 회원가입이 필요하면 데이터 넣음.
        return getString(accessToken);
    }

    //1. "인가 코드"로 "액세스 토큰" 요청 => 액세스 토큰 파싱  (통과)
    public String getKakaoToken(String code){
        String tokenUrl = "https://kauth.kakao.com/oauth/token";

        //header 설정
        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add("Content-Type", "application/x-www-form-urlencoded");
        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 설정
        MultiValueMap<String, String> bodyParams = new LinkedMultiValueMap<>();
        bodyParams.add("grant_type", "authorization_code");
        bodyParams.add("client_id", clientKey);
        bodyParams.add("redirect_uri", redirectUri);
        bodyParams.add("code", code);

        // 요청
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(bodyParams, httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, String.class);

        // Http 응답 (JSON)
        JsonNode jsonNode = getJsonNode(response);

        return jsonNode.get("access_token").asText(); //토큰 전송
    }


    //2. 토큰으로 카카오 API 호출
    // 로그인 or 회원가입 여부 확인.
    private Object getString(String accessToken){
        String url = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + accessToken);
        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<String> request = new HttpEntity<>(httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

        JsonNode jsonNode = getJsonNode(response);
        System.out.println(jsonNode.toString());

        String id = jsonNode.get("id").asText();
        String email = jsonNode.get("kakao_account").get("email").asText();
        String nickname = jsonNode.get("properties").get("nickname").asText();


        // 회원정보 가져와서 넣기.
//        HashMap<String, Object> userInfo= new HashMap<String,Object>();
//        userInfo.put("id",id);
//        userInfo.put("email", email);
//        userInfo.put("nickname",nickname);

        try{

            Member kakaoMember = memberRepository.findByMemberEmail(email)
                    .orElseThrow(
                            () -> new BusinessException("가입되지 않은 소셜아이디입니다.", HttpStatus.NOT_FOUND)
                    );
            // 존재한다면 로그인. -> 토큰 생성.
            return jwtTokenProvider.createToken(kakaoMember.getMemberEmail(), kakaoMember.getRole().toString());

        }catch (Exception e){
            //회원이 존재하지 않으면 회원가입.
            KakaoSignupCheckResponse kakaoLoginCheckResponse = KakaoSignupCheckResponse.builder()
                    .memberEmail(email)
                    .memberNickName(nickname)
                    .memberSocialId(id)
                    .memberSocialType(SocialType.KAKAO)
                    .build();
            return kakaoLoginCheckResponse;
        }

    }

    // responseBody에 있는 정보를 꺼냄
    private static JsonNode getJsonNode(ResponseEntity<String> response) {
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;

        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonNode;
    }

//
//
//    // responseBody에 있는 정보를 꺼냄
//    private static JsonNode getJsonNode(ResponseEntity<String> response) {
//        String responseBody = response.getBody();
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = null;
//
//        try {
//            jsonNode = objectMapper.readTree(responseBody);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        return jsonNode;
//    }

}
