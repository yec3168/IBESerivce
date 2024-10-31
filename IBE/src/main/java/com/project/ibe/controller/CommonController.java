package com.project.ibe.controller;

import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sms")
@RequiredArgsConstructor
public class CommonController {
    private final MemberService memberService;

//    @PostMapping("/mail/send/{memberPhone}/")
//    public Response sendSms(@PathVariable String memberPhone) {
//        try {
//            String generatedCode = memberService.sendSmsToFindEmail(memberPhone);
//            return new Response(ResponseCode.SUCCESS, generatedCode, "200");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new Response(ResponseCode.FAIL, "실패", "400");
//        }
//    }
}
