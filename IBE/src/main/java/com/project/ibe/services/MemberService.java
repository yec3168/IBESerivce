package com.project.ibe.services;

import com.project.ibe.dto.MemberSignInRequest;
import com.project.ibe.dto.MemberSignUpRequest;
import com.project.ibe.dto.SuccessResponse;
import com.project.ibe.entity.common.Role;
import com.project.ibe.entity.member.Member;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    private final ModelMapper modelMapper;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;



    public ResponseEntity<?> signUp(MemberSignUpRequest memberSignUpRequest) {
        if(memberRepository.existsByMemberEmail(memberSignUpRequest.getMemberEmail())) {
            throw new BusinessException("Email Exist", HttpStatus.NOT_FOUND);
        }
        memberSignUpRequest.setMemberPassword(bCryptPasswordEncoder.encode(memberSignUpRequest.getMemberPassword()));
        Member member =  modelMapper.map(memberSignUpRequest, Member.class);
        member.setMemberPoint(0L);
//        new Bank(memberSignUpRequest.getMemberBank());
//        member.setMemberBank(Bank.NH);
        member.setRole(Role.ROLE_ADMIN);
        memberRepository.save(member);

        return new ResponseEntity<>(new SuccessResponse("200","성공"),HttpStatus.OK);
    }




    public ResponseEntity<?> signIn(MemberSignInRequest memberSignInRequest) {
        if(!memberRepository.existsByMemberEmail(memberSignInRequest.getMemberEmail())){
            throw new UsernameNotFoundException(memberSignInRequest.getMemberEmail() + " 이 존재하지 않습니다.");
        }
        Member member = memberRepository.findByMemberEmail(memberSignInRequest.getMemberEmail());

        if(!bCryptPasswordEncoder.matches(memberSignInRequest.getMemberPassword(), member.getMemberPassword())){
            throw new BusinessException("Password is not correct", HttpStatus.NOT_FOUND);
        }
        //to do :  jwt token 만들어서 return 하기 (나중에)


        return new ResponseEntity<>(new SuccessResponse("200","성공"),HttpStatus.OK);
    }

    public Boolean checkEmail(String memberEmail) {
        return memberRepository.existsByMemberEmail(memberEmail);
    }
}
