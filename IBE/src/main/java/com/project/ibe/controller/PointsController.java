package com.project.ibe.controller;

import com.project.ibe.dto.points.*;
import com.project.ibe.services.points.KakaoPayService;
import com.project.ibe.services.points.NhService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/points")
public class PointsController {

    private final KakaoPayService kakaoPayService;
    private final NhService nhService;

    @PostMapping("/kakao/ready")
    public KakaoReadyResponse kakaoReady(@RequestBody KakaoReadyRequest request) {
        log.info("kakaoController 호출");
        String name = request.getMemberName();
        int totalPrice = request.getTotalPrice();
        log.info("주문 상품 이름: " + name);
        log.info("주문 금액: " + totalPrice);
        // 카카오 결제 준비하기
        KakaoReadyResponse readyResponse = kakaoPayService.payReady(name, totalPrice);
        // 세션에 결제 고유번호(tid) 저장
        log.info("결제 고유번호: " + readyResponse.getTid());
        return readyResponse;
    }

    @GetMapping("/kakao/completed")
    public ApproveResponse kakaoCompleted(@RequestParam("pg_token") String pgToken, @RequestParam("tid") String tid) {
       log.info("kakaoCompletedController 호출");
        log.info("결제승인 요청을 인증하는 토큰: " + pgToken);
        log.info("결제 고유번호: " + tid);
        // 카카오 결제 요청하기
        return kakaoPayService.payApprove(tid, pgToken);
    }

    @PostMapping("/nh/transfer")
    public NhResponse NhTransfer(@RequestBody NhRequest nhRequest) {
        log.info("NhTestController 호출");
        log.info(nhRequest.toString());
        return nhService.nh(nhRequest);

    }
}
