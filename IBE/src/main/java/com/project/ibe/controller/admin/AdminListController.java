package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.MemberAdminRequest;
import com.project.ibe.services.admin.AdminListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLOutput;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/member/adminlist")
public class AdminListController {

    private final AdminListService adminListService;

    @PostMapping("/changerole")
    public void changeRole(@RequestBody MemberAdminRequest memberAdminRequest) {
        adminListService.changeRole(memberAdminRequest);
    }
}
