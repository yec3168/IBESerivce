package com.project.ibe.controller.admin;

import com.project.ibe.dto.admin.MemberListResponse;
import com.project.ibe.dto.admin.SingleEmailRequest;
import com.project.ibe.services.admin.MemberListService;
import com.project.ibe.services.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/member/memberlist")
public class MemberListController {

    private final MemberListService memberListService;

    @GetMapping
    public List<MemberListResponse> getMemberList() {
        return memberListService.getMemberList();
    }

    @PostMapping("/ban")
    public void banMember(@RequestBody SingleEmailRequest singleEmailRequest) {
        memberListService.banMember(singleEmailRequest);
    }

    @PostMapping("/unban")
    public void unBanMember(@RequestBody SingleEmailRequest singleEmailRequest) {
        memberListService.unBanMember(singleEmailRequest);
    }
}
