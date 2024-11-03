package com.project.ibe.services.admin;

import com.project.ibe.dto.admin.MemberListResponse;
import com.project.ibe.dto.admin.SingleEmailRequest;
import com.project.ibe.entity.common.Role;
import com.project.ibe.entity.member.Member;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberListService {

    private final MemberRepository memberRepository;

    private final ModelMapper modelMapper;

    public List<MemberListResponse> getMemberList() {
        List<Member> memberEntityList = memberRepository.findAll();
        System.out.println(memberEntityList + "member");
        return memberEntityList.stream()
                .map(entity -> modelMapper.map(entity, MemberListResponse.class))
                .toList(); //List<UserResDTO>
    }

    @Transactional
    public void banMember(SingleEmailRequest singleEmailRequest) {
        Member existMember = memberRepository.findByMemberEmail(singleEmailRequest.getMemberEmail())
                .orElseThrow(() -> new BusinessException("Member Not Found", HttpStatus.NOT_FOUND));
        existMember.setRole(Role.ROLE_BANNED_CLIENT);
    }

    @Transactional
    public void unBanMember(SingleEmailRequest singleEmailRequest) {
        Member existMember = memberRepository.findByMemberEmail(singleEmailRequest.getMemberEmail())
                .orElseThrow(() -> new BusinessException("Member Not Found", HttpStatus.NOT_FOUND));
        existMember.setRole(Role.ROLE_CLIENT);
    }
}
