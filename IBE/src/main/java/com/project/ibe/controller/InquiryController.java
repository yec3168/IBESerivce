package com.project.ibe.controller;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.mypage.InquiryAnswerRequest;
import com.project.ibe.dto.mypage.InquiryRequest;
import com.project.ibe.dto.mypage.InquiryResponse;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.mypage.InquiryService;
import io.jsonwebtoken.JwtException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/mypage")
public class InquiryController {
    private final InquiryService inquiryService;

    // 문의 내역 조회
    @GetMapping("/inqlist")
    public Response<List<InquiryResponse>> getInquiries(@AuthenticationPrincipal PrincipalDTO principal) {
        try {
            return new Response(ResponseCode.SUCCESS, inquiryService.getInquiries(principal), "200");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    // 일대일문의 등록
    @PostMapping("/inquiry")
    public Response postInquiry(@AuthenticationPrincipal PrincipalDTO principal,
                                @RequestBody @Valid InquiryRequest request) {
        try {
            return new Response(ResponseCode.SUCCESS, inquiryService.postInquiry(principal, request), "200");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    // 문의 답변 조회
    @GetMapping("/inquiry/answer")
    public Response getInquiryAnswer(PrincipalDTO principal, @RequestBody @Valid InquiryAnswerRequest request) {
        try {
            return new Response(ResponseCode.SUCCESS, inquiryService.getInquiryAnswer(principal, request), "200");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }
}
