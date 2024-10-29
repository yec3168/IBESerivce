package com.project.ibe.controller;

import com.project.ibe.dto.MemberSignInRequest;
import com.project.ibe.services.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

//    private final MemberService memberService;
//
//    @PostMapping("/signin")
//    public ResponseEntity<?> signIn(@RequestBody MemberSignInRequest memberSignInRequest) {
//        return memberService.signIn(memberSignInRequest);
//    }

}
