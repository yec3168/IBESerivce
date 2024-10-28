package com.project.ibe.entity.member;

import com.project.ibe.entity.common.Bank;
import com.project.ibe.entity.common.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter @Setter
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId; // pk
    @Column(nullable = false)
    private String memberName; // 이름
    @Column(nullable = false)
    private String memberNickName;
    @Column(nullable = false)
    private String memberPhone;
    @Column(nullable = false)
    private String memberAddress;
    @Column(nullable = true)
    private String memberAddressDetail;
    @Column(nullable = false, unique = true)
    private String memberEmail;
    @Column(nullable = false)
    private String memberPassword;
    @Column(nullable = false)
    private Bank memberBank; // 은행이름.
    @Column(nullable = false)
    private String memberAccountNumber; // 환급 계좌번호
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime entryDate;
    @Column(nullable = false    )
    @UpdateTimestamp
    private LocalDateTime updateDate;
    @Column(nullable = false)
    private Role role; // 권한.
}
