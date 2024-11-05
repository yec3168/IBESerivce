package com.project.ibe.services.member;


import com.project.ibe.config.SmsUtil;
import com.project.ibe.dto.member.KakaoSignupRequest;
import com.project.ibe.dto.member.MemberSignupResponse;
import com.project.ibe.dto.member.MemberSignInRequest;
import com.project.ibe.dto.member.MemberSignUpRequest;
import com.project.ibe.dto.member.sms.MemberSmsReqequest;
import com.project.ibe.dto.member.sms.MemberSmsResponse;
import com.project.ibe.entity.common.Role;
import com.project.ibe.entity.common.SocialType;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.member.MemberBank;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.jwt.JwtTokenProvider;
import com.project.ibe.repository.member.MemberBankRepository;
import com.project.ibe.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;


import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberBankRepository memberBankRepository;
    private final SmsUtil smsUtil;  // SmsUtil 추가
    private final ModelMapper modelMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    //회원가입
    public MemberSignupResponse signUp(MemberSignUpRequest memberSignUpRequest) {


        if(memberRepository.existsByMemberEmail(memberSignUpRequest.getMemberEmail())) {
            throw new BusinessException("중복된 이메일 입니다.", HttpStatus.BAD_REQUEST);
        }

        // 패스워드 암호화
        memberSignUpRequest.setMemberPassword(bCryptPasswordEncoder.encode(memberSignUpRequest.getMemberPassword()));


        // 회원 정보 생성.
        Member member =  modelMapper.map(memberSignUpRequest, Member.class);
        member.setMemberPoint(0L);
        member.setRole(Role.ROLE_ADMIN);
        member.setMemberSocialType(SocialType.LOCAL); // 일반 사용자는 LOCAL
        memberRepository.save(member);


        //회원은행 저장.
        MemberBank memberBank = MemberBank.builder()
                .member(member)
                .memberBank(memberSignUpRequest.getMemberBank())
                .memberAccountNumber(memberSignUpRequest.getMemberAccountNumber())
                .build();
        memberBankRepository.save(memberBank);

        return modelMapper.map(member, MemberSignupResponse.class);
    }



    // 로그인 logic
    public String signIn(MemberSignInRequest memberSignInRequest) {
        if(!memberRepository.existsByMemberEmail(memberSignInRequest.getMemberEmail())){
            throw new UsernameNotFoundException(memberSignInRequest.getMemberEmail() + " 이 존재하지 않습니다.");
        }
        Member member = getMemberByEmail(memberSignInRequest.getMemberEmail());

        if(!bCryptPasswordEncoder.matches(memberSignInRequest.getMemberPassword(), member.getMemberPassword())){
            throw new BusinessException("Password is not correct", HttpStatus.NOT_FOUND);
        }
        //to do :  jwt token 만들어서 return 하기 (나중에)
        String token = jwtTokenProvider.createToken(member.getMemberEmail());
        return token;
    }

    // 이메일 체크
    public Boolean checkEmail(String memberEmail) {
        return memberRepository.existsByMemberEmail(memberEmail);
    }

    //문자 인증 로직 ( 전화번호 인증 )
    public String sendSmsToFindEmail(String memberPhone) {
        String randomCode = smsUtil.generateRandomNumber();

        //실제 테스트시 아래 코드 주석 풀기.
//        smsUtil.sendOne(memberPhone.replaceAll("-", ""), randomCode);

        return randomCode;
    }

    //문자 인증 로직 ( 전화번호 인증 )
    public MemberSmsResponse sendSmsToFindEmail(MemberSmsReqequest memberSmsReqequest) {
        // 회원을 못찾음.
        Member member = memberRepository.findByMemberNameAndMemberPhone(memberSmsReqequest.getMemberName(), memberSmsReqequest.getMemberPhone())
                .orElseThrow(
                        () -> new BusinessException("Member not Found", HttpStatus.NOT_FOUND)
                );

        String randomCode = smsUtil.generateRandomNumber();

        //실제 테스트시 아래 코드 주석 풀기.
//        smsUtil.sendOne(memberSmsReqequest.getMemberPhone().replaceAll("-", ""), randomCode);

       return MemberSmsResponse.builder()
                .memberEmail(member.getMemberEmail())
                .memberName(member.getMemberName())
                .randomCode(randomCode)
                .build();

    }

    // 이메일 인증 auth number update
    public boolean updateAuthNumber(String memberEmail, String authNumber){
        Member member = getMemberByEmail(memberEmail);
        member.setMemberAuthNumber(authNumber);

        return true;
    }


    /**
     * 카카오 회원가입
     */
    public Member kakaoSignup(KakaoSignupRequest kakaoSignupRequest){
        if(memberRepository.existsByMemberEmail(kakaoSignupRequest.getMemberEmail())) {
            throw new BusinessException("중복된 이메일 입니다.", HttpStatus.BAD_REQUEST);
        }
        // 패스워드 암호화
        kakaoSignupRequest.setMemberPassword(bCryptPasswordEncoder.encode(kakaoSignupRequest.getMemberPassword()));

        // 회원 정보 생성.
        Member member =  modelMapper.map(kakaoSignupRequest, Member.class);
        member.setMemberPoint(0L);
        member.setRole(Role.ROLE_CLIENT);
        return memberRepository.save(member);

//        return modelMapper.map(member, MemberSignupResponse.class);
    }





    private Member getMemberByEmail(String memberEmail) {
        Member member = memberRepository.findByMemberEmail(memberEmail)
                .orElseThrow(
                        () -> new BusinessException("Member Not Found", HttpStatus.NOT_FOUND)
                );
        return member;
    }
}
