package com.project.ibe.services.member;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.ibe.entity.member.Member;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;


@Service
@RequiredArgsConstructor
public class KakaoService {

//    @Value("${kakao.client.id}")
//    private String clientKey;
//
//    @Value("${kakao.client.secret}")
//    private String clientSecret;
//
//    @Value("${kakao.redirect.uri}")
//    private String redirectUri;
//
//    private final RestTemplate restTemplate;
//    private final MemberRepository memberRepository;
//
//    public boolean kakaoSignin(String code){
//        // 1. "인가 코드"로 "액세스 토큰" 생성
//        String accessToken = getKakaoToken(code);
//
//        // 2. 생성된 "액세스 토큰"으로 카카오 API 호출. User의 정보를 가져옴.
//        HashMap<String, Object> userInfo = getString(accessToken);
//
//        // 3. 유저 정보로 회원가입 & 로그인 처리
//
//
//        return true;
//    }
//
//    //1. "인가 코드"로 "액세스 토큰" 요청 => 액세스 토큰 파싱
//    public String getKakaoToken(String code){
//        String tokenUrl = "https://kauth.kakao.com/oauth/token";
//
//        //header 설정
//        HttpHeaders httpHeaders = new HttpHeaders();
////        httpHeaders.add("Content-Type", "application/x-www-form-urlencoded");
//        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // body 설정
//        MultiValueMap<String, String> bodyParams = new LinkedMultiValueMap<>();
//        bodyParams.add("grant_type", "authorization_code");
//        bodyParams.add("client_id", clientKey);
//        bodyParams.add("redirect_uri", redirectUri);
//        bodyParams.add("code", code);
//
//        // 요청
//        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(bodyParams, httpHeaders);
//        ResponseEntity<String> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, String.class);
//
//        // Http 응답 (JSON)
//        JsonNode jsonNode = getJsonNode(response);
//
//        return jsonNode.get("access_token").asText(); //토큰 전송
//    }
//
//
//    //유저 정보 가져오기.
//    //2. 토큰으로 카카오 API 호출
//    private HashMap<String, Object> getString(String accessToken){
//        String url = "https://kapi.kakao.com/v2/user/me";
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add("Authorization", "Bearer " + accessToken);
//        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        HttpEntity<String> request = new HttpEntity<>(httpHeaders);
//        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
//
//        JsonNode jsonNode = getJsonNode(response);
//
//        // 회원정보 가져와서 넣기.
//        HashMap<String, Object> userInfo= new HashMap<String,Object>();
//        Long id = jsonNode.get("id").asLong();
//        String email = jsonNode.get("kakao_account").get("email").asText();
//        String nickname = jsonNode.get("properties").get("nickname").asText();
//
//        userInfo.put("id",id);
//        userInfo.put("email",email);
//        userInfo.put("nickname",nickname);
//
//        return userInfo;
//    }
//
//    //3. 카카오ID로 회원가입 & 로그인 처리
//    private boolean kakaoUserLogin(HashMap<String, Object> userInfo){
//        Long uid= Long.valueOf(userInfo.get("id").toString());
//        String kakaoEmail = userInfo.get("email").toString();
//        String nickName = userInfo.get("nickname").toString();
//
//        try{
//
//            Member kakaoMember = memberRepository.findByMemberEmail(kakaoEmail)
//                    .orElseThrow(
//                            () -> new BusinessException("Member not Found", HttpStatus.NOT_FOUND)
//                    );
//            // 존재한다면 로그인.
//
//        }catch (Exception e){
//            //회원이 존재하지 않으면 회원가입.
//        }
//
//
//        return false;
//    }
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
