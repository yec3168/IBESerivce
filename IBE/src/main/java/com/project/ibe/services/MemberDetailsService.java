package com.project.ibe.services;

import com.project.ibe.dto.MemberDetails;
import com.project.ibe.entity.member.Member;
import com.project.ibe.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;

@Service
public class MemberDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberEmail) throws UsernameNotFoundException {
        Member memberData = memberRepository.findByMemberEmail(memberEmail);

        if(memberData != null) {
            return new MemberDetails(memberData);
        }
        return null;
    }
}
