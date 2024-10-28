package com.project.ibe.controller;

import com.project.ibe.entity.member.Member;
import com.project.ibe.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MemberController {
    @Autowired
    private MemberService memberService;

    @GetMapping("/login")
    public String login() {
        return "login"; // login.html 페이지로 이동
    }

//    @PostMapping("/loginProc")
//    public String loginProc() {
//        return "loginProc"; // login.html 페이지로 이동
//    }

//    @GetMapping("/register")
//    public String registerForm() {
//        return "register"; // register.html 페이지로 이동
//    }
}
