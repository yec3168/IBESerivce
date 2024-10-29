package com.project.ibe.services;

import com.project.ibe.dto.MemberSignInRequest;
import com.project.ibe.entity.member.Member;
import com.project.ibe.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;


//    public ResponseEntity<?> signIn(MemberSignInRequest memberSignInRequest) {
//        if(!memberRepository.existsByMemberEmail(memberSignInRequest.getMemberEmail())){
//            throw new UsernameNotFoundException(memberSignInRequest.getMemberEmail() + " 이 존재하지 않습니다.");
//        }
//
//        return "";
//    }
}
