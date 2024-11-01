package com.project.ibe.services.member;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.entity.common.Role;
import com.project.ibe.entity.member.Member;
import com.project.ibe.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository repository;

    @Override
    public UserDetails loadUserByUsername(String memberEmail) throws UsernameNotFoundException {
        Member member = null; // db에서 유저조회
        try {
            member = repository.findByMemberEmail(memberEmail)
                    .orElseThrow(() -> new UsernameNotFoundException(memberEmail + " -> 데이터베이스에서 찾을 수 없습니다."));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // role셋팅
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(member.getRole().name()));


        return PrincipalDTO.builder()
                .memberId(member.getMemberId())
                .memberPassword(member.getMemberPassword())
                .memberEmail(member.getMemberEmail())
                .role(member.getRole())
                .authorities(grantedAuthorities)
                .build();

    }
}
