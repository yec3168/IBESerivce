package com.project.ibe.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;
import java.util.Iterator;

@Controller
@RequestMapping("/member")
public class MainController {

    @GetMapping("/")
    public String index(Model model) {
        String memberEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();

        model.addAttribute("memberEmail", memberEmail);
        model.addAttribute("role", role);
        return "index"; // login.html 페이지로 이동
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // login.html 페이지로 이동
    }

    @GetMapping("/admin")
    public String loginProc() {
        return "admin"; // login.html 페이지로 이동
    }
}
