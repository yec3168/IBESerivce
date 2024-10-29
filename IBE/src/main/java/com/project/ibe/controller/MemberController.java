package com.project.ibe.controller;

import com.project.ibe.dto.MemberSignInRequest;
import com.project.ibe.dto.MemberSignUpRequest;
import com.project.ibe.services.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController //json
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody MemberSignUpRequest memberSignUpRequest) {
        return memberService.signUp(memberSignUpRequest);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody MemberSignInRequest memberSignInRequest) {
        return memberService.signIn(memberSignInRequest);
    }
    @GetMapping("/signup/{memberEmail}/")
    public Boolean checkEmail(@PathVariable String memberEmail) {
        return memberService.checkEmail(memberEmail);
    }



}
