package com.project.ibe.controller;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.points.*;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.points.KakaoPayService;
import com.project.ibe.services.points.NhService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/points")
public class PointsController {

    private final KakaoPayService kakaoPayService;
    private final NhService nhService;

    @PostMapping("/kakao/ready")
    public Response kakaoReady(@RequestBody KakaoReadyRequest request
            ,@AuthenticationPrincipal PrincipalDTO principal) {
        log.info("kakaoController 호출");
        String name = request.getPriceName();
        int totalPrice = request.getTotalPrice();
        log.info("주문 상품 이름: " + name);
        log.info("주문 금액: " + totalPrice);
        try{
            // 카카오 결제 준비하기
            KakaoReadyResponse readyResponse = kakaoPayService.payReady(name, totalPrice,principal);
            log.info("결제 고유번호: " + readyResponse.getTid());
            return  new Response(ResponseCode.SUCCESS,readyResponse, "200");
        }catch (Exception e){
            return  new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @GetMapping("/kakao/completed")
    public Response kakaoCompleted(@RequestParam("pg_token") String pgToken, @RequestParam("tid") String tid) {
       log.info("kakaoCompletedController 호출");
        log.info("결제승인 요청을 인증하는 토큰: " + pgToken);
        log.info("결제 고유번호: " + tid);
        // 카카오 결제 요청하기
        try{
            return  new Response(ResponseCode.SUCCESS,kakaoPayService.payApprove(tid, pgToken), "200");
        }catch (Exception e){
            return  new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PostMapping("/nh/transfer")
    public NhResponse NhTransfer(@RequestBody NhRequest nhRequest) {
        log.info("NhTestController 호출");
        log.info(nhRequest.toString());
        return nhService.nh(nhRequest);

    }
}
