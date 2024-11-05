package com.project.ibe.services.mypage;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.mypage.MemberInfoResponse;
import com.project.ibe.entity.member.Member;
import com.project.ibe.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MypageService {
    private final MemberRepository memberRepository;


    public MemberInfoResponse getMemberInfo(PrincipalDTO principal) {
        Member member = memberRepository.findByMemberEmail(principal.getMemberEmail()).orElseThrow();
        MemberInfoResponse response = new MemberInfoResponse();
        response.setMemberEmail(member.getMemberEmail());
        response.setPoints(member.getMemberPoint());
        response.setMemberNickName(member.getMemberNickName());
        response.setMemberName(member.getMemberName());

        return response;
    }
}
