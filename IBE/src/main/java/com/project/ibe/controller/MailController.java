package com.project.ibe.controller;

import com.project.ibe.dto.member.MailRequest;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.MailService;
import com.project.ibe.services.MemberService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;
    private final MemberService memberService;

    @ResponseBody
    @PostMapping("/emailAuth") // 인증번호를 memberAuthNumber로 넘김
    public Response emailAuth(@RequestBody MailRequest mailReq) throws MessagingException, UnsupportedEncodingException {
        String memberEmail = mailReq.getEmail();
        String authNumber = mailService.sendSimpleMessage(mailReq.getEmail());

        try{
            return new Response(ResponseCode.SUCCESS, memberService.updateAuthNumber(memberEmail, authNumber), "200");
        } catch (Exception e){
            return new Response(ResponseCode.FAIL, false, "404");
        }
    }
}