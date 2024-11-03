package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.MemberAdminRequest;
import com.project.ibe.dto.admin.SingleEmailRequest;
import com.project.ibe.services.admin.AdminListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/changepass")
    public void changePassword(@RequestBody MemberAdminRequest memberAdminRequest) {
        adminListService.changePassword(memberAdminRequest);
    }

    @PostMapping("/addmanager")
    public void addManager(@RequestBody MemberAdminRequest memberAdminRequest) {
        adminListService.addManager(memberAdminRequest);
    }

    @DeleteMapping("/deletemanager")
    public void deleteManager(@RequestBody SingleEmailRequest singleEmailRequest) {
        adminListService.deleteManager(singleEmailRequest);
    }
}
