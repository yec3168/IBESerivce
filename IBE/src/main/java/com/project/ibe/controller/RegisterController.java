package com.project.ibe.controller;

import com.project.ibe.dto.RegisterDTO;
import com.project.ibe.services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/registerProc")
    public String registerProc(RegisterDTO registerDTO) {
        System.out.println(registerDTO.getMemberEmail());
        registerService.registerProcess(registerDTO);
        return "redirect:/login";
    }
}
