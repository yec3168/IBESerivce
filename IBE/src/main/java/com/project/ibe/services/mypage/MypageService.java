package com.project.ibe.services.mypage;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.mypage.MemberInfoResponse;
import com.project.ibe.dto.mypage.MemberInfoUpdateRequest;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.member.MemberBank;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.member.MemberBankRepository;
import com.project.ibe.repository.member.MemberRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Service
@RequiredArgsConstructor
public class MypageService {
    private final MemberRepository memberRepository;
    private final MemberBankRepository memberBankRepository;

    public MemberInfoResponse getMemberInfo(PrincipalDTO principal) {
        Member member = memberRepository.findByMemberEmail(principal.getMemberEmail()).orElseThrow();

        MemberBank memberBank = memberBankRepository.findByMember_MemberId(member.getMemberId())
                .orElseThrow(() -> new BusinessException("Member bank not found", HttpStatus.NOT_FOUND));

        MemberInfoResponse response = new MemberInfoResponse();

        response.setMemberEmail(member.getMemberEmail());
        response.setMemberPoint(member.getMemberPoint());
        response.setMemberNickName(member.getMemberNickName());
        response.setMemberName(member.getMemberName());
        response.setMemberAddr(member.getMemberAddr());
        response.setMemberAddrDetail(member.getMemberAddrDetail());
        response.setMemberPhone(member.getMemberPhone());

        response.setMemberBank(memberBank.getMemberBank());
        response.setMemberAccountNumber(memberBank.getMemberAccountNumber());

        return response;
    }

    @Transactional
    public MemberInfoResponse updateMemberInfo(PrincipalDTO principal, @RequestBody @Valid MemberInfoUpdateRequest request) {
        Member member = memberRepository.findByMemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("Member not found", HttpStatus.NOT_FOUND));

        MemberInfoResponse response = new MemberInfoResponse();

        response.setMemberEmail(member.getMemberEmail());
        response.setMemberPoint(member.getMemberPoint());

        if (request.getMemberName() != null) {
            member.setMemberName(request.getMemberName());
            response.setMemberName(member.getMemberName());
        }
        if (request.getMemberNickName() != null) {
            member.setMemberNickName(request.getMemberNickName());
            response.setMemberNickName(member.getMemberNickName());
        }
        if (request.getMemberPhone() != null) {
            member.setMemberPhone(request.getMemberPhone());
            response.setMemberPhone(member.getMemberPhone());
        }
        if (request.getMemberAddr() != null) {
            member.setMemberAddr(request.getMemberAddr());
            response.setMemberAddr(member.getMemberAddr());
        }
        if (request.getMemberAddrDetail() != null) {
            member.setMemberAddrDetail(request.getMemberAddrDetail());
            response.setMemberAddrDetail(member.getMemberAddrDetail());
        }

        MemberBank memberBank = memberBankRepository.findByMember_MemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("MemberBank not found", HttpStatus.NOT_FOUND));

        if (request.getMemberAccountNumber() != null) {
            memberBank.setMemberAccountNumber(request.getMemberAccountNumber());
            response.setMemberAccountNumber(memberBank.getMemberAccountNumber());
        }
        if (request.getMemberBank() != null) {
            memberBank.setMemberBank(request.getMemberBank());
            response.setMemberBank(memberBank.getMemberBank());
        }

        memberRepository.save(member);
        memberBankRepository.save(memberBank);

        return response;
    }
}
