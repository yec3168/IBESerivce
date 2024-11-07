package com.project.ibe.services.mypage;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.mypage.*;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.member.MemberBank;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.member.MemberBankRepository;
import com.project.ibe.repository.member.MemberRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Service
@RequiredArgsConstructor
public class MypageService {
    private final MemberRepository memberRepository;
    private final MemberBankRepository memberBankRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 멤버 정보 전부 조회
    public MemberInfoResponse getMemberInfo(PrincipalDTO principal) {
        Member member = memberRepository.findByMemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("Member not found", HttpStatus.NOT_FOUND));

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

    // 멤버 포인트 조회
    public MemberPointResponse getMemberPoint(PrincipalDTO principal) {
        Member member = memberRepository.findByMemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("Member not found", HttpStatus.NOT_FOUND));

        MemberPointResponse response = new MemberPointResponse();

        response.setMemberPoint(member.getMemberPoint());

        return response;
    }

    // 멤버 정보 업데이트
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

    // 멤버 비밀번호 변경
    @Transactional
    public MemberPwUpdateResponse updateMemberPw(PrincipalDTO principal, @RequestBody @Valid MemberPwUpdateRequest request) {
        Member member = memberRepository.findByMemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("Member not found", HttpStatus.NOT_FOUND));

        MemberPwUpdateResponse response = new MemberPwUpdateResponse();

        if (!bCryptPasswordEncoder.matches(request.getMemberPassword(), member.getMemberPassword())) {
            response.setSuccess(false);
            throw new BusinessException("Old password is incorrect", HttpStatus.BAD_REQUEST);
        }

        String encodedNewPassword = bCryptPasswordEncoder.encode(request.getMemberNewPassword());
        member.setMemberPassword(encodedNewPassword);
        response.setSuccess(true);

        memberRepository.save(member);

        return response;
    }

    // 멤버 회원 탈퇴 처리
    // member_deleted col값을 true로 설정함.
    @Transactional
    public MemberDelUpdateResponse updateMemberDel(PrincipalDTO principal) {
        Member member = memberRepository.findByMemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("Member not found", HttpStatus.NOT_FOUND));

        MemberDelUpdateResponse response = new MemberDelUpdateResponse();

        member.setMemberDeleted(true);
        response.setSuccess(true);

        memberRepository.save(member);

        return response;
    }

    // 멤버 비밀번호 확인
    @Transactional
    public MemberPwCheckResponse checkMemberPw(PrincipalDTO principal,
                                               @RequestBody @Valid MemberPwCheckRequest request) {
        Member member = memberRepository.findByMemberId(principal.getMemberId())
                .orElseThrow(() -> new BusinessException("Member not found", HttpStatus.NOT_FOUND));

        MemberPwCheckResponse response = new MemberPwCheckResponse();

        if (!bCryptPasswordEncoder.matches(request.getMemberPassword(), member.getMemberPassword())) {
            response.setSuccess(false);
            throw new BusinessException("Password is incorrect", HttpStatus.BAD_REQUEST);
        } else{
            response.setSuccess(true);
        }

        return response;
    }

}
