package com.project.ibe.controller;

import com.project.ibe.dto.member.MailRequest;
import com.project.ibe.dto.member.MemberSignInRequest;
import com.project.ibe.dto.member.MemberSignUpRequest;
import com.project.ibe.dto.member.sms.MemberSmsReqequest;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.MailService;
import com.project.ibe.services.MemberService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController //json
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MailService mailService;
    private final MemberService memberService;

    /**
     * 회원가입 등록.
     */
    @PostMapping("/signup") // @Valid 넣어야함.
    public Response signUp( @RequestBody MemberSignUpRequest memberSignUpRequest) {

        try{
            return new Response(ResponseCode.SUCCESS, memberService.signUp(memberSignUpRequest), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    /**
     * 로그인
     */
    @PostMapping("/signin")
    public Response signin(@RequestBody MemberSignInRequest memberSignInRequest) {
        try{
            return new Response(ResponseCode.SUCCESS, memberService.signIn(memberSignInRequest), "200");
        } catch (Exception e){
            return new Response(ResponseCode.FAIL, false, "404");
        }

    }

    /**
     * 이메일 중복확인
     */
    @GetMapping("/signup/{memberEmail}/")
    public Boolean checkEmail(@PathVariable String memberEmail) {

        return memberService.checkEmail(memberEmail);
    }


    /**
     * 메일 인증번호 발송
     */
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


    /**
     * 전화번호 인증번호 발송.
     */
    @PostMapping("/mail/send/{memberPhone}/")
    public Response sendSms(@PathVariable String memberPhone) {
        try {
            String generatedCode = memberService.sendSmsToFindEmail(memberPhone);
            return new Response(ResponseCode.SUCCESS, generatedCode, "200");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(ResponseCode.FAIL, "실패", "400");
        }
    }

    @PostMapping("/mail/send")
    public Response sendSms(@RequestBody MemberSmsReqequest memberSmsReqequest) {
        try {
            return new Response(ResponseCode.SUCCESS, memberService.sendSmsToFindEmail(memberSmsReqequest), "200");
        } catch (Exception e) {

            return new Response(ResponseCode.FAIL, e.getMessage(), "400");
        }
    }
}
