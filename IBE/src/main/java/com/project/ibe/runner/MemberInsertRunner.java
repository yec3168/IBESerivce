package com.project.ibe.runner;

import com.project.ibe.entity.member.Member;
import com.project.ibe.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MemberInsertRunner implements ApplicationRunner {
    @Autowired
    MemberRepository memberRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {


        Member member1 = new Member();
        member1.setMemberEmail("aaa");
        member1.setMemberPassword("aaa");
        member1.setRole("USER");

        Member member2 = new Member();
        member2.setMemberEmail("bbb");
        member2.setMemberPassword("bbb");
        member2.setRole("ADMIN");

        memberRepository.saveAll(List.of(member1, member2));
    }
}