package com.project.ibe.services;

import com.project.ibe.dto.RegisterDTO;
import com.project.ibe.entity.member.Member;
import com.project.ibe.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void registerProcess(RegisterDTO registerDTO) {
        Member data = new Member();
        data.setMemberEmail(registerDTO.getMemberEmail());
        data.setMemberPassword(bCryptPasswordEncoder.encode(registerDTO.getMemberPassword()));
        data.setRole("ROLE_ADMIN");
        memberRepository.save(data);
    }
}
