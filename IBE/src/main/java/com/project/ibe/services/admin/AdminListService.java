package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.MemberAdminRequest;
import com.project.ibe.dto.admin.SingleEmailRequest;
import com.project.ibe.entity.common.Role;
import com.project.ibe.entity.member.Member;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminListService {

    @Autowired
    MemberRepository memberRepository;

    @Transactional
    public void changeRole(MemberAdminRequest memberAdminRequest) {
       Member existMember = memberRepository.findByMemberEmail(memberAdminRequest.getMemberEmail())
               .orElseThrow(() -> new BusinessException("Member Not Found", HttpStatus.NOT_FOUND));
        existMember.setRole(memberAdminRequest.getRole());
    }
}
