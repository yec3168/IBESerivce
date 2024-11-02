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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminListService {

    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void changeRole(MemberAdminRequest memberAdminRequest) {
       Member existMember = memberRepository.findByMemberEmail(memberAdminRequest.getMemberEmail())
               .orElseThrow(() -> new BusinessException("Member Not Found", HttpStatus.NOT_FOUND));
        existMember.setRole(memberAdminRequest.getRole());
<<<<<<< HEAD
=======
    }

    public void changePassword(MemberAdminRequest memberAdminRequest) {
        Member existMember = memberRepository.findByMemberEmail(memberAdminRequest.getMemberEmail())
                .orElseThrow(() -> new BusinessException("Member Not Found", HttpStatus.NOT_FOUND));
        existMember.setMemberPassword(bCryptPasswordEncoder.encode(memberAdminRequest.getMemberPassword()));
    }

    public void addManager(MemberAdminRequest memberAdminRequest) {
        Member manager = new Member();
        manager.setMemberEmail(memberAdminRequest.getMemberEmail());
        manager.setMemberPassword(bCryptPasswordEncoder.encode(memberAdminRequest.getMemberPassword()));
        manager.setRole(memberAdminRequest.getRole());
        manager.setMemberAddr("manager");
        manager.setMemberPhone(memberAdminRequest.getMemberEmail().substring(1,15));
        manager.setMemberName(memberAdminRequest.getMemberName());
        manager.setMemberNickName(memberAdminRequest.getMemberEmail().substring(1,8));
        manager.setMemberPoint(100L);
        memberRepository.save(manager);
    }

    public void deleteManager(SingleEmailRequest singleEmailRequest) {
        Member existMember = memberRepository.findByMemberEmail(singleEmailRequest.getMemberEmail())
                .orElseThrow(() -> new BusinessException("Member Not Found", HttpStatus.NOT_FOUND));
        memberRepository.delete(existMember);
>>>>>>> Kang
    }
}
