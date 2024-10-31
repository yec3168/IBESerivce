package com.project.ibe.entity.member;

import com.project.ibe.entity.common.Bank;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
@Getter
@Setter
public class MemberBank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Bank memberBank;            // 환급은행

    @Column(nullable = false)
    private String memberAccountNumber; // 환급계좌

    @Builder
    public MemberBank(Member member, Bank memberBank, String memberAccountNumber){
        this.member = member;
        this.memberBank = memberBank;
        this.memberAccountNumber = memberAccountNumber;
    }
}
