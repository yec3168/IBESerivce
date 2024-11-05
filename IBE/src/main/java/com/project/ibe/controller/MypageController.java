package com.project.ibe.controller;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.mypage.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/mypage")
public class MypageController {

    private final MypageService myPageService;

    @GetMapping()
    public Response getMyInfo(@AuthenticationPrincipal PrincipalDTO principal) {
        log.info(principal.toString());
        try {
            return new Response(ResponseCode.SUCCESS, myPageService.getMemberInfo(principal), "200");
        } catch (Exception e) {
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }
}
