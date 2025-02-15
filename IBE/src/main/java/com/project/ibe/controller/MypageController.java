package com.project.ibe.controller;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.mypage.MemberInfoUpdateRequest;
import com.project.ibe.dto.mypage.MemberPwCheckRequest;
import com.project.ibe.dto.mypage.MemberPwUpdateRequest;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.services.mypage.MypageService;
import io.jsonwebtoken.JwtException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/mypage")
public class MypageController {

    private final MypageService myPageService;

    @GetMapping()
    public Response getMemberInfo(@AuthenticationPrincipal PrincipalDTO principal) {
        try {
            return new Response(ResponseCode.SUCCESS, myPageService.getMemberInfo(principal), "200");
        } catch (JwtException | AuthenticationException e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @GetMapping("/point")
    public Response getMemberPoint(@AuthenticationPrincipal PrincipalDTO principal) {
        try {
            return new Response(ResponseCode.SUCCESS, myPageService.getMemberPoint(principal), "200");
        } catch (JwtException | AuthenticationException e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PutMapping("/updateinfo")
    public Response updateMemberInfo(@AuthenticationPrincipal PrincipalDTO principal,
                                           @RequestBody @Valid MemberInfoUpdateRequest request) {
        try {
            return new Response(ResponseCode.SUCCESS, myPageService.updateMemberInfo(principal, request), "200");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PutMapping("/updatepw")
    public Response updateMemberPw(@AuthenticationPrincipal PrincipalDTO principal,
                                         @RequestBody @Valid MemberPwUpdateRequest request) {
        try {
            return new Response(ResponseCode.SUCCESS, myPageService.updateMemberPw(principal, request), "200");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PutMapping("/updatedel")
    public Response updateMemberPw(@AuthenticationPrincipal PrincipalDTO principal) {
        try {
            return new Response(ResponseCode.SUCCESS, myPageService.updateMemberDel(principal), "200");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PostMapping("/checkpw")
    public Response checkMemberPw(@AuthenticationPrincipal PrincipalDTO principal,
                                   @RequestBody @Valid MemberPwCheckRequest request) {
        try {
            return new Response(ResponseCode.SUCCESS, myPageService.checkMemberPw(principal, request), "200");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

}
