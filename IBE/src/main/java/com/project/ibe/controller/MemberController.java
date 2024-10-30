package com.project.ibe.controller;

import com.project.ibe.dto.member.MemberSignInRequest;
import com.project.ibe.dto.member.MemberSignUpRequest;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController //json
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public Response signUp(@RequestBody MemberSignUpRequest memberSignUpRequest) {

        try{
            return new Response(ResponseCode.SUCCESS, memberService.signUp(memberSignUpRequest), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    @PostMapping("/signin")
    public Response signin(@RequestBody MemberSignInRequest memberSignInRequest) {
        try{
            return new Response(ResponseCode.SUCCESS, memberService.signIn(memberSignInRequest), "200");
        } catch (Exception e){
            return new Response(ResponseCode.FAIL, false, "404");
        }

    }
    @GetMapping("/signup/{memberEmail}/")
    public Boolean checkEmail(@PathVariable String memberEmail) {

        return memberService.checkEmail(memberEmail);
    }



}
