package com.project.ibe.controller;

import com.project.ibe.dto.member.MailRequest;
import com.project.ibe.services.MailService;
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

    @ResponseBody
    @PostMapping("/emailTest") // 테스트 api
    public String emailTest(@RequestBody MailRequest mailReq) throws MessagingException, UnsupportedEncodingException {
        String authCode = mailService.sendSimpleMessage(mailReq.getEmail());
        return authCode; // Response body에 값을 반환
    }

//    @ResponseBody
//    @PostMapping("/emailAuth") // 인증번호를 auth code로 넘김
//    public String emailTest(@RequestBody MailRequest mailReq) throws MessagingException, UnsupportedEncodingException {
//        String authCode = mailService.sendSimpleMessage(mailReq.getEmail());
//        return authCode; // Response body에 값을 반환
//    }
}