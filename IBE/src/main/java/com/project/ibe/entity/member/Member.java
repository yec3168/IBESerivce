package com.project.ibe.entity.member;

import com.project.ibe.entity.common.Bank;
import com.project.ibe.entity.common.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.modelmapper.internal.bytebuddy.implementation.bind.annotation.Default;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
@Getter @Setter
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;              // pk 회원번호

    @Column(nullable = false)
    @Size(max = 8)
    private String memberName;          // 이름

    @Column(nullable = false)
    @Size(max = 10)
    private String memberNickName;      // 닉네임

    @Column(nullable = false, unique = true)
    private Date memberBirth;           // 주민번호

    @Column(nullable = false)
    private String memberPhone;         // 전화번호

    @Column(nullable = false)
    private String memberAddr;          // 주소

    @Column(nullable = true)
    private String memberAddrDetail;    // 상세주소

    @Column(nullable = false, unique = true)
    private String memberEmail;         // 이메일

    @Column(nullable = false)
    private String memberPassword;      // 비밀번호

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Bank memberBank;            // 환급은행

    @Column(nullable = false)
    private String memberAccountNumber; // 환급계좌

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime entryDate;    // 가입날짜

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updateDate;   // 수정날짜

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;                  // 권한

    @Column(nullable = false)
    private Long memberPoint;           // 보유포인트

    @Column(nullable = true)
    private String memberAuthNumber;     // 인증번호
}
